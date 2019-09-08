//app.js
import API from './utils/api.js';
import images from './utils/images.js';
var gio = require("./utils/gio-minp/index.js").default
const App = global.GioApp
// var gio = require("./utils/gio-minp/index.js").default
// import request from './utils/request.js'
// const _request = new request

App({
  onLaunch: function (options) {

    this.checkUser()

    console.log(options)
 
    wx.hideTabBar({
      fail: function () {
        setTimeout(function () {
          wx.hideTabBar()
        }, 500)
      }
    })
    
    console.log('scene', decodeURIComponent(options.query.scene))

    const subordinateid = decodeURIComponent(options.query.scene)
    if(subordinateid) {
      this.globalData.subordinateid = subordinateid
    }

    wx.getSystemInfo({
      success: (res) => {
        console.log(res)
        this.globalData.sysInfo = res
      },
      fail: (res) => {},
      complete: (res) => {},
    })
  },

  checkUser: function() {
    if (!wx.getStorageSync('userInfo')) {
      wx.reLaunch({
        url: 'pages/auth/auth'
      })
    }
  },


  editTabbar: function() {
    
    wx.hideTabBar({
      fail: function () {
        setTimeout(function () {
          wx.hideTabBar()
        }, 500)
      },
      aniamtion: false
    })
    console.log('---userInfo---', wx.getStorageSync('userInfo'))
    const present = wx.getStorageSync('userInfo') ? wx.getStorageSync('userInfo').info.present : '2'
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
    subordinateid: '',
    tabBar1: {
      "backgroundColor": "#ffffff",
      "color": "#999",
      "selectedColor": "#D3A468",
      "list": [{
        pagePath: "/pages/index/index",
        iconPath: "../../assets/tabImg/home.png",
        selectedIconPath: "../../assets/tabImg/home_selected.png",
        text: "首页"
      }, {
        pagePath: "/pages/product/product",
        iconPath: "../../assets/tabImg/product.png",
        selectedIconPath: "../../assets/tabImg/product_selected.png",
        text: "产品"
      }, {
        pagePath: "/pages/team/team",
        iconPath: "../../assets/tabImg/team.png",
        selectedIconPath: "../../assets/tabImg/team_selected.png",
        text: "团队"
      }]
    },
    tabBar2: {
      "backgroundColor": "#ffffff",
      "color": "#999",
      "selectedColor": "#D3A468",
      "list": [{
        pagePath: "/pages/index/index",
        iconPath: "../../assets/tabImg/home.png",
        selectedIconPath: "../../assets/tabImg/home_selected.png",
        text: "首页"
      }, {
          pagePath: "/pages/product/product",
          iconPath: "../../assets/tabImg/product.png",
          selectedIconPath: "../../assets/tabImg/product_selected.png",
          text: "产品"
        }, {
          pagePath: "/pages/calculate/calculate",
          iconPath: "../../assets/tabImg/compute.png",
          selectedIconPath: "../../assets/tabImg/compute_selected.png",
          text: "测算"
        }, {
        pagePath: "/pages/advisory/advisory",
        iconPath: "../../assets/tabImg/advisory.png",
        selectedIconPath: "../../assets/tabImg/advisory_selected.png",
        text: "咨询"
      }]
    }
  }
})