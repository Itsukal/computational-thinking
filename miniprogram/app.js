//app.js
App({

	globalData:({
		timecount:" ",
		//用户的正确率与平均正确率
//0是算法能力，1是分治能力，2是抽象能力，3是模式识别能力
		 right:[0,0,0,0],
		 wrong:[0,0,0,0],
		 currentOfQuestion:13,		//选择题题目总数
		 questionAmount:[5,1,5,5],
		 divideIsRight:[0,0,0,0],
		 patternIsRight:[0,0,0,0,0],
		 abstractIsRight:[0,0,0,0,0],
		 algorithmIsRight:[0,0,0,0,0],
		 divideTimeMinute:0,
		 divideTimeSecond:0,
		 patternTimeMinute:0,
		 patternTimeSecond:0,
		 abstractTimeMinute:0,
		 abstractTimeSecond:0,
		 algorithmTimeMinute:0,
		 algorithmTimeSecond:0,
		 	
	}),


  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'itsuka-2g3ncu8f726d1e3e',
        traceUser: true,
      })
    }
    this.overShare();
    this.globalData = {
			right:[0,0,0,0],
		 wrong:[0,0,0,0],
		 currentOfQuestion:13,
		 questionAmount:[5,1,5,5],
		 divideTimeMinute:0,
		 divideTimeSecond:0,
		 patternTimeMinute:0,
		 patternTimeSecond:0,
		 abstractTimeMinute:0,
		 abstractTimeSecond:0,
		 algorithmTimeMinute:0,
		 algorithmTimeSecond:0,
		 divideIsRight:[0,0,0,0],
		 patternIsRight:[0,0,0,0,0],
		 abstractIsRight:[0,0,0,0,0],
		 algorithmIsRight:[0,0,0,0,0],
		}
  },

  overShare() {
		//监听路由切换
		//间接实现全局设置分享内容
		wx.onAppRoute(function(res) {
			//获取加载的页面
			let pages = getCurrentPages(),
				//获取当前页面的对象
				view = pages[pages.length - 1],
				data;
			if (view) {
				data = view.data;
				if (!data.isOverShare) {
					data.isOverShare = true;
					view.onShareAppMessage = function() {
						//你的分享配置
						return {
							title: '送你一份小惊喜，请查收！',
							path: './pages/begin/begin',
							imageUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594374964481&di=3ceba827e91e126012c43de3887a58c7&imgtype=0&src=http%3A%2F%2Fdmimg.5054399.com%2Fallimg%2Fpkm%2Fpk%2F13.jpg'
						};
					}
				}
			}
		})
	},
})
