//ps
//!!!!需要点击左边的按钮才能生成一个新的代码块
//增加了背景颜色便于区分，如果要去掉，请转到css文件的MoveCode，把background-color注释掉
//屏幕宽: 750rpx
//第一块的位置x=285 y=110
//每块的高度为80rpx 宽度为160rpx(含空部分)
//每个代码块之前高度差为70rpx
//规定 1->上 2->下 3->左 4->右
var firstx=285;
var firsty=110;
var CodeWidth=70;
//pixelRatio1是用于px和rpx相互转化 px*pixelRatio1=rpx
var pixelRatio1 = 750 / wx.getSystemInfoSync().windowWidth; 
//生成新的代码块的函数
function Detail(id, x,y, type, name) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.type=type;
  this.name=name;
}
function Info() {
  this.details = [];
}

//queue为最后监测代码块编号的数组，第i个表示开始下方第i个为Codei
//例：queue=[0,4,3,2,1]表示 上，右，左，下
var queue = new Array();
//当前点击代码块
var clicknum;
//获取初始点
var startPoint;
//ps


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


Page({
  data: {
    info: {},
    isShow: "block", //代表TopTip模块的display属性值，用于控制顶部提示文案是否展示
    missionPathPass: [], //代表地图中路径方块的坐标，用于设立样式
    missionPathBan: [], //代表地图中非通行方块的坐标，用于设立样式

    //ps
    //数值初始化
    //x、y记录位置

    objectArray: [
     {
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

  init: function () {
    let that = this;
    this.setData({
      info: new Info(),
    });
  },
  // 事件处理函数
  onLoad() {
    this.init();
    //初始化地图，每个路径方块的长宽都是80rpx，所以坐标要乘以80
    //先铺设通行的方块
    console.log("pppp"+pixelRatio1);
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
  //用于展示顶部Tip的函数
  showTip: function () {
    this.setData({
      isShow: "block"
    });
    //console.log(this.data.isShow);
  },
  //用于隐藏顶部Tip的函数
  hideTip: function () {
    this.setData({
      isShow: "none"
    });
    //console.log(this.data.isShow);
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
      man = tmp;
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



//ps
//点击代码块的监听函数
buttonStart: function (e) {
  startPoint = e.touches[0];//获取拖动
  //console.log(e);
  var tmp=e.currentTarget.id;

  for (var i=0;i<=this.data.info.details.length;i++)
  {
    var tmp_id="MoveCode"+String(i)
    if (tmp_id==tmp)
    clicknum=i;
  }
},

//移动代码块的函数
buttonMove: function(e){ 
  var endPoint = e.touches[e.touches.length - 1]//获取拖动结束点
  //计算在X轴上拖动的距离和在Y轴上拖动的距离
  var translateX = endPoint.clientX - startPoint.clientX
  var translateY = endPoint.clientY - startPoint.clientY
  translateX = translateX * pixelRatio1;
  translateY = translateY * pixelRatio1;
  startPoint = endPoint//重置开始位置
  
  var y = this.data.info.details[clicknum].y + translateY;
  var x = this.data.info.details[clicknum].x + translateX;
  // info.details[clicknum].x=x;
  // info.details[clicknum].y=y;
  var newx='info.details['+clicknum+'].x';
  var newy='info.details['+clicknum+'].y';
  //修改代码块位置
  this.setData({
    [newx]:x,
    [newy]:y,
  })
},

//松开鼠标后判定吸附函数
buttonEnd: function (e) {
  let info=this.data.info;
  var newx='info.details['+clicknum+'].x';
  var newy='info.details['+clicknum+'].y';
  var x=info.details[clicknum].x;
  var y=info.details[clicknum].y;
  var magnet=0;
  console.log(info.details);
  // console.log(clicknum);
  // console.log(info.details.length);
  for (var i=0;i<info.details.length;i++)
  {
    // console.log("aaaaaaaaaaaaaaaaaa");
    if(i!=clicknum && Math.abs(x-info.details[i].x)<=40)
    {
      // console.log(i);
      if (y-info.details[i].y>40 && y-info.details[i].y<100)
      {
        magnet=1;
        var upx=info.details[i].x;


        var isdown=0;
          for (var j=0;j<info.details.length;j++)
          {
            if (info.details[i].x== info.details[j].x && info.details[i].y==info.details[j].y-CodeWidth)
            isdown=1;
          }
          console.log(isdown,"isdown");
          if (isdown==0)
          {
            var upy=info.details[i].y+CodeWidth;
            this.setData({
              [newx]:upx,
              [newy]:upy,
            });
          }
          else
          {
            this .setData({
              [newx]:upx+200,
            })
          }


        // console.log("sdasfasas");
      }
    }
  }

  if (!magnet)
  {
    if (Math.abs(x-285)<=40 && Math.abs(y-110)<=40)
    {
      var isdown=0;
      for (var i=0;i<info.details.length;i++)
      {
        if (i!=clicknum && info.details[i].x==285 && info.details[i].y==110)
        isdown=1;
      }
      if (!isdown)
      {
      this.setData({
        [newx]:firstx,
        [newy]:firsty,
      });}
      else{
        this.setData({
          [newx]:firstx+200,
          [newy]:firsty,
        })
      }
    }
  }
},


//复制函数(点击复制，还不能做到拖动复制)
CopyEvent:function(e)
{
  console.log(e);
  var type=e.currentTarget.id;
  console.log(type);
  var num=0;
  for (var i=1;i<=4;i++)
    if ("Code"+i==type)
    num=i;
  console.log(num);

    let info = this.data.info;
    var len=info.details.length;
    console.log(len);
    var name;
    var y;
    switch(num)
    {
      case 1:
        name="上";
        y=400;
        break;
      case 2:
        name="下";
        y=280;
        break;
      case 3:
        name="左";
        y=160;
        break;
      case 4:
        name="右";
        y=40;
        break;
      }
    info.details.push(new Detail(len,27,y,num,name));
    this.setData({
      info: info
    });
    console.log(this.data.info);
},

start:function()
{
  var info=this.data.info;
  for (var i=0;i<info.details.length;i++)
  queue[i]=0;

  for (var i=0;i<info.details.length;i++)
  {
    if (info.details[i].x==firstx)
    {
      if ((info.details[i].y-firsty)%70==0 && info.details[i].x==firstx)
      queue[(info.details[i].y-firsty)/70]=info.details[i].type;
    }
  }
  console.log(queue);
}

//ps
})



