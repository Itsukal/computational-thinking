//import
let testPosition = require('../../backEnd/compute.js');


var scrHeight; //记录屏幕的高度，后续会用于计算代码区的高度
var isShow = true; //代表顶部提示文案是否展示
var totalCode = 3;
//***********************************************
//以下变量用于操作任务区域内容

var isShow = true; //代表顶部提示文案是否展示

//这个地图的布局是一个8*4的地图，即宽度最多容纳8个方块，高度最多容纳4个方块，在给出地图的时候，使用坐标形式就行，地图会自动生成，且注意坐标点可以用小数形式表示
//missionPathPass代表通行方块，missionPathBan代表不通行方块

var missionPathPass = [
  [2, 1.5],
  [3, 1.5],
  [3, 2.5],
  [3, 0.5],
  [4, 0.5],
  [5, 0.5],
  [5, 1.5],
  [6, 1.5]
];
var missionPathBan = [
  [2, 0.5],
  [2, 2.5],
  [4, 1.5],
  [4, 2.5],
  [5, 2.5],
  [6, 0.5],
  [6, 2.5]
];

var man = [2, 1.5]; //这个坐标代表鞭炮的初始位置
var goal = [6, 1.5]; //这个坐标代表目标的位置

//最开始man的位置
let beginManPosition=[0,0];


//***********************************************
//以下变量用于代码编辑区域内容

//ps
//!!!!需要点击左边的按钮才能生成一个新的代码块
//增加了背景颜色便于区分，如果要去掉，请转到css文件的MoveCode，把background-color注释掉
//屏幕宽: 750rpx
//第一块的位置x=285 y=110
//每块的高度为80rpx 宽度为160rpx(含空部分)
//每个代码块之前高度差为70rpx
//规定 1->上 2->下 3->左 4->右
var firstx = 285;
var firsty = 110;
var CodeWidth = 70;
//pixelRatio1是用于px和rpx相互转化 px*pixelRatio1=rpx
var pixelRatio1 = 750 / wx.getSystemInfoSync().windowWidth;
//生成新的代码块的函数
function Detail(id, x, y, type, name, Copy) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.type = type;
  this.name = name;
  this.Copy = Copy;
  this.zIndex = 1;
  this.highlight=0;
  this.Opacity = 1; //用于记录代码块的堆叠顺序，当当前代码块正在被操作时，应该被堆叠在最高层，此时zIndex会被设置为99；相反，如果不被操作，zIndex会被设置为1
}

function Info() {
  this.details = [];
}
//queue为最后监测代码块编号的数组，第i个表示开始下方第i个为Codei
//例：queue=[0,4,3,2,1]表示 上，右，左，下
var queue = new Array();
var queuenum = new Array();
//当前点击代码块
var clicknum;
var clickid;
//获取初始点
var startPoint;
//ps

var disgardRegion = 120; //代表代码块横坐标小于这个数值时摧毁代码块
var leftRegion = 210; //代表代码块横坐标小于这个数值时进入代码存储区
var codeStartTouchRegionIsRight = false; //代表当前所操作代码块在点击前的位置是在代码存储区还是在代码编辑区，用于判断是否要根据该代码的位置来调节垃圾桶是否显示，true代表从编辑区开始点击，false代表从存储区开始点击

Page({
  data: {
    buttonIsOrUsed:false,//判断开始按钮是否有使用过
    codeRegionHeight: 0, //记录代码操作区高度
    binBackgroundState: "none", //用于表示垃圾桶区域是否显示，none为不显示，flex为显示
    binBackgroundRbga: 0, //用于表示垃圾桶Rgba中的透明度，用于是否显现垃圾桶区域，0为透明，1为不透明
    binState: "close", //用于记录垃圾桶图标中垃圾桶是否打开

    info: {}, //存储可移动代码块
    topTipWidth: "0%", //代表TopTip模块的宽度，用于控制顶部提示文案是否展示
    missionPathPass: [], //代表地图中路径方块的坐标，用于设立样式
    missionPathBan: [], //代表地图中非通行方块的坐标，用于设立样式

    resetRotate: 0, //reset按键的方向，每点击时候进行180度翻转

    //ps
    //数值初始化
    //x、y记录位置
    x: 0,
    y: 0,
    expression: "",
    //
    objectArray: [{
      id: 4,
      name: "右"
    }, {
      id: 3,
      name: "左"
    }, {
      id: 2,
      name: "下"
    }, {
      id: 1,
      name: "上"
    }],
    //ps

    man: {
      "x": 0,
      "y": 0
    }, //代表人物位置，用于设立样式
    goal: {
      "x": 0,
      "y": 0
    }, //代表目标位置，用于设立样式
  },

  // 事件处理函数
  onLoad() {
    //获取屏幕高度，用于计算代码区的高度
    wx.getSystemInfo({
      success: function (res) {
        scrHeight = res.windowHeight;
      }
    })
    this.setData({
      codeRegionHeight: scrHeight - leftRegion
    })

    //初始化顶部提示文案是否展示
    if (isShow) {
      this.setData({
        topTipWidth: "84%"
      })
    }

    //初始化代码区
    this.init();

    //初始化地图，每个路径方块的长宽都是80rpx，所以坐标要乘以80
    //先铺设通行的方块
    console.log("pppp" + pixelRatio1);
    for (var i = 0; i < missionPathPass.length; i++) {
      var s1 = 'missionPathPass[' + i + ']';
      this.setData({
        [s1]: {
          "x": missionPathPass[i][0] * 80 + 15,
          "y": missionPathPass[i][1] * 80 + 10
        }
      });
    }
    //再铺设不通行的方块
    for (var i = 0; i < missionPathBan.length; i++) {
      var s1 = 'missionPathBan[' + i + ']';
      this.setData({
        [s1]: {
          "x": missionPathBan[i][0] * 80 + 15,
          "y": missionPathBan[i][1] * 80 + 10
        }
      });
    }

    //设置目标样式
    this.setData({
      goal: {
        "x": goal[0] * 80 + 15,
        "y": goal[1] * 80 + 10
      }
    })
    //更新人物位置
    this.updateManPos();
  },

  //*************************************
  //以下代码为任务区域相关代码
  //用于展示顶部Tip的函数
  showTip: function () {
    if (isShow == true) return;
    isShow = true;
    for (let i = 0; i <= 84; i += 1) {
      let tmp = i + "%";
      this.setData({
        topTipWidth: tmp
      })
    }
  },
  //用于隐藏顶部Tip的函数
  hideTip: function () {
    if (isShow == false) return;
    isShow = false;
    for (let i = 84; i >= 0; i -= 1) {
      let tmp = i + "%";
      this.setData({
        topTipWidth: tmp
      })
    }
  },
  //用于将人物的位置坐标转化为样式数据
  updateManPos: function () {
    this.setData({
      man: {
        "x": man[0] * 80 + 15,
        "y": man[1] * 80 + 10
      }
    })
  },
  //用于检测人物位置移动操作是否合理，如果合理，返回true，如果不合理，返回false；同时如果已经到达目标地点，输出Win并返回true
  check: function () {
    if (man[0] == goal[0] && man[1] == goal[1]) {
      console.log("Win!!!");
      return true;
    }
    for (var i = 0; i < missionPathPass.length; i++) {
      if (missionPathPass[i][0] == man[0] && missionPathPass[i][1] == man[1]) return true;
    }
    return false;
  },
  //人物移动函数，如果合理，更新人物位置并返回true，如果不合理，进行输出台输出并返回false
  ChangePos: function (op) {
    var tmp = [man[0], man[1]]; //用于如果操作不合理时候进行恢复
    switch (op) {
      case 1: //向上走
        man[1] -= 1;
        break;
      case 2: //向下走
        man[1] += 1;
        break;
      case 3: //向左走
        man[0] -= 1;
        break;
      case 4: //向右走
        man[0] += 1;
        break;
      default:
        console.log("人物移动函数输入参数不合理！");
    }
    if (this.check()) {
      this.updateManPos();
      return true;
    } else {
      // man = tmp;
      this.updateManPos();
      console.log("操作不合理！！！");
      return false;
    }
  },
  //四个方向的移动函数
  turnUp: function () {
    return this.ChangePos(1);
  },
  turnDown: function () {
    return this.ChangePos(2);
  },
  turnLeft: function () {
    return this.ChangePos(3);
  },
  turnRight: function () {
    return this.ChangePos(4);
  },

  //*************************************

  //*************************************
  //以下代码为代码操作区域相关代码
  //reset按键的翻转函数，参数为0，进行180翻转，参数为1，进行复原
  resetChange: function (op) {
    if (op == 0) {
      for (let i = 0; i < 180; i += 2) {
        this.setData({
          resetRotate: i
        });
        //console.log(i);
      }
    } else if (op == 1) {
      for (let i = 180; i >= 0; i -= 2) {
        this.setData({
          resetRotate: i
        });
        //console.log(i);
      }
    }
  },
  //reset按键的点击函数
  reset: function () {
    //reset功能还没写，以下是按键翻转效果
    this.init();
    this.resetChange(0);
    var that = this;
    that.resetChange(1);
    // setTimeout(function () {
    //   that.resetChange(1);
    // }, 100) //延迟时间 这里是1秒
  },
  //隐藏垃圾桶区域
  hideBin: function () {
    this.setData({
      binBackgroundState: "none",
      binBackgroundRbga: 0,
      binState: "close"
    })
  },
  //ps

  //初始化操作区界面
  init: function () {
    let that = this;
    this.setData({
      info: new Info(),
    });

    let info = this.data.info;
    for (var i = 0; i < 4; i++) {
      var name;
      var y;
      switch (i + 1) {
        case 1:
          name = "上";
          y = 400;
          break;
        case 2:
          name = "下";
          y = 280;
          break;
        case 3:
          name = "左";
          y = 160;
          break;
        case 4:
          name = "右";
          y = 40;
          break;
      };
      info.details.push(new Detail(i, 27, y, i + 1, name, 1));
    }

    this.setData({
      info: info
    });
    //console.log(info);
  },


  getclicknum: function (clickid) {
    let info = this.data.info;
    for (var i = 0; i < info.details.length; i++) {
      if (info.details[i].id == clickid)
        return i;
    }
  },

  //复制函数，且复制的是操作区左边供选择的代码块
  CopyEvent: function (e) {
    //console.log(e);
    let info = this.data.info;
    var newid = e.currentTarget.id;
    // console.log(type);
    var num = clicknum;
    if (info.details[num].bo == 0) return;
    info.details[num].bo = 0;
    //console.log(num);
    num = info.details[num].type;
    var len = info.details.length;
    totalCode = totalCode + 1;
    //console.log(len);
    var name;
    var y;
    switch (num) {
      case 1:
        name = "上";
        y = 400;
        break;
      case 2:
        name = "下";
        y = 280;
        break;
      case 3:
        name = "左";
        y = 160;
        break;
      case 4:
        name = "右";
        y = 40;
        break;
    }
    info.details.push(new Detail(totalCode, 27, y, num, name, 1));
    this.setData({
      info: info
    });
    //console.log(this.data.info);
  },

  //点击代码块的监听函数，目的是获取当前点击块(clicknum)
  buttonStart: function (e) {

    //去除高亮
    if (typeof(clicknum)!='undefined')
    {
      var newhighlight = 'info.details[' + clicknum + '].highlight';
      this.setData({
        [newhighlight]:0,
      });
    }

    startPoint = e.touches[0]; //获取拖动
    //console.log(e);
    var tmp = e.currentTarget.id;

    for (var i = 0; i <= totalCode; i++) {
      var tmp_id = "MoveCode" + String(i)
      if (tmp_id == tmp)
        clickid = i;
    }
    clicknum = this.getclicknum(clickid);
    console.log("clicknum:", clicknum);
    console.log("clickid", clickid);
    //获取当前操作代码块的横坐标，用于设置codeStartTouch
    let x = this.data.info.details[clicknum].x;
    if (x >= leftRegion) codeStartTouchRegionIsRight = true;
    else codeStartTouchRegionIsRight = false;

    //更新堆叠顺序，设为99
    var newZIndex = 'info.details[' + clicknum + '].zIndex';
    var newOpacity = 'info.details[' + clicknum + '].Opacity';
    var newhighlight = 'info.details[' + clicknum + '].highlight';
    this.setData({
      [newZIndex]: 99,
      [newOpacity]:1,
      [newhighlight]:1,
    });
    this.CopyEvent(e);
  },

  //移动代码块的函数
  buttonMove: function (e) {
    var endPoint = e.touches[e.touches.length - 1] //获取拖动结束点
    //计算在X轴上拖动的距离和在Y轴上拖动的距离
    var translateX = endPoint.clientX - startPoint.clientX
    var translateY = endPoint.clientY - startPoint.clientY
    translateX = translateX * pixelRatio1;
    translateY = translateY * pixelRatio1;
    startPoint = endPoint //重置开始位置

    var y = this.data.info.details[clicknum].y + translateY;
    var x = this.data.info.details[clicknum].x + translateX;
    // info.details[clicknum].x=x;
    // info.details[clicknum].y=y;
    var newx = 'info.details[' + clicknum + '].x';
    var newy = 'info.details[' + clicknum + '].y';
    //修改代码块位置
    this.setData({
      [newx]: x,
      [newy]: y,
    })
    //console.log("x=" + x + " y=" + y);

    //代码是从编辑区开始点击，则需要考虑垃圾桶是否要显示
    if (codeStartTouchRegionIsRight) {
      //横坐标小于disgardRegion，直接将整个垃圾桶区域显现
      if (x < disgardRegion) {
        this.setData({
          binBackgroundState: "flex",
          binState: "open",
          binBackgroundRbga: 1,
        })
      }
      //横坐标大于disgardRegion小于leftRegion，渐渐显示出垃圾桶
      else if (x < leftRegion) {
        this.setData({
          binBackgroundState: "flex",
          binState: "close",
          binBackgroundRbga: (leftRegion - x) / (leftRegion - disgardRegion)
        })
      }
    }
  },

  //松开鼠标后判定吸附函数，同时用于判断新拿出的代码块是否完全移出了左边区域
  buttonEnd: function (e) {
    //不论是否显现出了垃圾桶，先将垃圾桶区域隐藏 
    this.hideBin();

    let info = this.data.info;
    var newx = 'info.details[' + clicknum + '].x';
    var newy = 'info.details[' + clicknum + '].y';
    var x = info.details[clicknum].x;
    var y = info.details[clicknum].y;

    //判断操作结束后代码块是否触碰了左边区域，注意这里跟开始点击代码块时是在左右区域无关
    //如果触碰到了左边区域：1、横坐标小于disgardRegion，进行清除；2、横坐标大于disgardRegion小于leftRegion，将代码块弹出左边区域
    console.log(clicknum)
    console.log(info.details)
    if (x < disgardRegion) {
      //x坐标小于disgardRegion，意味着代码块进行清除
      info.details[clicknum].Opacity = 0;
      info.details[clicknum].x = 0;
      info.details[clicknum].y = 0;
      //待实现
      this.setData({
        info: info
      })
      return; //清除后不应接着进行下面的磁吸判断，因此结束函数
    } else if (x < leftRegion) {
      //将代码块弹出左边区域
      this.setData({
        [newx]: 220
      })
    }

    //以下代码用于判断是否要进行磁吸
    var magnet = 0;
    //console.log(info.details);
    // console.log(clicknum);
    // console.log(info.details.length);
    for (var i = 0; i < info.details.length; i++) {
      // console.log("aaaaaaaaaaaaaaaaaa");
      if (i != clicknum && Math.abs(x - info.details[i].x) <= 40) {
        // console.log(i);
        if (y - info.details[i].y > 40 && y - info.details[i].y < 100) {
          magnet = 1;
          var upx = info.details[i].x;


          var isdown = 0;
          for (var j = 0; j < info.details.length; j++) {
            if (info.details[i].x == info.details[j].x && info.details[i].y == info.details[j].y - CodeWidth && j!=clicknum)
              isdown = 1;
          }
          console.log(isdown, "isdown");
          if (isdown == 0) {
            var upy = info.details[i].y + CodeWidth;
            this.setData({
              [newx]: upx,
              [newy]: upy,
            });
          } else {
            this.setData({
              [newx]: upx + 200,
            })
          }


          // console.log("sdasfasas");
        }
      }
    }

    if (!magnet) {
      if (Math.abs(x - 285) <= 40 && Math.abs(y - 110) <= 40) {
        var isdown = 0;
        for (var i = 0; i < info.details.length; i++) {
          if (i != clicknum && info.details[i].x == 285 && info.details[i].y == 110)
            isdown = 1;
        }
        if (!isdown) {
          this.setData({
            [newx]: firstx,
            [newy]: firsty,
          });
        } else {
          this.setData({
            [newx]: firstx + 200,
            [newy]: firsty,
          })
        }
      }
    }

    //更新堆叠顺序，设为1
    var newZIndex = 'info.details[' + clicknum + '].zIndex';
    this.setData({
      [newZIndex]: 1
    });
    this.getqueue();
    this.setOpacity();
  },

  setOpacity:function(){
    let info=this.data.info;
    for (var i = 0; i < info.details.length; i++)
    { 
      info.details[i].Opacity=0.5;
      if (info.details[i].x<20)
        info.details[i].Opacity=0;
      else
      if (info.details[i].x<200)
        info.details[i].Opacity=1;
    }
    for (var i=0;i<queuenum.length;i++)
    {
      if (queuenum[i]==-1)
        break;
      info.details[queuenum[i]].Opacity=1;
    }
    this.setData({
      info:info
    });
  },

  getqueue: function(){
    let info=this.data.info
    for (var i = 0; i < info.details.length; i++)
    {
        queue[i] = 0;
        queuenum[i]=-1;
    }

      for (var i = 0; i < info.details.length; i++) {
        if (info.details[i].x == firstx) {
          if ((info.details[i].y - firsty) % 70 == 0 && info.details[i].x == firstx)
          {
            queue[(info.details[i].y - firsty) / 70] = info.details[i].type;
            queuenum[(info.details[i].y - firsty) / 70]=i; 
          }
        }
      }
      var b = 1;
      for (var i = 0; i < info.details.length; i++) {
        if (b == 0) {
          queue[i] = 0;
        }
        if (queue[i] == 0) {
          b = 0;
        }
      }
      console.log(queue);
      console.log(queuenum);
  },
  //点击开始运行后获取操作序列
  start: function () {
    beginManPosition[0]=this.data.man[0];
    beginManPosition[1]=this.data.man[1];
    console.log("test");
    console.log(this.data.man);
    console.log(beginManPosition[1]);
    if (this.data.buttonIsOrUsed == false) {
      this.setData({
        buttonIsOrUsed:true
      });
      this.getqueue();
      console.log(queue);
      this.queueToXYChange(queue);
    }
  },

  //queue序列里的操作，转成对应的x，y变化
  //1->上 2->下 3->左 4->右
  queueToXYChange: function (queue) {
    console.log(queue);
    let queueLength = queue.length;
    let queueValue = 0; //获取queue当前下标中的值
    for (let i = 0; i < queueLength; i++) {
      queueValue = queue[i];
      switch (queueValue) {
        case 1:
          this.YClickAdd("+1");
          break;
        case 2:
          this.YClickAdd("-1");
          break;
        case 3:
          this.XClickAdd("-1");
          break;
        case 4:
          this.XClickAdd("+1");
          break;
      }
    }
    console.log(this.data.expression);
    //开始按照expression中的顺序做移动
    this.totalMove();
  },

  //与后端对接的接口
  XClickAdd: function (event) {
    console.log("XClickAdd函数响应");
    // console.log("event内容:");
    // console.log(event);
    let expression = event;
    // console.log("expression:" + expression);
    expression = "x" + expression + ",";
    // console.log(expression);

    this.data.expression += expression;
    // console.log(this.data.expression);
  },

  YClickAdd: function (event) {
    console.log("YclickAdd函数响应");
    // console.log("event内容:");
    // console.log(event);
    let expression = event;
    // console.log("expression:" + expression);
    expression = "y" + expression + ",";
    // console.log(expression);

    this.data.expression += expression;
    // console.log(this.data.expression);
  },


  getX: function () {
    return this.data.x;
  },

  getY: function () {
    return this.data.y;
  },

  setX: function (x) {
    this.data.x = x;
  },

  setY: function (y) {
    this.data.y = y;
  },

  getExpression: function () {
    return this.data.expression;
  },

buttonValueChange:function()
{
  let value=this.data.buttonIsOrUsed;
  this.setData({
    buttonIsOrUsed:true
  })
},

//重置代码区和演示区
resetClick:function()
{
  man[0]=2;
  man[1]=1.5;
  this.updateManPos();
  this.setData({
    x:0,
    y:0,
    expression:"",
    buttonIsOrUsed:false
  });
  this.reset();
},

  //按照expression的顺序做移动
  totalMove: function () {
    console.log("test函数收到响应");
    let tempExpression = this.getExpression(); //表达式库
    let x = this.getX();
    let y = this.getY();

    while (tempExpression.length > 3) {
      let expression = "";
      let flag = true; //判断为x改变还是y改变
      let i = 0;
      for (i = 0; i < tempExpression.length; i++) {
        if (tempExpression[i] == "y")
          flag = false; //y改变
        if (tempExpression[i] == ",") //遇到,截断
          break;
        expression += tempExpression[i];
      }
      //删除表达式库中的字符
      tempExpression = tempExpression.slice(i + 1);
      console.log("expression" + expression);

      const tokens = testPosition.LexicalAnalysis(expression, x, y);
      const writer = new testPosition.AssemblyWriter();
      console.log("tokens:" + tokens);
      console.log("writer:" + writer);
      const parser = new testPosition.Parser(tokens, writer);
      const instructions = parser.getInstructions();
      console.log(instructions);
      const emulator = new testPosition.CpuEmulator(instructions);
      //获取结果
      let result = emulator.getResult();

      if (flag == true) //为x的结果
      {
        let lastX = this.getX();
        this.setX(result);
        let gap = this.getX() - lastX;
        console.log("gap:" + gap);
        if (gap < 0) {
          this.turnLeft();
        }
        if (gap > 0) {
          this.turnRight();
        }
      }
      if (flag == false) //为y的结果
      {
        let lastY = this.getY();
        this.setY(result);
        let gap = this.getY() - lastY;
        console.log("gap:" + gap);
        if (gap < 0) {
          this.turnDown();
        }
        if (gap > 0) {
          this.turnUp();
        }
      }
    }
    this.data.expression = tempExpression; //保持一致
  },

})