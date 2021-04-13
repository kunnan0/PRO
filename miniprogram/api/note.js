// notice请求接口
import {
  CloudRequest,
} from '../utils/CloudRequest'


class Note extends CloudRequest {
  // 获取随笔

  getUserNotes(cb) {
    // const userid = this.getContext()
    this.request({
      url: "getUserNotes",
      success: res => {
        cb(res);
      }
    })
  }
  // 新增随笔
  addNewNotes(params, cb) {
    this.request({
      url: 'addNewNotes',
      data: {
        params

      },
      success: res => {
        cb(res);
      }
    })
  }

  // 删除随笔
  removeNotes(_id) {
    this.request({
      url: 'removeNotes',
      data: {
        _id
      },
      success: res => {
        cb(res);
      }
    })
  }
}

export default Note