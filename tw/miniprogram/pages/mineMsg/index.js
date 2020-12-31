// miniprogram/pages/mineMsg/index.js
const app = getApp();
const { $Message } = require('../../dist/base/index');
const { request } = require('../../utils/request');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // options.userId
    let result = await request({
      url: `http://${app.host}:5000/api/getmsg/mineMsg?userid=${options.userId}`,
      data: {},
      header: {},
      method: 'GET'
    });
    this.setData({
      content: result.data.rows
    })
  },
  del: async function (e) {
    console.log(e.currentTarget.dataset.data)
    let tempDate = e.currentTarget.dataset.data
    let index = e.currentTarget.dataset.index
    let result = await request({
      url: `http://${app.host}:5000/api/getmsg/delMsg?userid=${tempDate.USERID}`,
      data: {
        userid: tempDate.R_USERID,
        bookid: tempDate.R_BOOKID,
        msgid: tempDate.R_MSGID
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST'
    });
    let content = this.data.content
    content.splice(index, 1)
    if (result.data.msg == 1) {
      $Message({
        content: '删除成功',
        type: 'success'
      });
      this.setData({
        content: content
      })
    }
  }
})