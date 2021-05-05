// pages/select/index.js
var intt;
const amoutnOfQuestion=10;
const test=10;
const nextTet=2323;
Page({

  /**
   * 页面的初始数据
   */
  data: {

    questionArray:{
      answer:1,
      text:" ",
      fileID:" ",
    },

    myImage:"../../images/1.jpg",

    view1: 'selection1', 
    view2: 'selection1', 
    view3: 'selection1', 
    view4: 'selection1', 
    // 正确答案为2，后台会给的 
    key: 2, 
    // 图片url的地址
    imageUrl:" ",
    // 选项是否被点击 
    isSelect: false,

    //时间
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
    timecount: '0分0秒',
    cost: 0,
    flag: 1,
    endtime: "",

    //与答案相关的数据

    currentOfQuestion:0,
    right:0,
    wrong:0,

    flag:false,
  },

  //选择组件相关函数
  view1Click: function(e) { 
    let select = e.target.id 
    // 选项没被选择时将执行 
    if (!this.data.isSelect) { 
     // 将选项设置为“已被选择” 
     this.setData({ 
      isSelect: true,
      view1: 'selection2'
     }) 
     if(select==this.data.key)
     {
       let right=this.data.right;
       this.setData({
         right:right+1,
         currentOfQuestion:this.data.currentOfQuestion+1
       })
     }else{
       let wrong=this.data.wrong;
       this.setData({
        wrong:wrong+1,
        currentOfQuestion:this.data.currentOfQuestion+1
       })
     }
     // 注意！此处必须是'=='而不是'=' 
    //  if (select == this.data.key) { 
    //   this.setData({ 
    //    view1: 'selection2'
    //   }) 
    //  } else { 
    //   this.setData({ 
    //    view1: 'selection3'
    //   }) 
    //   // 将正确选项显示出来 
    //   this.showAnswer(this.data.key) 
    //  } 
    
    } 
   }, 
   view2Click: function(e) { 
    let select = e.target.id;
    // 选项没被选择时将执行 
    if (!this.data.isSelect) { 
     this.setData({ 
      isSelect: true,
      view2:'selection2'
     }) 
     if(select==this.data.key)
     {
       let right=this.data.right;
       this.setData({
         right:right+1,
         currentOfQuestion:this.data.currentOfQuestion+1
       })
     }else{
       let wrong=this.data.wrong;
       this.setData({
        wrong:wrong+1,
        currentOfQuestion:this.data.currentOfQuestion+1
       })
     }
     setTimeout(this.jumpToNext,2000);
     // 注意！此处必须是'=='而不是'=' 
    //  if (select == this.data.key) { 
    //   this.setData({ 
    //    view2: 'selection2'
    //   }) 
    //  } else { 
    //   this.setData({ 
    //    view2: 'selection3'
    //   }) 
    //   // 将正确选项显示出来 
    //   this.showAnswer(this.data.key) 
    //  } 
    
    } 
   }, 
   view3Click: function(e) { 
    let select = e.target.id 
    // 选项没被选择时将执行 
    if (!this.data.isSelect) { 
     this.setData({ 
      isSelect: true,
      view3:'selection2'
     }) 
     if(select==this.data.key)
     {
       let right=this.data.right;
       this.setData({
         right:right+1,
         currentOfQuestion:this.data.currentOfQuestion+1
       })
     }else{
       let wrong=this.data.wrong;
       this.setData({
        wrong:wrong+1,
        currentOfQuestion:this.data.currentOfQuestion+1
       })
     }


     // 注意！此处必须是'=='而不是'=' 
    //  if (select == this.data.key) { 
    //   this.setData({ 
    //    view3: 'selection2'
    //   }) 
    //  } else { 
    //   this.setData({ 
    //    view3: 'selection3'
    //   }) 
    //   // 将正确选项显示出来 
    //   this.showAnswer(this.data.key) 
    //  } 
    
    } 
   }, 
   view4Click: function(e) { 
    let select = e.target.id 
    // 选项没被选择时将执行 
    if (!this.data.isSelect) { 
     this.setData({ 
      isSelect: true,
      view4:'selection2'
     }) 
     if(select==this.data.key)
     {
       let right=this.data.right;
       this.setData({
         right:right+1,
         currentOfQuestion:this.data.currentOfQuestion+1
       })
     }else{
       let wrong=this.data.wrong;
       this.setData({
        wrong:wrong+1,
        currentOfQuestion:this.data.currentOfQuestion+1
       })
     }
     // 注意！此处必须是'=='而不是'=' 
    } 
   }, 
   showAnswer: function(key) { 
    // 通过swith语句判断正确答案，从而显示正确选项 
    switch (key) { 
     case 1: 
      this.setData({ 
       view1: 'selection2'
      }) 
      break; 
     case 2: 
      this.setData({ 
       view2: 'selection2'
      }) 
      break; 
     case 3: 
      this.setData({ 
       view3: 'selection2'
      }) 
      break; 
     default: 
      this.setData({ 
       view4: 'selection2'
      }) 
    } 
   },

  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //与顶部时间相关的函数
  onLoad: function () {
    var that = this;
    //停止（暂停）
    //clearInterval(intt);
    //时间重置
    that.setData({
      minute: 0,
      second: 0,
      millisecond: 0,
    })
    intt = setInterval(function () { that.timer() }, 1000);
    console.log("question:"+this.data.currentOfQuestion);
    
    let tempNumber=this.data.currentOfQuestion+1;
    let number=tempNumber.toString();
    console.log(number);
    wx.cloud.callFunction({
      name:"getData",
      data:{
        number:number,
      }
    }).then(res=>{
      console.log(res);
      console.log(res.result.data[0].text);
      this.setData({
        questionArray:res.result.data[0],
        key:res.result.data[0].answer,
        flag:true,
      })
    })

  },
  //暂停
  stop: function () {
    clearInterval(intt);
  },
  //停止
  Reset: function () {
    var that = this
    clearInterval(intt);
    that.setData({
      minute: 0,
      second: 0,
      millisecond: 0,
      timecount: "0分0秒",
    })
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

  //当完成一道题时，跳转到下一页面
  jumpToNext:function()
  {
    this.setData({
      flag:false,
    })
  if(this.data.currentOfQuestion==3)
     {
       wx.cloud.callFunction({
         name:"addData",
         data:{
           time:this.data.timecount,
           right:this.data.right,
           wrong:this.data.wrong
         }
       })
       let currentOfQuestion=this.data.currentOfQuestion;
      wx.reLaunch({ url: '/pages/end/end?amount='+currentOfQuestion+"&total="+amoutnOfQuestion});
     }else{
      let tempNumber=this.data.currentOfQuestion+1;
      let number=tempNumber.toString();
      console.log(number);
      wx.cloud.callFunction({
        name:"getData",
        data:{
          number:number,
        }
      }).then(res=>{
        console.log(res);
       this.setData({
        //  currentOfQuestion:this.data.currentOfQuestion+1,
         questionArray:res.result.data[0],
         key:res.result.data[0].answer,
         isSelect:false,
         view1: 'selection1', 
         view2: 'selection1', 
         view3: 'selection1', 
         view4: 'selection1', 
         flag:true
       })
      })
    }
    console.log("jump!");
  }   
})