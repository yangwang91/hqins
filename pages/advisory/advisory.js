// pages/advisory/advisory.js
const Page = global.GioPage;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: {},
    step: 0,
    questions: [],
    totalpage: 1,
    page: 1,
    isChecked: false,
    zrMiddleStatus: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.editTabbar()

    this.getProblem()
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
    this.getZrStatus()
    this.getZrMiddleStatus()
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  getZrStatus: function () {
    app.API.getZrStatus().then(res => {
      console.log(res)
      this.setData({
        step: res.status || 0
      })
    })
  },

  getZrMiddleStatus: function () {
    app.API.getZrMiddleStatus().then(res => {
      console.log(res)
      this.setData({
        zrMiddleStatus: res.result ? res.result[0] : {}
      })
    })
  },

  getProblem: function () {
    wx.showLoading({
      title: '正在加载...'
    })
    const page = (this.data.page != 1 && this.data.page >= this.data.totalpage) ? 1 : this.data.page + 1
    app.API.getProblem({p: this.data.page}).then(res => {
      wx.hideLoading()
      console.log(res)
      if(res.code == 200) {
        this.setData({
          page: page,
          questions: res.result,
          totalpage: res.totalpage
        })
      }
    })
  },

  zrAutoApproval: function() {
    wx.showLoading({
      title: '确认中...'
    })
    app.API.zrAutoApproval().then(res => {
      wx.hideLoading()
      if(res.code == 200) {
        this.getZrMiddleStatus()
        wx.showToast({
          title: '已完成',
          icon: 'none'
        })
      }
    })
  },

  checkChane: function(e) {
    this.setData({
      isChecked: e.detail.value.length
    }) 
  },

  toPage: function(e) {
    const data = e.currentTarget.dataset.data
    wx.navigateTo({
      url: '../questionInfo/questionInfo?data=' + JSON.stringify(data)
    })
  },
  
  toBook: function(e) {
    const link = e.currentTarget.dataset.link
    console.log(link)
    wx.navigateTo({
      url: '../businessPlanWeb/businessPlanWeb?link=' + encodeURIComponent(link)
    })
  }
})