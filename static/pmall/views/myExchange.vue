<template>
  <div class="my-conversion">
    <scroller :on-load-more="loadmore" ref="scroller">
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
        <!-- <footer class="is-flex flex-center flex-vcentered">
          <div class="loadmore">查看更多</div>
        </footer> -->
      </div>
    </scroller>
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
    this.loadmore()
  },
  methods: {
    resetScroller: function() {
      if (this.$refs.scroller) {
        this.$refs.scroller.$emit('reset')
      }
    },
    loadmore: async function() {
      this.$acs.cancelListMyPoints()
      let result = await this.$acs.listMyPoints({
        page: this.page + 1,
        records_per_page: 10
      })
      if (result.success) {
        this.point_logs = this.point_logs.concat(result.point_logs)
        this.total = result.total
        this.page = this.page + 1

        if (this.$refs.scroller && this.page >= this.total) {
          this.$refs.scroller.$emit('all-loaded')
        }
      }
    }
  }
}
</script>