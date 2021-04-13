import {
  CloudRequest,
} from '../utils/CloudRequest'

class Diary extends CloudRequest {
  // 获取日志本数据
  getUserDiaryAll(cb) {
    this.request({
      url: "getUserDiaryAll",
      success: res => {
        // console.log('diaryGroup', res);
        cb(res)
      }
    })
  }
  // 新建日志本
  addDiaryGroup(data) {
    this.request({
      url: "addDiaryGroup",
      data: {
        data
      },
      success: res => {
        console.log('addDiaryGroup', res);
      }
    })
  }
}

export default Diary