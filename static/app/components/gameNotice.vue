<template>
  <div class="columns is-mobile" style="margin:0 2rem; height: calc(100vh - 8rem)">
    <div class="column is-one-third">
      <scroller>
        <v-touch v-for="item in notices" :key="item.id" v-on:tap="showNoticeDetail(item)">
          <div class="column" style="border: 1px solid #ccc; padding: .8rem; margin: .5rem;">
            <h5 class="title is-5" :class="{'is-primary' : selectedId == item.id}">{{ item.title }}</h5>
          </div>
        </v-touch>
      </scroller>
    </div>
    <div class="column" style="border: 1px solid #ccc; padding: 1rem; margin:1.2rem .5rem .5rem .5rem;">
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
  mounted: function() {
    this.loaddata()
  },

  components: {
    scroller,
  },

  data() {
    return {
      notices: [],
      itemData: Object,
      selectedId: 0,
    }
  },

  methods: {
    showNoticeDetail(item) {
      this.itemData = item
      this.selectedId = item.id
    },

    loaddata: async function() {
      let app_id = this.$router.currentRoute.params.app_id
      let result = await this.$acs.getPagedNews(app_id, "notice", 1, 30)

      if (result.success) {
        this.notices = result.news
        this.notices && this.notices.length ? this.showNoticeDetail(this.notices[0]) : ''
      }
    },

  }
}
</script>