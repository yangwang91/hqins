// pages/product/product.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerIndex: 0,
    imgUrls: [{
        src: '../../assets/images/index_banner.png',
        link: ''
      },
      {
        src: '../../assets/images/index_banner.png',
        link: ''
      }
    ],
    curTab: 0
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  // 
  bannerChange: function(cur) {
    const index = cur.detail.current
    this.setData({
      bannerIndex: index
    })
  },

  tabChange: function (e) {
    const id = e.currentTarget.dataset.id
    // console.log(id)
    this.setData({
      curTab: id
    })
  }
})