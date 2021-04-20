// pages/diary/diary.js
import {
  findObj
} from '../../utils/idFinder'
import {
  genNonDuplicateID
} from '../../utils/idCreator'
import Diary from '../../api/diary'

const diaryService = new Diary()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '', //标题
    // 时间参数
    date: '',
    show: false,
    minDate: new Date(2020, 1, 1).getTime(),
    maxDate: new Date().getTime(),
    digest: '', //预览
    company: '', //公司
    msg: '', //正文
    group: '', //存入的日志本组
    groupShow: false, //选择组别弹窗
    groupInfo: [ //日志本组数据
      // { 
      //   _id: 'qwe1',
      //   groupName: 'r1'

      // },
      // {
      //   _id: 'ewq2',
      //   groupName: 'r2'

      // },
      // {
      //   _id: 'ww3',
      //   groupName: 'r3'

      // }
    ],
    diaryData: {}, //日志本数据整合
  },

  // 对数据获取前几个字作为预览digest
  getDigest(value) {
    let digest = '';
    console.log('value', typeof value);
    if (value && value.length >= 6) { //value不为空，且长度足够
      value = value.split('');
      digest = value.splice(0, 5);
      let sum=''
      digest.map((item) => {
        sum += item
      });
      sum += '...';
      return sum;
    } else if (value) {
      return value
    }
    return '';
  },

  // 保存提交
  finishDiary() {
    const {
      title,
      msg,
      group,
      company,
      date
    } = this.data;
    const digest = this.getDigest(msg);
    const id = genNonDuplicateID();
    const diaryData = {
      title,
      company,
      content: msg,
      group: group._id,
      date,
      id,
      digest
    }
    diaryService.updateDiary(diaryData, 'add', res => {
      wx.navigateBack({
        delta: 1,
        // success: (res) => {},
        // fail: (res) => {},
        // complete: (res) => {},
      })
    })
  },



  // 选择日志本组 按钮弹窗
  handleSelect() {
    this.setData({
      groupShow: true,
    })
  },
  //选择日志本组 选择点击
  selectGroup(e) {
    const {
      groupid
    } = e.currentTarget.dataset;
    const {
      groupInfo
    } = this.data;
    let idx = findObj(groupInfo, groupid, "_id"); //查找到要找的对象
    // console.log("idx", idx, groupid);
    if (idx != -1) {
      // console.log();
      this.setData({
        group: groupInfo[idx],
        groupShow: false
      })
      // console.log(this.data.group, groupInfo[idx]);
    }
  },
  // 选择组别弹窗的按钮事件
  confirmGroup() {
    this.setData({
      groupShow: false,
    })
  },

  // 正文
  inputText(e) {
    this.setData({
      msg: e.detail
    })
  },
  // 输入公司/岗位
  inputWork(e) {
    this.setData({
      company: e.detail
    })
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
  // 标题输入事件
  inputTitle(e) {
    this.setData({
      title: e.detail
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */

  _init() {
    diaryService.getUserDiaryAll(res => {
      const groupDataGet = res.result.data.data;
      console.log(groupDataGet);
      const groupInfo = groupDataGet.map(item => {
        return {
          _id: item._id,
          groupName: item.groupName
        }
      })
      this.setData({
        groupInfo
      })
    })
  },

  onLoad: function (options) {
    this._init();
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
    this._init();
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