import {
  CloudRequest,
} from '../utils/CloudRequest'

class Diary extends CloudRequest {

  // 获取日志本组数据
  getUserDiaryAll(cb) {
    this.request({
      url: "getUserDiaryAll",
      success: res => {
        // console.log('diaryGroup', res);
        cb(res)
      }
    })
  }
  // 新建日志本组
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
  // 更新日志
  updateDiary(params, operate, cb) {
    this.request({
      url: 'updateDiary',
      data: {
        params,
        operate,
      },
      success: res => {
        console.log('update', res);
        cb(res)
      }
    })
  }
  // 根据_id删除日志本组
  removeDiaryGroup(_id) {
    this.request({
      url: 'removeDiaryGroup',
      data: {
        _id
      },
      success: res => {
        console.log('delete', res);

      }
    })
  }
}

export default Diary