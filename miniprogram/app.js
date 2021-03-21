//app.js
App({
  onLaunch: function () {
    this.getUserInfo();

    // this.globalData = {
    //   userInfo:null
    // }
  },
  // 获取用户信息
  getUserInfo() {
    wx.getSetting({
      success: res => {
        // console.log('login', res);
        if (res.authSetting['scope.userInfo']) {
          // 若已授权，获取用户信息
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo;
            }
          })
        }else{
          // 若未授权，请求授权


        }
      }
    })
  },
  globalData: {
    userInfo:null
  }
})