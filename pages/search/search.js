import request from '../../utils/utils'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    placeholderDefault: '', // 默认显示内容
    hotList: [], // 热搜榜
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPlaceholderDefault()
    this.getHotList()
  },

  /**
   * 获取 input 输入框默认显示内容
   */
  async getPlaceholderDefault() {
    const { data: res } = await request('/search/default')
    this.setData({
      placeholderDefault: res.showKeyword,
    })
  },
  /**
   * 热搜榜
   */
  async getHotList() {
    const { data: res } = await request('/search/hot/detail')
    const hotList = res.map((item, index) => {
      item.id = index
      return item
    })
    this.setData({
      hotList: hotList,
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
