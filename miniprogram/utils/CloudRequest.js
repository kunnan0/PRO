// 请求公共工具类

import {
  config
} from '../config'

class CloudRequest {
  constructor() {
    this.cloud_route = config.cloud_route;
    // console.log(this.cloud_route);
  }

  request(params) {
    console.log('request data:', params);
    wx.cloud.callFunction({
      name: this.cloud_route,
      data: { //请求的数据（后端测试时输入的json）
        $url: params.url,
        data: params.data,
        openid: params.openid,
      },
      // 成功-失败调用返回
      success: res => {
        // console.log('cloud',res);
        params.success(res)
      },
      fail: err => {
        console.log('error!', err);
      },
      // 获取元素上绑定的值
      getDataSet(event, key) {
        return event.currentTarget.dataset[key]
      }
    })
  }
}

export {
  CloudRequest
}