// pages/noteGroup/noteGroup.js
import Dialog from '../../@vant/weapp/dist/dialog/dialog';
import {
  genNonDuplicateID
} from '../../utils/idCreator';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noteGroup: [{ //日志本组数据
        id: '1',
        name: '日志本1',
        list: [] //其中存储的日志本
      },
      {
        id: '2',
        name: '日志本2',
        list: []
      },
      {
        id: '3',
        name: '日志本3',
        list: []
      },
      {
        id: '4',
        name: '日志本4',
        list: []
      },
      {
        id: '5',
        name: '日志本5',
        list: []
      },
      // {
      //   id: '6',
      //   name: '日志本6',
      //   list: []
      // },
    ],
    showIpt: false, //显示新建时弹出的提示框
    valueIpt: "", //新建时提示框内输入的内容
    settingFlag: false, //是否点击了管理按钮
    showDelete: false, //删除时弹窗
  },

  // 顶部导航栏按钮点击事件
  onClickLeft() { //返回按钮
    wx.navigateBack({
      delta: 1,
      // success: (res) => {},
      // fail: (res) => {},
      // complete: (res) => {},
    })
  },
  onClickRight() { //管理按钮，开启删除模式
    const {
      settingFlag
    } = this.data;

    this.setData({
      settingFlag: !settingFlag
    })
  },
  // 删除某项笔记本
  handleDelete(e) {
    const {
      diaryid
    } = e.currentTarget.dataset;
    const {
      showDelete,
      noteGroup
    } = this.data
    this.setData({
      showDelete: true
    })
    Dialog.confirm({
        title: '确认删除吗？',
        message: '删除后无法撤回！',
      })
      .then(() => {
        // on confirm
        noteGroup.map(item => {
          if (item.id === diaryid) {
            noteGroup.splice(noteGroup.indexOf(item), 1)
          }
        })
        this.setData({
          showDelete: false,
          noteGroup
        })
      })
      .catch(() => {
        // on cancel
        this.setData({
          showDelete: false
        })
      });
  },


  // 新建日志本按钮
  handleAddGroup() {
    this.setData({
      showIpt: true,
      valueIpt: "", //每次清空valueIpt
    })
  },
  // 新建日志本弹出输入框 点击确认/取消
  onConfirm() {
    const {
      noteGroup,
      valueIpt
    } = this.data;
    if (valueIpt) {
      const newGroup = {
        id: genNonDuplicateID(),
        name: valueIpt,
        list: []
      }
      noteGroup.push(newGroup);
      this.setData({
        showIpt: false,
        noteGroup
      });
    } else {
      wx.showToast({
        title: '名称不能为空！',
        icon: "loading"
      })
    }

  },
  onClose() {
    this.setData({
      showIpt: false
    });
  },
  // 弹出输入框内容
  onChange(e) {
    this.setData({
      valueIpt: e.detail
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