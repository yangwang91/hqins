//app.js
import API from './utils/api.js'
import images from './utils/images.js'
// import request from './utils/request.js'
// const _request = new request

App({
  onLaunch: function (options) {

    this.checkUser()

    console.log(options)
 
    wx.hideTabBar()
    
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