<template>
  <div class="my-point-page">
    <header class="is-flex flex-center flex-vcentered flex-fixed-size">
      <p class="circle is-flex is-column flex-center flex-vcentered">
        <span class="is-size-medium">积分</span>
        <span class="is-size-large">{{points}}</span>
      </p>
    </header>
    <div class="point-title has-text-centered is-size-medium flex-fixed-size">积分明细</div>
    <div class="items">
      <div v-for="item in point_logs" class="item is-flex flex-vcentered">
        <div class="column is-10">
          <h1 class="is-size-medium is-grey-dark"><strong>{{item.memo}}</strong></h1>
          <p class="is-grey">{{item.inserted_at | formatServerDateTime }}</p>
        </div>
        <p class="column is-2 is-size-medium is-info has-text-right">{{ item.point>0 ? `+${item.point}`: item.point}}</p>
      </div>
      <div v-show="this.page!=0 && this.total>this.page" class="button btn-record-more" @click="loadData"></div>
    </div>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
export default {
  data() {
    return {
      page: 0,
      total: 1,
      point_logs: []
    }
  },

  computed: {
    ...mapGetters([
      'wcp_user',
      'points',
    ]),
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData: async function() {
      this.$acs.cancel('listMyPoints')
      let result = await this.$acs.listMyPoints({
        page: this.page + 1,
        records_per_page: 10
      })
      if (result.success) {
        this.point_logs = this.point_logs.concat(result.point_logs)
        this.total = result.total
        this.page++
      }
    }
  }

}
</script>