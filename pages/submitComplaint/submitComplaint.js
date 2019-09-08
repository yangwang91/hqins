// pages/submitComplaint/submitComplaint.js
// const Page = global.GioPage;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputLen: 0,
    inputMaxLen: 200,
    val: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  addPropose: function() {
    const val = this.data.val
    if (!val) return
    wx.showLoading({
      title: '正在提交...'
    })
    app.API.addPropose({
      tsxq: val
    }).then(res => {
      wx.hideLoading()
      console.log(res)
      if(res.code == 200) {
        wx.showToast({
          title: '提交成功',
          icon: 'none'
        })

        setTimeout(() => {
          wx.navigateBack({
            delta: -1,
          })
        }, 2000)
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      }
    })
  },

  inputChange: function(e) {
    const val = e.detail.value
    // console.log(val.length)
    if (val.length > this.data.inputMaxLen) return
    this.setData({
      val: val,
      inputLen: val.length
    })
  }
})