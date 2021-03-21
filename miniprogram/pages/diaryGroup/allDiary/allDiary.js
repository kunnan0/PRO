// pages/diaryGroup/allDiary/allDiary.js
import idCreator from '../../../utils/idCreator'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deleteFlag: false, //是否点击删除按钮
    setting: '', //nav右上角
    diaryList: [ //日志列表
      {
        id: '1',
        date: '2020-1-1',
        title: '123',
        company: 'ali',
        content: 'hello world',
        digest: 'hello w...',
        group: '日志本n'
      },
      {
        id: '2',
        date: '2020-1-1',
        title: '1223',
        company: 'ali',
        content: 'hello 22world',
        digest: 'hello 2...',
        group: '日志本n'
      },
      {
        id: '3',
        date: '2020-1-1',
        title: '12333',
        company: 'a3li',
        content: 'hello 33world',
        digest: 'hello 3...',
        group: '日志本n'
      },
    ],
    option: [{ //nav右侧按钮选项
        text: '新建',
        value: 0
      },
      {
        text: '删除',
        value: 1
      },
    ],
  },
  // 导航栏 管理按钮
  onClickSetting() {

  },
  // 导航栏 下拉菜单
  handleNew() {//新建，转到新建
    wx.navigateTo({
      url: '/pages/diary/diary',
    })
    this.selectComponent('#item').toggle();
  },
  handleDelete() {
    this.selectComponent('#item').toggle();
    this.setData({ //切换 删除/取消
      deleteFlag: !this.data.deleteFlag
    })
  },
  // 导航栏 返回按钮
  onClickBack() {

  },
  // 删除辅助方法，找到该元素
  findObj(arr, id) {
    let idx=-1
    arr.forEach((item, i) => {
      if (item.id == id) {
        idx=i
      }
    })
    return idx;
  },
  // 点击删除按钮
  deleteBtn(e) {
    let {
      itemid
    } = e.currentTarget.dataset;
    const {
      diaryList
    } = this.data;
    // console.log(itemid, this.findObj(diaryList, itemid));
    const index=this.findObj(diaryList,itemid);
    if(index!=-1){
      diaryList.splice(index, 1);
    }
    this.setData({
      diaryList
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