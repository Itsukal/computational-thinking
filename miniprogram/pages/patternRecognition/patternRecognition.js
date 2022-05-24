
import {chessBoard} from '../../class/patternClass.js';
let tempBoardArray=[1,1,1,0,1,1,1,0,1,1];
let board=new chessBoard(tempBoardArray);



var xx1=167.8,yy1=385.6;
Page({
  data:{
    //棋盘
    board:board,
    x1:32.5,y1:265.5,
  },

  blockMove1:function(e){
    console.log(e);
    xx1=e.detail.x;
    yy1=e.detail.y;
    console.log('xx1:'+xx1);
    console.log('yy1:'+yy1);
  },

})