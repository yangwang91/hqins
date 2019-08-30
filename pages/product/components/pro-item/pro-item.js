// pages/product/components/pro-item/pro-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabName: {
      type: String,
      value: '明星产品'
    },
    data: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    slideHidden: true
  },

  lifetimes: {
    attached: function() {
      this.setData({
        slideHidden: true
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    slideChange (e) {
      this.setData({
        slideHidden: !this.data.slideHidden
      })
    }
  }
})
