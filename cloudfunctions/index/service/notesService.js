// 随笔本数据业务逻辑整合
// 获取数据库
const model = require('../model/BaseModel')
// 获取表名
const {
  NOTES
} = require('../config/tableName')
// 获取整合的字段
const {
  NOTESFIELD
} = require('../fields/notes')

// 根据用户id获取数据
const getUserNotes = (userid) => {
  return model.findByUserId(NOTES, NOTESFIELD, userid)
}


module.exports = {
  getUserNotes,

}