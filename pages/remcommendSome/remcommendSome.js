import request from '../../utils/utils'
import PubSub, { publish } from 'pubsub-js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mount: '',
    Recommend: [],
    data: '',
    musicIndex: '',
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
    // 订阅来自播放页面发布的消息
    PubSub.subscribe('switchType', (msg, data) => {
      // msg 监听的事件名称
      // data 传递的参数
      let { Recommend, musicIndex } = this.data
      if (data === 'pre') {
        // 判断临界值
        musicIndex === 0 && (musicIndex = Recommend.length)
        // 上一首
        musicIndex = musicIndex - 1
      } else {
        // 判断临界值
        musicIndex === Recommend.length - 1 && (musicIndex = -1)
        // 下一首
        musicIndex = musicIndex + 1
      }
      // 点击上一首或者下一首后更下下标
      this.setData({
        musicIndex,
      })
      let musicCurrent = Recommend[musicIndex]
      PubSub.publish('musicCurrent', musicCurrent)
    })
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
    let { song, index } = event.currentTarget.dataset
    this.setData({
      musicIndex: index,
    })
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
