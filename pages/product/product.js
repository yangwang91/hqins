// pages/product/product.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: {},
    bannerIndex: 0,
    present: wx.getStorageSync('userInfo') ? wx.getStorageSync('userInfo').info.present : '2',
    categoryList: [],
    fdSceneId: '',
    productList: [],
    imgUrls: [{
        src: '../../assets/images/index_banner.png',
        link: ''
      },
      {
        src: '../../assets/images/index_banner.png',
        link: ''
      }
    ],
    curTab: 0,
    tabName: '明星产品'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.editTabbar()

    this.getCategorylist()
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

  arrSort: function(arr) {
    arr.sort((a, b) => {
      return a.fdOrder - b.fdOrder
    })
    return arr
  },

  getCategorylist: function() {
    app.API.getCategorylist().then(res => {
      console.log(res)
      const _categoryList = res.result || []
      _categoryList.sort((a, b) => {
        return a.fdOrder - b.fdOrder
      })
      const fdSceneId = _categoryList.length ? _categoryList[0].fdSceneId : ''
      if (res.code == 200) {
        this.setData({
          categoryList: _categoryList || [],
          fdSceneId: fdSceneId
        })

        this.getProductlist(fdSceneId)

      } else {
        console.log(res)
      }
    })
  },

  getProductlist: function(fdSceneId) {
    wx.showLoading({
      title: '正在加载...'
    })
    app.API.getProductlist({
      fdSceneId: fdSceneId,
      fdPlatform: wx.getStorageSync('userInfo').info.present || 2
    }).then(res => {
      wx.hideLoading()
      console.log(res)
      if(res.code == 200) {
        this.setData({
          productList: res.result || []
        })
      }
    })
  },

  // 
  bannerChange: function(cur) {
    const index = cur.detail.current
    this.setData({
      bannerIndex: index
    })
  },

  tabChange: function(e) {
    const index = e.currentTarget.dataset.index
    const id = e.currentTarget.dataset.id
    const name = e.currentTarget.dataset.name
    // console.log(index)
    this.setData({
      curTab: index,
      tabName: name,
      fdSceneId: id
    })

    this.getProductlist(id)
  }
})