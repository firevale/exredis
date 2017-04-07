<template>
  <div class="columns is-mobile" style="margin:0 2rem; height: calc(100vh - 6rem)">
    <div class="column is-one-third">
      <scroller :on-refresh="refresh" :on-load-more="loadmore" ref="scroller">
        <div>
          <v-touch v-for="item in notices" :key="item.id" v-on:tap="showNoticeDetail(item)">
            <div class="column" style="border: 1px solid #ccc; padding: 1rem; margin: .5rem;">
              <h5 class="title is-5" :class="{'is-primary' : selectedId == item.id}">{{ item.title }}</h5>
            </div>
          </v-touch>
        </div>
      </scroller>
    </div>
    <div class="column">
      <scroller>
        <div class="has-text-centered" style="padding: 1rem;">
          <h4 class="title is-4">{{ itemData.title }}</h4>
        </div>
        <div class="subtitle is-5" style='line-height:150%;' v-html="itemData.content">
        </div>
      </scroller>
    </div>
  </div>
</template>
<script>
import scroller from 'common/components/scroller'

export default {
  components: {
    scroller,
  },

  data() {
    return {
      notices: [],
      itemData: Object,
      selectedId: 0,
      page: 0,
      total: 1,
      recordsPerPage: 5,
    }
  },

  methods: {
    showNoticeDetail(item) {
      this.itemData = item
      this.selectedId = item.id
    },

    refresh: async function() {
      this.page = 0
      this.total = 1
      await this.loadmore()
    },

    loadmore: async function() {
      let app_id = this.$router.currentRoute.params.app_id
      let result = await this.$acs.getPagedNews(app_id, "notice", this.page + 1, this.recordsPerPage)

      if (result.success) {
        this.notices = this.page == 0 ? result.news : this.notices.concat(result.news)

        this.total = result.total
        this.page = this.page + 1

        if (this.$refs.scroller && this.page >= this.total) {
          this.$refs.scroller.$emit('all-loaded')
        }
        if (this.page == 1) {
          this.notices && this.notices.length ? this.showNoticeDetail(this.notices[0]) : ''
        }
      }
    },

  }
}
</script>