import request from '../../utils/utils'
let isSend = false
Page({
  /**
   * 页面的初始数据
   */
  data: {
    placeholderDefault: '', // 默认显示内容
    hotList: [], // 热搜榜
    searchContent: '', // 搜索框内容
    vagueSearchDataList: [], // 模糊查询到的数组
    historyList: [], // 搜索历史记录
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPlaceholderDefault()
    this.getHotList()
    this.getSearchHistory()
  },
  /**
   * 获取本地存储中的搜索历史
   */
  async getSearchHistory() {
    let historyList = wx.getStorageSync('searchHistory')
    if (historyList) {
      this.setData({
        historyList,
      })
    }
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
   * 获取搜索表单内的内容
   */
  getSearchContent(event) {
    this.setData({
      searchContent: event.detail.value.trim(),
    })
    if (isSend) {
      return
    }
    isSend = true
    this.getVagueDataList()
    setTimeout(() => {
      isSend = false
    }, 500)
  },
  /**
   * 模糊查询
   */
  async getVagueDataList() {
    if (!this.data.searchContent) {
      this.setData({
        vagueSearchDataList: [],
      })
      return
    }
    let { historyList, searchContent } = this.data
    const { result: res } = await request('/search', {
      keywords: searchContent,
      limit: 10,
    })
    this.setData({
      vagueSearchDataList: res.songs,
    })
    if (historyList.includes(searchContent)) {
      historyList.splice(historyList.indexOf(searchContent), 1)
    }
    // 将搜索过的数据添加到 数组前面
    historyList.unshift(searchContent)
    this.setData({
      historyList,
    })
    // 将历史数据存储到本地
    wx.setStorageSync('searchHistory', historyList)
  },
  /**
   * 清空文本框
   */
  clearSearch() {
    this.setData({
      searchContent: '',
      vagueSearchDataList: [],
    })
  },
  /**
   * 清空历史搜索记录
   */
  deleteSearch() {
    wx.showModal({
      content: '是否删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            historyList: [],
          })
          wx.removeStorageSync('searchHistory')
        }
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
