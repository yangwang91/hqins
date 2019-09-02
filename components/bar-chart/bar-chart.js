// components/bar-chart/bar-chart.js
const F2 = require('@antv/wx-f2')
let chart = null;

function initChart(canvas, width, height, F2) {
  var data = [{
      year: '1951 年',
      sales: 38
    },
    {
      year: '1952 年',
      sales: 52
    },
    {
      year: '1956 年',
      sales: 61
    },
    {
      year: '1957 年',
      sales: 145
    },
    {
      year: '1958 年',
      sales: 48
    },
    {
      year: '1959 年',
      sales: 38
    },
    {
      year: '1960 年',
      sales: 38
    },
    {
      year: '1962 年',
      sales: 38
    },
  ];
  chart = new F2.Chart({
    el: canvas,
    width,
    height
  });

  chart.source(data, {
    sales: {
      tickCount: 5
    }
  });

  chart.legend(false);
  // chart.axis('sales', false)
  chart.axis('sales', {
    line: null,
    grid: null,
    tickLine: null,
    label: null
  })

  chart.coord({
    transposed: true
  });

  chart.tooltip(false);
  chart.interval().position('year*sales');
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
        text: obj.sales,
        textAlign: 'start',
        textBaseline: 'bottom',
        fill: '#808080'
      }
    });

    shapes[obj.year] = text; // 缓存该 shape, 便于后续查找
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
        const textShape = shapes[data.year];
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
}

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
    opts: {
      onInit: initChart
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})