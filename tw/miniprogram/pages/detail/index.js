const app = getApp();
const { $Message } = require('../../dist/base/index');
const { request } = require('../../utils/request');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: {},
    visible1: false,
    msg: [],
    userId: 0,
    msg_content: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let _this = this
    let obj = JSON.parse(options.obj) || { "B_ID": 3, "B_TITLE": "再婚", "B_CLASS": "科技", "B_IMG": "https://wfqqreader-1252317822.image.myqcloud.com/cover/214/31681214/t6_31681214.jpg", "B_AUTHOR": "水烟萝", "B_DETAIL": "在最悲惨的时候，沈瑜遇到了薛度云，他给了她最极致的温柔，也带给她最刻骨的疼痛。她在一次次的经历中变得坚强，却揭开了令她承受不起的真相。后来，她终于明白，他对她所有的慈悲不是蓄谋已久，而是久别重逢。", "NUM": 3 }
    this.setData({
      content: obj
    })
    wx.setNavigationBarTitle({
      title: JSON.parse(options.obj).B_TITLE
    })
    let msg = await this.getmsg(obj)
    this.setData({
      msg: msg.data.rows
    })
    // 获取用户ID
    wx.getStorage({
      key: 'token',
      success: async function (res) {
        let userid = await request({
          url: `http://${app.host}:5000/api/user/deToken`,
          data: {
            token: res.data
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: 'POST'
        });
        if (userid.data.msg == 0) {
          wx.navigateTo({
            url: '../login/index',
          })
          return false
        }
        _this.setData({
          userId: userid.data.id
        })
      },
      fail: function (err) {
        wx.navigateTo({
          url: '../login/index',
        })
      }
    })
  },
  getmsg: async function (obj) {
    // 获取点评
    let msg = await request({
      url: `http://${app.host}:5000/api/getmsg/msg?bookid=${obj.B_ID}`,
      data: {},
      header: {},
      method: 'GET'
    });
    msg.data.rows.map((value, key) => {
      value.M_TIME = `${value.M_TIME.split('-')[0]}-${value.M_TIME.split('-')[1]}-${value.M_TIME.split('-')[2].split('T')[0]}`
    })
    return msg
  },
  handleOpen: function () {
    this.setData({
      visible1: true
    });
  },
  handleClose: function () {
    this.setData({
      visible1: false
    });
    $Message({
      content: '用户点击取消',
      type: 'warning'
    });
  },
  handleOk: async function (e) {
    let result = await request({
      url: `http://${app.host}:5000/api/send/msg`,
      data: {
        msg: this.data.msg_content,
        bookid: this.data.content.B_ID,
        userid: this.data.userId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST'
    });
    console.log(result)
    let msg = await this.getmsg(this.data.content)
    this.setData({
      msg: msg.data.rows,
      visible1: false
    })
    $Message({
      content: '点评成功',
      type: 'success'
    });
  },
  bindChange: function (e) {
    this.setData({
      msg_content: e.detail.value
    })
  }
})