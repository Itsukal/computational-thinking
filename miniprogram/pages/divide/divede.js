import Dialog from '/../../miniprogram_npm/@vant/weapp/dialog/dialog';
var intt;
var scrWid,scrHei;
var scopeHei;//操作区域高度
var pos=new Array();//二维数组代表盘子信息,pos[i][j]代表从左到右第i列及从上到下第j个，1代表小盘，2代表中盘，3代表大盘，同时pos[i][0]代表从左到右第i列以上是否有箭头，如果有，值为4
var posSpe=new Array();//字符串数组，将盘子信息由数字转化为字符串
var rn=0;//最后一次点击的柱子

Page({
  data: {
    scrHei:0,
    scrWid:0,
    scopeHei:0,
    topValue:0,//scope离顶端距离
    heightValue:0,//scope高度
    //以下为重新开始以及提交答案按钮的尺寸参数
    butTop:0,//按键距离顶部的高度
    reLf:0,subLf:0,//两个按钮各自距离左边的距离
    butWid:0,//按钮宽度
    butHei:0,//按钮高度
    //以下为选择区域以及提交答案按钮的尺寸参数
    selectTop:0,//距离顶部的高度
    s1Lf:0,s2Lf:0,s3Lf:0,//各自距离左边的距离
    select13Wid:0,//选择13宽度
    select2Wid:0,//选择2宽度
    selectHei:0,//高度
    //以下为盘子参数
    plateHei:0,
    plateWid:0,
    plateTop:[[0,0,0,0],[0,0,0,0],[0,0,0,0]],
    plateLf:[0,0,0,0],
    pos:new Array(),
    reButColor:0,
    subButColor:0,

    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
    timecount: '0分0秒',
    cost: 0,
    endtime: "",

  },

  timer: function () {
    var that = this;
    //console.log(that.data.millisecond)
    that.setData({
      second: that.data.second + 1
    })
    if (that.data.second >= 60) {
      that.setData({
        second: 0,
        minute: that.data.minute + 1
      })
    }
 
    that.setData({
      timecount: that.data.minute + "分" + that.data.second + "秒" 
    })
  },

  onLoad() {
    var that = this;
    //停止（暂停）
    //clearInterval(intt);
    //时间重置
    that.setData({
      minute: 0,
      second: 0,
      millisecond: 0,
      scrHei: scrHei
    })
    intt = setInterval(function () { that.timer() }, 1000);

    for(var i=1;i<=3;i++){
      pos[i]=new Array();
      posSpe[i]=new Array();
    }
    pos[1][1]=1;
    pos[1][2]=2;
    pos[1][3]=3;
    for(var i=1;i<=3;i++)pos[i][0]=0;
    for(var i=2;i<=3;i++){
      for(var j=1;j<=3;j++)
      pos[i][j]=0;
    }
    wx.getSystemInfo({
      success: function (res) {
        console.log('width=' + res.windowWidth);
        scrWid=res.windowWidth;
        console.log('height=' + res.windowHeight);
        scrHei=res.windowHeight;
      }
    })
    scopeHei=scrWid*3/5;
    this.setData({
      scrWid:scrWid,
      scrHei:scrHei,
      scopeHei:scopeHei,
      topValue:scrHei*0.05,
      heightValue:scrHei*0.95
    });
    //以下为设置各按钮的参数
    this.setData({
      butTop:(scrHei-scopeHei)/2+scopeHei*0.6,
      butWid:scrWid*0.17,
      butHei:scopeHei*0.25,
      reLf:scrWid*0.03,
      subLf:scrWid*0.3,

      selectTop:(scrHei-scopeHei)/2,
      selectHei:scopeHei*0.55,
      select13Wid:scrWid*0.25,
      select2Wid:scrWid*0.23,
      s1Lf:scrWid*0.13,
      s2Lf:scrWid*0.13+scrWid*0.25,
      s3Lf:scrWid*0.13+scrWid*0.25+scrWid*0.23,
    })
    this.refreshPlateTop();
    //以下设置盘子参数
    this.setData({
      plateHei:scopeHei*0.2,
      plateWid:scrWid*0.22,
      'plateLf[1]':scrWid*0.163,
      'plateLf[2]':scrWid*0.387,
      'plateLf[3]':scrWid*0.612,
    })
    this.refresh();
    Dialog.alert({
      title: '题目要求',
      message: '在同一个柱子中，较大的盘子只能放在较小的盘子下面。请你通过在三个柱子之间移动盘子，完成将最左边柱子中的三个盘子移动到最右边柱子上'
    }).then(() => {
      // on close
    });
  },
  refresh:function(){
    //刷新函数
    for(var i=1;i<=3;i++){
      for(var j=0;j<=3;j++){
        switch(pos[i][j]){
          case 0:posSpe[i][j]='';break;
          case 1:posSpe[i][j]='cloud://itsuka-2g3ncu8f726d1e3e.6974-itsuka-2g3ncu8f726d1e3e-1305410037/divide/divideOne/divideSmall.png';break;
          case 2:posSpe[i][j]='cloud://itsuka-2g3ncu8f726d1e3e.6974-itsuka-2g3ncu8f726d1e3e-1305410037/divide/divideOne/divideMid.png';break;
          case 3:posSpe[i][j]='cloud://itsuka-2g3ncu8f726d1e3e.6974-itsuka-2g3ncu8f726d1e3e-1305410037/divide/divideOne/divideBig.png';break;
          case 4:posSpe[i][j]='cloud://itsuka-2g3ncu8f726d1e3e.6974-itsuka-2g3ncu8f726d1e3e-1305410037/divide/divideOne/divdeArrow.png';break;
        }
      }
    }
    this.setData({posSpe:posSpe});
  },
  change:function(x,y){//x为前点击，y为后点击
    var rnx=0,rny=0,headx=1,heady=4;
    for(var i=1;i<=3;i++){
      if(pos[x][i]!=0){
        rnx=pos[x][i];
        headx=i;
        break;
      }
    }
    for(var i=1;i<=3;i++){
      if(pos[y][i]!=0){
        rny=pos[y][i];
        heady=i;
        break;
      }
    }
    if(rnx==0)return;
    //rnx=0,rny=0,headx=1,heady=4;
    if(rny==0&&rnx!=0){
      pos[x][headx]=0;
      pos[y][3]=rnx;
    }
    else if(rnx<rny){
      pos[x][headx]=0;
      posSpe[x][headx]='';
      this.setData({posSpe:posSpe});
      pos[y][heady-1]=rnx;
    }
    else if(rnx>rny){
      Dialog.alert({
        title: '操作错误！',
        message: '较大的盘子只能放在较小盘子的下方！'
      }).then(() => {
        // on close
      });
    }
    this.refresh();
  },
  check:function(x){//检查第x个柱子是否为空
    for(var i=1;i<=3;i++){
      if(pos[x][i]!=0)return i;
    }
    return 0;
  },
  select:function(x){
    var xtop=this.check(x);
    if(rn==0&&xtop==0)return;
    if(rn==0&&xtop){
      pos[x][0]=4;
      this.refresh();
      rn=x;
      var tmp=0.25;
      while(tmp>0.05){
        switch(x){
          case 1:
            switch(xtop){
              case 1:this.setData({'plateTop[1][1]':scopeHei*tmp});break;
              case 2:this.setData({'plateTop[1][2]':scopeHei*tmp});break;
              case 3:this.setData({'plateTop[1][3]':scopeHei*tmp});break;
            }
            break;
          case 2:
            switch(xtop){
              case 1:this.setData({'plateTop[2][1]':scopeHei*tmp});break;
              case 2:this.setData({'plateTop[2][2]':scopeHei*tmp});break;
              case 3:this.setData({'plateTop[2][3]':scopeHei*tmp});break;
            }
            break;
          case 3:
            switch(xtop){
              case 1:this.setData({'plateTop[3][1]':scopeHei*tmp});break;
              case 2:this.setData({'plateTop[3][2]':scopeHei*tmp});break;
              case 3:this.setData({'plateTop[3][3]':scopeHei*tmp});break;
            }
            break;
        }
        tmp=tmp-0.005;
      }
    }
    else{
      pos[rn][0]=0;
      this.change(rn,x);
      rn=0;
      var that=this;
      setTimeout(function () {
        that.refreshPlateTop();
       }, 100);
      this.refresh();
    }
  },
  select1:function(){this.select(1);},
  select2:function(){this.select(2);},
  select3:function(){this.select(3);},
  refreshPlateTop:function(){
    this.setData({
      plateHei:scopeHei*0.2,
      plateWid:scrWid*0.22,
      'plateLf[1]':scrWid*0.163,
      'plateLf[2]':scrWid*0.387,
      'plateLf[3]':scrWid*0.612,
      'plateTop[1][1]':scopeHei*0.25,
      'plateTop[2][1]':scopeHei*0.25,
      'plateTop[3][1]':scopeHei*0.25,
      'plateTop[1][2]':scopeHei*0.30,
      'plateTop[2][2]':scopeHei*0.30,
      'plateTop[3][2]':scopeHei*0.30,
      'plateTop[1][3]':scopeHei*0.35,
      'plateTop[2][3]':scopeHei*0.35,
      'plateTop[3][3]':scopeHei*0.35,
    })
  },
  restart:function(){
    this.setData({reButColor:0.3});
    this.refreshPlateTop();
    pos[1][1]=1;
    pos[1][2]=2;
    pos[1][3]=3;
    for(var i=1;i<=3;i++)pos[i][0]=0;
    for(var i=2;i<=3;i++){
      for(var j=1;j<=3;j++)
      pos[i][j]=0;
    }
    rn=0;
    this.refresh();
    var that=this;
    setTimeout(function () {
      that.setData({reButColor:0});
     }, 150);
  },
  submit:function(){
    this.setData({subButColor:0.3});
    let app=getApp();
    console.log("time:"+this.data.second);
    app.globalData.divideTimeSecond+=this.data.second;
    var ans=1;
    for(var i=1;i<=2;i++){
      for(var j=1;j<=3;j++){
        if(pos[i][j]!=0)ans=0;
      }
    }
    if(pos[3][1]!=1)ans=0;
    if(pos[3][2]!=2)ans=0;
    if(pos[3][3]!=3)ans=0;
    if(ans==1)
    {
      let app=getApp();
      let temp=0;
      // console.log(app.globaldata.right[temp]);
      app.globalData.divide
    }


    if(ans==0)console.log('Wrong Answer');
    else {
      console.log('Accept');
      //下标
      let index=1;
      let tempRight=app.globalData.right[index];
      tempRight++;
      app.globalData.right[index]=tempRight;
    };
    var that=this;
    setTimeout(function () {
      that.setData({subButColor:0});
     }, 150);
     wx.reLaunch({
      url: '../patternRecognition/patternRecognition',
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  },
  
  onShow: function () {
    if (wx.canIUse('hideHomeButton')) {
      wx.hideHomeButton();
    };
  },

  
})