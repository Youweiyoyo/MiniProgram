// pages/personal/personal.js
let startY = 0 // 起始坐标
let moveY = 0 // 移动坐标
let moveDistance = 0 // 移动的距离
import request from '../../utils/utils'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    deviation: '',
    coveTime: '',
    userInfo: {}, // 用户详情
    playRecordListData: [], // 用户播放记录
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({
        userInfo: JSON.parse(userInfo),
      })
    }
    this.getUserPlayRecord(this.data.userInfo.userId)
  },
  /**
   * 封装获取用户播放记录
   */
  async getUserPlayRecord(uid) {
    const playRecord = await request('/user/record', { uid: uid, type: 0 })
    let playRecordData = playRecord.allData.splice(0, 50).map((item, index) => {
      item.id = index
      return item
    })
    this.setData({
      playRecordListData: playRecordData,
    })
  },
  /**
   * 手指开始
   */
  handleTouchStart(event) {
    this.setData({
      coveTime: '',
    })
    startY = event.touches[0].clientY
  },
  handleTouchMove(event) {
    moveY = event.touches[0].clientY
    moveDistance = moveY - startY
    if (moveDistance <= 0) {
      return
    }
    if (moveDistance >= 80) {
      moveDistance = 80
    }
    this.setData({
      deviation: `translateY(${moveDistance}rpx)`,
    })
  },
  handleTouchend() {
    this.setData({
      deviation: `translateY(0rpx)`,
      coveTime: 'transform 1s linear',
    })
  },
  /**
   * 跳转到登陆页
   */
  toLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
})
