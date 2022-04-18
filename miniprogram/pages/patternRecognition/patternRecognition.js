//跳转函数在submit函数中，注意到输出Wrong Answer即为错误，输出Accept即为正确
var intt;
var scrWid,scrHei;
var xx1=21.9,yy1=274.8;
var xx2=175.9,yy2=274.8;
var xx3=217,yy3=397.8;
var xx4=24.9,yy4=349.8;
var err=8,dis=45.6;//err为误差值,dis为一个方块长宽值
var cc='';
var di1=0,di2=0,di3=0,di4=0;//方块旋转方向
var rnb=0;//最后一次点击的方块
var scrWid;//屏幕宽度
var leftV;//通过屏幕宽度计算所得左边位置
Page({
  data:{
    x1:21.9,y1:274.8,
    x2:175.9,y2:274.8,
    x3:217,y3:397.8,
    x4:24.9,y4:349.8,
    di1:0,
    di2:0,
    di3:0,
    di4:0,
    re:'',
    sub:'',
    releft:0,

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
  onLoad(){
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
    this.setData({releft:((scrWid-296.81)/2+7)});
    leftV=(scrWid-296.81)/2-15;
  },
  //检查答案函数
  check:function(){
    if((yy1>=251.3-err||yy1<=11.2+err)&&Math.abs(xx3-leftV-50)<=err&&Math.abs(yy3-96.3)<=err&&Math.abs(xx2-xx3)<=err&&Math.abs(yy2-yy3)<=err&&Math.abs(xx4-xx3)<=err+dis&&Math.abs(yy4-yy3)<=err)
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
    rnb=1;
    xx1=e.detail.x;
    yy1=e.detail.y;
    console.log('xx1:'+xx1);
    console.log('yy1:'+yy1);
  },
  blockMove2:function(e){
    rnb=2;
    xx2=e.detail.x;
    yy2=e.detail.y;
    console.log('xx2:'+xx2);
    console.log('yy2:'+yy2);
  },
  blockMove3:function(e){
    rnb=3;
    xx3=e.detail.x;
    yy3=e.detail.y;
    console.log('xx3:'+xx3);
    console.log('yy3:'+yy3);
  },
  blockMove4:function(e){
    rnb=4;
    xx4=e.detail.x;
    yy4=e.detail.y;
    console.log('xx4:'+xx4);
    console.log('yy4:'+yy4);
  },
  recoverPosition:function(){
    this.setData({
      x1:leftV+21.9,y1:274.8,
      x2:leftV+175.9,y2:274.8,
      x3:leftV+217,y3:397.8,
      x4:leftV+24.9,y4:349.8
    });
    xx1=leftV+21.9;yy1=274.8;
    xx2=leftV+175.9;yy2=274.8;
    xx3=leftV+217;yy3=397.8;
    xx4=leftV+24.9;yy4=349.8;
  },
  recover:function(){
    var that=this;
    setTimeout(function () {
      that.setData({re:'',sub:''});
     }, 100) //延迟时间 这里是1秒
  },
  reStart:function(){
    this.setData({re:'https://6974-itsuka-2g3ncu8f726d1e3e-1305410037.tcb.qcloud.la/patternRestart.png?sign=484db5dddcb86e8867a8f30ee6cdeec0&t=1620537582'});
    this.recoverPosition();
  },
  submit:function(){
    this.setData({sub:'https://6974-itsuka-2g3ncu8f726d1e3e-1305410037.tcb.qcloud.la/patternSubmit%20.png?sign=15c059eef746652c80d81a9e65a676a4&t=1620537595'});
    let app=getApp();
    console.log("time:"+this.data.second);
    app.globalData.patternTimeSecond+=this.data.second;
    if(this.check())
    {
      console.log('Accept');
      //模式识别对应正确+1
      let app=getApp();
      app.globalData.patternIsRight[0]=1;
      //下标
      let index=3;
      let tempRight=app.globalData.right[index];
      tempRight++;
      app.globalData.right[index]=tempRight;
    }
    else {
      console.log('Wrong Answer');
      //模式识别对应错误+1
      let app=getApp();
      let tempWrong=app.globalData.wrong[3];
      tempWrong++;
      app.globalData.wrong[3]+=tempWrong;
    }
    wx.reLaunch({
      url: '../patternRecognitionTwo/patternRecognitionTwo',
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  },

   /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (wx.canIUse('hideHomeButton')) {
      wx.hideHomeButton();
    };
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
