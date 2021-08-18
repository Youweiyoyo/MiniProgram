import request from '../../utils/utils'
import PubSub from 'pubsub-js'
const appInstance = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isPlay: false,
    musicInfo: {},
    musicId: '',
    musicLink: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('musicInfo', (res) => {
      this.setData({
        musicInfo: res,
        musicId: res.id,
      })
    })
    wx.setNavigationBarTitle({
      title: this.data.musicInfo.name,
    })
    // 判断当前页面是否有音乐在播放
    if (
      appInstance.globalData.isMusicPlay &&
      appInstance.globalData.musicId === this.data.musicId
    ) {
      // 有 Id 存在表示当前有音乐在播放，修改状态
      this.setData({
        isPlay: true,
      })
    }
    // 创建控制背景音乐播放的实例
    this.backgroundMusic = wx.getBackgroundAudioManager()
    // 监听背景音频播放事件
    this.backgroundMusic.onPlay(() => {
      this.changePlay(true)
      appInstance.globalData.musicId = this.data.musicId
    })
    // 监听系统背景音乐暂停事件
    this.backgroundMusic.onPause(() => {
      this.changePlay(false)
    })
    // 监听系统背景音乐停止事件
    this.backgroundMusic.onStop(() => {
      this.changePlay(false)
    })
  },
  /**
   * 用于更改 isPlay 的方法
   * */
  changePlay(isPlay) {
    this.setData({
      isPlay,
    })
    appInstance.globalData.isMusicPlay = isPlay
  },
  /**
   * 点击播放
   */
  isPlay() {
    this.setData({
      isPlay: !this.data.isPlay,
    })
    this.musicControl(this.data.isPlay, this.data.musicLink)
  },
  /**
   * 控制音乐播放暂停
   */
  async musicControl(isPlay, musicLink) {
    if (isPlay) {
      if (!musicLink) {
        // 获取音乐播放链接
        const { data: res } = await request('/song/url', {
          id: this.data.musicId,
        })
        // 不声明变量直接给传入的 musicLink 进行赋值
        musicLink = res[0].url
        this.setData({
          musicLink,
        })
      }
      this.backgroundMusic.src = musicLink
      this.backgroundMusic.title = this.data.musicInfo.name
    } else {
      // 暂停
      this.backgroundMusic.pause()
    }
  },
  /**
   * 上一首或者下一首音乐播放
   */
  skipPlay(event) {
    const { playtype } = event.currentTarget.dataset
    // 切歌前先关闭当前播放的音乐
    this.backgroundMusic.pause()
    // 订阅推荐页面传递回来的歌曲信息
    PubSub.subscribe('musicCurrent', (msg, data) => {
      this.setData({
        musicInfo: data,
        musicId: data.id,
      })
      // 动态设置标题
      wx.setNavigationBarTitle({
        title: this.data.musicInfo.name,
      })
      // 切歌自动播放
      this.musicControl(true)
      //取消订阅
      PubSub.unsubscribe('musicCurrent')
    })
    // 发布消息给推荐歌曲页面
    PubSub.publish('switchType', playtype)
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
