<template>
  <div class="notice-container">
    <div class="notice-list">
      <scroller>
        <v-touch v-for="item in notices" :key="item.id" v-on:tap="showNoticeDetail(item)">
          <div class="column" style="border: 1px solid #ccc; padding: .8rem; margin: .5rem; cursor: pointer">
            <h5 class="title is-5" :class="{'is-primary' : selectedId == item.id}">{{ item.title }}</h5>
          </div>
        </v-touch>
      </scroller>
    </div>
    <div class="notice-detail">
      <scroller style="margin:.5rem; border:1px solid #ccc; height: calc(100vh - 10rem);">
        <div class="has-text-centered" style="padding: 1rem;">
          <h4 class="title is-4">{{ itemData.title }}</h4>
        </div>
        <quill-content class="subtitle is-5" style='padding: 1rem; line-height:150%;' :content="itemData.content">
        </quill-content>
      </scroller>
    </div>
  </div>
</template>
<script>
export default {
  created: function() {
    this.fetchData()
  },

  watch: {
    '$route': 'fetchData'
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

    fetchData: async function() {
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

<style lang="scss">
  .notice-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    .notice-list {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 1rem;
      right: calc(66% + 1rem);
    }

    .notice-detail {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 33%;
      right: 1rem;
    }
  }
</style>