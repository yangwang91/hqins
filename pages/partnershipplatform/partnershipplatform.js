// pages/partnershipplatform/partnershipplatform.js
// const Page = global.GioPage;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wysbHidden:false,
    ltHidden:true,
    partnershipHidden:true,
    szBankHidden:true,
    smallTeamHidden:true,
    zjHidden:true,
    cxfzHidden:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = options.page
    this.showPage(page)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  changeShow: function (e) {
    var tab = e.currentTarget.dataset.tab
    var hideValue = !this.data[tab]
    var data = {}
    data[tab] = hideValue;
    this.setData(data);
  },
  showPage:function(page){
    if (page == '1') {
      wx.setNavigationBarTitle({
        title: '深圳中小银行'
      })
      this.setData({ szBankHidden:false})
    }
    if (page == '2') {
      wx.setNavigationBarTitle({
        title: '小团队多场景'
      })
      this.setData({ smallTeamHidden: false })
    }
    if (page == '3') {
      wx.setNavigationBarTitle({
        title: '中介服务为王'
      })
      this.setData({ zjHidden: false })
    }
    if (page == '4') {
      wx.setNavigationBarTitle({
        title: '持续组织发展'
      })
      this.setData({ cxfzHidden: false })
    }
    if (page == '5') {
      wx.setNavigationBarTitle({
        title: '股权合伙平台'
      })
      this.setData({ partnershipHidden: false })
    }
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})