<template>
  <div class="news-box">
    <div v-show="!showDetail" class="row-menu" style="justify-content: space-around;">
      <div v-for="item in news.topImgs" class="top-img">
        <figure>
          <img :src="item.url" style="height: 8rem; border-top-left-radius: .5rem; border-top-right-radius: .5rem;"></img>
        </figure>
        <figcaption style="text-align: center;">{{ item.title }}</figcaption>
      </div>
    </div>
    <div v-show="!showDetail" v-for="item in news.list" class="row-menu row-news" @click="showNewsDetail(item)">
      <i class="fa fa-circle" style="margin: .2rem .2rem 0 0;" aria-hidden="true"></i>
      <span style="flex: 1;">{{ item.title }}</span>
      <span>{{ item.time }}</span>
    </div>
    <div v-show="showDetail" ref="detailBox" v-html="detailHtml" class="detail-html">
    </div>
    <div class="column is-full" v-show="newsPageCount > 1">
      <pagination ref="pag" :page-count="newsPageCount" :current-page="newsCurrentPage" @switch-page="loadNewsByPage"></pagination>
    </div>
  </div>
</template>
<script>
  import pagination from '../components/pagination.vue'

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
    mounted() {},

    props: {
      news: {
        type: Object,
      },
    },

    computed: {

    },

    data() {
      return {
        detailHtml: "",
        showDetail: false,
        newsPageCount: 5,
        newsCurrentPage: 1,
      }
    },

    methods: {
      showNewsDetail(item) {
        this.detailHtml = marked(item.content)
        this.showDetail = true
      },

      loadNewsByPage(page = 1) {
        console.log('load news in page: ' + page)
      }
    },

    components: {
      pagination,
    }
  }
</script>
<style lang="scss">
  @import "../scss/forum";
</style>