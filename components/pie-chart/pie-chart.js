// components/pie-chart/pie-chart.js

const F2 = require('@antv/wx-f2')
let chart = null;

function initChart(canvas, width, height, F2) {
  const data = [
    { name: '芳华', percent: 4 },
    { name: '妖猫传', percent: 2 },
    { name: '机器之血', percent: 18 },
    { name: '心理罪', percent: 15 },
    { name: '寻梦环游记', percent: 5 },
    { name: '其他', percent: 2 }
  ];
  chart = new F2.Chart({
    el: canvas,
    width,
    height
  });
  chart.source(data);
  chart.legend(false);
  chart.tooltip({
    offsetY: -6
  });
  chart.coord('polar', {
    transposed: true,
    radius: 1,
    innerRadius: 0.618
  });
  chart.axis(false);
  chart.interval()
    .position('a*percent')
    .color('name')
    .adjust('stack')
    .style({
      lineWidth: 1,
      stroke: '#fff',
      lineJoin: 'round',
      lineCap: 'round'
    })
    .animate({
      appear: {
        duration: 1200,
        easing: 'bounceOut'
      }
    });
  chart.interaction('pie-select', {
    animate: {
      duration: 300,
      easing: 'backOut'
    }
  })

  chart.render();
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
