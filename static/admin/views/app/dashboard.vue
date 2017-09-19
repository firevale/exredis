<template>
  <div class="dashboard">
    <nav class="level">
      <div class="level-item has-text-centered box">
        <div>
          <p class="heading">{{ $t('admin.app.dau') }}</p>
          <p class="title">{{ realtimeMetrics ? realtimeMetrics.dau.ios + realtimeMetrics.dau.android : 0 }}
            <sub>[ios: {{ realtimeMetrics ? realtimeMetrics.dau.ios : 0  }}, android: {{ realtimeMetrics ? realtimeMetrics.dau.android : 0 }}]</sub>
          </p>
        </div>
      </div>
      <div class="level-item has-text-centered box">
        <div>
          <p class="heading">{{ $t('admin.app.danu') }}</p>
          <p class="title">{{ realtimeMetrics ? realtimeMetrics.danu.ios + realtimeMetrics.danu.android : 0 }}
            <sub>[ios: {{ realtimeMetrics ? realtimeMetrics.danu.ios : 0  }}, android: {{ realtimeMetrics ? realtimeMetrics.danu.android : 0 }}]</sub>
          </p>
        </div>
      </div>
      <div class="level-item has-text-centered box">
        <div>
          <p class="heading">{{ $t('admin.app.totalFee') }}</p>
          <p class="title">{{ realtimeMetrics ? (realtimeMetrics.fee.ios + realtimeMetrics.fee.android) / 100 : 0 }}
            <sub>[ios: {{ realtimeMetrics ? realtimeMetrics.fee.ios / 100 : 0  }}, android: {{ realtimeMetrics ? realtimeMetrics.fee.android / 100 : 0 }}]</sub>
          </p>
        </div>
      </div>
      <div class="level-item has-text-centered box">
        <div>
          <p class="heading">{{ $t('admin.app.paidUserNumber') }}</p>
          <p class="title">{{ realtimeMetrics ? realtimeMetrics.dapu.ios + realtimeMetrics.dapu.android : 0 }}
            <sub>[ios: {{ realtimeMetrics ? realtimeMetrics.dapu.ios : 0  }}, android: {{ realtimeMetrics ? realtimeMetrics.dapu.android : 0 }}]</sub>
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
      'app', 'latestOnlineData', 'realtimeMetrics'
    ]),
  },

  mounted: function() {
    this.getRealtimeMetrics()
    this.getOnlineChart()
  },

  methods: {
    ...mapActions([
      'setRealtimeMetrics'
    ]),

    getOnlineChart: async function() {
      let result = await this.$acs.getOnlineChart(this.$route.params.appId)

      if (result.success && result.chart.labels.length > 0 && this.$refs.chart) {
        this.$refs.chart.updateChart(result.chart)
      }
    },

    getRealtimeMetrics: async function() {
      let result = await this.$acs.getRealtimeMetrics(this.$route.params.appId)

      if (result.success) {
        this.setRealtimeMetrics(result.metrics)
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
  .box {
    padding: 1.25rem !important;
    &:not(:last-child) {
      margin-bottom: 0;
    }
    article.chart {
      background: #212733;
      div {
        flex-grow: 1;
        background: #212733;
      }
    }
  }
  p.title {
    sub {
      font-size: 0.9rem;
    }
  }
}
</style>