// 导入封装的请求方法
import request from '../../utils/utils'
// pages/index/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],
    recommendMusicList: [],
    topList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const bannerListDate = await request('/banner', { type: 2 })
    this.setData({
      bannerList: bannerListDate.banners,
    })
    const recommendMusicListDate = await request('/personalized', { limit: 20 })
    this.setData({
      recommendMusicList: recommendMusicListDate.result,
    })
    let index = 1
    let resultArr = []
    while (index < 6) {
      const topListData = await request('/top/list', { idx: index++ })
      let topListItem = {
        name: topListData.playlist.name,
        tracks: topListData.playlist.tracks.slice(0, 3),
      }
      resultArr.push(topListItem)
      this.setData({
        topList: resultArr,
      })
    }
  },
  /**
   *  跳转到推荐页面
   */
  gotoRemcommend() {
    wx.navigateTo({
      url: '/pages/remcommendSome/remcommendSome',
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
