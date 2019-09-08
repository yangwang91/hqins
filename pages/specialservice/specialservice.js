// pages/questionInfo/questionInfo.js
// const Page = global.GioPage;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    travelRescueHidden: true, // 控制国际旅行救援展示与否
    medicalRescueHidden:true, // 控制国内外医疗救援
    customerHidden:false,// 客户增值
    underwritingHidden:true,// 核保政策
    claimHidden:true, // 理赔特色
    advisoryHidden:true, // 咨询特色
    dailogFamilyHidden:true, // 控制dialog显示
    dailogServiceHidden:true // 控制特色服务dialog显示
  },
  /**
   * 组件的方法列表
   */
  travelRescueShow:function(){
    var hiddenValue = !this.data.travelRescueHidden;
    this.setData({ travelRescueHidden: hiddenValue});
  },
  medicalRescueShow:function(){
    var hiddenValue = !this.data.medicalRescueHidden;
    this.setData({ medicalRescueHidden: hiddenValue });
  },
  changeTab:function(e){
    var tab = e.currentTarget.dataset.tab
    var data = {};
    data.advisoryHidden = true;
    data.customerHidden = true;
    data.underwritingHidden = true;
    data.claimHidden = true;
    data[tab] = false;
    this.setData(data);
  },
  familyServiceShow:function(){
    var hiddenValue = !this.data.dailogFamilyHidden;
    this.setData({ dailogFamilyHidden: hiddenValue });
  },
  personServiceShow: function () {
    var hiddenValue = !this.data.dailogServiceHidden;
    this.setData({ dailogServiceHidden: hiddenValue });
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})