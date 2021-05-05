// pages/report1/report1.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
var a=0;
Page({
  getPhoneNumber (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },
  /**
   * 页面的初始数据
   */
  toReport2:function(){
    if(a==0){
      a=1;
      console.log(a);
      Dialog.alert({
        context:this,
        message: '家长您好！为了记录孩子的信息以便日后分析，请您填写手机号！',
        confirmButtonOpenType: 'getPhoneNumber',
      }).then(() => {
        // on close
        
      })
    }
    else{
      wx.redirectTo({
        url: '/pages/judge/index',
      })
    }
  },

  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (wx.canIUse('hideHomeButton')) {
      wx.hideHomeButton();
    };
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
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
    }

})
