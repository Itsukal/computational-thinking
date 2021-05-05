//app.js
App({
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
    this.globalData = {}
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
				console.log('是否重写分享方法', data.isOverShare);
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
