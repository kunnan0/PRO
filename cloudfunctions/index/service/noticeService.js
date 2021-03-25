// 备忘录请求数据库业务逻辑
// 获取数据库
const model = require('../model/BaseModel')
// 获取表名
const {
  NOTICE
} = require('../config/tableName')
// 获取整合的字段
const {
  NOTICEFIELD
} = require('../fields/notice')

// 根据id获取全部备忘录组
const getUserNotice = (openid) => {
  return model.findByUserId(NOTICE, NOTICEFIELD, openid)
}

// 新增备忘录组
const addNoticeGroup = (params) => {
  return model.add(NOTICE, params)
}

// 更新指定备忘录组内容（增/改）
const updateNotice = (params) => {
  return model.update(NOTICE, params)
}

// 根据id删除备忘录组
const removeNoticeGroup = (_id) => {
  return model.remove(NOTICE, _id)
}


// 抛出
module.exports = {
  getUserNotice,
  addNoticeGroup,
  updateNotice,
  removeNoticeGroup,
  
}