<template>
  <div class="row-menu">
    <div class="menu-left">
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
  var marked = require('marked')
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
  });

  export default {
    mounted() {
      this.notices && this.notices.length ? this.showNoticeDetail(this.notices[0]) : ''
    },

    props: {
      notices: {
        type: Array,
      },
    },

    computed: {

    },

    data() {
      return {
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
        this.detailHtml = marked(item.content)
      },

      changScroll(e) {
        this.scrollPosition = e.target.scrollTop
      },

      scrollDown() {
        this.$refs.menuBox.scrollTop += 30
      },

    }
  }
</script>
<style lang="scss">
  @import "../scss/forum";
</style>