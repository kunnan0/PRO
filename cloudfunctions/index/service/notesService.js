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
const getUserNotes = (openid) => {
  return model.findByUserId(NOTES, NOTESFIELD, openid)
}

// 新增随笔
const addNewNotes = (params) => {
  return model.add(NOTES, params)
}

// 根据随笔id删除随笔
const removeNotes = (_id) => {
  return model.remove(NOTES, _id)
}



module.exports = {
  getUserNotes,
  addNewNotes,
  removeNotes,
  
}