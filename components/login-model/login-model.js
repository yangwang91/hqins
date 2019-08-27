// components/login-model/login-model.js
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
    hidden: true
  },

  attached() {
    this.getUserInfoAuth()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getuserinfo(e) {
      console.log(e)
      if(e.detail.userInfo) {
        this.setData({
          hidden: true
        })
      }
    },

    getUserInfoAuth() {
      // 获取用户信息
      wx.getSetting({
        success: res => {
          // console.log(res)
          if (!res.authSetting['scope.userInfo']) {
            this.setData({
              hidden: false
            })
          }
        }
      })
    }
  },
  
})
