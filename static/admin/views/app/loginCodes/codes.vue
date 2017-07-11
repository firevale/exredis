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
    <article class="tile box chart">
      <line-chart ref="chart" :options="options" :width="'100%'"></line-chart>
    </article>
  </div>
</template>
<script>
import {
  mapActions,
  mapGetters
} from 'vuex'

import LineChart from 'admin/components/chart/line'
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
      dailyChart: undefined,
      options: {
        segmentShowStroke: false,
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },

  created: async function() {
    this.updateStats()
  },

  computed: {
    ...mapGetters([
      'app'
    ]),
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
        this.$refs.chart && (this.$refs.chart.updateChart(result.daily_chart))
      }
    },

    genCodes: async function() {
      if (this.genNumber < 100) {
        Toast.show(this.$t('admin.app.message.tooSmallCodesGenNumber'))
      } else {
        let successMessage = this.$t('admin.app.message.genLoginCodesSuccess', {
          number: this.genNumber
        })
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
      if (this.delNumber <= 0 || this.delNumber > (this.stats.total - this.stats.used)) {
        Toast.show(this.$t('admin.app.message.invalidLoginCodesDelNumber', {
          max: (this.stats.total - this.stats.used)
        }))
      } else {
        let successMessage = this.$t('admin.app.message.delLoginCodesSuccess', {
          number: this.delNumber
        })
        let result = await this.$acs.delLoginCodes({
          app_id: this.$route.params.appId,
          number: this.delNumber
        }, successMessage)

        if (result.success) {
          this.stats.total = this.stats.total - this.delNumber
          this.stats.available = Math.max(this.stats.available - this.delNumber, 0)
          if (this.stats.assigned > this.stats.total) {
            this.stats.assigned = this.stats.total
          }
        }
      }
    },

    assignCodes: async function() {
      let assigned = (this.app.myCodes && this.app.myCodes.length) || 0

      if (this.assignNumber <= 0 || this.assignNumber + assigned > 100 || this.assignNumber > this.stats.available) {
        Toast.show(this.$t('admin.app.message.invalidLoginCodesAssignNumber', {
          max: Math.min(100 - assigned, this.stats.available)
        }))
      } else {
        let successMessage = this.$t('admin.app.message.assignLoginCodesSuccess', {
          number: this.assignNumber
        })
        let result = await this.$acs.assignLoginCodes({
          app_id: this.$route.params.appId,
          number: this.assignNumber
        }, successMessage)

        if (result.success) {
          this.updateMyLoginCodes(result.codes)
          this.stats.available -= this.assignNumber
          this.stats.assigned += this.assignNumber
        }
      }
    },

  },

  components: {
    LineChart
  }
}
</script>
<style lang="scss">
.login_codes {
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