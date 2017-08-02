<template>
  <div class="dashboard">
    <div class="toolbar" style="margin-bottom:1rem;">
      <el-radio-group v-model="platform">
        <el-radio-button label="all">全部</el-radio-button>
        <el-radio-button label="ios">iOS</el-radio-button>
        <el-radio-button label="android">Android</el-radio-button>
      </el-radio-group>
      <span style="margin-right:15px;margin-right:15px;"></span>
      <el-date-picker v-model="dateRange" type="daterange" placeholder="选择日期范围">
      </el-date-picker>
      <span style="margin-right:15px;"></span>
    </div>
    <div class="columns">
      <div class="column is-3 ">
        <div class="field has-addons">
          <p class="control">
            <a class="button is-primary">全部</a>
          </p>
          <p class="control">
            <a class="button">iOS</a>
          </p>
          <p class="control">
            <a class="button">Android</a>
          </p>
        </div>
      </div>
      <div class="column is-3 ">
        <datepicker :placeholder="$t('admin.stats.selectDate')" :config="{ dateFormat: 'Y-m-d', static: true }"
          :value="this.date"></datepicker>
      </div>
    </div>
    <nav class="level">
      <div class="level-item has-text-centered box">
        <div>
          <p class="heading">{{ $t('admin.app.dau') }}</p>
          <p class="title">{{ reports ? briefStats.dau.ios + briefStats.dau.android : 0 }}
            <sub>[ios: {{ briefStats ? briefStats.dau.ios : 0  }}, android: {{ briefStats ? briefStats.dau.android : 0 }}]</sub>
          </p>
        </div>
      </div>
      <div class="level-item has-text-centered box">
        <div>
          <p class="heading">{{ $t('admin.app.danu') }}</p>
          <p class="title">{{ briefStats ? briefStats.danu.ios + briefStats.danu.android : 0 }}
            <sub>[ios: {{ briefStats ? briefStats.danu.ios : 0  }}, android: {{ briefStats ? briefStats.danu.android : 0 }}]</sub>
          </p>
        </div>
      </div>
      <div class="level-item has-text-centered box">
        <div>
          <p class="heading">{{ $t('admin.app.dapu') }}</p>
          <p class="title">{{ briefStats ? briefStats.danu.ios + briefStats.danu.android : 0 }}
            <sub>[ios: {{ briefStats ? briefStats.danu.ios : 0  }}, android: {{ briefStats ? briefStats.danu.android : 0 }}]</sub>
          </p>
        </div>
      </div>
      <div class="level-item has-text-centered box">
        <div>
          <p class="heading">{{ $t('admin.app.danpu') }}</p>
          <p class="title">{{ briefStats ? briefStats.danu.ios + briefStats.danu.android : 0 }}
            <sub>[ios: {{ briefStats ? briefStats.danu.ios : 0  }}, android: {{ briefStats ? briefStats.danu.android : 0 }}]</sub>
          </p>
        </div>
      </div>
    </nav>
    <nav class="level">
      <div class="level-item has-text-centered box">
        <div>
          <p class="heading">{{ $t('admin.app.dad') }}</p>
          <p class="title">{{ briefStats ? briefStats.danu.ios + briefStats.danu.android : 0 }}
            <sub>[ios: {{ briefStats ? briefStats.danu.ios : 0  }}, android: {{ briefStats ? briefStats.danu.android : 0 }}]</sub>
          </p>
        </div>
      </div>
      <div class="level-item has-text-centered box">
        <div>
          <p class="heading">{{ $t('admin.app.dand') }}</p>
          <p class="title">{{ briefStats ? briefStats.danu.ios + briefStats.danu.android : 0 }}
            <sub>[ios: {{ briefStats ? briefStats.danu.ios : 0  }}, android: {{ briefStats ? briefStats.danu.android : 0 }}]</sub>
          </p>
        </div>
      </div>
      <div class="level-item has-text-centered box">
        <div>
          <p class="heading">{{ $t('admin.app.totalFee') }}</p>
          <p class="title">{{ briefStats ? (briefStats.fee.ios + briefStats.fee.android) / 100 : 0 }}
            <sub>[ios: {{ briefStats ? briefStats.fee.ios / 100 : 0  }}, android: {{ briefStats ? briefStats.fee.android / 100 : 0 }}]</sub>
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
      <line-chart ref="chart" :options="options" :width="'100%'"></line-chart>
    </article>
  </div>
</template>
<script>
import Datepicker from 'vue-bulma-datepicker'
import LineChart from 'admin/components/chart/line3'

export default {

  data() {
    return {
      options: {
        segmentShowStroke: false,
        responsive: true,
        maintainAspectRatio: false,
        pointDot: false,
        pointDotRadius: 0,
      },
      date: "",
      reports: [],
      timing: [],
      platform: 'all',
    }
  },

  mounted: function() {
    this.getStatsByDay()
    this.getUserTimingByDay()
  },

  methods: {
    getStatsByDay: async function() {
      let result = await this.$acs.getStatsByDay({
        date: this.date
      })

      if (result.success) {
        this.reports = result.reports
        this.date = result.date
      }
    },

    getUserTimingByDay: async function() {
      let result = await this.$acs.getUserTimingByDay({
        date: this.date
      })

      if (result.success) {
        this.timing = result.timing
        this.date = result.date
      }
    }
  },

  components: {
    LineChart,
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