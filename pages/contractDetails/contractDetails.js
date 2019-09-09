// pages/contractDetails/contractDetails.js
// const Page = global.GioPage;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: [],
    type:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const type = options.type
    this.setData({
      type: type
    })
    if(type == '1'){
      wx.setNavigationBarTitle({
        title: '经营测算'
      })
    }
    if (type == '2') {
      wx.setNavigationBarTitle({
        title: '商业设计'
      })
    }
    if (type == '3') {
      wx.setNavigationBarTitle({
        title: '项目路演'
      })
    }
    if (type == '4') {
      wx.setNavigationBarTitle({
        title: '合作签约'
      })
    }
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
    this.getTgQysum()
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

  getTgQysum: function() {
    const data = { type: this.data.type }
    app.API.getTgQysum(data).then(res => {
      if(res.code == 200) {
        this.setData({
          result: res.result
        })
      }
    })
  }
})