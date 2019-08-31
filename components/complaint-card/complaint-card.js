// components/complaint-card/complaint-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    propose: {
      type: Object,
      value: {}
    }
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
    toComplaintInfo(e) {
      const id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '../../pages/complaintInfo/complaintInfo?id=' + id
      })
    }
  }
})
