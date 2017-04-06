<template>
<div class="row-menu">
  <div class="menu-left">
    <div>
      <div v-show="scrollPosition > 0" class="arrow-up" @click="scrollUp"></div>
    </div>
    <div ref="menuBox" class="menu-tree" @scroll="changScroll">
      <div v-for="item in notices" :class="{'olive': item.title == selectedTitle }" class="menu-item" @click="showNoticeDetail(item)">{{ item.title }}</div>
    </div>
    <div>
      <div class="arrow-down" @click="scrollDown"></div>
    </div>
  </div>
  <div ref="detailBox" v-html="detailHtml" class="detail-html">
  </div>
</div>
</template>
<script>

export default {
  mounted() {
    this.loadmore()
    this.notices && this.notices.length ? this.showNoticeDetail(this.notices[0]) : ''
  },

  data() {
    return {
      notices: [],
      downIcon: false,
      detailHtml: "",
      selectedTitle: '',
      showDetail: false,
      scrollPosition: 0,
    }
  },

  methods: {
    showNoticeDetail(item) {
      this.selectedTitle = item.title
      this.detailHtml = item.content
    },

    changScroll(e) {
      this.scrollPosition = e.target.scrollTop
    },

    scrollUp() {
      this.$refs.menuBox.scrollTop -= 30
    },

    scrollDown() {
      this.$refs.menuBox.scrollTop += 30
    },

    loadmore: async function() {
      let app_id = this.$router.currentRoute.params.app_id
      let result = await this.$acs.getPagedNews(app_id, "notice", 1, 30)

      if (result.success) {
        this.notices = result.news
      }
    },

  }
}
</script>
