
import {chessBoard,totalBlock} from '../../class/patternClass.js';
//棋盘
let tempBoardArray={
  array:[1,1,1,0,1,1,1,0,1,1]
}
let board=new chessBoard(tempBoardArray.array);



//————————————积木块
//积木块1
let block_1_object={
  array:[[1,1,1],[0,1,0],[1,1,0]],
  length:1,
  width:3,
  x:0,
  y:222.9,
};
let totalBlock_1=new totalBlock(block_1_object);

//积木块2


//清除旋转后的二维数组，剔除不必要的部分
function clearRotateArray(matrix){
   let temp=[];
   let tempTemp=[];
   let rowLength=matrix.length;
   let columnLength=0;

   //参考数组，拿来比较用
   let tempArray=[];
   //如果该矩阵一行都没有
   if(rowLength==0)
   {
     return matrix;
   }
   else
   {
     columnLength=matrix[0].length;
     for(let i=0;i<columnLength;++i)
     {
       tempArray.push(0);
     }

     for(let i=0;i<rowLength;++i)
     {
        if(matrix[i].toString()==tempArray.toString())
        {
          continue;
        }
        temp.push(matrix[i]);
     }


     //清除列全为0
     let rowLength_another=temp.length;
     let columnLength_another=0;
     if(rowLength_another==0)
     {
       return temp;
     }
     else
     {
      columnLength_another=temp[0].length;
      //储存每列是否要被删除的judge数组
      let tempArrayFlag=[];
      for(let i=0;i<columnLength_another;i++)
      {
          //判断一列中是否有一个为1
          let flag=false;
          for(let j=0;j<rowLength_another;j++)
          {
             if(temp[j][i]==1)
             {
               flag=true;
               break;
             }
          }
          tempArrayFlag.push(flag);
      }
      console.log("tempArrayFlag");
      console.log(tempArrayFlag);
      for(let i=0;i<rowLength_another;i++)
      {
        let temp_array=[];
        for(let j=0;j<columnLength_another;j++)
        {
          if(tempArrayFlag[j]==true)
          {
            temp_array.push(temp[i][j]);
          }
        }
        tempTemp.push(temp_array);
      }
     }
   }

   console.log("tempTemp:");
   console.log(tempTemp);
   return tempTemp;

   
};

//矩阵旋转函数
function rotate(matrix){
  let temp=matrix;
  console.log("旋转前数组：");
  console.log(temp);
  let length=matrix.length;
  for (let layer = 0; layer < length / 2; ++layer)  
    {  
        let first = layer;  
        let last = length - first - 1;  
        for (let i = first; i < last; ++i)  
        {  
            let tmp = matrix[first][i];  
            matrix[first][i] = matrix[last - i + layer][first];  
            matrix[last - i + layer][first] = matrix[last][last - i + layer];  
            matrix[last][last - i + layer] = matrix[i][last];  
            matrix[i][last] = tmp;  
        }  
    }  
    // console.log("旋转后数组：");
    // console.log(matrix);
    return matrix; 
};



Page({
  data:{
    //棋盘
    board:board,
    //积木块
    totalBlock_1:totalBlock_1,
  },

  //积木块一的移动函数
  blockMove1:function(e){
    console.log(e);
    this.data.totalBlock_1.vertex.x=e.detail.x;
    this.data.totalBlock_1.vertex.y=e.detail.y;

    //打印坐标
    // console.log('x:'+this.data.totalBlock_1.vertex.x);
    // console.log('y:'+this.data.totalBlock_1.vertex.y);
  },

  //旋转按钮
  click:function(){
    let array=rotate(this.data.totalBlock_1.array);
    console.log("array");
    console.log(array);
    let clearArray=clearRotateArray(array);
    console.log("旋转后数组");
    console.log(array);
    console.log("旋转后clear数组：");
    console.log(clearArray);
    // console.log("按下");
    this.setData({
      ['totalBlock_1.array']:array,
      ['totalBlock_1.clearArray']:clearArray,
    })

    // rotate(this.data.totalBlock_1.array);
  },

  confirmAnswer:function(){
    
  }
})