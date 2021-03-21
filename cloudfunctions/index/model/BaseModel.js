// 数据库操作----整合
const cloud = require('wx-server-sdk');
// 初始化配置
cloud.init({
  env: 'clound-5gtvltq351d31b48',
  traceUser: true,
})

const db = cloud.database(); //获取数据库对象