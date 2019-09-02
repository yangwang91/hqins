// pages/promotionDetails/promotionDetails.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTgSuccess()
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
  
  getTgSuccess: function() {
    app.API.getTgSuccess().then(res => {
      console.log(res)
      if(res.code == 200){
        this.setData({
          result: res.result[0]
        })
      }
    })
  },

  toContractDetails: function() {
    wx.navigateTo({
      url: '../contractDetails/contractDetails'
    })
  }
})