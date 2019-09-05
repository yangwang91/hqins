// components/bar-chart/bar-chart.js
const F2 = require('@antv/wx-f2')
// let chart = null;

// function initChart

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    opts: {
      lazyLoad: true
    },
  },

  observers: {
    'data': function(val) {
      console.log(val)

      if(val) {
        this.initChart(val)
      }

      // this.setData({
      //   source: val,
      //   [`opts.onInit`]: initChart
      // })
    }
  },

  lifetimes: {
    attached() {

    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    initChart(data) {
      const com = this.selectComponent('#bar-dom')
      com.init((canvas, width, height, F2) => {
        // var data = [];
        let chart = new F2.Chart({
          el: canvas,
          width,
          height
        });

        chart.source(data, {
          Number: {
            tickCount: 5
          }
        });

        chart.legend(false);
        // chart.axis('Number', false)
        chart.axis('Number', {
          line: null,
          grid: null,
          tickLine: null,
          label: null
        })

        chart.coord({
          transposed: true
        });

        chart.tooltip(false);
        chart.interval().position('ProductName*Number');
        chart.render();

        // 绘制柱状图文本
        // const offset = 5;
        const chartCanvas = chart.get('canvas');
        const group = chartCanvas.addGroup();
        const shapes = {};
        data.map(obj => {
          const point = chart.getPosition(obj);
          const text = group.addShape('text', {
            attrs: {
              x: point.x + 5,
              y: point.y + 7,
              text: obj.Number,
              textAlign: 'start',
              textBaseline: 'bottom',
              fill: '#808080'
            }
          });

          shapes[obj.ProductName] = text; // 缓存该 shape, 便于后续查找
        });

        let lastTextShape; // 上一个被选中的 text
        // 配置柱状图点击交互
        chart.interaction('interval-select', {
          selectAxisStyle: {
            fill: '#000',
            fontWeight: 'bold'
          },
          mode: 'range',
          onEnd(ev) {
            const {
              data,
              selected
            } = ev;
            lastTextShape && lastTextShape.attr({
              fill: '#808080',
              fontWeight: 'normal'
            });
            if (selected) {
              const textShape = shapes[data.ProductName];
              textShape.attr({
                fill: '#000',
                fontWeight: 'bold'
              });
              lastTextShape = textShape;
            }
            chartCanvas.draw();
          }
        });
        return chart;
      })
    }
  }
})