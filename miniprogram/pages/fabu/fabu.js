// pages/fabu/fabu.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],
    fileIDs: [],
    desc: '',
  },

  // 输入内容处理
  getInput(e) {
    // console.log('input');
    this.setData({
      desc: e.detail.value,
    })
  },
  // 选择图片处理
  chooseImage() {
    wx.chooseImage({
      count: 8 - this.data.imgList.length, //最多接受8张图片
      sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        console.log("img success", res)
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
        console.log("path", this.data.imgList)
      }
    });
  },
  // 删除图片处理
  DeleteImg(e) {
    wx.showModal({
      title: '确认要删除吗？',
      content: '',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },

  // 上传
  publish() {
    let desc = this.data.desc
    let imgList = this.data.imgList
    if (!desc || desc.length < 6) { //输入内容不符合
      wx.showToast({
        icon: "none",
        title: '至少输入6个字符!'
      })
      return
    }
    if (!imgList || imgList.length < 1) { //图片不符合
      wx.showToast({
        icon: "none",
        title: '请选择图片'
      })
      return
    }
    wx.showLoading({
      title: 'please wait....',
    })

    const promiseArr = []
    //只能一张张上传 遍历临时的图片数组
    for (let i = 0; i < this.data.imgList.length; i++) {
      let filePath = this.data.imgList[i]
      let suffix = /\.[^\.]+$/.exec(filePath)[0]; // 正则表达式，获取文件扩展名
      //在每次上传的时候，就往promiseArr里存一个promise，只有当所有的都返回结果时，才可以继续往下执行
      promiseArr.push(new Promise((reslove, reject) => {
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + suffix,
          filePath: filePath, // 文件路径
        }).then(res => {
          // get resource ID
          console.log("上传结果", res.fileID)
          this.setData({
            fileIDs: this.data.fileIDs.concat(res.fileID)
          })
          reslove()
        }).catch(error => {
          console.log("上传失败", error)
        })
      }))
    }
    //保证所有图片都上传成功
    let db = wx.cloud.database()
    Promise.all(promiseArr).then(res => {
      db.collection('USER').add({
        data: {
          fileIDs: this.data.fileIDs,
          date: app.getNowFormatDate(),
          createTime: db.serverDate(),
          desc: this.data.desc,
          images: this.data.imgList
        },
        success: res => {
          wx.hideLoading()
          wx.showToast({
            title: '发布成功',
          })
          console.log('发布成功', res)
          // wx.navigateTo({
          //   url: '/pages/indexx/index',
          // })
          wx.switchTab({
            url: '/pages/group/group',
          })
        },
        fail: err => {
          wx.hideLoading()
          wx.showToast({
            icon: 'none',
            title: '网络不给力....'
          })
          console.error('发布失败', err)
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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