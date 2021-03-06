// pages/diaryGroup/diaryGroup.js
import Dialog from '../../@vant/weapp/dist/dialog/dialog';
import {
  genNonDuplicateID
} from '../../utils/idCreator';
import {
  findObj
} from '../../utils/idFinder'
import Diary from '../../api/diary'
const diaryService = new Diary();
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // diaryGroup: [{ //日志本组数据
    //     id: '1',
    //     name: '日志本1',
    //     list: [] //其中存储的日志本
    //   },
    //   {
    //     id: '2',
    //     name: '日志本2',
    //     list: []
    //   },
    //   {
    //     id: '3',
    //     name: '日志本3',
    //     list: []
    //   },
    //   {
    //     id: '4',
    //     name: '日志本4',
    //     list: []
    //   },
    //   {
    //     id: '5',
    //     name: '日志本5',
    //     list: []
    //   },
    //   // {
    //   //   id: '6',
    //   //   name: '日志本6',
    //   //   list: []
    //   // },
    // ],
    showIpt: false, //显示新建时弹出的提示框
    valueIpt: "", //新建时提示框内输入的内容
    settingFlag: false, //是否点击了管理按钮
    showDelete: false, //删除时弹窗
    diaryGroup: [] //日志本组数据
  },


  // 顶部导航栏按钮点击事件
  onClickLeft() { //返回按钮
    console.log('back!');
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
      diaryGroup
    } = this.data
    this.setData({
      showDelete: true
    })
    Dialog.confirm({
        title: '确认删除吗？',
        message: '删除包括其中所有日志，无法撤回！',
      })
      .then(() => {
        // on confirm
        let idx = findObj(diaryGroup, diaryid, '_id')
        diaryGroup.splice(idx, 1);

        this.setData({
          showDelete: false,
          diaryGroup
        })
        // 更新到云端
        diaryService.removeDiaryGroup(diaryid);
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
      diaryGroup,
      valueIpt
    } = this.data;
    if (valueIpt) {
      const newGroup = {
        groupName: valueIpt,
        list: []
      }
      diaryGroup.push(newGroup);
      this.setData({
        showIpt: false,
        diaryGroup
      });
      diaryService.addDiaryGroup(newGroup);
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


  // 点击进入日志本
  handleClickDiary(e) {
    const {
      id
    } = e.currentTarget.dataset;
    const {
      diaryGroup
    } = this.data;
    const idx = findObj(diaryGroup, id, '_id')
    const data = diaryGroup[idx];
    console.log('datago', data, idx);
    // 将得到的数据传递给全局变量，用于传递到子页面
    app.globalData.diaryData = data;
    app.globalData.diaryGroup = diaryGroup;
    // wx.navigateTo({
    //   url: `/pages/diaryGroup/allDiary/allDiary`,
    //   // events: {
    //   //   sendDiary: (data) => {
    //   //     console.log('re', data);
    //   //   }
    //   },
    //   // success: (res) => {
    //   //   // res.eventChannel.emit('diaryData', {
    //   //   //   data: data
    //   //   // })
    //   // }
    // })

    wx.navigateTo({
      url: '/pages/diaryGroup/allDiary/allDiary', //url参数不能传递复杂类型
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {
      diaryGroup
    } = this.data
    diaryService.getUserDiaryAll(res => {
      let ret = res.result
      // console.log(ret.data.data0);
      diaryGroup = ret.data.data
      console.log('diary', diaryGroup);
      this.setData({
        diaryGroup
      })
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