// pages/complaintList/complaintList.js
const Page = global.GioPage;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isActive: 0,
    proposeList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProposeList()
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
    this.getProposeList()
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

  getProposeList: function() {
    wx.showLoading({
      title: '正在加载...'
    })
    app.API.getProposeList({type: this.data.isActive}).then(res => {
      console.log(res)
      wx.hideLoading()
      if(res.code == 200){
        this.setData({
          proposeList: res.result || []
        })
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      }
    })
  },

  tabChange: function (e) {
    console.log(e)
    const index = e.currentTarget.dataset.index || 1
    this.setData({
      isActive: Number(index)
    })
    this.getProposeList(Number(index))
  },

  toComplaint: function () {
    wx.navigateTo({
      url: '../submitComplaint/submitComplaint'
    })
  },
})