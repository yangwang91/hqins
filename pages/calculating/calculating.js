// pages/calculating/calculating.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    step: 2,
    question1: [
      {
        name: 'A.个人营销',
        value: '1',
        checked: true
      },
      {
        name: 'B.银邮业务',
        value: '2',
        checked: false
      },
      {
        name: 'C.经代业务',
        value: '3',
        checked: false
      },
      {
        name: 'D.网络平台销售',
        value: '4',
        checked: false
      },
      {
        name: 'E.多场景多渠道',
        value: '5',
        checked: false
      }
    ]
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
  radioChange: function(e) {
    console.log(e)
  }
})