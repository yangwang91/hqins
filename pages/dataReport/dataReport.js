// pages/dataReport/dataReport.js
// const Page = global.GioPage;
import uCharts from '../../utils/u-charts.js'
var pieChart = null;
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dayScore: [],
    underwriting: [],
    chartHeight:500
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDayScore()
    this.getUnderwriting()
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

  getDayScore () {
    app.API.getDayScore().then(res => {
      console.log(res,'-------getDayScore--------')
      const dayScore = res.result || []
      if (dayScore.length > 0) {
        this.setData({
          chartHeight: 100 * dayScore.length
        })
      }
      this.setData({
        dayScore: dayScore
      })
    })
  },  

  getUnderwriting () {
    app.API.getUnderwriting().then(res => {
      var dataList = res.result || [];
      console.log(dataList,'--------getUnderwriting----------')
      this.setData({ underwriting: dataList})
      // this.showPie('pieChart', dataList)
    })
  },  
  showPie(canvasId, series = []) {
    const _self = this
    pieChart = new uCharts({
      $this: _self,
      canvasId: canvasId,
      type: 'pie',
      fontSize: 11,
      legend: { lineHeight: 15 },
      background: '#FFFFFF',
      pixelRatio: 1,
      series: series,
      animation: true,
      width: wx.getSystemInfoSync().windowWidth,
      height: 500 / 750 * wx.getSystemInfoSync().windowWidth,
      dataLabel: true,
      extra: {
        pie: {
          lableWidth: 15,
          border:true,
          borderWidth:1
        }
      }
    });

  },

  touchPie(e) {
    pieChart.showToolTip(e, {
      format: function (item) {
        return item.name + ':' + item.data
      }
    });
  },


})