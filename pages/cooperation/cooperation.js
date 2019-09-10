// pages/cooperation/cooperation.js
// const Page = global.GioPage;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timer: 90,
    isGetCode: false,
    businessHidden:true,
    formCanSubmit:true, // 防止多次点击重复提交
    fdXscj:'',
    postData: {
      name: '',
      area: '',
      jyms: '',
      tjr: '',
      phone: '',
      code: ''
    },
    question1:[
      {
        value:'1',
        name: '个人营销',
        checked:false,
      },
      {
        value: '2',
        name: '银邮业务',
        checked: false,
      },
      {
        value:'3',
        name: '经代业务',
        checked: false,
      },
      {
        value:'4',
        name: '网络平台销售',
        checked: false,
      },
      {
        value:'5',
        name: '多场景多渠道',
        checked: false,
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  inputChange: function(e) {
    const key = e.currentTarget.dataset.key
    const value = e.detail.value
    this.setData({
      [`postData.${key}`]: value
    })
  },
  getCode: function () {
    this.setData({
      isGetCode: true,
      timer: 90
    })
    let time = this.data.timer;
    let timer = setInterval(() => {
      time--;
      this.setData({
        timer: time
      })
      if(time === 0){
        clearInterval(timer)
        this.setData({
          isGetCode: false
        })
      }
    }, 1000)
  },

  getVcode: function() {
    const data = this.data.postData
    if (!data.phone) {
      wx.showToast({
        title: '请输入您的手机号码',
        icon: 'none'
      })
      return
    }
    var reg = /^1[0-9]{10}$/;
    if (!reg.test(data.phone)) {
      wx.showToast({
        title: '手机号输入有误',
        icon: 'none'
      })
      return
    }
    this.getCode()
    app.API.getMessage({ phone: data.phone}).then(res => {
      console.log(res)
      if(res.code === '200') {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
        this.setData({
          isGetCode: false,
          timer: 90
        })
      }
    })
  },

  submitForm: function () {
    const data = this.data.postData
    if(!data.name) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      })
      return
    }
    if(!data.area) {
      wx.showToast({
        title: '请输入预期经营地区',
        icon: 'none'
      })
      return
    }
    if(!data.jyms) {
      wx.showToast({
        title: '请选择预期经营方式',
        icon: 'none'
      })
      return
    }
    if(!data.phone) {
      wx.showToast({
        title: '请输入您的手机号码',
        icon: 'none'
      })
      return
    }
    if(!data.code) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none'
      })
      return
    }
    if (this.data.formCanSubmit){
      this.setData({ formCanSubmit:false});
      app.API.addCooperation(data).then(res => {
        this.setData({ formCanSubmit: true });
        console.log(res)
        if (res.code == 200) {
          wx.showToast({
            title: res.message,
            icon: 'none'
          })
          this.resetForm()
          setTimeout(() => {
            wx.navigateBack({
              delta: -1,
            })
          }, 2000)
        } else {
          var message = res.message ? res.message : '洽谈预约完成，我们将安排专属人员与您联系';
          wx.showToast({
            title: message,
            icon: 'none'
          })
        }
      })
    }
  },

  resetForm:function() {
    this.setData({
      postData: {
        name: '',
        area: '',
        jyms: '',
        tjr: '',
        phone: '',
        code: ''
      }
    })
  },
  showBusinessMode:function(){
    this.setData({ businessHidden:false})
  },
  hideBusinessMode:function(){
    this.setData({ businessHidden: true })
  },
  radioChange: function (e) {
    var value = e.currentTarget.dataset.value
    // var value = e.detail.value
    this.setData({
      fdXscj: value
    })
    for (var i = 0; i < this.data.question1.length;i++){
      var item = this.data.question1[i]
      if (item.value == value) {
        this.setData({
          'postData.jyms': item.name
        })
      }
    }
    this.hideBusinessMode()
  }
})