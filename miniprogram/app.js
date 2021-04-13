//app.js
App({
  onLaunch: function () {
    this.getUserInfo();
    wx.cloud.init({
      env: 'clound-5gtvltq351d31b48',
      traceUser: true
    })
    // this.globalData = {
    //   userInfo:null
    // }
  },
  // 获取用户信息
  getUserInfo() {
    wx.getSetting({
      success: res => {
        console.log('login', res);
        if (res.authSetting['scope.userInfo']) {
          // 若已授权，获取用户信息
          wx.getUserProfile({
            desc: '用户登录',
            success: res => {
              this.globalData.userInfo = res.userInfo;
            }
          })
        } else {
          // 若未授权，请求授权


        }
      }
    })
  },
  globalData: {
    userInfo: null,
    diaryData: null,
    diaryGroup: null,
  }
})