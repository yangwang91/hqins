  // pages/team/team.js
  // const Page = global.GioPage;
  const app = getApp()
  Page({

    /**
     * 页面的初始数据
     */
    data: {
      tabbar: {},
      showPoster: false,
      teamModle1: false,
      teamModle2: false,
      proposeList: [],
      ztList: [],
      postImg: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      // app.editTabbar()

      // this.getProposeList()
      // this.getZtList()
      // this.getPromotionPicturelist()
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
      app.editTabbar()

      this.getProposeList()
      this.getZtList()
      this.getPromotionPicturelist()
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

    getProposeList: function() {
      app.API.getProposeList().then(res => {
        console.log(res)
        if (res.code == 200) {
          this.setData({
            proposeList: res.result || []
          })
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none'
          })
        }
      })
    },

    getPromotionPicturelist: function() {
      app.API.getPromotionPicturelist().then(res => {
        if (res.code == 200) {
          this.setData({
            promotionPicturelist: res.result || []
          })
        }
      })
    },

    getZtList: function() {
      app.API.getZtList().then(res => {
        console.log(res)
        if (res.code == 200) {
          this.setData({
            ztList: res.result
          })
        }
      })
    },

    toComplaint: function() {
      wx.navigateTo({
        url: '../submitComplaint/submitComplaint'
      })
    },

    toComplaintList: function() {
      wx.navigateTo({
        url: '../complaintList/complaintList'
      })
    },

    toTeamMember: function() {
      wx.navigateTo({
        url: '../teamMember/teamMember'
      })
    },

    toPromotionDetails: function() {
      wx.navigateTo({
        url: '../promotionDetails/promotionDetails'
      })
    },

    fnShowPoster: function(e) {
      const post = e.currentTarget.dataset.post
      this.setData({
        postImg: post,
        showPoster: true
      })
    },

    phoneCall: function(e) {
      const phone = e.currentTarget.dataset.phone
      wx.makePhoneCall({
        phoneNumber: phone
      })
    },

    copyText: function(e) {
      const text = e.currentTarget.dataset.text
      wx.setClipboardData({
        data: text
      })
    },

    openTeamModle: function(e) {
      const index = e.currentTarget.dataset.index
      if (index == 1) {
        this.setData({
          teamModle1: true
        })
      } else if (index == 2) {
        this.setData({
          teamModle2: true
        })
      }
    },

    closeTeamModle: function(e) {
      this.setData({
        teamModle1: false,
        teamModle2: false
      })
    }

  })