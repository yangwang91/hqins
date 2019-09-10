// pages/jionus/jionus.js
// const Page = global.GioPage;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
 data: {
  result: {},
  zrStatus: 0,
  calculate_result_icon: app.images.calculate_result_icon,
  calculateResult: app.images.calculateResult
 },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      result: JSON.parse(options.result),
      zrStatus: Number(options.zrStatus)
    })
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

  goBack: function() {
    wx.switchTab({
      url: '../index/index'
    })
  },
  pevQuestion: function () {
    wx.navigateTo({
      url: '../../../../calculating/calculating'
    })
  },
  toCooperation:function() {
    wx.navigateTo({
      url: '../../pages/cooperation/cooperation',
    })
  }
})