// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  // return await db.collection("list").skip(number).limit(amount).get();
  let number=event.number;
  return await db.collection("list").where({
    number:number,
  }).get();
}