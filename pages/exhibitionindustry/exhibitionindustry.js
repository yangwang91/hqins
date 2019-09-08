// pages/exhibitionindustry/exhibitionindustry.js
// const Page = global.GioPage;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    agentHidden:true, // 控制代理人综合展业平台
    microShopHidden:true, // 控制代理人保险微店
    sharedHidden:true, // 共享云展业平台
    platformHidden:true,// 商户开放平台
    iHomeHidden:true // iHome家庭保障专家
  },
  showContent: function (e) {
    var tab = e.currentTarget.dataset.tab
    var hiddenValue = !this.data[tab];
    var data = {};
    data[tab] = hiddenValue
    this.setData(data);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

})