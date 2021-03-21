/**
 * 通过id查找对象数组中的对象，返回数组序号
 * @param {Array} arr 目标对象数组 
 * @param {String} id 要查找对象的id
 */
function findObj(arr, id) {
  let idx=-1
  arr.forEach((item, i) => {
    if (item.id == id) {
      idx=i
    }
  })
  return idx;
}

module.exports={
  findObj
}