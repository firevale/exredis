<template>
  <div class="news-box">
    <div class="row-menu" style="justify-content: space-around;">
      <div v-for="item in news.topImgs" class="top-img">
        <figure>
          <img :src="item.url" style="height: 8rem; border-top-left-radius: 1rem; border-top-right-radius: 1rem;"></img>
        </figure>
        <figcaption style="text-align: center;">{{ item.title }}</figcaption>
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
      this.news && this.news.length ? this.showNoticeDetail(this.news[0]) : ''
    },

    props: {
      news: {
        type: Object,
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
  .row-menu {
    img {
      margin-top: .5rem;
    }
  }
  
  .menu-left {
    flex: 1.2;
    height: 50vh;
    display: flex;
    flex-direction: column;
    margin-right: 1rem;
    overflow-x: hidden;
  }
  
  .menu-tree {
    flex: 1;
    overflow-y: hidden;
    padding-bottom: .5rem;
    .menu-item {
      padding-left: .5rem;
      padding-top: .2rem;
      border: 1px solid $dark;
      min-height: 3rem;
      font-size: .9rem;
      margin-top: .8rem;
      cursor: pointer;
    }
  }
  
  .arrow-down {
    height: .4rem;
    width: .4rem;
    border: .5rem solid transparent;
    border-top: .7rem solid $link;
    margin: .4rem auto;
    cursor: pointer;
  }
  
  .detail-html {
    flex: 3;
    font-size: 1rem;
    padding: .5rem;
    border: 1px solid $text-grey;
  }

  .top-img{
    font-size: 1rem;
  }
</style>