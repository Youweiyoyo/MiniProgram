// 导入服务器地址
import config from './config'
// 封装网络请求方法
export default function request(url, data, method = 'GET') {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${config.host}${url}`,
      data,
      method,
      success: (res) => {
        resolve(res.data)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}
