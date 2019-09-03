// pages/businessplan/businessplan.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    confirm: false,
    zrMiddleStatus: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getZrMiddleStatus()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  getZrMiddleStatus: function() {
    app.API.getZrMiddleStatus().then(res => {
      console.log(res)
      this.setData({
        zrMiddleStatus: res.result ? res.result[0] : {}
      })
    })
  },

  zrAutoApproval: function () {
    if(!this.data.confirm) {
      wx.showToast({
        title: '请先勾选确认',
        icon: 'none'
      })
      return
    }
    wx.showLoading({
      title: '确认中...'
    })
    app.API.zrAutoApproval().then(res => {
      wx.hideLoading()
      if (res.code == 200) {
        this.getZrMiddleStatus()
        wx.showToast({
          title: '已完成',
          icon: 'none'
        })
      }
    })
  },


  checkChange: function(e) {
    console.log(e)
    this.setData({
      confirm: e.detail.value[0] === 'comfirm'
    })
  },

  toBook: function (e) {
    const link = e.currentTarget.dataset.link
    wx.navigateTo({
      url: '../businessPlanWeb/businessPlanWeb?link=' + encodeURIComponent(link)
    })
  }

})