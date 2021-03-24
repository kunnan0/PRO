// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')
const response = require('./utils/response')
const diaryService = require('./service/diaryService')
const noticeService = require('./service/noticeService')
const notesService = require('./service/notesService')

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

  // 1.根据userid获取日志本数据
  app.router('getUserDiaryAll', async (ctx, next) => {
    const userid = event.data.userid; //获取前端传来的userid
    // console.log(userid);
    ctx.data = await diaryService.getUserDiaryAll(userid)
    // console.log('data', ctx.data);
    ctx.body = await response.success(ctx);
    await next();
  })
  // 2.新建日志本
  app.router('addDiaryGroup', async (ctx, next) => {
    const { //从前端传入整合的要加入的数据
      params
    } = event.data;
    ctx.data = await diaryService.addDiaryGroup(params);
    // console.log(params, ctx.data);
    ctx.body = await response.success(ctx);
    await next();
  })
  // 3.更新、存储新日志到日志本 删除日志本中的某个日志也用这个方法
  app.router('updateDiary', async (ctx, next) => {
    const { //从前端传入整合的要加入的数据
      params
    } = event.data;
    ctx.data = await diaryService.updateDiary(params);
    // console.log(params, ctx.data);
    ctx.body = await response.success(ctx);
    await next();
  })
  // 4.删除日志本
  app.router('removeDiaryGroup', async (ctx, next) => {
    const { //从前端传入要删除的日志本id
      _id
    } = event.data;
    ctx.data = await diaryService.removeDiaryGroup(_id);
    // console.log(_id, ctx.data);
    ctx.body = await response.success(ctx);
    await next();
  })

  // 5.根据用户id获取备忘录组信息
  app.router('getUserNotice', async (ctx, next) => {
    const {
      userid
    } = event.data;
    ctx.data = await noticeService.getUserNotice(userid);
    console.log(userid, ctx.data);
    ctx.body = await response.success(ctx);
    await next();
  })
  // 6.新增备忘录组
  app.router('addNoticeGroup', async (ctx, next) => {
    const {
      params
    } = event.data;
    ctx.data = await noticeService.addNoticeGroup(params);
    console.log(params, ctx.data);
    ctx.body = await response.success(ctx);
    await next();
  })
  // 7.更新备忘录组中的数据
  app.router('updateNotice', async (ctx, next) => {
    const {
      params
    } = event.data;
    ctx.data = await noticeService.updateNotice(params);
    console.log(params, ctx.data);
    ctx.body = await response.success(ctx);
    await next();
  })
  // 8.删除备忘录组
  app.router('removeNoticeGroup', async (ctx, next) => {
    const {
      _id
    } = event.data;
    ctx.data = await noticeService.removeNoticeGroup(_id);
    console.log(_id, ctx.data);
    ctx.body = await response.success(ctx);
    await next();
  })

  // 9.根据用户id获取随笔本数据
  app.router('getUserNotes', async (ctx, next) => {
    const {
      userid
    } = event.data;
    ctx.data = await notesService.getUserNotes(userid);
    console.log(userid, ctx.data);
    ctx.body = await response.success(ctx);
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