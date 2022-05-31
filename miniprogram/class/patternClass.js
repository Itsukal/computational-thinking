//拼图页面的积木方块

export {chessBoard,totalBlock};

//棋盘类
class chessBoard{

    //棋盘
    chessBoard=[];
    
    //棋盘长和宽
    length=0;
    width=0;

    //槽总数
    nums=0;

    //棋盘的槽数组
    // block=new block[length*width];
    //棋盘左上角坐标
    

    //棋盘右下角坐标

    //棋盘的大小状态
    boardStyle="width:240rpx;padding-left:70rpx;";

    //棋盘每个方格的状态，是否隐藏起来
    boardImageStyle={
        style:"width:80rpx;margin-top:-10rpx",
        hiddenStyle:"width:80rpx;visibility:hidden;margin-top:-10rpx",
      };


    //构造函数
    constructor(board,length=0,width=0)
    {
        this.chessBoard=board;
        this.length=length;
        this.width=width;
    }


};

//方槽类
class block{
    //槽图片的地址
    static imageSrc="../pages/patternRecognition/pattern/槽.png";
    //槽图片的坐标

    //槽是否被占据
    
}

//积木类，管理着整个，由多个方块组装起来的拼图
class totalBlock{
    //描述形状的矩阵
    array=[];

    //矩阵的长和宽
    length=0;width=0;

    //组装的方块总数
    nums=0;

    //坐标
    vertex={
        x:0,
        y:0
    };

    //样式
    style="width:300rpx";


    //构造函数
    constructor(object)
    {
        console.log("object:");
        console.log(object);
        this.array=object.array;
        this.length=object.length;
        this.width=object.width;
        this.vertex.x=object.x;
        this.vertex.y=object.y;
       
    }
    


}

//组装成totalBlock的单个积木块
class lonelyBlock{
    //图片地址
    static src="";

    
    //
}



//方法类
class myFunction{

}
