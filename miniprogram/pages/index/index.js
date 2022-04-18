// pages/index/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ownerPlace: {
      x: 0,
      y: 0,
      direction: 0,
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
  onShareAppMessage: function () {

  },

  //各种操作
  //转向
  turnDirection(event) {
    let direction = parseInt(event.currentTarget.dataset.direction); //获取要转向的方向
    console.log(direction);
    let tempOwnerPlace = this.data.ownerPlace; //获取当前位置
    tempOwnerPlace.direction = direction;
    this.setData({
      ownerPlace: tempOwnerPlace,
    })
    console.log(this.data.ownerPlace.direction);
  },


  //行走
  walk: function (event) {
    console.log(event);
    let tempOwnerPlace = this.data.ownerPlace; //获取当前位置
    let walkNums = event.currentTarget.dataset.walk_nums; //走的步数
    let direction = tempOwnerPlace.direction; //往哪走
    console.log(direction);
    //选择方向，更改位置
    switch (direction) {
      //往上走
      case 0:
        for (let i = 0; i < walkNums; i++) {
          tempOwnerPlace.y++;
        }
        break;
        //往下走
      case 1:
        for (let i = 0; i < walkNums; i++) {
          tempOwnerPlace.y--;
        }
        break;
        //往左走
      case 2:
        for (let i = 0; i < walkNums; i++) {
          tempOwnerPlace.x--;
        }
        break;
        //往右走
      case 3:
        for (let i = 0; i < walkNums; i++) {
          tempOwnerPlace.x++;
        }
        break;
    }
    console.log(this.data.ownerPlace);
    this.setData({
      ownerPlace: tempOwnerPlace,
    })
  }
})