/********************************************** */
var intt;
const amoutnOfQuestion=13;  //题目总数
//0是算法能力，1是分治能力，2是抽象能力，3是模式识别能力
let right=[0,0,0,0];  //正确率
let wrong=[0,0,0,0];  //错误率
let currentOfQuestion=0;   //当前题目下标
let selectId=0;    //选中选项的标号
var scrHei=0; //屏幕高度
/************************************************* */
Page({
data: {
  /*********************从数据库请求而来的题目对象****************************/
  questionArray:{
    answer:1,     //答案
    text:" ",     //文本
    fileID:" ",   //图片路径
    type:0,       //题目类型
  },
  /******************************************************************** */

  /****************四个选项的class **************************/
  view1: 'selection1', 
  view2: 'selection1', 
  view3: 'selection1', 
  view4: 'selection1', 
  /**************************** *****************************/
  text:"自幼年便远渡重洋为国卧底的川建国同志卧薪尝胆多年才终于拿到了M国最高权力",
  key: 2,   // 正确答案
  imageUrl:" ", // 图片url的地址
  isSelect: false,   // 选项是否被点击 

  /**************************时间******************************/
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0,
  timecount: '0分0秒',
  cost: 0,
  endtime: "",
  /***************************************************************/
  index:1,
  flag:false,       //表示当前页面未渲染完毕，不可加载
  //屏幕高度
  scrHei:0,
},

//选择组件相关函数
view1Click: function(e) { 
  selectId = parseInt(e.target.id); 
  console.log("selectId:"+selectId);
   switch(selectId)
  { 
    case 1: //选择选项A
      this.setData({ 
        view1: 'selection2',
        view2: 'selection1',
        view3: 'selection1',
        view4: 'selection1'
       }) 
       console.log("test"+this.data.view1);
       break;
    case 2: //选择选项B
      this.setData({ 
        view1: 'selection1',
        view2: 'selection2',
        view3: 'selection1',
        view4: 'selection1'
       }) 
       break;
    case 3: //选择选项C
      this.setData({ 
        view1: 'selection1',
        view2: 'selection1',
        view3: 'selection2',
        view4: 'selection1'
       }) 
       break;
    case 4: //选择选项D
      this.setData({ 
        view1: 'selection1',
        view2: 'selection1',
        view3: 'selection1',
        view4: 'selection2'
       }) 
       break;
    }
}, 
submit:function()
{
  //如果选择等于正确答案
  console.log("selectId"+selectId)
  console.log("right:"+right);
     if(selectId==this.data.key)  //答案正确
     {
       //获取当前题型类型
      let type=this.data.questionArray.type;
      let app=getApp();
      switch(type)
      {
        case 0: //题目为算法题型
          right[type]+=1;
          let tempIndex=currentOfQuestion-5;
          app.globalData.algorithmIsRight[tempIndex]=1;
          console.log(right);
          break;
        case 1: //题型为分治题型
          right[type]+=1;
          console.log(right[type]);
          break;
        case 2: //题型为抽象题型
          right[type]+=1;
          let temp=currentOfQuestion;
          app.globalData.abstractIsRight[temp]=1;
          break;
        case 3: //题型为模式识别题型
          right[type]+=1;
          let index=currentOfQuestion-10+2;
          app.globalData.abstractIsRight[index]=1;
          break;
      }
      currentOfQuestion+=1; //当前题目+1
      console.log("selectId"+selectId)
     }
     //答案错误
     else{
       //获取当前题型类型
      let type=this.data.questionArray.type;
      switch(type)
      {
        case 0: //题型为算法
          wrong[type]+=1;
          break;
        case 1: //题型为分治
          wrong[type]+=1;
          break;
        case 2: //题型为抽象
          wrong[type]+=1;
        case 3: //题型为模式识别
          wrong[type]+=1;
      }
      currentOfQuestion+=1; //当前题目数+1
     }
     console.log("selectId"+selectId)
     console.log("right:"+right);
     setTimeout(this.jumpToNext,200); //下一题
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
    wx.getSystemInfo({
      success: function (res) {
        scrHei=res.windowHeight;
      }
    })
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
    // console.log("question:"+this.data.currentOfQuestion);
    
    let tempNumber=currentOfQuestion+1; //获取当前是第几题
    let number=tempNumber.toString(); //由于数据库里的题号类型为string，因此number转成string
    // console.log(number);
    //调用云函数
    wx.cloud.callFunction({
      name:"getData",
      data:{
        number:number,
      }
    }).then(res=>{
      console.log(res);
      console.log(res.result.data[0]);
      this.setData({
        questionArray:res.result.data[0], //请求到当前题号对应的题目对象
        key:res.result.data[0].answer,    //设置当前题号对应的答案
        flag:true,                        //表示当前页面渲染完毕，可以加载
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
    //隐藏左上角的home键
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
      flag:false,     //跳向下一题，说明未选择，置为false
    })
    if(currentOfQuestion==5)
    {
      let app=getApp();
      let tempSecond=this.data.minute*60+this.data.second;
      app.globalData.abstractTimeSecond+=tempSecond;
    }
    if(currentOfQuestion==10)
    {
      let app=getApp();
      let tempSecond=this.data.minute*60+this.data.second-app.globalData.abstractTimeSecond;
      app.globalData.algorithmTimeSecond+=tempSecond;
    }
    if(currentOfQuestion==13)
    {
      let app=getApp();
      let tempSecond=this.data.minute*60+this.data.second-app.globalData.abstractTimeSecond-app.globalData.algorithmTimeSecond;
      console.log(this.data.minute*60);
      console.log(this.data.minute);
      console.log(this.data.second);
      console.log(app.globalData.abstractTimeSecond);
      console.log(app.globalData.algorithmTimeSecond);
      console.log("pattern: Second"+tempSecond);
      let test=parseInt(tempSecond/60);
      console.log(test);
      app.globalData.patternTimeSecond+=tempSecond;
    }
    let app=getApp();
    console.log("pattern"+app.globalData.patternTimeSecond);
    console.log("algorithm"+app.globalData.algorithmTimeSecond);
    console.log("abstract"+app.globalData.abstractTimeSecond);
  if(currentOfQuestion==amoutnOfQuestion) //如果当前题号等于题目总数，说明选择题回答完毕
     {
       //调用云函数
       wx.cloud.callFunction({
         name:"addData",
         data:{
           time:this.data.timecount,  //传答题消耗的时间
         }
       })
       //传到app.js
       let app=getApp();
       for(let index=0;index<4;index++) //全局的正确数和错误数   加上选择题页面对应的正确数和错误数
       {
         app.globalData.right[index]+=right[index];
         console.log(app.globalData.right[index]);
         app.globalData.wrong[index]+=wrong[index];
       }
       console.log(app.globalData.right);
       console.log(app.globalData.wrong);

      //  console.log(app.globalData.right);
      //跳转到下一页面
      wx.reLaunch({ url: '/pages/end/end?amount='+currentOfQuestion+"&total="+amoutnOfQuestion});

     }else  //否则
     {
      let tempNumber=currentOfQuestion+1; //获取当前题号
      let number=tempNumber.toString();   
      console.log(number);
      //调用云函数
      wx.cloud.callFunction({
        name:"getData",
        data:{
          number:number,  //传下一题的题号
        }
      }).then(res=>{
        console.log(res);
       this.setData({
        //  currentOfQuestion:this.data.currentOfQuestion+1,
         questionArray:res.result.data[0],  //获得下一题题号对应得题目对象
         key:res.result.data[0].answer,     //设置下一题题号对应得答案
         isSelect:false,                  //置为未选择状态
         view1: 'selection1',             
         view2: 'selection1', 
         view3: 'selection1', 
         view4: 'selection1', 
         index:this.data.index+1,
         flag:true                      //表示当前页面已渲染完毕，可以加载
       })
      })
    }
    console.log("jump!");
  } ,

  test:function()
  {
    console.log("nmsl");
  }
})