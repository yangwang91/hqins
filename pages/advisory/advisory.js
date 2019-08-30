// pages/advisory/advisory.js
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
    isChecked: false
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
    const data = e.currentTarget.dataset.data
    wx.navigateTo({
      url: '../businessPlanWeb/businessPlanWeb'
    })
  }
})