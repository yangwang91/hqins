// pages/team/team.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: {},
    showPoster: false
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  toComplaint: function() {
    wx.navigateTo({
      url: '../submitComplaint/submitComplaint'
    })
  },

  toComplaintList: function() {
    wx.navigateTo({
      url: '../complaintList/complaintList'
    })
  },

  toTeamMember: function() {
    wx.navigateTo({
      url: '../teamMember/teamMember'
    })
  },

  fnShowPoster: function () {
    this.setData({
      showPoster: true
    })
  }

})