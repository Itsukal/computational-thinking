//引入 echarts.js
import * as echarts from '../../echarts-for-weixin-master/ec-canvas/echarts'
let chart = null
let bo ="true"
const res = wx.getSystemInfoSync()
var x = 7;
var tmp=90;
var baifenbi='85%';
var status = true;


// var a=255;
// var cola='red';
// pages/index/index.js
Page({
  /**
   * 页面的初始数据
   */  
  toastShow: function(event) {
    status = false
    this.setData({status:status})　　　　//setData方法可以建立新的data属性，从而起到跟视图实时同步的效果
  },
  toastHide:function(event){
      status =true
      this.setData({status:status})
  },
  data: {
    status:status,
    f1:hsvtorgb(118,tmp,100),
    f2:hsvtorgb(118,tmp,90),
    f3:hsvtorgb(118,tmp,80),
    f4:hsvtorgb(118,tmp,70),
    f5:hsvtorgb(118,tmp,60),

    f6:hsvtorgb(118,tmp,50),
    f7:hsvtorgb(118,tmp,55),
    f8:hsvtorgb(118,tmp,60),
    f9:hsvtorgb(118,tmp,65),
    f10:hsvtorgb(118,tmp,70),    
    
    f11:hsvtorgb(118,tmp,75),
    f12:hsvtorgb(118,tmp,80),
    f13:hsvtorgb(118,tmp,85),
    f14:hsvtorgb(118,tmp,90),
    f15:hsvtorgb(118,tmp,95),


    c1:hsvtorgb(60,tmp,100),
    c2:hsvtorgb(60,tmp,90),
    c3:hsvtorgb(60,tmp,80),
    c4:hsvtorgb(60,tmp,70),
    c5:hsvtorgb(60,tmp,60),

    c6:hsvtorgb(60,tmp,50),
    c7:hsvtorgb(60,tmp,40),
    c8:hsvtorgb(60,tmp,30),
    c9:hsvtorgb(60,tmp,20),
    c10:hsvtorgb(60,tmp,55),    
    
    c11:hsvtorgb(60,tmp,100),
    c12:hsvtorgb(60,tmp,80),
    c13:hsvtorgb(60,tmp,60),
    c14:hsvtorgb(60,tmp,40),
    c15:hsvtorgb(60,tmp,20),


    m1:hsvtorgb(205,tmp,100),
    m2:hsvtorgb(205,tmp,90),
    m3:hsvtorgb(205,tmp,80),
    m4:hsvtorgb(205,tmp,70),
    m5:hsvtorgb(205,tmp,60),

    m6:hsvtorgb(205,tmp,50),
    m7:hsvtorgb(205,tmp,40),
    m8:hsvtorgb(205,tmp,30),
    m9:hsvtorgb(205,tmp,20),
    m10:hsvtorgb(205,tmp,55),    
    
    m11:hsvtorgb(205,tmp,100),
    m12:hsvtorgb(205,tmp,80),
    m13:hsvtorgb(205,tmp,60),
    m14:hsvtorgb(205,tmp,40),
    m15:hsvtorgb(205,tmp,20),


    s1:hsvtorgb(343,tmp,100),
    s2:hsvtorgb(343,tmp,90),
    s3:hsvtorgb(343,tmp,80),
    s4:hsvtorgb(343,tmp,70),
    s5:hsvtorgb(343,tmp,60),

    s6:hsvtorgb(343,tmp,50),
    s7:hsvtorgb(343,tmp,40),
    s8:hsvtorgb(343,tmp,30),
    s9:hsvtorgb(343,tmp,20),
    s10:hsvtorgb(343,tmp,55),    
    
    s11:hsvtorgb(343,tmp,100),
    s12:hsvtorgb(343,tmp,80),
    s13:hsvtorgb(343,tmp,60),
    s14:hsvtorgb(343,tmp,40),
    s15:hsvtorgb(343,tmp,20),

    t:'相对于同龄人，您的孩子\n在算法能力，分治能力表现突出\n在XXX略显薄弱',
    t1:'平均时间：\nx分xx秒',
    ec1: {
      onInit: initChart,
    },


    // ec2: {
    //   onInit: initChart2,
    // },
    // ec3: {
    //   onInit: initChart3,
    // },
  },


  onLoad: function (options) {
   
      if (wx.canIUse('hideHomeButton')) {
        wx.hideHomeButton();
    }
  }
  

})

function initChart(canvas , width, height, dpr){
  chart = echarts.init(canvas, null , {
    width:width,
    height:height,
    devicePoxlRatio: dpr
  })
  canvas.setChart(chart)
  let option = getOption() //这里是echarts 的配置信息

  chart.setOption(option)

  return chart
}


try {
  const res = wx.getSystemInfoSync()
  if (res.model=="iPad") 
  {
    baifenbi = '95%';
  }
  if (res.model=="iPad Pro 10.5-inch") 
  {
    baifenbi = '95%';
  }
  if (res.model=="iPad Pro 12.9-inch") 
  {
    baifenbi = '95%';
  }
  console.log(res.model);
  console.log(baifenbi);
  console.log(cola);
} catch (e) {
  // Do something when catch error
}
function getOption()
{
  return{
    // grid: {show:'true',borderWidth:'0'},
    // calculable : true,
    // title: {
    //     text: '基础雷达图'
    // },
    tooltip: {},
    legend: {
        // show: true,
        // yAxis:{
        //   splitLine:{
        //     show:false
        //   }
        // },
        top:'0%',
        data: [
          {
            name:'平均值',
            textStyle:{
              // fontSize: "22",
            }
           },
           {
            name: '您的孩子',
            // color:'#50D586',
            textStyle:{
              // fontSize: '22',
            }
           },

          ]
    },
    radar: {
      center: ['50%','55%'],
      radius: 115,
        // shape: 'circle',
        // name: {
        //     textStyle: {
        //         color: '#000',
        //         backgroundColor: '#fff',
        //         borderRadius: 0,
        //         padding: [3, 5]
        //     }
        // },
        splitNumber: 0,
        shape: 'polygon',
        axisLine: { // (圆内的几条直线)坐标轴轴线相关设置
          lineStyle: {
              width: 0,
          },
        //   splitLine: { // (这里是指所有圆环)坐标轴在 grid 区域中的分隔线。
        //     lineStyle: {
        //         color: '#000',
        //         // 分隔线颜色
        //         width: 2,
        //         // 分隔线线宽
        //     }
        // },

      },
      
        indicator: [
            { name: '分治能力', max: 6500},
            { name: '算法能力', max: 16000},
            { name: '模式识别能力', max: 30000},
            { name: '抽象识别', max: 38000},
            
        ]
    },

    series: [{
        name: '预算 vs 开销',
        type: 'radar',
        // areaStyle: {normal: {}},
        data: [
          
            {
                value: [4300, 10000, 28000, 35000],
                name: '平均值',
              areaStyle: { // 单项区域填充样式
                  normal: {
                      // color: 'rgba(255,0,0,0.6)' // 填充的颜色。[ default: "#000" ]
                  }
              }
              //   itemStyle: { // 单个拐点标志的样式设置。
              //     normal: {
              //         borderColor: 'rgba(255,0,0,1)',
              //         // 拐点的描边颜色。[ default: '#000' ]
              //         borderWidth: 3,
              //         // 拐点的描边宽度，默认不描边。[ default: 0 ]
              //     }
              // },
              // lineStyle: { // 单项线条样式。
              //     normal: {
              //         opacity: 1 // 图形透明度
              //     }
              // },
            },
            {
                value: [5000, 14000, 28000, 31000],
                name: '您的孩子',

              areaStyle: { // 单项区域填充样式
                  normal: {
                      // color: 'rgba(255,200,20,0.6)' // 填充的颜色。[ default: "#000" ]
                  }
              }
              //   itemStyle: { // 单个拐点标志的样式设置。
              //     normal: {
              //         borderColor: 'rgba(255,0,0,1)',
              //         // 拐点的描边颜色。[ default: '#000' ]
              //         borderWidth: 3,
              //         // 拐点的描边宽度，默认不描边。[ default: 0 ]
              //     }
              // },
              // lineStyle: { // 单项线条样式。
              //     normal: {
              //         opacity: 0.5 // 图形透明度
              //     }
              // },
            }
        ]
    }]
}
}



//输入的h范围为[0,360],s,l为百分比形式的数值,范围是[0,100] 
//输出r,g,b范围为[0,255],可根据需求做相应调整
function hsvtorgb(h,s,v){
	var s=s/100;
	var v=v/100;
	var h1=Math.floor(h/60) % 6;
	var f=h/60-h1;
	var p=v*(1-s);
	var q=v*(1-f*s);
	var t=v*(1-(1-f)*s);
	var r,g,b;
	switch(h1){
		case 0:
			r=v;
			g=t;
			b=p;
			break;
		case 1:
			r=q;
			g=v;
			b=p;
			break;
		case 2:
			r=p;
			g=v;
			b=t;
			break;
		case 3:
			r=p;
			g=q;
			b=v;
			break;
		case 4:
			r=t;
			g=p;
			b=v;
			break;
		case 5:
			r=v;
			g=p;
			b=q;
			break;
	}
	return [Math.round(r*255),Math.round(g*255),Math.round(b*255)];
}




// function initChart2(canvas , width, height, dpr){
//   chart = echarts.init(canvas, null , {
//     width:width,
//     height:height,
//     devicePoxlRatio: dpr,
//   })
//   canvas.setChart(chart)

//   let option = getOption2() //这里是echarts 的配置信息

//   chart.setOption(option)

//   return chart
// }

// function getOption2()
// {
//   return {
//     title: {
//       text: '各类型题目做题平均时间',
//       left: 'center',
//       top: '5%',
//   },

//     legend: {
//       top: baifenbi,
//     },
//     tooltip: {},
//     dataset: {
//         source: [
//             ['product', '个人', '平均'],
//             ['分治能力', x, x],
//             ['算法能力', x, x],
//             ['抽象能力', x, x],
//             ['模式识别', x, x+50]
//         ]
//     },
//     xAxis: {type: 'category'},
//     yAxis: {type: 'value',
//             min :0,
//             max :100,
//             name : '时间',  
//             nameTextStyle:{
//               padding : [0,0,0,0] // up right down left
//             }
//   },
//     // Declare several bar series, each will be mapped
//     // to a column of dataset.source by default.
//     series: [
//         {type: 'bar'},
//         {type: 'bar'},
//     ]
// }
// }


// function initChart3(canvas , width, height, dpr){
//   chart = echarts.init(canvas, null , {
//     width:width,
//     height:height,
//     devicePoxlRatio: dpr
//   })
//   canvas.setChart(chart)

//   let option = getOption3() //这里是echarts 的配置信息

//   chart.setOption(option)

//   return chart
// }

// function getOption3()
// {
//   return {
//     title: {
//         text: '各能力分布图',
//         left: 'center'
//     },
//     tooltip: {
//         trigger: 'item',
//         formatter: '{a} <br/>{b} : {c} ({d}%)'
//     },
//     legend: {
//         bottom: 10,
//         left: 'center',
//         data: [ '分治能力', '算法能力', '抽象能力', '模式识别'],
//         orient : 'horizontal',
//         textStyle:{
//           fontSize: '10',
//         }
//     },
//     series: [
//         {
//             type: 'pie',
//             radius: '65%',
//             center: ['50%', '50%'],
//             selectedMode: 'single',
//             data: [
//                 {
//                     value: 1548,
//                     name: '分治能力',
//                     label: {
                        
//                         // backgroundColor: '#eee',
//                         // borderColor: '#777',
//                         // borderWidth: 1,
//                         // borderRadius: 4,
//                         rich: {
//                             // title: {
//                             //     color: '#eee',
//                             //     align: 'center'
//                             // },
//                             // abg: {
//                             //     backgroundColor: '#333',
//                             //     width: '100%',
//                             //     align: 'right',
//                             //     height: 25,
//                             //     borderRadius: [4, 4, 0, 0]
//                             // },
//                             // Sunny: {
//                             //     height: 30,
//                             //     align: 'left',
//                             //     backgroundColor: {
//                             //         image: weatherIcons.Sunny
//                             //     }
//                             // },
//                             // Cloudy: {
//                             //     height: 30,
//                             //     align: 'left',
//                             //     backgroundColor: {
//                             //         image: weatherIcons.Cloudy
//                             //     }
//                             // },
//                             // Showers: {
//                             //     height: 30,
//                             //     align: 'left',
//                             //     backgroundColor: {
//                             //         image: weatherIcons.Showers
//                             //     }
//                             // },
//                             // weatherHead: {
//                             //     color: '#333',
//                             //     height: 24,
//                             //     align: 'left'
//                             // },
//                             // hr: {
//                             //     borderColor: '#777',
//                             //     width: '100%',
//                             //     borderWidth: 0.5,
//                             //     height: 0
//                             // },
//                             // value: {
//                             //     width: 20,
//                             //     padding: [0, 20, 0, 30],
//                             //     align: 'left'
//                             // },
//                             // valueHead: {
//                             //     color: '#333',
//                             //     width: 20,
//                             //     padding: [0, 20, 0, 30],
//                             //     align: 'center'
//                             // },
//                             // rate: {
//                             //     width: 40,
//                             //     align: 'right',
//                             //     padding: [0, 10, 0, 0]
//                             // },
//                             // rateHead: {
//                             //     color: '#333',
//                             //     width: 40,
//                             //     align: 'center',
//                             //     padding: [0, 10, 0, 0]
//                             // }
//                         }
//                     }
//                 },
//                 {value: 735, name: '算法能力'},
//                 {value: 510, name: '抽象能力'},
//                 {value: 434, name: '模式识别'},
//             ],
//             emphasis: {
//                 itemStyle: {
//                     shadowBlur: 10,
//                     shadowOffsetX: 0,
//                     shadowColor: 'rgba(0, 0, 0, 0.5)'
//                 }
//             }
//         }
//     ]
// }
// }
