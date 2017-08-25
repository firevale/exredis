<template>
  <div class="mod-body">
    <div class="toolbar" style="margin-bottom:1rem;">
      <el-radio-group v-model="platform" @change="changePlatform">
        <el-radio-button label="all">全部</el-radio-button>
        <el-radio-button label="ios">iOS</el-radio-button>
        <el-radio-button label="android">Android</el-radio-button>
      </el-radio-group>
      <span style="margin-right:15px;margin-right:15px;"></span>
      <span style="margin-right:15px;"></span>
      <el-date-picker ref="datePicker" v-model="date" type="date" placeholder="选择日期" :picker-options="pickerOptions"
        @change="changeDate">
      </el-date-picker>
    </div>
    <div class="tile is-ancestor is-vertical">
      <div class="tile is-parent">
        <div class="tile is-child  box card is-paddingless">
          <header class="card-header">
            <p class="card-header-title">使用时长分布
            </p>
          </header>
          <div class="card-content">
            <bar ref="chart2" :options="modelOptions" :height="300" :data="chart_reports"></bar>
          </div>
        </div>
      </div>
      <div class="tile is-parent">
        <div class="tile is-child box is-paddingless">
          <header class="card-header">
            <p class="card-header-title">使用时长分布明细
            </p>
          </header>
          <div class="card-content is-paddingless">
            <!-- 操作系统 -->
            <el-table stripe :data=" this.timings" style="width: 100%" @sort-change="sortChange">
              <el-table-column label="时长" width="200">
                <template scope="scope">
                  {{ labels[scope.$index] }}
                </template>
              </el-table-column>
              <el-table-column label="启动次数" align="right" sortable width="180">
                <template scope="scope">
                  {{ scope.row }}
                </template>
              </el-table-column>
              <el-table-column label="启动次数占比" align="right" sortable width="180">
                <template scope="scope">
                  {{ scope.row }}
                </template>
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
    this.date = this.defaultDate
    await this.fetchData()
  },

  data() {
    return {
      statsType: 'model',
      platform: 'all',
      memSize: [],
      orderBy: {},
      dateType: 'week',
      date: '',
      page: 0,
      total: 1,
      pickerOptions: {
        disabledDate: function(date) {
          var limitDate = new Date();
          limitDate.setTime(limitDate.getTime() - 3600 * 1000 * 24)
          return date > limitDate
        }
      },
      labels: ['0-5分钟', '5-10分钟', '10-15分钟', '15-20分钟', '20-25分钟', '25-30分钟', '30-35分钟',
        '35-40分钟', '40-45分钟', '45-50分钟', '50-55分钟', '55-60分钟', '60分钟以上'
      ],
      reports_colors: ['rgba(75, 192, 192, 0.8)',
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)'
      ],
      platform_timings: [],
      chart_reports: {
        labels: [],
        datasets: [],
      },
      reports: [],
    }
  },
  computed: {
    ...mapGetters([
      'app'
    ]),
    defaultDate() {
      var start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24);
      return start.Format("yyyy-MM-dd")
    },
    modelOptions() {
      let _this = this
      return {
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            barPercentage: 0.7,
          }]
        },
        onClick: function() {
          _this.platform = 'all'
        }
      }
    },
    timings() {
      var platform_index = this.platform == "all" ? 0 : (this.platform == "android" ? 1 : 2)
      return this.platform_timings[platform_index]
    }
  },

  methods: {
    changeDate: function(date) {
      if (!date) {
        this.date = this.defaultDate
      }
      this.page = 1
      this.fetchData()
    },
    changePlatform: function(chart) {
      this.update_chart()
    },
    changePage: function(page) {},
    sortChange: function(column) {
      var field = column.prop

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
    fetchData: async function() {
      let result = await this.$acs.getUserTimingByDay({
        date: this.date instanceof Date ? this.date.Format("yyyy-MM-dd") : this.date
      })
      if (result.success) {
        this.platform_timings = result.timing
        this.update_chart()
      }
    },
    update_chart() {
      this.chart_reports = Object.assign({}, {
        labels: this.labels,
        datasets: [{
          data: [],
          backgroundColor: []
        }]
      })

      this.timings.forEach((timing, index) => {
        // this.chart_reports.datasets[0].data.push(timing)
        this.chart_reports.datasets[0].data.push(Math.round(Math.random() * 100))
        this.chart_reports.datasets[0].backgroundColor.push(this.reports_colors[0])
      })

    }
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