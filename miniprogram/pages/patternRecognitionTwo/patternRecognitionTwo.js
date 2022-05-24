//跳转函数在submit函数中，注意到输出Wrong Answer即为错误，输出Accept即为正确
var intt;
var scrWid,scrHei;
var xx1=167.8,yy1=385.6;
var xx2=27.9,yy2=342.6;
var xx3=61.8,yy3=418.6;
var xx4=19.7,yy4=379.6;
var err=8;//err为误差值
var cc='';
var di1=0,di2=0,di3=0,di4=0;//方块旋转方向
var rnb=0;//最后一次点击的方块
var scrWid;//屏幕宽度
var leftV;//通过屏幕宽度计算所得左边位置

import {chessBoard} from '../../class/patternClass.js';
let tempBoardArray=[1,1,1,0,1,1,1,0,1,1];
let board=new chessBoard(tempBoardArray);
Page({
  data:{
    board:board,
    x1:167.8,y1:385.6,
    x2:27.9,y2:342.6,
    x3:61.8,y3:418.6,
    x4:19.7,y4:379.6,
    di1:0,
    di2:0,
    di3:0,
    di4:0,
    re:'',
    sub:'',
    rev:'cloud://itsuka-2g3ncu8f726d1e3e.6974-itsuka-2g3ncu8f726d1e3e-1305410037/pattern/patternTwo/rev.png',
    releft:0,
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
  onLoad(){
    //sthis.setData({re:'restart.png'});
    var that = this;
    //停止（暂停）
    //clearInterval(intt);
    //时间重置
    that.setData({
      minute: 0,
      second: 0,
      millisecond: 0,
      scrHei: scrHei
    });
    intt = setInterval(function () { that.timer() }, 1000);
    wx.getSystemInfo({
      success: function (res) {
        console.log('width=' + res.windowWidth);
        scrWid=res.windowWidth;
      }
    })
    this.ssetData();
    this.recoverPosition();
  },
  ssetData:function(){
    this.setData({releft:((scrWid-296.81)/2+25)});
    leftV=(scrWid-296.81)/2-15;
  },
  //检查答案函数
  check:function(){
    if(Math.abs(xx1-129.3)<=err&&Math.abs(yy1-75.8)<=err
    &&Math.abs(xx4-146.8)<=err&&Math.abs(yy4-123.4)<=err
    &&Math.abs(xx2-31.3)<=err&&Math.abs(yy2-140.1)<=err
    &&(!(xx3>=50&&xx3<=200&&yy3>=50.4&&yy3<=158.6))
    &&di1==270&&di2==90)
      return true;
    else return false;
  },

  areaEvent:function(event){
    if(this.check()){
      this.setData({t:'Accpet',cc:'rgb(0, 255, 34)'})
    }
    else{
      this.setData({t:'Wrong Answer',cc:'red'})
    }
  },

  blockMove1:function(e){
    console.log(e);
    rnb=1;
    xx1=e.detail.x;
    yy1=e.detail.y;
    console.log('xx1:'+xx1);
    console.log('yy1:'+yy1);
  },
  // blockMove2:function(e){
  //   rnb=2;
  //   xx2=e.detail.x;
  //   yy2=e.detail.y;
  //   console.log('xx2:'+xx2);
  //   console.log('yy2:'+yy2);
  // },
  // blockMove3:function(e){
  //   rnb=3;
  //   xx3=e.detail.x;
  //   yy3=e.detail.y;
  //   console.log('xx3:'+xx3);
  //   console.log('yy3:'+yy3);
  // },
  // blockMove4:function(e){
  //   rnb=4;
  //   xx4=e.detail.x;
  //   yy4=e.detail.y;
  //   console.log('xx4:'+xx4);
  //   console.log('yy4:'+yy4);
  // },
  recoverPosition:function(){
    this.setData({
      x1:leftV+167.8,y1:385.6,
      x2:leftV+27.9,y2:342.6,
      x3:leftV+61.8,y3:418.6,
      x4:leftV+19.7,y4:379.6,
    });
    xx1=leftV+167.8,yy1=385.6;
    xx2=leftV+27.9,yy2=342.6;
    xx3=leftV+61.8,yy3=418.6;
    xx4=leftV+19.7,yy4=379.6;
  },
  recover:function(){
    var that=this;
    setTimeout(function () {
      that.setData({re:'',sub:''});
     }, 100) //延迟时间 这里是1秒
  },
  reStart:function(){
    di1=0;di2=0;di3=0;di4=0;
    this.setData({di1:di1,di2:di2,di3:di3,di4:di4});
    this.setData({re:'cloud://itsuka-2g3ncu8f726d1e3e.6974-itsuka-2g3ncu8f726d1e3e-1305410037/pattern/patternTwo/restart.png'});
    this.recoverPosition();
  },
  submit:function(){
    let app=getApp();
    console.log("time:"+this.data.second);
    app.globalData.patternTimeSecond+=this.data.second;
    this.setData({sub:'cloud://itsuka-2g3ncu8f726d1e3e.6974-itsuka-2g3ncu8f726d1e3e-1305410037/pattern/patternTwo/submit.png'});
    if(this.check())
    { 
      console.log('Accept');
      let app=getApp();
      app.globalData.patternIsRight[1]=1;
      //下标
      let index=3;
      let tempRight=app.globalData.right[index];
      tempRight++;
      app.globalData.right[index]=tempRight;
    }
    else console.log('Wrong Answer');

    wx.reLaunch({
      url: '../programming/programming',
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  },
  rev:function(){
    this.setData({rev:'cloud://itsuka-2g3ncu8f726d1e3e.6974-itsuka-2g3ncu8f726d1e3e-1305410037/pattern/patternTwo/rev_down.png'});
    switch(rnb){
      case 1:di1=(di1+90)%360;break;
      case 2:di2=(di2+90)%180;break;
      case 3:di3=(di3+90)%360;break;
    }
    this.setData({di1:di1,di2:di2,di3:di3,di4:di4});
  },
  rev_recover:function(){
    var that=this;
    setTimeout(function () {
      that.setData({rev:'cloud://itsuka-2g3ncu8f726d1e3e.6974-itsuka-2g3ncu8f726d1e3e-1305410037/pattern/patternTwo/rev.png'});
     }, 200) //延迟时间 这里是1秒
  },
  onShareTimeline(res){
    console.log(res)
    return {
      title: '测试小程序分享至朋友圈',
      path: '../begin/begin',
      imageUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594374964481&di=3ceba827e91e126012c43de3887a58c7&imgtype=0&src=http%3A%2F%2Fdmimg.5054399.com%2Fallimg%2Fpkm%2Fpk%2F13.jpg'
    }
  },
  onShareAppMessage: function(ops) {
    return {
      title: "分享卡片",
      path: '../begin/begin',

      }
    },
    onShow: function () {
      if (wx.canIUse('hideHomeButton')) {
        wx.hideHomeButton();
      };
    },
  
})