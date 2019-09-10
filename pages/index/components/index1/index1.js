// pages/index/components/index1/index1.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  /**
   * 组件的初始数据
   */
  data: {
    banner_img: app.images.index1_banner,
    hiddenVideo:false,
    videoCover: app.images.video_cover,
    index1_img1: app.images.index1_img1,
    index1_img2: app.images.index1_img2,
    index1_img3: app.images.index1_img3,
    index1_img4: app.images.index1_img4,
    index1_img5: app.images.index1_img5,
    jionus_img: app.images.jionus_img,
    partner_arrow_img: app.images.partner_arrow_img,
    recruitment_back_img: app.images.recruitment_back_img
  },
  ready: function () {
    this.videoContext = wx.createVideoContext('myVideo', this)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    toJionUs: function () {
      wx.navigateTo({
        url: '../jionus/jionus'
      })
    },
    toPartnershipplatform: function(e) {
      var page = e.currentTarget.dataset.page
      wx.navigateTo({
        url: '../../../../partnershipplatform/partnershipplatform?page='+page
      })
    },
    playViedo: function () {
      this.setData({ hiddenVideo: true });
      this.videoContext.play();
    },
    bindpause:function(){
      this.setData({ hiddenVideo: false });
    }
  }
})
