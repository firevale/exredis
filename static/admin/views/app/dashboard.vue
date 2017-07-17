<template>
  <div class="dashboard">
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
      'app', 'latestOnlineData'
    ]),
  },

  mounted: function() {
    this.getOnlineChart()
  },

  methods: {
    getOnlineChart: async function() {
      let result = await this.$acs.getOnlineChart(this.$route.params.appId)

      if (result.success && result.chart.labels.length > 0 && this.$refs.chart) {
        this.$refs.chart.updateChart(result.chart)
      }
    }
  },

  watch: {
    'latestOnlineData': function(chart) {
      if (this.$refs.chart) {
        this.$refs.chart.addData(chart.label, chart.data)
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
}
</style>