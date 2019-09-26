// pages/index/components/pie-chart/pie-chart.js

import uCharts from '../../../../utils/u-charts.js'

var canvaColumn = null;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    source: {
      type: {
        type: Array,
        value: []
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    chartData: {
      categories: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      series: [{
        "name": "月度标保",
        "data": []
      }]
    }
  },

  lifetimes: {
    attached() {
      
    }
  },

  observers: {
    'source': function(val) {
      console.log(val)
      // this.setData({
      //   [`chartData.serise.data`]: val
      // })
      const series = [{
        name: '月度标保',
        data: val
      }]
      this.showColumn('canvasColumn', series)
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showColumn(canvasId, series) {
      const _self = this
      canvaColumn = new uCharts({
        $this: _self,
        canvasId: canvasId,
        type: 'column',
        legend: true,
        fontSize: 11,
        background: '#FFFFFF',
        pixelRatio: 1,
        animation: true,
        categories: _self.data.chartData.categories,
        series: series,
        padding: [30,15,10,10],
        title: {
          name: '月度标保'
        },
        xAxis: {
          disableGrid: true,
        },
        yAxis: {
          min: 0,
          titleFontSize:0,
          format: (val) => { return val.toFixed(0) }
        },
        dataLabel: false,
        width: wx.getSystemInfoSync().windowWidth,
        height: 500 / 750 * wx.getSystemInfoSync().windowWidth,
        extra: {
          column: {
            type: 'group',
            width: wx.getSystemInfoSync().windowWidth * 0.45 / _self.data.chartData.categories.length
          }
        }
      });

    },

    touchColumn(e) {
      canvaColumn.showToolTip(e, {
        format: function (item, category) {
          if (typeof item.data === 'object') {
            return category + ' ' + item.name + '：' + item.data.value + '万元'
          } else {
            return category + ' ' + item.name + '：' + item.data + '万元'
          }
        }
      });
    },
  }
})
