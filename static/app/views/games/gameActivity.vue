<template>
  <scroller v-if="showDetail">
    <news-detail-view :item-data="detail" @goBack="goBack"></news-detail-view>
  </scroller>
  <div v-else class="columns is-multiline is-mobile" style="margin:0 2rem">
    <v-touch v-for="item in activityList" :key="item.id" class="column is-half" v-on:tap="showActivityDetail(item)">
      <center>
        <img v-if="item.pic" :src="item.pic" style="border-radius: .5rem;"></img>
        <img v-else src="https://placehold.it/640x260?text=640x260" style="border-radius: .5rem;"></img>
      </center>
    </v-touch>
  </div>
</template>
<script>
import scroller from 'common/components/scroller'
import newsDetailView from '../../components/newsDetailView'

export default {
  mounted: function() {
    this.loaddata()
  },

  components: {
    scroller,
    newsDetailView,
  },

  data() {
    return {
      activityList: [],
      detail: Object,
      showDetail: false,
    }
  },

  methods: {
    loaddata: async function() {
      let app_id = this.$router.currentRoute.params.app_id
      let result = await this.$acs.getPagedNews(app_id, "activity", 1, 32)

      if (result.success) {
        this.activityList = result.news
      }
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