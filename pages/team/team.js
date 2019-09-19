  // pages/team/team.js
  // const Page = global.GioPage;
  const app = getApp()
  Page({

    /**
     * 页面的初始数据
     */
    data: {
      kk_img: app.images.kk_img,
      phone_img: app.images.phone_img,
      team_member_img: app.images.team_member_img,
      wenhao_img: app.images.wenhao_img,
      tabbar: {},
      showPoster: false,
      teamModle1: false,
      teamModle2: false,
      proposeList: [],
      ztList: [],
      postImg: '',
      soulList: ['不求与人攀比，但求超越自己', '只有不断的学习，才能看到遥远的未来', '亲兄弟，明算账，拒绝大锅饭','人在一起叫聚会，心在一起叫团队'],
      soulStr1:'',
      soulStr2:'',
      isAuth: false
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
      this.setData({ isAuth: app.globalData.isAuth })
      app.editTabbar()
      this.randomList()
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
        data: text,
        success:function(){
          wx.showToast({
            title: '内容已复制，可登录量子平台通过IM工具进行互动',
            icon: 'none',
            duration: 3000
          })
        }
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
    },

    randomList: function(){
      var num1 = this.getRandomNum(0,3);
      var str1 = this.data.soulList[num1];
      this.setData({ soulStr1: str1});
      var soulList2 = Object.assign(this.data.soulList);
      soulList2.splice(num1, 1); 
      var num2 = this.getRandomNum(0,2);
      var str2 = soulList2[num2];
      this.setData({ soulStr2: str2});
    },
    getRandomNum:function(Min, Max) {
      var Range = Max - Min;
      var Rand = Math.random();
      return (Min + Math.round(Rand * Range));
    }  
  })