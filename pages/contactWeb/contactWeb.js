 // pages/contactWeb/contactWeb.js
// const Page = global.GioPage;
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cinfo:'',
    key:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCinfoAndKey()
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
  getCinfoAndKey: function(){
    const data = { uname: wx.getStorageSync('wechatInfo').nickName }
    app.API.getCinfoAndKey(data).then(res => {
      if (res.code === '200') {
        this.setData({
          cinfo: res.cinfo,
          key: res.key,
        })
      }
    })
  }
})