<template>
  <div class="login_codes">
    <div class="columns">
      <div class="column is-3">
        <div class="field has-addons">
          <p class="control">
            <input class="input" type="number" step="100" min="0" v-model.number="genNumber">
          </p>
          <p class="control">
            <button class="button is-primary" @click="genCodes">
              <span class="icon is-small"> <i class="fa fa-plus"></i> </span>
              <span> {{ $t('admin.app.genCodes') }} </span>
            </button>
          </p>
        </div>
      </div>
      <div class="column is-3">
        <div class="field has-addons">
          <p class="control">
            <input class="input" type="number" step="100" min="0" v-model.number="delNumber">
          </p>
          <p class="control">
            <button class="button is-primary" @click="delCodes">
              <span class="icon is-small"> <i class="fa fa-minus"></i> </span>
              <span> {{ $t('admin.app.delCodes') }} </span>
            </button>
          </p>
        </div>
      </div>
      <div class="column is-3">
        <div class="field has-addons">
          <p class="control">
            <input class="input" type="number" step="10" min="0" v-model.number="assignNumber">
          </p>
          <p class="control">
            <button class="button is-primary" @click="assignCodes">
              <span class="icon is-small"> <i class="fa fa-anchor"></i> </span>
              <span> {{ $t('admin.app.assignCodes') }} </span>
            </button>
          </p>
        </div>
      </div>
      <div class="column is-3">
        <div class="field has-addons">
          <p class="control">
            <input class="input" type="text" :placeholder="$t('admin.app.searchCodesPlaceholder')">
          </p>
          <p class="control">
            <button class="button is-primary">
              <span class="icon is-small"> <i class="fa fa-search"></i> </span>
              <span> {{ $t('admin.app.searchCodes') }} </span>
            </button>
          </p>
        </div>
      </div>
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
  mapActions,
  mapGetters
} from 'vuex'

import Chart from 'vue-bulma-chartjs'
import Toast from 'common/components/toast'

export default {
  data: function() {
    return {
      stats: {
        total: 0,
        available: 0,
        assigned: 0,
        used: 0,
      },
      genNumber: 0,
      delNumber: 0,
      assignNumber: 0,
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
    ...mapGetters([
      'app'
    ]),

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
    ...mapActions([
      'updateMyLoginCodes'
    ]),

    updateStats: async function() {
      let result = await this.$acs.fetchLoginCodesStats({
        app_id: this.$route.params.appId
      })
      if (result.success) {
        this.stats = result.stats
      }
    },

    genCodes: async function() {
      if (this.genNumber < 100) {
        Toast.show(this.$t('admin.app.message.tooSmallCodesGenNumber'))
      }
      else {
        let successMessage = this.$t('admin.app.message.genLoginCodesSuccess', {number: this.genNumber}) 
        let result = await this.$acs.generateLoginCodes({
          app_id: this.$route.params.appId,
          number: this.genNumber
        }, successMessage)

        if (result.success) {
          this.stats.total = this.stats.total + this.genNumber
          this.stats.available = this.stats.available + this.genNumber
        }
      }
    },

    delCodes: async function() {
      if (this.delNumber <= 0 || this.delNumber > this.stats.available) {
        Toast.show(this.$t('admin.app.message.invalidLoginCodesDelNumber', {max: this.stats.available}))
      }
      else {
        let successMessage = this.$t('admin.app.message.delLoginCodesSuccess', {number: this.delNumber}) 
        let result = await this.$acs.delLoginCodes({
          app_id: this.$route.params.appId,
          number: this.delNumber
        }, successMessage)

        if (result.success) {
          this.stats.total = this.stats.total - this.delNumber
          this.stats.available = this.stats.available - this.delNumber
        }
      }
    },

    assignCodes: async function() {
      let assigned = (this.app.myCodes && this.app.myCodes.length) || 0 

      if (this.assignNumber <= 0 || this.assignNumber + assigned > 100 || this.assignNumber > this.stats.available) {
        Toast.show(this.$t('admin.app.message.invalidLoginCodesAssignNumber', {max: min(100 - assigned, this.stats.available)}))
      }
      else {
        let successMessage = this.$t('admin.app.message.assignLoginCodesSuccess', {number: this.assignNumber}) 
        let result = await this.$acs.assignLoginCodes({
          app_id: this.$route.params.appId,
          number: this.assignNumber
        }, successMessage)

        if (result.success) {
          this.updateMyLoginCodes(result.codes)
        }
      }
    },

  },

  components: {
    Chart
  }
}
</script>

<style lang="scss">
  .login_codes {
    .box:not(:last-child) {
      margin-bottom: 0;
    }
  }
</style>
