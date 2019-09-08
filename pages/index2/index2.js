// pages/index2/index2.js
// const Page = global.GioPage;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: {},
    topSales: [],
    imgUrls: [{
        src: app.images.index2_banner_1,
        link: ''
      },
      {
        src: app.images.index2_banner_2,
        link: ''
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabbar()

    console.log(app)

    this.getSales()
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

  getSales: function() {
    app.API.getSales().then(res => {
      console.log(res)
      if(res.code == 200) {
        this.setData({
          topSales: res.result
        })
      }
    })
  }

})