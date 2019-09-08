 // pages/calculate/calculate.js
// const Page = global.GioPage;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: {},
    calculating_img1: app.images.calculating_img1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabbar()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  toPage: function() {
    wx.navigateTo({
      url: '../calculating/calculating'
    })
  }
})