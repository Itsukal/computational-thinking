
import {chessBoard,totalBlock} from '../../class/patternClass.js';
//棋盘
let tempBoardArray={
  array:[1,1,1,0,1,1,1,0,1,1]
}
let board=new chessBoard(tempBoardArray.array);

//————————————积木块
//积木块1
let block_1_object={
  array:[1,1,1],
  length:1,
  width:3,
  x:0,
  y:222.9,
};
let totalBlock_1=new totalBlock(block_1_object);

//积木块2


Page({
  data:{
    //棋盘
    board:board,
    //积木块
    totalBlock_1:totalBlock_1,
    di1:0,
  },

  //积木块一的移动函数
  blockMove1:function(e){
    console.log(e);
    this.data.totalBlock_1.vertex.x=e.detail.x;
    this.data.totalBlock_1.vertex.y=e.detail.y;

    console.log('x:'+this.data.totalBlock_1.vertex.x);
    console.log('y:'+this.data.totalBlock_1.vertex.y);
  },

  //旋转按钮
  click:function(){
    console.log("按下");
    this.setData({
      ['totalBlock_1.array']:[1,0,0,1,0,0,1],

    })
  }
})