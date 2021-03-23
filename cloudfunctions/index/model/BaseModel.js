// 数据库操作----整合
const cloud = require('wx-server-sdk');
// 初始化配置
cloud.init({
  env: 'clound-5gtvltq351d31b48',
  traceUser: true,
})

const db = cloud.database(); //获取数据库对象

/**
 * 根据用户id查询数据
 * @param {string} model 集合名 
 * @param {obj} fields 要查询的字段
 * @param {string} id 查找依据的用户id
 */
const findByUserId = (model, fields = {}, userid) => {
  try {
    return db.collection(model)
      .where({
        userid
      })
      .field(fields)
      .get()
  } catch (error) {
    console.log(error);
  }
}

/**
 * 带条件的通用查询
 * @param {string} model 集合名
 * @param {obj} fields 字段
 * @param {obj} options 条件
 * @param {number} page 开始的记录数(即从第几个开始，即记录了每页开头第一个是数据库中第几课)
 * @param {number} size 每页显示数量
 * @param {obj} order 排序规则
 */
const query = (model, fields = {}, options = {}, page = 0, size = 4, order = {
  name: 'date',
  orderBy: 'asc'
}) => {
  try {
    return db.collection(model)
      .where(options)
      .field(fields)
      .skip(page)
      .limit(size)
      .orderBy(order.name, order.orderBy)
      .get()

  } catch (error) {
    console.log(error);
  }
}

/**
 * 添加数据到集合
 * @param {string} model 集合名
 * @param {obj} params 参数 
 */
const add = (model, params) => {
  try {
    return db.collection(model)
      .add({
        data: params
      })
  } catch (error) {
    console.log(error);
  }
}

/**
 * 
 * @param {string} model 集合名
 * @param {obj} params 参数
 */
const update = (model, params) => {
  const _id = params._id;
  delete params._id; //_id不允许更新，所以先存副本并删除参数中的_id
  try {
    return db.collection(model)
      .doc(_id)
      .update({
        data: params
      })
  } catch (error) {
    console.log(error);
  }
}

/**
 * 根据id删除数据
 * @param {string} model 集合名
 * @param {string} id 要删除的数据的id
 */
const remove = (model, id) => {
  try {
    return db.collection(model)
      .doc(id)
      .remove()
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  findByUserId,
  query,
  add,
  update,
  remove,

}