// miniprogram/pages/register/index.js
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
      status: 1,
      password2: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    if (this.data.template.nameValue == '' || this.data.template.password == '') {
      $Message({
        content: '不可为空',
        type: 'warning'
      });
      return false;
    }
    if (this.data.template.password != this.data.template.password2) {
      $Message({
        content: '两次密码不一样',
        type: 'warning'
      });
      return false;
    }
    let result = await request({
      url: `http://${app.host}:5000/api/user/register`,
      data: {
        'email': this.data.template.nameValue,
        'passw': this.data.template.password
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST'
    });
    $Message({
      content: '注册成功',
      type: 'success'
    });
    setTimeout(() => {
      wx.navigateTo({
        url: '../login/index'
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
  },
  passwordChange2: function (e) {
    this.setData({
      'template.password2': e.detail.detail.value
    })
    console.log(e.detail.detail.value)
  },
  navLogin: function () {
    wx.navigateTo({
      url: '../login/index',
    })
  }
})