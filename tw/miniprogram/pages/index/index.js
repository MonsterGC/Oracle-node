//index.js
const app = getApp();
const { $Message } = require('../../dist/base/index');
const { request } = require('../../utils/request');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'homepage',
    current_scroll: '',
    num: 0,
    type: ['全部'],
    content: [],
    height: 0,
    start: 0,
    status: true,
    userEmail: '',
    visible1: false,
    resourcePass: '',
    passw: '',
    passw2: '',
    userId: ''
  },
  onLoad: async function () {
    let _this = this
    let result = await request({
      url: `http://${app.host}:5000/api/getbook/class`,
      data: {},
      header: {},
      method: 'GET'
    });
    let type = this.data.type
    result.data.rows.map((value, key) => {
      type.push(value.C_NAME)
    })
    this.setData({
      type: type,
      current_scroll: type[0],
      num: type.length,
      height: wx.getSystemInfoSync().windowHeight - 138
    })
    let content = await this.getPage(this.data.start);
    this.setData({
      content: content.data.rows
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
          userEmail: userid.data.email,
          userId: userid.data.id
        })
      },
      fail: function (err) {
        console.log(err)
        wx.navigateTo({
          url: '../login/index',
        })
      }
    })
  },
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
  },
  async handleChangeType({ detail }) {
    console.log(detail.key)
    let _this = this
    _this.setData({
      current_scroll: detail.key,
      content: [],
      statrt: 0,
      status: true
    });
    let content = await this.getPage(0, detail.key)
    _this.setData({
      content: content.data.rows,
    })
  },
  handleChangeScroll({ detail }) {
    this.setData({
      current_scroll: detail.key
    });
  },
  lower: async function (e) {
    if (!this.data.status) return false;
    let start = this.data.start
    let _this = this
    let temp = await this.getPage(start + 5);
    let content = this.data.content;
    content.push(...temp.data.rows)
    if (temp.data.rows.length < 5) {
      _this.setData({
        content: content,
        status: false
      })
      return false;
    }
    this.setData({
      start: start + 5
    })
  },
  getPage: async function (start) {
    let content;
    if (this.data.current_scroll == '全部') {
      content = await request({
        url: `http://${app.host}:5000/api/getbook/pageDetail?start=${start}&end=${start + 5} `,
        data: {},
        header: {},
        method: 'GET'
      });
    } else {
      content = await request({
        url: `http://${app.host}:5000/api/getbook/pageTypeDetail?start=${start}&end=${start + 5}&type=${this.data.current_scroll}`,
        data: {},
        header: {},
        method: 'GET'
      });
    }
    return content
  },
  navDetail: function (e) {
    console.log(e.currentTarget.dataset.id)
    let obj = JSON.stringify(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: `../detail/index?obj=${obj}`,
    })
  },
  modify: function () {
    this.setData({
      visible1: true
    })
  },
  navMsg: function () {
    wx.navigateTo({
      url: `../mineMsg/index?userId=${this.data.userId}`,
    })
  },
  handleOk: async function () {
    if (!this.data.resourcePass) {
      $Message({
        content: '原密码不可为空',
        type: 'warning'
      });
      return false;
    }
    if (!this.data.passw) {
      $Message({
        content: '密码不可为空',
        type: 'warning'
      });
      return false;
    } else if (this.data.passw != this.data.passw2) {
      $Message({
        content: '前后两次密码不一样',
        type: 'warning'
      });
      return false;
    } else {
      let auth = await request({
        url: `http://${app.host}:5000/api/user/auth`,
        data: {
          email: this.data.userEmail,
          resourcePassw: this.data.resourcePass,
          passw: this.data.passw
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST'
      })
      console.log(auth.data.msg)
      if (auth.data.msg == 0) {
        $Message({
          content: '原密码错误',
          type: 'error'
        });
        return false
      }
      $Message({
        content: '修改成功',
        type: 'success'
      });
      setTimeout(() => {
        wx.navigateTo({
          url: '../login/index',
        })
      }, 1000);
    }
  },
  handleClose: function () {
    this.setData({
      visible1: false
    })
    $Message({
      content: '用户点击取消',
      type: 'warning'
    });
  },
  bindChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      resourcePass: e.detail.value
    })
  },
  bindChange2: function (e) {
    console.log(e.detail.value)
    this.setData({
      passw: e.detail.value
    })
  },
  bindChange3: function (e) {
    this.setData({
      passw2: e.detail.value
    })
  },
  close: function () {
    wx.reLaunch({
      url: '../login/index',
    })
    wx.clearStorage({
      success: (res) => {
        console.log(res)
      },
    })
  }
})