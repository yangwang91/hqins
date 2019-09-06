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
    userInfo: null,
    hidden: true,
    authFailureHidden:true
  },

  attached() {
    this.getUserInfoAuth()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindSub: function() {
      const subId = app.globalData.subordinateid
      const myInfo = this.data.userInfo
      if (subId && subId !== 'undefined') {
        app.API.scanAddScande({
          fdMainWxid: subId,
          fdNickname: myInfo.nickName,
          fdHeadLink: myInfo.avatarUrl,
          fdSex: myInfo.gender
        }).then(res => {
          console.log(res)
          if(res.code == 200){
            app.globalData.subordinateid = ''
          }
        })
      }
    },


    getuserinfo(e) {
      if(e.detail.userInfo) {
        this.setData({
          hidden: true
        })
        this.fnGetUserInfo()
      } else {
        this.setData({
          hidden: true,
          authFailureHidden: false
        })
      }
    },

    exitAuth(e){
      this.setData({ hidden: true, authFailureHidden: false})
    },

    fnGetUserInfo: function() {
      wx.getUserInfo({
        success: (res) => {
          this.setData({
            userInfo: res.userInfo
          })
          wx.setStorage({
            key: 'wechatInfo',
            data: res.userInfo,
            success: (res) => {},
            fail: (res) => { },
            complete: (res) => { },
          })
          console.log(res.userInfo)
          this.login()
        }
      })
    },

    getUserInfoAuth() {
      // 获取用户信息
      wx.getSetting({
        success: res => {
          // console.log('uinfo', res)
          if (!res.authSetting['scope.userInfo']) {
            this.setData({
              hidden: false
            })
          } else {
            this.fnGetUserInfo()
            // 
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
            if (info && info.present){
              this.intoApp(info.present)
            }
          },
          fail: (res) => {},
          complete: (res) => {},
        })

        this.bindSub(res.openid)
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
