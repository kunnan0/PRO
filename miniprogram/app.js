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
  // 获取时间，并对其格式化
  getNowFormatDate: function () {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
      " " + date.getHours() + seperator2 + date.getMinutes() +
      seperator2 + date.getSeconds();
    return currentdate;
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