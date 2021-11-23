 //词法分析输出token
 const LexicalAnalysis=function (tempExpression,tempX,tempY) {
  console.log(tempExpression);
  let expression = tempExpression; //获取表达式
  const symbol = ['+', '-'];
  const re = /\d/; //0-9的数字
  const tokens = []; //token序列
  const chars = expression.trim().split(''); //拆分表达式
  console.log(chars);
  let token = '';

  //获取x，y坐标
  let x=tempX;
  let y=tempY;


  //拆解表达式,化成token数组
  chars.forEach(element => {
    console.log("element:" + element);
    if (element == "x") //如果当前是x改变
    {
      element = x;
    }
    if (element == "y") //如果当前是y改变
    {
      element = y;
    }
    if (re.test(element)) {
      token += element;
      // console.log(token);
    } else if (element == '' && token) {
      tokens.push(token);
      token = '';
    } else if (symbol.includes(element)) {
      if (token) {
        tokens.push(token);
        token = '';
      }
      tokens.push(element);
    }
  });
  if (token) {
    tokens.push(token)
  }
  return tokens;
}

//汇编代码生成器
const AssemblyWriter=function () {
  this.output = '';
  this.writePush = function (digit) {
    this.output += `push ${digit}\r\n`;
  };
  this.writeOP = function (op) {
    this.output += op + '\r\n';
  };
  this.outputStr = function () {
    return this.output;
  };
}

//语法分析器
const Parser=function (tokens, writer) {
  this.writer = writer;
  this.tokens = tokens;
  // tokens 数组索引
  this.i = -1;
  this.opMap1 = {
    '+': 'add',
    '-': 'sub',
  };

  this.init = function () {
    this.compileExpression();
  };
  this.compileExpression = function () {
    this.compileAddExpr();
  };
  this.compileAddExpr = function () {
    this.compileTerm();
    while (true) {
      this.getNextToken();
      if (this.opMap1[this.token]) {
        let op = this.opMap1[this.token];
        this.compileTerm();
        this.writer.writeOP(op);
      } else {
        // 没有匹配上相应的操作符 这里为没有匹配上 + - 
        // 将 token 索引后退一位
        this.i--;
        break;
      }
    }
  };

  this.compileTerm = function () {
    this.getNextToken();
    if (this.token == '(') {
      this.compileExpression();
      this.getNextToken();
      if (this.token != ')') {
        throw '缺少右括号：)'
      }
    } else if (/^\d+$/.test(this.token)) {
      this.writer.writePush(this.token);
    } else {
      throw '错误的 token：第 ' + (this.i + 1) + ' 个 token (' + this.token + ')';
    }
  };

  this.getNextToken = function () {
    this.token = this.tokens[++this.i];
  };

  this.getInstructions = function () {
    return this.writer.outputStr();
  };

  this.init();
}

const CpuEmulator=function (instructions) {
  console.log("ins:" + instructions);
  this.ins = instructions.split('\r\n');
  this.memory = [];
  this.re = /^(push)\s\w+/;
  this.execute = function () {
    this.ins.forEach(i => {
      switch (i) {
        case 'add':
          this.add();
          break;
        case 'sub':
          this.sub();
          break;
        default:
          if (this.re.test(i)) {
            this.push(i.split(' ')[1]);
          }
      }
    })
  };

  this.add = function () {
    const b = this.pop();
    const a = this.pop();
    this.memory.push(a + b);
  };

  this.sub = function () {
    const b = this.pop();
    const a = this.pop();
    this.memory.push(a - b);
  };

  this.push = function (x) {
    console.log(x);
    this.memory.push(parseInt(x));
  };

  this.pop = function () {
    return this.memory.pop();
  };

  this.getResult = function () {
    return this.memory[0];
  };

  //////////////////////////////
  this.execute();
}

const test=function () {
  console.log("test函数收到响应");
  let tempExpression = expression; //表达式库
  let x=tempX;
  let y=tempY;

  while (tempExpression.length > 3) {
    let expression = "";
    let flag = true; //判断为x改变还是y改变
    let i = 0;
    for (i = 0; i < tempExpression.length; i++) {
      if (tempExpression[i] == "x")
        flag = false; //y改变
      if (tempExpression[i] == ",") //遇到,截断
        break;
      expression += tempExpression[i];
    }
    //删除表达式库中的字符
    tempExpression = tempExpression.slice(i + 1);
    console.log("expression" + expression);

    const tokens = this.LexicalAnalysis(expression);
    const writer = new this.AssemblyWriter();
    console.log("tokens:" + tokens);
    console.log("writer:" + writer);
    const parser = new this.Parser(tokens, writer);
    const instructions = parser.getInstructions();
    console.log(instructions);
    const emulator = new this.CpuEmulator(instructions);
    //获取结果
    let result = emulator.getResult();
    if (flag == true) //为x的结果
    {
      this.data.a = result;
      console.log("a:" + this.data.a);
    }
    if (flag == false) {
      this.data.b = result;
      console.log("b:" + this.data.b);
    }
  }
  this.data.expression = tempExpression; //保持一致
}

module.exports = {
  LexicalAnalysis,
  AssemblyWriter,
  Parser,
  CpuEmulator,
}