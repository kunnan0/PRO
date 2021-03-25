// pages/notice/notice.js

import Notice from '../../api/notice'

const app = getApp();
const notice = new Notice();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeGroup: [], //备忘录组数据
  },

  // 获取后端数据
  _init() {
    // notice.addNoticeGroup({

    //   notice: [],
    //   // userid: '345',
    //   deadline: 'Sun Apr 04 2021 15:39:36 GMT+0800 (中国标准时间)'
    // }, res => {
    //   console.log('add', res);
    // })
    notice.getUserNotice(res => {

      this.setData({
        noticeGroup: res.result.data.data
      })
      console.log(this.data.noticeGroup);
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._init()
    console.log(this.data.noticeGroup);
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