// components/complaint-card/complaint-card.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toComplaintInfo() {
      wx.navigateTo({
        url: '../../pages/complaintInfo/complaintInfo'
      })
    }
  }
})
