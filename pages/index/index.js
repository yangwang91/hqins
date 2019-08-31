//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tabbar: {},
    banner_img: app.images.index1_banner,
    present: wx.getStorageSync('userInfo') ? wx.getStorageSync('userInfo').info.present : '2',
  },
 
  onLoad: function () {
    app.editTabbar()
    
  },


})
