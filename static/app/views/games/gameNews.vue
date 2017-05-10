<template>
  <scroller :on-refresh="refresh" :on-load-more="loadMore" ref="scroller">
    <div style="margin:0 2rem">
      <nav class="level is-mobile">
        <v-touch v-for="item in topNews" :key="item.id" v-on:tap="showNewsDetail(item)">
          <div class="has-text-centered">
            <div>
              <figure>
                <img :src="item.pic" style="padding: .5rem; border-radius: .5rem;"></img>
              </figure>
              <h5 class="title is-5" style="padding:0 .5rem;">{{ item.title }}</h5>
            </div>
          </div>
        </v-touch>
      </nav>
      <div class="content" style="margin: 1rem;">
        <v-touch v-for="item in news" :key="item.id" class="tile is-vertical has-bottom-line post-list-item" v-on:tap="showNewsDetail(item)">
          <article class="media">
            <div class="media-content">
              <div class="level is-mobile">
                <div class="level-left level-item" @click="showNewsDetail(item)">
                  <h5 class="title is-5">{{ item.title }}</h5>
                </div>
                <div class="level-right level-item has-text-right grey-text" style="margin-top: 0">
                  <span>{{ item.inserted_at | formatServerDate }}</span>
                </div>
              </div>
            </div>
          </article>
        </v-touch>
      </div>
    </div>
  </scroller>
</template>
<script>
import newsDetailView from '../../components/newsDetailView'

export default {
  mounted: async function() {
    await this.fetchTopNews()
  },

  components: {
    newsDetailView,
  },

  data() {
    return {
      topNews: [],
      news: [],
      detail: Object,
      page: 0,
      total: 1,
      recordsPerPage: 5,
    }
  },

  methods: {
    fetchTopNews: async function() {
      let app_id = this.$router.currentRoute.params.app_id
      let result = await this.$acs.getTopNews(app_id, 3)

      if (result.success) {
        this.topNews = result.news
      }
    },

    loadMore: async function() {
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
      await this.loadMore()
    },

    showNewsDetail(item) {
      this.$router.push({path: `/games/${this.$route.params.app_id}/news/${item.id}`})
    },
  },

}
</script>