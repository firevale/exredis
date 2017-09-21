<template>
  <div class="my-conversion">
    <header class="is-flex flex-vcentered flex-left is-size-medium">
      客服邮箱：<i class="icon icon-email"></i>&nbsp;jqxs@firevale.com
    </header>
    <div class="conversion-content">
      <div v-for="item in point_logs" class="conversion-item">
        <span>{{item.memo}}</span>
        <div>
          <span class="is-size-6 is-grey">兑换时间：{{item.inserted_at | formatServerDateTime}}</span>
          <span class="is-right">{{item.point}}积分</span>
        </div>
      </div>
      <footer v-show="this.page!=0 && this.total>this.page" class="is-flex flex-center flex-vcentered">
        <div class="loadmore" @click="loadData">查看更多</div>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      page: 0,
      total: 1,
      point_logs: []
    }
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