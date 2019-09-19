//index.js
//获取应用实例
// const Page = global.GioPage;
const app = getApp()
var gio = require("../../utils/gio-minp/index.js").default

Page({
  data: {
    tabbar: {},
    banner_img: app.images.index1_banner,
    present: '',
    isAuth:false
  },
 
  onLoad: function () {
    // this.login()
    // this.getUserInfoAuth()
    // this.setData({
    //   present: wx.getStorageSync('userInfo') ? wx.getStorageSync('userInfo').info.present : '2'
    // })
    app.editTabbar();
    this.setData({ present: app.globalData.present, isAuth: app.globalData.isAuth})    
  },
  getUserInfoAuth() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          app.globalData.isAuth = false;
          this.setData({ isAuth: false});
        } else {
          // this.fnGetUserInfo()
          app.globalData.isAuth = true;
          this.setData({ isAuth: true });
          // 
        }
        console.log(app.globalData.isAuth,'app.globalData.isAuth')
      }
    })
  },
  fnGetUserInfo: function () {
    wx.getUserInfo({
      success: (res) => {
        console.log(res, '----------getUserInfo---------------')
        wx.setStorage({
          key: 'wechatInfo',
          data: res.userInfo,
          success: (res) => { },
          fail: (res) => { },
          complete: (res) => { },
        })
        gio('setVisitor', res.userInfo)
        this.login()
      }
    })
  },
  login() {
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
      console.log(res, '---------getOpenId----------')
      const info = res.result[0]
      this.setData({
        present: info.present
      });
      app.globalData.present = info.present;
      app.editTabbar();
      var openid = res.openid;
      var unionid = res.unionid;
      gio('identify', openid, unionid)
      // this.getUserInfoAuth()
      wx.setStorage({
        key: 'userInfo',
        data: {
          openid: res.openid,
          info: info
        },
        success: (res) => {},
        fail: (res) => { },
        complete: (res) => { },
      })
      this.bindSub(res.openid)
    })
  },
  bindSub: function () {
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
        if (res.code == 200) {
          app.globalData.subordinateid = ''
        }
      })
    }
  },
  // 进入
  intoApp(present) {
    wx.reLaunch({
      url: '../index/index',
      success: function (res) {
        wx.hideTabBar({
          fail: function () {
            setTimeout(function () {
              wx.hideTabBar()
            }, 500)
          }
        })
        wx.hideLoading()
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})
