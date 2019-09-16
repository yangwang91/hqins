// components/poster/poster.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    open: {
      type: Boolean,
      value: false
    },
    postImg: {
      type: String,
      value: ''
    }
  },

  observers: {
    'open': function(val) {
      console.log(val)
      if (val) {
        this.getQc()
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showPoster: false,
    tempFilePath: '',
    canSave: true
  },

  lifetimes: {
    attached: function() {
      this.checkSetting()
      console.log('poster', this.properties.postImg)
      // this.drawPoster()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    drawPoster(qrcode) {

      wx.showLoading({
        title: '正在生成图片...'
      })

      const imgSrc = this.properties.postImg

      console.log('---------', imgSrc)

      let postImage = this.getImg(imgSrc)
      let QRImage = this.getImg(qrcode)

      Promise.all([postImage, QRImage]).then(res => {
        console.log(res)
        var ctx = wx.createCanvasContext('poster', this)

        ctx.setFillStyle('#ffffff')
        ctx.fillRect(0, 0, 660, 970)
        ctx.drawImage(res[0], 50, 30, 560, 696)
        ctx.drawImage(res[1], 50, 762, 165, 165)
        ctx.setFillStyle('#333333')
        ctx.setFontSize(30)
        ctx.fillText('全产品供应闯市场！', 245, 812)
        ctx.setFillStyle('#666666')
        ctx.setFontSize(26)
        ctx.fillText('扫码变身！', 245, 865)
        ctx.fillText('转发寻找你的合伙人！', 245, 900)
        ctx.draw(false, () => {
          this.fnCanvasToTempFilePath()
          this.setData({
            showPoster: true
          })
        })
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
      })

    },

    getQc: function() {
      app.API.getQc().then(res => {
        console.log(res)
        this.drawPoster(res.url || '')
      })
    },

    getImg: function(src) {
      return new Promise((resolve, reject) => {
        wx.getImageInfo({
          src: src,
          success(res) {
            resolve(res.path)
          },
          fail(err) {
            reject(err)
          }
        })
      })
    },

    fnCanvasToTempFilePath() {
      wx.canvasToTempFilePath({
        canvasId: 'poster',
        success: (res) => {
          this.setData({
            tempFilePath: res.tempFilePath,
            showPoster: true
          })
        },
        fail: (res) => {},
        complete: (res) => {
          wx.hideLoading()
        },
      }, this)
    },

    savePoster() {
      wx.saveImageToPhotosAlbum({
        filePath: this.data.tempFilePath,
        success: (res) => {
          this.setData({
            showPoster: false
          })
          wx.showToast({
            title: '已保存到相册',
          })
        },
        fail: (err) => {
          this.setData({
            canSave: false
          })
        }
      })
    },

    openSetting() {
      const self = this
      wx.openSetting({
        success(res) {
          console.log(res)
          const auth = res.authSetting['scope.writePhotosAlbum']
          if (auth) {
            self.setData({
              canSave: true
            })
          } else {
            self.setData({
              canSave: false
            })
          }
        }
      })
    },

    checkSetting() {
      const self = this
      wx.getSetting({
        success(res) {
          console.log(res)
          const auth = res.authSetting['scope.writePhotosAlbum']
          console.log(res.authSetting['scope.writePhotosAlbum'] === undefined)
          if (auth === undefined) {
            self.setData({
              canSave: true
            })
          } else if (!auth && auth !== undefined) {
            self.setData({
              canSave: false
            })
          }
        }
      })
    },

    closePoster() {
      this.setData({
        showPoster: false
      })
    },

    fnCatchtouchmove() {

    }
  }
})