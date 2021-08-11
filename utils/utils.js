// 导入服务器地址
import config from './config'
// 封装网络请求方法
export default function request(url, data = {}, method = 'GET') {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${config.host}${url}`,
      data,
      method,
      header: {
        cookie:
          wx.getStorageSync('cookies') &&
          wx.getStorageSync('cookies').find((item) => item.includes('MUSIC_U')),
      },
      success: (res) => {
        if (data.isLogin) {
          wx.setStorage({ 
            key: 'cookies',
            data: res.cookies,
          })
        }
        resolve(res.data)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}
