// pages/calculating/calculating.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    step: 1,
    zrStatus: 0,
    question1: [{
        name: 'A.个人营销',
        value: '1',
        checked: false
      },
      {
        name: 'B.银邮业务',
        value: '2',
        checked: false
      },
      {
        name: 'C.经代业务',
        value: '3',
        checked: false
      },
      {
        name: 'D.网络平台销售',
        value: '4',
        checked: false
      },
      {
        name: 'E.多场景多渠道',
        value: '5',
        checked: false
      }
    ],
    fdXscj: '1',
    postData: {
      fdPremium: '',
      fdGrPremium: '',
      fdYyPremium: '',
      fdJdPremium: '',
      fdWlPremium: ''
    },
    flag: 0,
    result: {},
    calculating_img2: app.images.calculating_img2,
    calculating_img3: app.images.calculating_img3,
    calculating_img4: app.images.calculating_img4
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getZrStatus()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  getZrStatus: function () {
    app.API.getZrStatus().then(res => {
      this.setData({
        zrStatus: res.status || 0
      })
    })
  },

  inputChange: function(e) {
    const key = e.currentTarget.dataset.key
    const value = e.detail.value
    this.setData({
      [`postData.${key}`]: value
    })
  },

  comfirmForm: function() {
    var reg = /^(([0-9]+\.([0-9]|[0-9][1-9]))|([0-9]*[1-9][0-9]*))$/;
    var count = 0;
    if (this.data.fdXscj === '5') {
      if (this.data.postData.fdGrPremium) {
        if (reg.test(this.data.postData.fdGrPremium)){
          count = count + 1;
        } else {
          wx.showToast({
            title: '个人营销保费业绩应输入数字,且最多保留两位小数',
            icon: 'none'
          })
          return
        }
      }
      if (this.data.postData.fdYyPremium) {
        if (reg.test(this.data.postData.fdYyPremium)) {
          count = count + 1;
        } else {
          wx.showToast({
            title: '银邮业务保费业绩应输入数字,且最多保留两位小数',
            icon: 'none'
          })
          return
        }
      }
      if (this.data.postData.fdJdPremium) {
        if (reg.test(this.data.postData.fdJdPremium)) {
          count = count + 1;
        } else {
          wx.showToast({
            title: '经代业务保费业绩应输入数字,且最多保留两位小数',
            icon: 'none'
          })
          return
        }
      }
      if (this.data.postData.fdWlPremium) {
        if (reg.test(this.data.postData.fdWlPremium)) {
          count = count + 1;
        } else {
          wx.showToast({
            title: '网络平台保费业绩应输入数字,且最多保留两位小数',
            icon: 'none'
          })
          return
        }
      }
      if (count<2) {
        wx.showToast({
          title: '请至少填写两项',
          icon: 'none'
        })
        return
      }
    } else {
      if (!this.data.postData.fdPremium) {
        wx.showToast({
          title: '请输入保费业绩',
          icon: 'none'
        })
        return
      }
      if (!reg.test(this.data.postData.fdPremium)) {
        wx.showToast({
          title: '保费业绩应输入数字,且最多保留两位小数',
          icon: 'none'
        })
        return
      }
    }
    wx.showLoading({
      title: '计算中...'
    })
    app.API.getEstimate({
      fdXscj: this.data.fdXscj,
      fdPremium: this.data.postData.fdPremium,
      fdGrPremium: this.data.postData.fdGrPremium,
      fdYyPremium: this.data.postData.fdYyPremium,
      fdJdPremium: this.data.postData.fdJdPremium,
      fdWlPremium: this.data.postData.fdWlPremium
    }).then(res => {
      wx.hideLoading()
      console.log(res)
      if (res.code == 200) {
        this.setData({
          step: 3,
          flag: res.flag,
          result: res.result[0]
        })
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      }
    })
  },

  radioChange: function(e) {
    console.log(e)
    this.setData({
      fdXscj: e.detail.value
    })
  },

  nextQuestion: function() {
    this.setData({
      step: 2
    })
  },

  pevQuestion: function() {
    this.setData({
      step: 1
    })
  },

  backTab: function() {
    wx.switchTab({
      url: '../index/index'
    })
  },

  toCooperation: function() {
    wx.navigateTo({
      url: '../cooperation/cooperation'
    })
  },

  toResult: function() {
    wx.navigateTo({
      url: '../calculateResult/calculateResult?result=' + JSON.stringify(this.data.result) + '&zrStatus=' + this.data.zrStatus
    })
  }
})