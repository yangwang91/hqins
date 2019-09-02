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
    banner_img: app.images.index1_banner
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
    toPartnershipplatform: function() {
      wx.navigateTo({
        url: '../../../../partnershipplatform/partnershipplatform'
      })
    }
  }
})
