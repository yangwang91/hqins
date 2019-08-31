// components/login-model/login-model.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    hidden: true
  },

  attached() {
    this.getUserInfoAuth()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getuserinfo(e) {
      console.log(e)
      if(e.detail.userInfo) {
        this.setData({
          hidden: true
        })
        this.login()
      }
    },

    getUserInfoAuth() {
      // 获取用户信息
      wx.getSetting({
        success: res => {
          // console.log(res)
          if (!res.authSetting['scope.userInfo']) {
            this.setData({
              hidden: false
            })
          } else {
            // 
            this.login()
          }
        }
      })
    },

    // login
    login () {
      wx.showToast({
        title: '正在加载...',
        icon: 'loading',
      })
      // 登录
      wx.login({
        success: res => {
          const code = res.code
          console.log('login', res)

          app.API.getToken({ userId: 'ekp' }).then(res => {
            console.log(res)
            const token = res.result[0].token
            wx.setStorageSync('token', token)
            this.getOpenId(token, code)
          }).catch(err => {
            console.log(err)
          })
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
        }
      })
    },


    // 获取openID
    getOpenId(token, code) {
      app.API.getOpenId({
        token: token,
        code: code
      }).then(res => {
        console.log(res)
        const info = res.result[0]
        wx.setStorage({
          key: 'userInfo',
          data: {
            openid: res.openid,
            info: info
          },
          success: (res) => {
            this.intoApp(info.present)
          },
          fail: (res) => {},
          complete: (res) => {},
        })
      })
    },

    // 进入
    intoApp(present) {
      wx.reLaunch({
        url: '../index/index',
        success: function (res) {
          wx.hideTabBar()
          wx.hideLoading()
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  
})
