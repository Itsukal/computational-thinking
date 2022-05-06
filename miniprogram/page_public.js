// Page扩展函数

const pageExtend=Page=>{
  //pageExtend是等于一个传入Page对象的函数

  return object=>{
     // 导出原生Page传入的object参数中的生命周期函数
    // 由于命名冲突，所以将onLoad生命周期函数命名成了onLoaded

    const {onShowed}=object;

    //公共的onLoad生命周期函数
    object.onLoad=function(options){
      //在onLoad执行的代码
      console.log("执行onShow");
      if (wx.canIUse('hideHomeButton')) {
        wx.hideHomeButton();
      };

      // 执行非公共部分的onLoaded生命周期函数
      if(typeof onShowed==='function')
      {
        onShowed.call(this,options);
      }
    }

    object.onShareAppMessage=()=>{
      return {
        title: '公共分享标题'
      }
    }

    return Page(object);
  }
}

//获取原生Page
const originalPage=Page;
// 定义一个新的Page，将原生Page传入Page扩展函数
Page = pageExtend(originalPage);