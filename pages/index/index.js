//index.js
//获取应用实例
const Page = global.GioPage;
const app = getApp()

Page({
  data: {
    tabbar: {},
    banner_img: app.images.index1_banner,
    present: '',
  },
 
  onLoad: function () {
    app.editTabbar()

    this.setData({
      present: wx.getStorageSync('userInfo') ? wx.getStorageSync('userInfo').info.present : '2'
    })
    
  },


})
