// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const app = new TcbRouter({
    event
  });
  app.use(async (ctx, next) => {
    ctx.data = {};
    await next();
  })

  //测试云函数是否正常可用
  // app.router('timer', async (ctx, next) => {
  //   ctx.data.name = 'hello';
  //   await next();
  // }, async (ctx, next) => {
  //   ctx.data.sex = await new Promise(resolve => {
  //     setTimeout(() => {
  //       resolve('male');
  //     }, 1000)
  //   })
  //   await next();
  // }, async ctx => {
  //   ctx.data.city = 'gk';
  //   ctx.body = {
  //     code: 0,
  //     data: ctx.data
  //   };
  // })


  return app.serve();
}