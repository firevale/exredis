<template>
  <div>
    <div class="field has-addons">
      <p class="control">
        <input class="input" type="number" :placeholder="$t('admin.app.genCodesPlaceholder')">
      </p>
      <p class="control">
        <button class="button">
          {{ $t('admin.app.genCodes') }}
        </button>
      </p>
    </div>
    <nav class="level">
      <div class="level-item has-text-centered box">
        <div>
          <p class="heading">{{ $t('admin.app.totalCodes') }}</p>
          <p class="title">{{ stats.total }}</p>
        </div>
      </div>
      <div class="level-item has-text-centered box">
        <div>
          <p class="heading">{{ $t('admin.app.availableCodes') }}</p>
          <p class="title">{{ stats.available }}</p>
        </div>
      </div>
      <div class="level-item has-text-centered box">
        <div>
          <p class="heading">{{ $t('admin.app.assignedCodes') }}</p>
          <p class="title">{{ stats.assigned }}</p>
        </div>
      </div>
      <div class="level-item has-text-centered box">
        <div>
          <p class="heading">{{ $t('admin.app.usedCodes') }}</p>
          <p class="title">{{ stats.used }}</p>
        </div>
      </div>
    </nav>
    <article class="tile box">
      <chart :type="'line'" :data="seriesData" :options="options_3"></chart>
    </article>
  </div>
</template>
<script>
import {
  mapActions
} from 'vuex'

import Chart from 'vue-bulma-chartjs'

export default {
  data: function() {
    return {
      stats: {
        total: 0,
        available: 0,
        assigned: 0,
        used: 0,
      },
      labels: ['Sleeping', 'Designing', 'Coding', 'Cycling'],
      data: [20, 40, 5, 35],

      options: {
        segmentShowStroke: false
      },
      backgroundColor: [
        '#1fc8db',
        '#fce473',
        '#42afe3',
        '#ed6c63',
        '#97cd76'
      ],

      labels_2: ['April', 'May', 'June', 'Jule', 'August', 'September', 'October', 'November', 'December'],
      data_2: [1, 9, 3, 4, 5, 6, 7, 8, 2].map(e => (Math.sin(e) * 25) + 25),

      labels_3: ['May', 'June', 'Jule', 'August', 'September', 'October', 'November'],
      data_3: [
        [65, 59, 90, 81, 56, 55, 40],
        [28, 48, 40, 19, 88, 27, 45]
      ],
      options_3: {
        tooltips: {
          mode: 'label'
        }
      },
      backgroundColor_3: [
        'rgba(31, 200, 219, 1)',
        'rgba(151, 205, 118, 1)'
      ],
      series: [this.$t('admin.app.assignedCodes'), this.$t('admin.app.usedCodes')]
    }
  },

  created: async function() {
    this.updateStats()
  },

  computed: {
    seriesData() {
      let data = {
        labels: this.labels_3
      }
      data.datasets = this.series.map((e, i) => {
        return {
          data: this.data_3[i],
          label: this.series[i],
          borderColor: this.backgroundColor_3[i].replace(/1\)$/, '.5)'),
          pointBackgroundColor: this.backgroundColor_3[i],
          backgroundColor: this.backgroundColor_3[i].replace(/1\)$/, '.5)')
        }
      })
      return data
    }
  },

  methods: {
    updateStats: async function() {
      let result = await this.$acs.fetchLoginCodesStats({
        app_id: this.$route.params.appId
      })
      this.stats = result.stats
    }
  },

  components: {
    Chart
  }
}
</script>