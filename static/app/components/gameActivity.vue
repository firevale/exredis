<template>
  <div v-if="showDetail" class="content is-8 is-large" style="padding: 1rem; border: 2px sold;">
    <div v-html="detailHtml">
    </div>
    <div class="block">
      <a class="button is-primary is-large" @click="goBack()">{{ $t('games.buttons.back') }}</a>
    </div>
  </div>
  <scroller v-else :on-refresh="refresh" :on-load-more="loadmore" ref="scroller">
    <div class="columns is-multiline">
      <div v-for="item in activityList" class="column is-half">
        <center>
          <img v-if="item.pic" :src="item.pic" style="border-radius: .5rem;" @click="showActivityDetail(item)"></img>
          <img v-else src="https://placehold.it/640x260?text=640x260" style="border-radius: .5rem;" @click="showActivityDetail(item)"></img>
        </center>
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

    refresh: async function() {
      this.page = 0
      this.total = 1
      await this.loadmore()
    },

    showActivityDetail(item) {
      this.detailHtml = item.content
      this.showDetail = true
    },

    goBack() { 
      this.showDetail = false
    },
  }
}
</script>