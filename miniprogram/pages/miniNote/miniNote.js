// pages/miniNote/miniNote.js
import Note from '../../api/note'

const noteService = new Note();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // radio: '1', //单选选中的 1为分享2为私人
    value: '0', //心情评价
    msg: '', //输入框文本
    fileList: [ //上传图片
      // 格式：
      /**
      url:'xxxx',
      name:'ddd',
      deletable:'true' 是否可删除
      */
    ],
    miniNote: { //用户整合数据
      msg: '',
      mind: '',
      radio: '',
      pic: '', //图片
    },
    // 时间参数
    date: '',
    show: false,
    minDate: new Date(2020, 1, 1).getTime(),
    maxDate: new Date().getTime(),
  },
  // 设定时间事件
  onDisplay() { //开启选框
    this.setData({
      show: true
    });
  },
  onClose() { //关闭选框
    this.setData({
      show: false
    });
  },
  formatDate(date) { //选中的时间结果
    date = new Date(date);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  },
  onConfirm(event) { //确认选择
    this.setData({
      show: false,
      date: this.formatDate(event.detail),
    });
  },


  // 文件上传处理
  afterRead(event) {
    const {
      file
    } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      formData: {
        user: 'test'
      },
      success(res) {
        // 上传完成需要更新 fileList
        const {
          fileList = []
        } = this.data;
        fileList.push({
          ...file,
          url: res.data
        });
        this.setData({
          fileList
        });
      },
    });
  },

  // 文本框输入
  inputText(event) {
    const iptData = event.detail;
    this.setData({
      msg: iptData
    })
  },
  // 单选框选中事件
  changePri(e) {
    this.setData({
      radio: e.detail
    })
  },
  // 心情评价
  rateMind(e) {
    this.setData({
      value: e.detail
    })
  },
  // 发布按钮
  handleFinish() {
    const {
      msg,
      date,
      value
    } = this.data;
    const noteAll = {
      content: msg,
      date,
      mind: value,
    }
    noteService.addNewNotes(noteAll, res => {
      console.log('upload note', res);
      // wx.navigateTo({
      //   url: '/pages/my/my',
      //   // events: events,
      //   // success: (result) => {},
      //   // fail: (res) => {},
      //   // complete: (res) => {},
      // })
      wx.navigateBack({
        delta: 1,
        success: (res) => {},
        fail: (res) => {},
        complete: (res) => {},
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