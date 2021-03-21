// pages/notice/notice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: [], //复选框结果
    showIpt: false, //输入框，默认false，点击添加按钮后新建
    sms: "",
    notice: [ //notice内容
      {
        id: "1",
        content: "testing!",
        select_status: false
      },
      {
        id: "2",
        content: "play!",
        select_status: false
      },
      {
        id: "3",
        content: "go!",
        select_status: false
      },
      {
        id: "4",
        content: "fk!",
        select_status: false
      },
    ],
  },
  // 按钮点击事件切换输入框显示
  toggleBtn() {
    const showIpt = this.data.showIpt;
    this.setData({
      showIpt: !showIpt
    })
  },
  // 输入框事件
  handleInput(e) {
    // console.log(e.detail);
    this.setData({
      sms: e.detail
    })
  },
  //添加新tip 
  handleAdd(e) {
    const {
      sms,
      notice
    } = this.data;
    const id = (notice.length + 1).toString();
    const newTip = {
      id,
      content: sms,
      select_status: false
    };
    notice.push(newTip);
    this.setData({
      notice, //更新notice，数据驱动视图更新
      sms: "" //清空输入框
    })
  },
  // 删除tip
  handleDelete(e) {
    const {
      tip
    } = e.currentTarget.dataset;
    const {
      notice
    } = this.data;
    notice.splice(notice.indexOf(tip), 1)
    this.setData({
      notice
    })
  },
  // 复选框选中事件
  onChange(e) {
    const result = e.detail
    const {
      notice
    } = this.data;
    if (result && result.length != 0) {
      result.map((item, i) => {
        notice.forEach((obj) => {
          if (obj.id == item) {
            obj.select_status = true;
          } else {
            obj.select_status = false;
          }
        })
      })
    } else {
      notice.map(item => {
        item.select_status = false;
      })
    }
    this.setData({
      result,
      notice
    })

  },
  // // 添加删除线
  // deleteStyle(){
  //   if(this.data.result.includes())
  // }

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