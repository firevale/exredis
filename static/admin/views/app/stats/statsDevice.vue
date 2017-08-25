<template>
  <div class="mod-body">
    <div class="toolbar" style="margin-bottom:1rem;">
      <el-radio-group v-model="statsType" @change="changeStatsType">
        <el-radio-button label="model">机型</el-radio-button>
        <el-radio-button label="os">操作系统</el-radio-button>
      </el-radio-group>
      <span style="margin-right:15px;margin-right:15px;"></span>
      <el-radio-group v-model="dateType" @change="changeDateType">
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
          <div class="tile is-child box card is-paddingless">
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
          <div class="tile is-child  box card is-paddingless">
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
        <div class="tile is-child box is-paddingless">
          <header class="card-header">
            <p class="card-header-title">明细数据
            </p>
          </header>
          <div class="card-content is-paddingless">
            <!-- 机型 -->
            <el-table v-if="statsType == 'model'" key="tb-model" stripe :data="reports" style="width: 100%" @filter-change="filterMemSize"
              @sort-change="sortChange" :default-sort="{prop: 'count', order: 'descending'}">
              <el-table-column label="机型" width="500">
                <template scope="scope">
                  {{ scope.row.alias != null ? scope.row.alias : scope.row.model }}
                </template>
              </el-table-column>
              <el-table-column prop="total_mem_size" align="right" label="内存" width="180" :filters="mem_filter_opts"
                :filter-multiple="false" column-key="memSize">
                <template scope="scope">
                  {{ scope.row.total_mem_size | bytesToSize }}
                </template>
              </el-table-column>
              <el-table-column prop="count" label="数量" align="right" sortable="custom" width="180">
              </el-table-column>
              <el-table-column>
              </el-table-column>
            </el-table>
            <!-- 操作系统 -->
            <el-table v-if="statsType == 'os'" key="tb-os" stripe :data="reports" style="width: 100%" @sort-change="sortChange"
              :default-sort="{prop: 'count', order: 'descending'}">
              <el-table-column label="操作系统" width="200">
                <template scope="scope">
                  {{ scope.row.os != null ? scope.row.os : "" }}
                </template>
              </el-table-column>
              <el-table-column prop="count" label="数量" align="right" sortable="custom" width="180">
              </el-table-column>
              <el-table-column>
              </el-table-column>
            </el-table>
            <div v-if="reports && reports.length>0" class="ele-pagination">
              <el-pagination layout="prev, pager, next" :page-count="total" :current-page.sync="page" @current-change="changePage">
              </el-pagination>
            </div>
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
      memSize: [],
      orderBy: {},
      dateType: 'week',
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
          label: '新增设备数',
          data: [],
          backgroundColor: []
        }]
      },
      reports: [],
      mem_filter_opts: [{
        text: '大于2G',
        value: [2040109465, 107374182400]
      }, {
        text: '1G~2G',
        value: [1073741824, 2040109465]
      }, {
        text: '小于1G',
        value: [0, 1073741824]
      }],
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
        legend: {
          display: false
        },
        onClick: function() {
          _this.platform = 'all'
        }
      }
    }
  },
  watch: {
    'platform': function(val) {
      if (val) {
        this.page = 1
        this.fetchData()
        this.getDetails()
      }
    }
  },

  methods: {
    changeStatsType: function() {
      this.page = 1
      if (this.platform != "all") {
        this.platform = "all"
      } else {
        this.fetchData()
        this.getDetails()
      }
    },
    changePlatform: function(chart) {
      if (chart.active && chart.active.length > 0) {
        this.platform = chart.active[0]._model.label == 'iOS' ? 'ios' : 'android'
      } else {
        this.platform = 'all'
      }
    },
    changePage: function(page) {
      // this.page = page
      this.getDetails()
    },
    filterMemSize: function(filters) {
      this.page = 1
      this.memSize = filters.memSize[0] || []
      this.getDetails()
    },
    sortChange: function(column) {
      var field = column.prop
      if (field == "total_mem_size") {
        field = "device.total_mem_size"
      }

      if (column.column == null) {
        this.orderBy = {}
      } else if (column.order == "descending") {
        this.orderBy[column.prop] = "desc"
      } else {
        this.orderBy[column.prop] = "asc"
      }

      this.page = 1
      this.getDetails()
    },
    changeDateType: async function(val) {
      if (val != 'custom') {
        this.page = 1
        await this.fetchData()
      } else {
        this.$refs.datePicker.handleFocus()
      }
    },
    changeDateRange: function(val) {
      this.page = 1
      this.fetchData()
      this.getDetails()
    },
    calcRate: function() {
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
    },
    fetchData: async function() {
      this.calcRate()
      let data = {
        platform: this.platform,
        stats_type: this.statsType,
        start_date: this.dateRange[0].Format("yyyy-MM-dd"),
        end_date: this.dateRange[1].Format("yyyy-MM-dd")
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
        this.chart_platforms.labels.push("iOS")
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
      this.calcRate()
      var data = {
        platform: this.platform,
        stats_type: this.statsType,
        mem_size: this.memSize,
        start_date: this.dateRange[0].Format("yyyy-MM-dd"),
        end_date: this.dateRange[1].Format("yyyy-MM-dd"),
        order_by: this.orderBy,
        page: this.page,
        records_per_page: 10
      }
      this.reports = []
      let result = await this.$acs.getStatsDeviceDetails(data)
      if (result.success) {
        this.reports = result.reports
        this.total = result.total
      }
    },
  },
}
</script>
<style lang="scss">
.ele-pagination {
  display: flex;
  height: 60px;
  align-items: center;
  justify-content: center;
  li.number {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>