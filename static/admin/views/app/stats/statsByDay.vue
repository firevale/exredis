<template>
  <div class="dashboard">
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
          <p class="heading">{{ $t('admin.app.totalFee') }}</p>
          <p class="title">{{ briefStats ? (briefStats.fee.ios + briefStats.fee.android) / 100 : 0 }}  
            <sub>[ios: {{ briefStats ? briefStats.fee.ios / 100 : 0  }}, android: {{ briefStats ? briefStats.fee.android / 100 : 0 }}]</sub>
          </p>
        </div>
      </div>
      <div class="level-item has-text-centered box">
        <div>
          <p class="heading">{{ $t('admin.app.paidUserNumber') }}</p>
          <p class="title">{{ briefStats ? briefStats.dapu.ios + briefStats.dapu.android : 0 }}  
            <sub>[ios: {{ briefStats ? briefStats.dapu.ios : 0  }}, android: {{ briefStats ? briefStats.dapu.android : 0 }}]</sub>
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
import {
  mapGetters,
  mapActions
} from 'vuex'

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
      }
    }
  },

  computed: {
    ...mapGetters([
      'app', 'latestOnlineData', 'briefStats'
    ]),
  },

  mounted: function() {
    this.getBriefStats()
    this.getOnlineChart()
  },

  methods: {
    ...mapActions([
      'setAppBriefStats'
    ]),

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

  watch: {
    'latestOnlineData': function(chart) {
      if (this.$refs.chart && chart) {
        this.$refs.chart.addData(chart.label, chart.data, 180)
      }
    }
  },

  components: {
    LineChart
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