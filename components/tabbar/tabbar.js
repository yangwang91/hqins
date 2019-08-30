// tabBarComponent/tabBar.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabbar: {
      type: Object,
      value: {
        "backgroundColor": "#ffffff",
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
    isIphoneX: app.globalData.sysInfo.statusBarHeight >= 44,
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
