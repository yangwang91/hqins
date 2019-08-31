//app.js
import API from './utils/api.js'
import images from './utils/images.js'
// import request from './utils/request.js'
// const _request = new request

App({
  onLaunch: function (options) {

    console.log(options)
 
    wx.hideTabBar()
    
    // // 登录
    // wx.login({
    //   success: res => { 
    //     const code = res.code
    //     console.log('login', res)

    //     this.API.getToken({userId: 'ekp'}).then(res => {
    //       console.log(res)
    //       const token = res.result[0].token
    //       wx.setStorageSync('token', token)
    //       this.getOpenId(token, code)
    //     }).catch(err => {
    //       console.log(err)
    //     })
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })

    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //             console.log('userInfo', res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })

    wx.getSystemInfo({
      success: (res) => {
        console.log(res)
        this.globalData.sysInfo = res
      },
      fail: (res) => {},
      complete: (res) => {},
    })
  },


  editTabbar: function() {
    console.log('---userInfo---', wx.getStorageSync('userInfo'))
    const present = wx.getStorageSync('userInfo').info.present
    // const present = '1'
    let tabbar = present === '1' ? this.globalData.tabBar1 : this.globalData.tabBar2;
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
    let pagePath = _this.route;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (let i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    console.log(tabbar)
    _this.setData({
      tabbar: tabbar
    });
  },
  
  API: API,
  images: images,
  globalData: {
    userInfo: null,
    sysInfo: {},
    tabBar1: {
      "backgroundColor": "#ffffff",
      "color": "#999",
      "selectedColor": "#D3A468",
      "list": [{
        pagePath: "/pages/index/index",
        iconPath: "../../assets/tabImg/home.svg",
        selectedIconPath: "../../assets/tabImg/home_selected.svg",
        text: "首页"
      }, {
        pagePath: "/pages/product/product",
        iconPath: "../../assets/tabImg/product.svg",
        selectedIconPath: "../../assets/tabImg/product_selected.svg",
        text: "产品"
      }, {
        pagePath: "/pages/team/team",
        iconPath: "../../assets/tabImg/team.svg",
        selectedIconPath: "../../assets/tabImg/team_selected.svg",
        text: "团队"
      }]
    },
    tabBar2: {
      "backgroundColor": "#ffffff",
      "color": "#999",
      "selectedColor": "#D3A468",
      "list": [{
        pagePath: "/pages/index/index",
        iconPath: "../../assets/tabImg/home.svg",
        selectedIconPath: "../../assets/tabImg/home_selected.svg",
        text: "首页"
      }, {
          pagePath: "/pages/product/product",
          iconPath: "../../assets/tabImg/product.svg",
          selectedIconPath: "../../assets/tabImg/product_selected.svg",
          text: "产品"
        }, {
          pagePath: "/pages/calculate/calculate",
          iconPath: "../../assets/tabImg/compute.svg",
          selectedIconPath: "../../assets/tabImg/compute_selected.svg",
          text: "测算"
        }, {
        pagePath: "/pages/advisory/advisory",
        iconPath: "../../assets/tabImg/advisory.svg",
        selectedIconPath: "../../assets/tabImg/advisory_selected.svg",
        text: "咨询"
      }]
    }
  }
})