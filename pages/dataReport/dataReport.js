// pages/dataReport/dataReport.js
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
    "chartData": {
      "series": [{
        "name": "一班",
        "data": 50
      }, {
        "name": "二班",
        "data": 30
      }, {
        "name": "三班",
        "data": 20
      }, {
        "name": "四班",
        "data": 18
      }, {
        "name": "五班",
        "data": 8
      }]
    }
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
      console.log(res)
      this.setData({
        dayScore: res.result || []
      })
    })
  },  

  getUnderwriting () {
    app.API.getUnderwriting().then(res => {
      // this.setData({
      //   underwriting: res.result || []
      // })
      var dataList = res.result || [];
      if(dataList && dataList.length>0){
        for(var i=0;i<dataList.length;i++){
          var item = dataList[i]
          if(item.name=='Sum'){
            dataList.splice(i, 1);
          }
        }
      }
      this.showPie('pieChart', dataList)
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