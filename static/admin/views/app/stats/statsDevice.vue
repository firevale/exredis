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
              <pie ref="chart" :options="barOptions" :height="300" :data="platforum_reports"></pie>
            </div>
          </div>
        </div>
        <div class="tile is-parent">
          <div class="tile is-child  box card">
            <header class="card-header">
              <p class="card-header-title">设备机型
              </p>
            </header>
            <div class="card-content">
              <horizontal-bar ref="chart2" :options="barOptions" :height="300" :data="reports"></horizontal-bar>
            </div>
          </div>
        </div>
      </div>
      <div class="tile is-parent">
        <el-table class="tile is-child box" :data="tableData" border style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
          <el-table-column prop="date" label="机型" width="500">
          </el-table-column>
          <el-table-column prop="name" label="数量" sortable width="180">
          </el-table-column>
          <el-table-column prop="address" label="占比" sortable>
          </el-table-column>
        </el-table>
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
  mounted() {

  },

  data() {
    return {
      statsType: 'model',
      platform: 'all',
      dateType: 'today',
      dateRange: [],
      pickerOptions: {
        disabledDate: function(date) {
          var limitDate = new Date();
          limitDate.setTime(limitDate.getTime() - 3600 * 1000 * 24)
          return date > limitDate
        }
      },
      platforum_reports: {
        labels: ["iPhone", "Android"],
        datasets: [{
          data: [80, 20],
          backgroundColor: [
            'rgba(54, 162, 235, 0.8)',
            'rgba(75, 192, 192, 0.8)',
          ]
        }]
      },
      reports: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
          label: '设备数',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)'
          ]
        }]
      },
    }
  },
  computed: {
    ...mapGetters([
      'app'
    ]),
    barOptions() {
      let _this = this
      return {
        responsive: true,
        maintainAspectRatio: false,
        onClick: function() {
          _this.changePlatform(this)
        }
      }
    }
  },
  watch: {
    app: function(newVal) {

    }
  },

  methods: {
    changePlatform: function(chart) {
      if (chart.active[0]) {
        this.platform = chart.active[0]._model.label.toLowerCase()
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
      this.fetchData()
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
        start_date: this.dateRange[0].Format("yyyy-MM-dd"),
        end_date: this.dateRange[1].Format("yyyy-MM-dd")
      }

      let result = await this.$acs.getRetentionStats(data)
      if (result.success) {
        this.reports = result.reports
      }
    }
  },
}
</script>
<style lang="scss" scoped>
</style>