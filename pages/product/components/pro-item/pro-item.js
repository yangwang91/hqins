// pages/product/components/pro-item/pro-item.js
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
    slideHidden: true
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
