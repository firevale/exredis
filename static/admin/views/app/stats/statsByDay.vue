<template>
  <div class="dashboard">
    <div class="toolbar" style="margin-bottom:1rem;">
      <el-radio-group v-model="platform" @change="changePlatform">
        <el-radio-button label="all">全部</el-radio-button>
        <el-radio-button label="ios">iOS</el-radio-button>
        <el-radio-button label="android">Android</el-radio-button>
      </el-radio-group>
      <span style="margin-right:15px;margin-right:15px;"></span>
      <el-date-picker v-model="date" :editable="false" type="date" @change="changeDate" :placeholder="$t('admin.stats.selectDate')">
      </el-date-picker>
      <span style="margin-right:15px;"></span>
    </div>
    <nav class="level">
      <div class="level-item has-text-centered box">
        <div>
          <p class="heading">{{ $t('admin.app.dau') }}</p>
          <p class="title">{{ reports ? reports[0].dau : 0 }}
            <sub>[ios: {{ reports ? reports[2].dau : 0  }}, android: {{ reports ? reports[1].dau : 0 }}]</sub>
          </p>
        </div>
      </div>
      <div class="level-item has-text-centered box">
        <div>
          <p class="heading">{{ $t('admin.app.danu') }}</p>
          <p class="title">{{ reports ? reports[0].danu : 0 }}
            <sub>[ios: {{ reports ? reports[2].danu : 0  }}, android: {{ reports ? reports[1].danu : 0 }}]</sub>
          </p>
        </div>
      </div>
      <div class="level-item has-text-centered box">
        <div>
          <p class="heading">{{ $t('admin.app.dapu') }}</p>
          <p class="title">{{ reports ? reports[0].dapu : 0 }}
            <sub>[ios: {{ reports ? reports[2].dapu : 0  }}, android: {{ reports ? reports[1].dapu : 0 }}]</sub>
          </p>
        </div>
      </div>
      <div class="level-item has-text-centered box">
        <div>
          <p class="heading">{{ $t('admin.app.danpu') }}</p>
          <p class="title">{{ reports ? reports[0].danpu : 0 }}
            <sub>[ios: {{ reports ? reports[2].danpu : 0  }}, android: {{ reports ? reports[1].danpu : 0 }}]</sub>
          </p>
        </div>
      </div>
    </nav>
    <nav class="level">
      <div class="level-item has-text-centered box">
        <div>
          <p class="heading">{{ $t('admin.app.dad') }}</p>
          <p class="title">{{ reports ? reports[0].dad : 0 }}
            <sub>[ios: {{ reports ? reports[2].dad : 0  }}, android: {{ reports ? reports[1].dad : 0 }}]</sub>
          </p>
        </div>
      </div>
      <div class="level-item has-text-centered box">
        <div>
          <p class="heading">{{ $t('admin.app.dand') }}</p>
          <p class="title">{{ reports ? reports[0].dand : 0 }}
            <sub>[ios: {{ reports ? reports[2].dand : 0  }}, android: {{ reports ? reports[1].dand : 0 }}]</sub>
          </p>
        </div>
      </div>
      <div class="level-item has-text-centered box">
        <div>
          <p class="heading">{{ $t('admin.app.totalFee') }}</p>
          <p class="title">{{ reports ? reports[0].total_fee : 0 }}
            <sub>[ios: {{ reports ? reports[2].total_fee : 0  }}, android: {{ reports ? reports[1].total_fee : 0 }}]</sub>
          </p>
        </div>
      </div>
      <div class="level-item has-text-centered box">
        <div>
          <p class="heading">&nbsp;</p>
          <p class="title">{{ 0 }}
            <sub>[ios: 0, android: 0]</sub>
          </p>
        </div>
      </div>
    </nav>
    <article class="tile box chart">
      <bar-chart ref="chart" :options="options" :width="'100%'"></bar-chart>
    </article>
  </div>
</template>
<script>
import 'common/js/date'
import Datepicker from 'vue-bulma-datepicker'
import BarChart from 'admin/components/chart/bar'

export default {

  data() {
    return {
      barData: {
        labels: ['0-5分钟', '5-10分钟', '10-15分钟', '15-20分钟', '20-25分钟', '25-30分钟', '30-35分钟',
          '35-40分钟', '40-45分钟',
          '45-50分钟', '50-55分钟', '55-60分钟', '60分钟以上'
        ],
        datasets: [{
          label: "在线时长统计",
          data: this.currentTiming,
        }]
      },
      options: {
        segmentShowStroke: false,
        responsive: true,
        maintainAspectRatio: false,
        pointDot: false,
        pointDotRadius: 0,
      },
      date: null,
      currentTiming: [],
      reports: null,
      timing: null,
      platform: 'all',
    }
  },

  mounted: function() {
    this.getStatsByDay()
    this.getUserTimingByDay()
  },

  methods: {
    changePlatform: function(val) {
      switch (this.platform) {
        case 'all':
          this.currentTiming = this.timing[0]
          break;
        case 'android':
          this.currentTiming = this.timing[1]
          break;
        default:
          this.currentTiming = this.timing[2]
      }
    },

    changeDate: function() {
      this.getStatsByDay()
      this.getUserTimingByDay()
    },

    getStatsByDay: async function() {
      let result = await this.$acs.getStatsByDay({
        date: this.date ? this.date.Format("yyyy-MM-dd") : ""
      })

      if (result.success && result.reports) {
        this.reports = result.reports
        this.date = Date.parse(result.date)
      }
    },

    getUserTimingByDay: async function() {
      let result = await this.$acs.getUserTimingByDay({
        date: this.date ? this.date.Format("yyyy-MM-dd") : ""
      })

      if (result.success && result.timing) {
        this.timing = result.timing
        this.date = Date.parse(result.date)
        this.changePlatform()
        this.$refs.chart.updateChart(this.barData)
      }
    }
  },

  components: {
    BarChart,
    Datepicker
  }
}
</script>
<style lang="scss">
.dashboard {
  .box:not(:last-child) {
    margin-bottom: 0;
  }
  article.chart {
    background: #212733;
    div {
      flex-grow: 1;
      background: #212733;
    }
  }
  p.title {
    sub {
      font-size: 0.9rem;
    }
  }
}
</style>