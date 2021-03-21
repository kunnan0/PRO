//成功和失败调用时的返回---整合

/**
 * 成功时的返回
 * @param {*} ctx 
 */
const success = ctx => {
  return {
    code: 0,
    message: 'success',
    data: ctx.data
  }
}

/**
 * 失败时的返回
 * @param {*} ctx 
 * @param {*} msg 
 */
const error = (ctx, msg) => {
  return {
    code: 400,
    message: msg,
    data: ctx.data
  }
}

module.exports = {
  success,
  error,
}