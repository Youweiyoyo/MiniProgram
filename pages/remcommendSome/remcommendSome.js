import request from '../../utils/utils'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    mount: '',
    Recommend: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      date: new Date().getDate(),
      mount: new Date().getMonth() + 1,
    })
    const userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      wx.showToast({
        title: '请先登录',
        icon: none,
        success: () => {
          wx.reLaunch({
            url: '/pages/login/login',
          })
        },
      })
    }
    this.getEveryDayRecommendMusic()
  },
  /**
   * 获取每日推荐歌曲
   */
  async getEveryDayRecommendMusic() {
    const { recommend: res } = await request('/recommend/songs')
    this.setData({
      Recommend: res,
    })
  },
  /**
   * 跳转到播放界面
   */
  toPlayPage(event) {
    let { song } = event.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/songDetail/songDetail?musicInfo',
      success: (res) => {
        res.eventChannel.emit('musicInfo', song)
      },
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
