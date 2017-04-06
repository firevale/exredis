<template>
  <scroller :on-refresh="refresh" :on-load-more="loadmore" ref="scroller">
    <nav class="level">
      <div v-for="item in topNews" class="level-item has-text-centered">
        <div>
          <figure>
            <img :src="item.pic" style="height: 14rem; border-radius: .5rem;"></img>
          </figure>
          <figcaption style="text-align: center;">{{ item.title }}</figcaption>
        </div>
      </div>
    </nav>
    <div class="news-box">
      <div v-for="item in news" class="row-menu row-news" @click="showNewsDetail(item)">
        <i class="fa fa-circle" style="margin: .2rem .2rem 0 0;" aria-hidden="true"></i>
        <span style="flex: 1;">{{ item.title }}</span>
        <span>{{ item.inserted_at | convertServerDateTime }}</span>
      </div>
      <div v-show="showDetail" ref="detailBox" v-html="detailHtml" class="detail-html">
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
  mounted: async function() {
    await this.loadtop()
  },

  components: {
    scroller,
  },

  data() {
    return {
      topNews: [],
      news: [],
      detailHtml: "",
      showDetail: false,
      page: 0,
      total: 1,
      recordsPerPage: 5,
    }
  },

  methods: {
    loadtop: async function() {
      let app_id = this.$router.currentRoute.params.app_id
      let result = await this.$acs.getTopNews(app_id, 3)

      if (result.success) {
        this.topNews = result.news
      }
    },

    loadmore: async function() {
      let app_id = this.$router.currentRoute.params.app_id
      let result = await this.$acs.getPagedNews(app_id, "news", this.page + 1, this.recordsPerPage)

      if (result.success) {
        this.news = this.page == 0 ? result.news : this.news.concat(result.news)

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

    showNewsDetail(item) {
      this.detailHtml = item.content
      this.showDetail = true
    },

  },

}
</script>