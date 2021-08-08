// pages/login/login.js
import request from '../../utils/utils'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phone: '15711140593',
    password: '123456yzy',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  //   handleInput(event) {
  //     let type = event.currentTarget.dataset.phone // 拿到 key
  //     console.log(event.detail.value) // 拿到 value
  //     this.setData({
  //       [type]: event.detail.value,
  //     })
  //   },
  async login() {
    let { phone, password } = this.data
    let phonePattern =
      /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
    if (!phone) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'error',
      })
      return
    }
    if (!phonePattern.test(phone)) {
      wx.showToast({
        title: '手机号格式有误',
        icon: 'error',
      })
      return
    }
    if (!password) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'error',
      })
    }
    const loginResult = await request('/login/cellphone', {
      phone,
      password,
      isLogin: true,
    })
    console.log(loginResult)
    switch (loginResult.code) {
      case 200:
        wx.showToast({
          title: '登录成功',
          icon: 'success',
        })
        // 保存用户数据到本地
        wx.setStorageSync('userInfo', JSON.stringify(loginResult.profile))
        break
      case 501:
        wx.showToast({
          title: loginResult.message,
          icon: 'error',
        })
      case 502:
        wx.showToast({
          title: loginResult.message,
          icon: 'error',
        })
    }
    wx.reLaunch({
      url: '/pages/personal/personal',
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
