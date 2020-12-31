const app = getApp()
const { request } = require('../../utils/request');
const { $Message } = require('../../dist/base/index');
const { check } = require('../../utils/auth');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    template: {
      logoUrl: app.logoUrl,
      name: '邮箱',
      nameType: 'string',
      nameValue: '',
      password: '',
      status: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {

  },
  navRegister: function () {
    wx.navigateTo({
      url: '../register/index',
    })
  },
  submit: async function (e) {
    console.log(this.data.template.nameValue, this.data.template.password)
    if (!check(this.data.template.nameValue)) {
      $Message({
        content: '邮箱格式错误',
        type: 'warning'
      });
      return false;
    }
    let result = await request({
      url: `http://${app.host}:5000/api/user/login`,
      data: {
        'email': this.data.template.nameValue,
        'passw': this.data.template.password
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST'
    });
    if (result.data.msg != undefined) {
      $Message({
        content: '用户名/密码错误',
        type: 'error'
      });
      return false;
    }
    $Message({
      content: '成功',
      type: 'success'
    });
    wx.setStorage({
      key: "token",
      data: result.data.token
    })
    setTimeout(() => {
      wx.navigateTo({
        url: '../index/index'
      })
    }, 1000)
  },
  nameValueChange: function (e) {
    this.setData({
      'template.nameValue': e.detail.detail.value
    })
    console.log(e.detail.detail.value)
  },
  passwordChange: function (e) {
    this.setData({
      'template.password': e.detail.detail.value
    })
    console.log(e.detail.detail.value)
  }
})