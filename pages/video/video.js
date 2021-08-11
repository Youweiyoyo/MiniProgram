// pages/video/video.js
import request from '../../utils/utils'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    videoList: [], // 导航标签
    navId: '',
    videoData: [], // 列表区域
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getVideoGroupList()
  },

  /**
   * 获取导航数据
   */
  async getVideoGroupList() {
    const result = await request('/video/group/list')
    this.setData({
      videoList: result.data.slice(0, 14),
      navId: result.data[0].id,
    })
    this.getVideoGroup(this.data.navId)
  },
  /**
   * 获取对应标签下的数据
   */
  async getVideoGroup(id) {
    const result = await request('/video/group', { id: id })
    result.datas.map((item, index) => {
      item.id = index
      return item
    })
    this.setData({
      videoData: result.datas,
    })
  },
  /**
   * 点击 nav 的事件
   */
  nvaChang(event) {
    console.log(event, '2222')
    this.setData({
      navId: event.currentTarget.dataset.id,
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
