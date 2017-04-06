<template>
  <scroller :on-load-more="loadmore" ref="scroller">
    <div v-for="item in activityList" class="detail-html">
      <div v-show="!showDetail" class="row-menu" style="justify-content: space-around; margin: 0;">
        <img v-if="item.pic" :src="item.pic" @click="showActivityDetail(item)"></img>
        <img v-else src="https://placehold.it/860x350?text=860x350" @click="showActivityDetail(item)"></img>
      </div>
      <div v-show="showDetail" v-html="detailHtml">
      </div>
    </div>
  </scroller>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import scroller from 'common/components/scroller'

export default {
  components: {
    scroller,
  },

  data() {
    return {
      activityList: [],
      detailHtml: "",
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

    showActivityDetail(item) {
      this.detailHtml = item.content
      this.showDetail = true
    },
  }
}
</script>