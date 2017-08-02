<template>
  <div class="dashboard">
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
          :value="this.today"></datepicker>
      </div>
    </div>
    <nav class="level">
      <div class="level-item has-text-centered box">
        <div>
          <p class="heading">{{ $t('admin.app.dau') }}</p>
          <p class="title">{{ briefStats ? briefStats.dau.ios + briefStats.dau.android : 0 }}
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
      today: ""
    }
  },

  mounted: function() {
    this.getBriefStats()
    this.getOnlineChart()
  },

  methods: {
    getOnlineChart: async function() {
      let result = await this.$acs.getOnlineChart(this.$route.params.appId)

      if (result.success && result.chart.labels.length > 0 && this.$refs.chart) {
        this.$refs.chart.updateChart(result.chart)
      }
    },

    getBriefStats: async function() {
      let result = await this.$acs.getBriefStats(this.$route.params.appId)

      if (result.success) {
        this.setAppBriefStats(result.stats)
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