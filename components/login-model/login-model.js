 // components/login-model/login-model.js
const app = getApp()
import gio from '../../utils/gio-minp/index.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isAuthPage:{
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    auth1: app.images.auth1,
    auth2: app.images.auth2,
    userInfo: null,
    hidden: true,
    titDescHidden:true,
    present: ''
  },

  attached() {
    this.getUserInfoAuth()
    if(this.properties.isAuthPage){
      this.login()
    }
    if(app.globalData.present){
      this.setData({present:app.globalData.present})
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindSub: function() {
      const subId = app.globalData.subordinateid
      const myInfo = this.data.userInfo
      console.log(subId, '------------------scanAddScande subId----------------------')
      console.log(myInfo, '------------------scanAddScande myInfo----------------------')
      if (subId && subId !== 'undefined') {
        app.API.scanAddScande({
          fdMainWxid: subId,
          fdNickname: myInfo.nickName,
          fdHeadLink: myInfo.avatarUrl,
          fdSex: myInfo.gender
        }).then(res => {
          console.log(res,'------------------scanAddScande----------------------')
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
          hidden: false,
          authFailureHidden: false
        })
      }
    },

    exitAuth(e){
      // this.setData({ hidden: true, authFailureHidden: false})
      this.setData({ hidden: false })
    },

    fnGetUserInfo: function() {
      wx.getUserInfo({
        success: (res) => {
          console.log(res,'----------getUserInfo---------------')
          // this.setData({
          //   userInfo: res.userInfo,
          //   encryptedData: res.encryptedData,
          //   iv: res.iv
          // })
          // var data = {
          //   encryptedData: res.encryptedData,
          //   iv: res.iv, 
          //   session_key: this.data.session_key,
          //   token: wx.getStorageSync('token')
          // }
          // app.API.getUnionId(data).then(res => {
          //   console.log(res, '------getUnionId-------');
          //   if (res.code === '200') {
          //     var unionId = res.unionid;
          //     var openId = wx.getStorageSync('userInfo').openid
          //     gio('identify', openid, unionid)
          //   }
          // }).catch(err => {

          // })
          this.setData({
            userInfo: res.userInfo
          })
          this.bindSub()
          wx.setStorage({
            key: 'wechatInfo',
            data: res.userInfo,
            success: (res) => {},
            fail: (res) => { },
            complete: (res) => { },
          })
          gio('setVisitor', res.userInfo)
          app.globalData.isAuth = true;
          var pages = getCurrentPages();
          var currentPage = pages[pages.length - 1]; //获取当前页面的对象
          var url = currentPage.route;
          var pageName = url.split('/').pop()
          if ((url.indexOf('cooperation') != -1)) {
            wx.redirectTo({
              url: pageName
            })
          } else {
            wx.reLaunch({
              url: pageName,
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
        }
      })
    },

    getUserInfoAuth() {
      // 获取用户信息
      // wx.getSetting({
      //   success: res => {
      //     // console.log('uinfo', res)
      //     if (!res.authSetting['scope.userInfo']) {
      //       this.setData({
      //         hidden: false
      //       })
      //     } else {
      //       if (!app.globalData.isAuth){
      //         this.fnGetUserInfo()
      //       }
      //       // 
      //     }
      //   }
      // })
      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (!res.authSetting['scope.userInfo']) {
            app.globalData.isAuth = false;
            this.setData({ isAuth: false });
            if(!this.properties.isAuthPage){
              this.setData({
                hidden: false
              })
            }
          } else {
            if (this.properties.isAuthPage) {
              this.fnGetUserInfo()
            }
            app.globalData.isAuth = true;
            this.setData({ isAuth: true });
            // 
          }
          console.log(app.globalData.isAuth, 'app.globalData.isAuth')
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
      // app.API.getOpenId({
      //   token: token,
      //   code: code
      // }).then(res => {
      //   console.log(res,'---------getOpenId----------')
      //   const info = res.result[0]
      //   this.setData({session_key:res.session_key})
      //   var openid = res.openid;
      //   var unionid = res.unionid;
      //   gio('identify', openid, unionid)
      //   // this.getUserInfoAuth()
      //   wx.setStorage({
      //     key: 'userInfo',
      //     data: {
      //       openid: res.openid,
      //       info: info
      //     },
      //     success: (res) => {
      //       if (info && info.present){
      //         this.intoApp(info.present)
      //       }
      //     },
      //     fail: (res) => {},
      //     complete: (res) => {},
      //   })
      //   this.bindSub(res.openid)
      // })
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
        console.log('app.globalData.present', app.globalData.present)
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
          success: (res) => {
            if (info && info.present) {
              this.intoApp(info.present)
            }
          },
          fail: (res) => { },
          complete: (res) => { },
        })
      })
    },

    // 进入
    intoApp() {
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
    },
    hideDes: function () {
      this.setData({
        titDescHidden: true
      })
    },
    showAuth() {
      this.setData({ titDescHidden: false })
    }
  }
})
