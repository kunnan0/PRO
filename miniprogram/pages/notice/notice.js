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
    gradientColor: {
      '0%': '#52B9F0',
      '100%': '#07c160',
    },
  },
  // 根据id查找对应数据组
  findById(id) {
    const {
      noticeGroup
    } = this.data;
    const data = noticeGroup.map(item => {
      console.log(item._id, id);
      if (item._id == id) {
        return item
      }
      return false;
    })
    return data;
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
      const ret = res.result.data.data;
      ret.forEach(item => {
        // console.log('type', typeof (item.deadline));
        item.deadline = item.deadline.split('T')[0]
      })
      this.setData({
        noticeGroup: ret,
      })
      console.log(this.data.noticeGroup);
    })
  },
  // 点击备忘录组跳转事件
  handleClick(e) {
    // console.log('e', e);
    const {
      id
    } = e.currentTarget.dataset;
    const data = this.findById(id)
    console.log('datago', data);
    wx.navigateTo({
      url: `/pages/notice/noticeGroup/noticeGroup`,
      events: {
        sendData: (data) => {
          console.log('re', data);
        }
      },
      success: (res) => {
        res.eventChannel.emit('noticeData', {
          data: data
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._init()
    const a = this.data.noticeGroup
    console.log(a);
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