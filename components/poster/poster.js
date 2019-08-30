// components/poster/poster.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    open: {
      type: Boolean,
      value: false
    },
    posterData: {
      type: Object,
      value: {
        imgSrc: '../../assets/images/index_banner.png'
      }
    }
  },

  observers: {
    'open': function (val) {
      console.log(val)
      if(val) {
        this.drawPoster()
      }
      this.setData({
        showPoster: val
      })
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
      console.log('poster', this.properties.posterData)
      // this.drawPoster()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    drawPoster() {

      const imgSrc = this.properties.posterData.imgSrc

      var ctx = wx.createCanvasContext('poster', this)

      ctx.setFillStyle('#ffffff')
      ctx.fillRect(0, 0, 660, 970)
      ctx.drawImage(imgSrc, 50, 30, 560, 696)
      ctx.drawImage(imgSrc, 50, 762, 165, 165)
      ctx.setFillStyle('#333333')
      ctx.setFontSize(30)
      ctx.fillText('定制产品，更有市场！', 245, 792)
      ctx.setFillStyle('#666666')
      ctx.setFontSize(26)
      ctx.fillText('扫码变身合伙人，定制产品闯', 245, 845)
      ctx.fillText('市场！转发寻找你的合伙人！', 245, 880)
      ctx.draw(false, () => {
        this.fnCanvasToTempFilePath()
        this.setData({
          showPoster: true
        })
      })



    },

    fnCanvasToTempFilePath() {
      wx.canvasToTempFilePath({
        canvasId: 'poster',
        success: (res) => {
          this.setData({
            tempFilePath: res.tempFilePath
          })
        },
        fail: (res) => {},
        complete: (res) => {},
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
          if(auth) {
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

    checkSetting () {
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