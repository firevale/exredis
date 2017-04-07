<template>
  <scroller v-if="showDetail">
    <news-detail-view :item-data="detail" @goBack="goBack"></news-detail-view>
  </scroller>
  <scroller v-else :on-refresh="refresh" :on-load-more="loadmore" ref="scroller">
    <div class="columns is-multiline is-mobile" style="margin:0 2rem">
      <v-touch v-for="item in activityList" class="column is-half" v-on:tap="showActivityDetail(item)">
        <center>
          <img v-if="item.pic" :src="item.pic" style="border-radius: .5rem;"></img>
          <img v-else src="https://placehold.it/640x260?text=640x260" style="border-radius: .5rem;"></img>
        </center>
      </v-touch>
    </div>
  </scroller>
</template>
<script>
import scroller from 'common/components/scroller'
import newsDetailView from './newsDetailView'

export default {
  components: {
    scroller,
    newsDetailView,
  },

  data() {
    return {
      activityList: [],
      detail: Object,
      showDetail: false,
      page: 0,
      total: 1,
      recordsPerPage: 4,
    }
  },

  methods: {
    loadmore: async function() {
      let app_id = this.$router.currentRoute.params.app_id
      let result = await this.$acs.getPagedNews(app_id, "activity", this.page + 1, this.recordsPerPage)

      if (result.success) {
        this.activityList = this.page == 0 ? result.news : this.activityList.concat(result.news)

        this.total = result.total
        this.page = this.page + 1

        if (this.$refs.scroller && this.page >= this.total) {
          this.$refs.scroller.$emit('all-loaded')
        }
      }
    },

    refresh: async function() {
      this.page = 0
      this.total = 1
      await this.loadmore()
    },

    showActivityDetail(item) {
      this.detail = item
      this.showDetail = true
    },

    goBack() {
      this.showDetail = false
    },
  }
}
</script>