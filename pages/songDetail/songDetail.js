import request from '../../utils/utils'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isPlay: false,
    musicInfo: {},
    musicId: '',
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
    // 创建控制背景音乐播放的实例
    this.backgroundMusic = wx.getBackgroundAudioManager()
    // 监听背景音频播放事件
    this.backgroundMusic.onPlay(() => {
      this.changePlay(true)
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
  },
  /**
   * 点击播放
   */
  isPlay() {
    this.setData({
      isPlay: !this.data.isPlay,
    })
    this.musicControl()
  },
  /**
   * 控制音乐播放暂停
   */
  async musicControl() {
    if (this.data.isPlay) {
      // 获取音乐播放链接
      const { data: res } = await request('/song/url', {
        id: this.data.musicId,
      })
      let [musicLink] = res
      this.backgroundMusic.src = musicLink.url
      this.backgroundMusic.title = this.data.musicInfo.name
    } else {
      // 暂停
      this.backgroundMusic.pause()
    }
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
