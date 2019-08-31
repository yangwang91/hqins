// pages/index/components/index2/index2.js
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

  lifetimes: {
    attached: function () {
      this.getSales()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getSales: function () {
      app.API.getSales().then(res => {
        console.log(res)
        if (res.code == 200) {
          this.setData({
            topSales: res.result
          })
        }
      })
    }
  }
})
