// notice请求接口
import {
  CloudRequest,
} from '../utils/CloudRequest'


class Notice extends CloudRequest {
  // 获取notice数据

  getUserNotice(cb) {
    // const userid = this.getContext()
    this.request({
      url: "getUserNotice",
      success: res => {
        cb(res);
      }
    })
  }
  // 新增notice组数据
  addNoticeGroup(newGroup, cb) {
    this.request({
      url: 'addNoticeGroup',
      data: {
        newGroup
      },
      success: res => {
        cb(res);
      }
    })
  }
  // 更新备忘录
  updateNotice(groupData, cb) {
    this.request({
      url: 'updateNotice',
      data: {
        groupData
      },
      success: res => {
        cb(res);
      }
    })
  }
  // 删除备忘录组
  removeNoticeGroup(_id) {
    this.request({
      url: 'removeNoticeGroup',
      data: {
        _id
      },
      success: res => {
        cb(res);
      }
    })
  }
}

export default Notice