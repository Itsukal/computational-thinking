import * as echarts from '../../ec-canvas/echarts'

let chart = null;
var queBoxHeight=140;
var tmp=90;
var time=new Array();
var ans=new Array();
var aver=new Array();
var max=new Array();
var kid=new Array();

Page({  
  data:{
    b1h:40,b1a:45,
    b2h:40,b2a:45,
    bh:[0,40,40,40,40],
    ba:[0,45,45,45,45],
    right1:0,
    right2:0,
    right3:0,
    right4:0,
    divideTimeMinute:0,
    divideTimeSecond:0,
    algorithmTimeMinute:0,
    algorithmTimeSecond:0,
    patternTimeMinute:0,
    patternTimeSecond:0,
    abstractTimeMinute:0,
    abstractTimeSecond:0,
    color:new Array(),
    border:new Array(),
    value:80,
    flag:false,
    chart_height:370,
    title_height:80,
    ec1: {
      onInit: initChart,
    },

    classifyList: [{
        id: 1,
        percent: 50,
      },
    ],

  },
  
  onShow: function () {
    if (wx.canIUse('hideHomeButton')) {
      wx.hideHomeButton();
    };
  },


  diagram() {
    var windowidth = 230;
    var colw = windowidth / 3;
    this.setData({
      yuan: {
        height: colw
      }
    })
    console.log('height=' + this.data.value);
    this.createCanvas('school', colw /2, '#50D586', this.data.value, 100);
  },

  createCanvas: function (id, xy, color, val, total) {
    var ctx = wx.createCanvasContext(id);
    ctx.setLineWidth(8);
    ctx.setStrokeStyle('#ffffff');
    ctx.setLineCap('round');
    ctx.beginPath();
    ctx.arc(xy, xy, 0.75 * xy, 0, 2 * Math.PI, false);
    ctx.stroke();

    ctx.setLineWidth(8);
    ctx.setStrokeStyle(color);
    ctx.setLineCap('round');
    var p = val / total;

    ctx.beginPath(xy);
    ctx.arc(xy, xy, 0.75 * xy, -90 * Math.PI / 180, (p * 360 - 90) * Math.PI / 180, false);
    ctx.textAlign = "center";
    ctx.font = '20rpx Arial';
    ctx.fillStyle = color;
    ctx.fillText(val + '%', 1.05*xy, 1.2 * xy, xy);
    ctx.stroke(); //对当前路径进行描边
    ctx.draw();
  },


  show1:function(){this.show(1)},
  show2:function(){this.show(2)},
  show3:function(){this.show(3)},
  show4:function(){this.show(4)},
  show:function(x){
    if(this.data.bh[x]==40){
      for(var i=40;i<=queBoxHeight;i+=2){
        switch(x){
          case 1:
            this.setData({'bh[1]':i});
            this.setData({'ba[1]':45+(i-40)/(queBoxHeight-40)*45});
          break;
          case 2:
            this.setData({'bh[2]':i});
            this.setData({'ba[2]':45+(i-40)/(queBoxHeight-40)*45});
          break;
          case 3:
            this.setData({'bh[3]':i});
            this.setData({'ba[3]':45+(i-40)/(queBoxHeight-40)*45});
          break;
          case 4:
            this.setData({'bh[4]':i});
            this.setData({'ba[4]':45+(i-40)/(queBoxHeight-40)*45});
          break;
        }
      }
    }
    else if(this.data.bh[x]==queBoxHeight){
      for(var i=queBoxHeight;i>=40;i--){
        switch(x){
          case 1:
            this.setData({'bh[1]':i});
            this.setData({'ba[1]':0-(queBoxHeight-i)/(queBoxHeight-40)*45});
          break;
          case 2:
            this.setData({'bh[2]':i});
            this.setData({'ba[2]':0-(queBoxHeight-i)/(queBoxHeight-40)*45});
          break;
          case 3:
            this.setData({'bh[3]':i});
            this.setData({'ba[3]':0-(queBoxHeight-i)/(queBoxHeight-40)*45});
          break;
          case 4:
            this.setData({'bh[4]':i});
            this.setData({'ba[4]':0-(queBoxHeight-i)/(queBoxHeight-40)*45});
          break;
        }
      }
    }
  },
  onLoad(){
    let app=getApp();
    // let temp1=app.globalData.right;
    // console.log("right:"+temp1);
    // let temp2=app.globalData.questionAmount;
    // console.log("amount:"+temp2);
    app.globalData.patternTimeSecond=Math.floor(app.globalData.patternTimeSecond/5);
    app.globalData.abstractTimeSecond=Math.floor(app.globalData.abstractTimeSecond/5);
    app.globalData.algorithmTimeSecond=Math.floor(app.globalData.algorithmTimeSecond/5);
    let tempDivideMinute=parseInt(app.globalData.divideTimeSecond/60);
    let tempDivideSecond=app.globalData.divideTimeSecond%60;
    let tempAlgorithmMinute=parseInt(app.globalData.algorithmTimeSecond/60);
    let tempAlgorithmSecond=app.globalData.algorithmTimeSecond%60;
    let tempAbstractMinute=parseInt(app.globalData.abstractTimeSecond/60);
    let tempAbstractSecond=app.globalData.abstractTimeSecond%60;
    let tempPatternMinute=parseInt(app.globalData.patternTimeSecond/60);
    let tempPatternSecond=app.globalData.patternTimeSecond%60;
//0是分治   1是抽象  2是模式识别 3是算法 
    kid[0]=app.globalData.right[1]/app.globalData.questionAmount[1]*100;
    console.log(app.globalData.right[0]);
    console.log(app.globalData.questionAmount[0]);
    console.log("kid:"+kid[0]);
    kid[1]=app.globalData.right[2]/app.globalData.questionAmount[2]*100;
    console.log("kid:"+kid[1]);
    kid[2]=app.globalData.right[3]/app.globalData.questionAmount[3]*100;
    console.log("kid:"+kid[2]);
    kid[3]=app.globalData.right[0]/app.globalData.questionAmount[0]*100;
    this.setData({
      right0:kid[0],
      right1:kid[1],
      right2:kid[2],
      right3:kid[3],
      divideTimeMinute:tempDivideMinute,
      divideTimeSecond:tempDivideSecond,
      patternTimeMinute:tempPatternMinute,
      patternTimeSecond:tempPatternSecond,
      algorithmTimeMinute:tempAlgorithmMinute,
      algorithmTimeSecond:tempAlgorithmSecond,
      abstractTimeMinute:tempAbstractMinute,
      abstractTimeSecond:tempAbstractSecond,
    });
    for(var i=1;i<=4;i++){
      this.data.color[i]=new Array();
      this.data.border[i]=new Array();
      time[i]=new Array();
      ans[i]=new Array();
    }
//0是算法能力，1是分治能力，2是抽象能力，3是模式识别能力
    //如果需要传入参数修改板块效果，请将onLoad函数中本行代码的以下--线范围内代码删除
    //------------------------------------
    //您的孩子已超过 value 的未成年人
    this.setData({value:60});
    //分治、算法、模式识别、抽象 分别对应 0-3
    for(var i=0;i<=3;i++){
      max[i]=100;
    }

    aver[0]=100;
    aver[1]=20;
    aver[2]=50;
    aver[3]=80;
      //下标
    //------------------------------------
    // kid[0]=30;
    // kid[1]=30;
    // kid[2]=30;
    // kid[3]=30;
    //如果需要传入参数修改板块效果，请将onLoad函数中本行代码的以下--线范围内代码删除
    //-----------------------------------
    for(var i=1;i<=4;i++){
      for(var j=1;j<=10;j++){
        time[i][j]=100-(i-1)*5;
      }
    }
    ans[1][1]=app.globalData.divideIsRight[0];
    for(let j=1,i=0;i<5;i++,j++)
    {
      ans[2][j]=app.globalData.algorithmIsRight[i];
    }
    for(let j=1,i=0;i<5;i++,j++)
    {
      ans[3][j]=app.globalData.patternIsRight[i];
    }
    for(let j=1,i=0;i<5;i++,j++)
    {
      ans[4][j]=app.globalData.abstractIsRight[i];
    }
    //------------------------------------

    //环
    this.diagram();
    for(var i=1;i<=10;i++){
      for(var j=1;j<=4;j++){
        var tmp1='color['+j+']['+i+']',tmp2='border['+j+']['+i+']';
        var ansTmp=ans[j][i]^1;
        this.setData({[tmp2]:ansTmp*10});
        var rnColor;
        switch(j){
          case 1:rnColor=90;break;
          case 2:rnColor=50;break;
          case 3:rnColor=185;break;
          case 4:rnColor=15;break;
        }
        var depth=time[j][i];
        var ansJudge=0;
        if(ans[j][i]==1)ansJudge=100;
        this.setData({[tmp1]:hsvtorgb(rnColor,ansJudge,depth)});
      }
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
        top:'10%',
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
      radius: 80,
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
            { name: '分治能力', max: max[0],color: '#000000',},
            { name: '算法能力', max: max[1],color: '#000000',},
            { name: '模式识别能力', max: max[2],color: '#000000',},
            { name: '抽象识别', max: max[3],color: '#000000',},
        ]
    },

    series: [{
        type: 'radar',
        // areaStyle: {normal: {}},
        data: [
          
            {
                value: [aver[0], aver[1],aver[2],aver[3]],
                name: '平均值',
              areaStyle: { // 单项区域填充样式
                  normal: {
                      // color: 'rgba(255,255,0,0.6)' // 填充的颜色。[ default: "#000" ]
                  }
              },
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
              //         opacity: 1, // 图形透明度
              //         color:'rgba(255,255,0,0.6)',
              //     }
              // },
            },
            {
                value: [kid[0], kid[1], kid[2], kid[3]],
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




//输入的h范围为[0,360],s,v为百分比形式的数值,范围是[0,100]
//h s v 分别代表 色调 饱和度 明度
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