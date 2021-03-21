// pages/my/my.js
const app = getApp() //获取app.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null, //用户信息
    show1: false, //下拉框是否可见
    show2: false, //下拉框是否可见
    writeActions: [{
        id: "1",
        name: "随笔记"
      },
      {
        id: "2",
        name: "实习日志"
      }
    ],
    diaryActions: [{
        id: "3",
        name: "随笔组"
      },
      {
        id: "4",
        name: "日志组"
      }
    ]
  },
  // 检查用户登录，登录返回true，未登录返回false
  isAuth() {
    if (this.data.userInfo) {
      return true
    } else {
      return false
    }
  },
  // 用户授权
  onGetUserInfo(e) {
    const userInfo = e.detail.userInfo;
    this.setData({
      userInfo
    })
    // console.log(this.data.userInfo);
    app.globalData.userInfo = userInfo
  },

  // 上拉菜单开关
  onCloseSheet() {
    this.setData({
      show1: false,
      show2: false,
    })
  },
  onSelectSheet(e) { //选中按钮后操作
    // console.log(e.detail);
    // 根据拿到的id决定跳转方向
    const {
      id
    } = e.detail;
    switch (id) {
      case "1":
        wx.navigateTo({ //跳转到新建随笔
          url: `/pages/miniNote/miniNote`,
        })
        break;
      case "2":
        wx.navigateTo({ //跳转到新建日志
          url: '/pages/diary/diary',
        })
        break;
      case "3":
        wx.navigateTo({ //跳转随笔组
          url: '/pages/noteGroup/noteGroup',
        })
        break;
      case "4":
        wx.navigateTo({ //跳转到日志组
          url: '/pages/diaryGroup/diaryGroup',
        })
        break;
      default:
        break;
    }

  },
  clickNotice() { //今日是今日毕点击事件
    if (this.isAuth()) {
      wx.navigateTo({
        url: '/pages/notice/notice',
      })
    }
  },
  clickToday() { //今日记点击事件
    // console.log(this.isAuth());
    if (this.isAuth()) {
      this.setData({
        show1: true
      })
    }
    // this.setData({
    //   show1: true
    // })

  },
  clickDiary() { //日志本点击事件
    if (this.isAuth()) {
      this.setData({
        show2: true
      })
    }
    // this.setData({
    //   show2: true
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({ //页面加载就获取userInfo
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (res) => {
              const userInfo = res.userInfo;
              this.setData({
                userInfo
              })
              console.log(this.data.userInfo);
            },
          })
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.getSetting({ //页面加载就获取userInfo
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (res) => {
              const userInfo = res.userInfo;
              this.setData({
                userInfo
              })
              console.log(this.data.userInfo);
            },
          })
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})