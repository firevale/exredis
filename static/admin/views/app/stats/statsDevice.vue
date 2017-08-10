<template>
  <div class="mod-body">
    <div class="toolbar" style="margin-bottom:1rem;">
      <el-radio-group v-model="statsType" @change="changePlatform">
        <el-radio-button label="model">机型</el-radio-button>
        <el-radio-button label="os">操作系统</el-radio-button>
        <el-radio-button label="mem">内存</el-radio-button>
      </el-radio-group>
      <span style="margin-right:15px;margin-right:15px;"></span>
      <el-radio-group v-model="dateType" @change="changeDateType">
        <el-radio-button label="today">今日</el-radio-button>
        <el-radio-button label="week">最近一周</el-radio-button>
        <el-radio-button label="month">最近一月</el-radio-button>
        <el-radio-button label="custom">自定义</el-radio-button>
      </el-radio-group>
      <span style="margin-right:15px;"></span>
      <el-date-picker ref="datePicker" v-show="dateType == 'custom'" v-model="dateRange" type="daterange" placeholder="选择日期范围"
        :picker-options="pickerOptions" @change="changeDateRange">
      </el-date-picker>
    </div>
    <div class="tile is-ancestor is-vertical">
      <div class="tile">
        <div class="tile is-4 is-parent">
          <div class="tile is-child box card">
            <header class="card-header">
              <p class="card-header-title">
                <span class="icon">
                  <i class="fa fa-mobile"></i>
                </span>设备平台
              </p>
            </header>
            <div class="card-content">
              <pie ref="chart" :options="platformOptions" :height="300" :data="chart_platforms"></pie>
            </div>
          </div>
        </div>
        <div class="tile is-parent">
          <div class="tile is-child  box card">
            <header class="card-header">
              <p class="card-header-title">{{statsType =="model" ?"设备机型":"操作系统"}}
              </p>
            </header>
            <div class="card-content">
              <horizontal-bar ref="chart2" :options="modelOptions" :height="300" :data="chart_models"></horizontal-bar>
            </div>
          </div>
        </div>
      </div>
      <div class="tile is-parent">
        <div class="tile is-child box">
          <header class="card-header">
            <p class="card-header-title">明细数据
            </p>
          </header>
          <div class="card-content is-paddingless">
            <el-table stripe :data="reports" style="width: 100%" :default-sort="{prop: 'count', order: 'descending'}">
              <el-table-column v-if="statsType == 'model'" prop="model" label="机型" width="500">
              </el-table-column>
              <el-table-column v-if="statsType == 'os'" prop="os" label="操作系统" width="500">
              </el-table-column>
              <el-table-column prop="count" label="数量" sortable width="180">
              </el-table-column>
              <el-table-column prop="count" label="占比" sortable>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import {
  Tabs,
  TabPane
} from 'vue-bulma-tabs'

import 'common/js/date'
import Datepicker from 'vue-bulma-datepicker'
import {
  Bar,
  HorizontalBar,
  Pie
} from './device-bar'

export default {
  components: {
    Tabs,
    TabPane,
    Bar,
    HorizontalBar,
    Pie
  },
  async mounted() {
    await this.fetchData()
    await this.getDetails()
  },

  data() {
    return {
      statsType: 'model',
      platform: 'all',
      dateType: 'today',
      dateRange: [],
      page: 0,
      total: 1,
      pickerOptions: {
        disabledDate: function(date) {
          var limitDate = new Date();
          limitDate.setTime(limitDate.getTime() - 3600 * 1000 * 24)
          return date > limitDate
        }
      },
      chart_platforms: {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: []
        }]
      },
      reports_colors: ['rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)'
      ],
      chart_models: {
        labels: [],
        datasets: [{
          label: '设备数',
          data: [],
          backgroundColor: []
        }]
      },
      reports: []
    }
  },
  computed: {
    ...mapGetters([
      'app'
    ]),
    platformOptions() {
      let _this = this
      return {
        responsive: true,
        maintainAspectRatio: false,
        onClick: function() {
          _this.changePlatform(this)
        }
      }
    },
    modelOptions() {
      let _this = this
      return {
        responsive: true,
        maintainAspectRatio: false,
        onClick: function() {
          _this.platform = 'all'
        }
      }
    }
  },
  watch: {
    'platform': function(val) {
      if (val) {
        this.page = 0
        this.fetchData()
        this.getDetails()
      }
    },
    'statsType': function(val) {
      if (val) {
        this.page = 0
        this.fetchData()
        this.getDetails()
      }
    }
  },

  methods: {
    changePlatform: function(chart) {
      if (chart.active[0]) {
        this.platform = chart.active[0]._model.label == 'iPhone' ? 'ios' : 'android'
      } else {
        this.platform = 'all'
      }
    },
    changeDateType: function(val) {
      if (val != 'custom')
        this.fetchData()
      else
        this.$refs.datePicker.handleFocus()
    },
    changeDateRange: function(val) {
      // this.fetchData()
    },
    calcRate: function(report, nday) {
      var now = new Date()
      var start = new Date().setTime(Date.parse(report.date) + 3600 * 1000 * 24 * nday)
      if (start > now)
        return -1

      let record = report.user_retentions.find(rpt => rpt.nday == nday)
      if (record && report.danu > 0) {
        return ((record.retention / report.danu) * 100).toFixed(2)
      } else {
        return 0
      }
    },
    fetchData: async function() {
      switch (this.dateType) {
        case 'week':
          var end = new Date();
          var start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          end.setTime(end.getTime() - 3600 * 1000 * 24)
          this.dateRange = [start, end]
          break
        case 'month':
          var end = new Date();
          var start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 31);
          end.setTime(end.getTime() - 3600 * 1000 * 24)
          this.dateRange = [start, end]
          break
      }

      let data = {
        platform: this.platform,
        stats_type: this.statsType,
        // start_date: this.dateRange[0].Format("yyyy-MM-dd"),
        // end_date: this.dateRange[1].Format("yyyy-MM-dd")
      }

      let result = await this.$acs.getStatsDevice(data)
      if (result.success) {
        this.chart_models = result.chart_models
        this.update_chart_platforms(result.platforms)
        this.update_model_chart(result.reports)
      }
    },
    update_chart_platforms(chart_models) {
      if (!chart_models) {
        return
      }

      this.chart_platforms = Object.assign({}, {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: []
        }]
      })

      var iphone = chart_models.find(r => r.platform == "ios")
      if (iphone) {
        this.chart_platforms.labels.push("iPhone")
        this.chart_platforms.datasets[0].data.push(iphone.count)
        this.chart_platforms.datasets[0].backgroundColor.push('rgba(54, 162, 235, 0.8)')
      }

      var android = chart_models.find(r => r.platform == "android")
      if (android) {
        this.chart_platforms.labels.push("Android")
        this.chart_platforms.datasets[0].data.push(android.count)
        this.chart_platforms.datasets[0].backgroundColor.push('rgba(75, 192, 192, 0.8)')
      }
    },
    update_model_chart(chart_models) {
      if (!chart_models) {
        return
      }

      this.chart_models = {
        labels: [],
        datasets: [{
          label: '设备数',
          data: [],
          backgroundColor: []
        }]
      }

      chart_models.forEach((rpt, index) => {
        this.chart_models.labels.push(rpt.model || rpt.os)
        this.chart_models.datasets[0].data.push(rpt.count)
        this.chart_models.datasets[0].backgroundColor.push(this.reports_colors[index % this.reports_colors
          .length])
      })

    },
    getDetails: async function() {
      var data = {
        platform: this.platform,
        stats_type: this.statsType,
        page: this.page + 1,
        records_per_page: 30
      }

      let result = await this.$acs.getStatsDeviceDetails(data)
      if (result.success) {
        this.reports = result.reports
        this.total = result.total
        this.page++
      }
    },
  },
}
</script>
<style lang="scss" scoped>
</style>