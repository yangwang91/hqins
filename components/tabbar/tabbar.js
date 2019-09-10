// tabBarComponent/tabBar.js
const app = getApp();
const sysInfo = app.globalData.sysInfo;

// console.log('(sysInfo.screenHeight - sysInfo.windowHeight - sysInfo.statusBarHeight - 32) > 72', (sysInfo.screenHeight - sysInfo.windowHeight))

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabbar: {
      type: Object,
      value: {
        "backgroundColor": "#FAFAFA",
        "color": "#999",
        "selectedColor": "#D3A468",
        "list": [
         
        ]
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // isIphoneX: (sysInfo.screenHeight - sysInfo.windowHeight) > 72 ? true : false,
    isIphoneX:false
  },
  attached() {
    this.isIphoneX()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    navigateTo(e) {
      console.log(e)
      wx.switchTab({
        url: e.currentTarget.dataset.url
      })
    },
    isIphoneX(){
      wx.getSystemInfo({
        success: (res) => {
          //model中包含着设备信息
          console.log(res.model,'-----------res.model-------------')
          var model = res.model
          if (model.search('iPhone X') != -1) {
            this.setData({
              isIphoneX:true
            })
          } else {
            this.setData({
              isIphoneX: false
            })
          }
        }
      })
    }
  }
})
