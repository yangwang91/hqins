Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#D3A468",
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "../assets/tabImg/home.png",
      selectedIconPath: "../assets/tabImg/home.png",
      text: "首页"
    }, {
      pagePath: "/pages/product/product",
        iconPath: "../assets/tabImg/product.png",
        selectedIconPath: "../assets/tabImg/home.png",
      text: "产品"
    }]
  },
  attached() {
    wx.switchTab({
      url: '/pages/index2/index2',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    this.setData({
      list: [{
        pagePath: "/pages/index2/index2",
        iconPath: "../assets/tabImg/home.png",
        selectedIconPath: "../assets/tabImg/home.png",
        text: "首页"
      }, {
          pagePath: "/pages/product/product",
          iconPath: "../assets/tabImg/product.png",
          selectedIconPath: "../assets/tabImg/home.png",
          text: "产品"
        }, {
          pagePath: "/pages/index/index",
          iconPath: "../assets/tabImg/product.png",
          selectedIconPath: "../assets/tabImg/home.png",
          text: "团队"
        }]
    })

  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})