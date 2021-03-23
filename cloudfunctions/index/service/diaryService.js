// 日志本数据请求逻辑
// 获取数据库
const model = require('../model/BaseModel')
// 获取表名
const {
  DIARY
} = require('../config/tableName')
// 获取整合的字段
const {
  DIARYFIELD
} = require('../fields/diary')

// 获取日志本全部数据
const getUserDiaryAll = (userid) => {
  return model.findByUserId(DIARY, DIARYFIELD, userid)
}
/**
 * 新建日志本 
 * @param {obj} params 要添加的内容 
 */
const addDiaryGroup = (params) => {
  return model.add(DIARY, params)
}

/**
 * 向日志本新增/修改日志
 * @param {obj} params 要添加的内容
 */
const updateDiary = (params) => {
  return model.update(DIARY, params)
}

/**
 * 根据id删除日志本
 * @param {string} id 要删除的日志本的id 
 */
const removeDiaryGroup = (id) => {
  return model.remove(DIARY, id);
}

// 抛出
module.exports = {
  getUserDiaryAll,
  addDiaryGroup,
  updateDiary,
  removeDiaryGroup,

}