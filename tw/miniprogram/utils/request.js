exports.request = function (obj) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: obj.url, //仅为示例，并非真实的接口地址
      data: obj.data,
      header: obj.header,
      method: obj.method,
      success(res) {
        resolve(res);
      },
      fail: function (err) {
        console.log(err)
        reject(err)
      }
    })
  })
}