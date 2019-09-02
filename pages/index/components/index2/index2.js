// pages/index/components/index2/index2.js
const app = getApp()

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
    topSales: [],
    expensesHidden:true,
    interimHidden:false,// 期交保费
    singleHidden: true, // 趸交保费
    accidentHidden:true, // 意外险保费
    iHomeHidden:true, // 家庭账户
    interim: { // 期交保费
      goalWidth: 0,//目标宽度，控制目标文字的位置
      scheduleWidth: 0,//进度宽度，控制进度文字的位置
      goalLeft: 0,// 进度条目标位置，控制进度条目标小圆点的位置
      scheduleLeft: 0,// 进度条进度圆点位置，控制进度条长度及进度条圆点的位置
      sum: 1000,// 进度条总数
      goal: 800, // 进度条目标
      schedule: 300,// 当前已达成目标
      goalReached: false, // 是否达成目标
    },
    single: { // 趸交保费
      goalWidth: 0,//目标宽度，控制目标文字的位置
      scheduleWidth: 0,//进度宽度，控制进度文字的位置
      goalLeft: 0,// 进度条目标位置，控制进度条目标小圆点的位置
      scheduleLeft: 0,// 进度条进度圆点位置，控制进度条长度及进度条圆点的位置
      sum: 500,// 进度条总数
      goal: 300, // 进度条目标
      schedule: 400,// 当前已达成目标
      goalReached: false, // 是否达成目标
    },
    accident: { // 意外险保费
      goalWidth: 0,//目标宽度，控制目标文字的位置
      scheduleWidth: 0,//进度宽度，控制进度文字的位置
      goalLeft: 0,// 进度条目标位置，控制进度条目标小圆点的位置
      scheduleLeft: 0,// 进度条进度圆点位置，控制进度条长度及进度条圆点的位置
      sum: 10000,// 进度条总数
      goal: 6000, // 进度条目标
      schedule: 5000,// 当前已达成目标
      goalReached: false, // 是否达成目标
    },
    iHome: { // 家庭账户
      goalWidth: 0,//目标宽度，控制目标文字的位置
      scheduleWidth: 0,//进度宽度，控制进度文字的位置
      goalLeft: 0,// 进度条目标位置，控制进度条目标小圆点的位置
      scheduleLeft: 0,// 进度条进度圆点位置，控制进度条长度及进度条圆点的位置
      sum: 500,// 进度条总数
      goal: 300, // 进度条目标
      schedule: 150,// 当前已达成目标
      goalReached: false, // 是否达成目标
    },
    imgUrls: [{
      src: app.images.index2_banner_1,
      link: ''
    },
    {
      src: app.images.index2_banner_2,
      link: ''
    }
    ]
  },

  lifetimes: {
    attached: function () {
      this.getSales();
      this.getAchievementTarget();
      this.calculateSchedule('interim', 'interimGoal','interimSchedule');
      this.calculateSchedule('accident', 'accidentGoal', 'accidentSchedule');
      this.calculateSchedule('iHome', 'iHomeGoal', 'iHomeSchedule');
      this.calculateSchedule('single', 'singleGoal', 'singleSchedule');
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getSales: function () {
      app.API.getSales().then(res => {
        console.log(res)
        if (res.code == 200) {
          this.setData({
            topSales: res.result
          })
        }
      })
    },

    getAchievementTarget: function() {
      app.API.getAchievementTarget().then(res => {
        console.log(res)
      })
    },

    calculateSchedule: function (fieldName, goalElementId, scheduleElementId){
      // 之所以这么区分，是因为当算出小数时出现schedule和goal不相等，但却重合了的情况
      // 暂定这么处理
      var data = this.data[fieldName];
      var newData = JSON.parse(JSON.stringify(data));
      var goalLeft = 0;
      var scheduleLeft = 0;
      var goalReached = false;
      if (data.schedule < data.goal) {
        goalLeft = Math.ceil(data.goal * 100 / data.sum);
        scheduleLeft = Math.floor(data.schedule * 100 / data.sum);
      }
      if (data.schedule > data.goal) {
        goalReached = true;
        goalLeft = Math.floor(data.goal * 100 / data.sum);
        scheduleLeft = Math.ceil(data.schedule * 100 / data.sum);
      }
      if (data.schedule === data.goal) {
        goalReached = true;
        goalLeft = Math.ceil(data.goal * 100 / data.sum);
        scheduleLeft = Math.ceil(data.schedule * 100 / data.sum);
      }
      if (goalLeft < 2){ // 2是计算出的结果，由14/690得出，因为圆点是14rpx
        goalLeft = 2;
      }
      if (scheduleLeft < 2) {
        scheduleLeft = 2;
      }
      if (goalLeft > 100) {
        goalLeft = 100;
      }
      if (scheduleLeft > 100){
        scheduleLeft = 100;
      } 
      newData.goalLeft = goalLeft;
      newData.scheduleLeft = scheduleLeft;
      newData.goalReached = goalReached;
      var promise1 = new Promise((resolve,reject) => {
        this.createSelectorQuery().select('#' + goalElementId).boundingClientRect((rect) => {
          // 按照算法，本应是width，但不知道为啥，width总少点，right反倒是正好得
          if (rect) {
            console.log('----------------------------------------------')
            console.log(rect,fieldName)
            var rpxWidth = rect.width * app.globalData.sysInfo.pixelRatio;
            // // 690 是进度条总宽
            var goalWidth = rpxWidth / 2 + goalLeft * 690 / 100;
            if (goalWidth < rpxWidth) {
              goalWidth = rpxWidth;
            }
            if (goalWidth > 690) {
              goalWidth = 690;
            }
            newData.goalWidth = goalWidth;
            resolve('success');
          } else {
            reject('error');
          }
        }).exec()
      })
      var promise2 = new Promise( (resolve, reject) => {
        this.createSelectorQuery().select('#' + scheduleElementId).boundingClientRect((rect) => {
          // 按照算法，本应是width，但不知道为啥，width总少点，right反倒是正好得
          if(rect){
            var sWidth = rect.width * app.globalData.sysInfo.pixelRatio;
            // // 690 是进度条总宽
            var scheduleWidth = sWidth / 2 + scheduleLeft * 690 / 100;
            if (scheduleWidth < sWidth) {
              scheduleWidth = sWidth;
            }
            if (scheduleWidth > 690) {
              scheduleWidth = 690;
            }
            newData.scheduleWidth = scheduleWidth;
            resolve('success');
          }else{
            reject('error');
          }
        }).exec()
      })
      var list = [promise1, promise2]
      Promise.all(list).then(()=>{
        var sData = {}
        sData[fieldName] = newData
        console.log('--------------------------------------------------')
        console.log(fieldName,newData)
        this.setData(sData)
      })
    },
    showExpenses: function(){
      var hiddenValue = !this.data.expensesHidden;
      this.setData({ expensesHidden: hiddenValue});
    },
    changeTab: function (e) {
      var tab = e.currentTarget.dataset.tab
      var data = {};
      data.interimHidden = true;
      data.singleHidden = true;
      data.accidentHidden = true;
      data.iHomeHidden = true;
      data[tab] = false;
      this.setData(data);
    },

    toBookPage: function() {
      wx.navigateTo({
        url: '../businessplan/businessplan'
      })
    }
  }
})
