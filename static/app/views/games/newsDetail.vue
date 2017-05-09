<template>
  <scroller>
    <news-detail-view :item-data="news"></news-detail-view>
  </scroller>
</template>
<script>
import newsDetailView from '../../components/newsDetailView'
export default {
  data() {
    return {
      news: undefined,
    }
  },

  created: function() {
    this.fetchData()
  },

  watch: {
    '$route': 'fetchData'
  },

  methods: {
    fetchData: async function() {
      let newsId = this.$route.params.newsId
      let result = await this.$acs.getNewsDetail(newsId)

      if (result.success) {
        this.news = result.news
      }
    },
  },

  components: {
    newsDetailView,
  },
}
</script>