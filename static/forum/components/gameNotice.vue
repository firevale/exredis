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
    <div ref="detailBox" v-html="detailHtml"  class="detail-html">
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
    mounted(){
      this.notices&&this.notices.length? this.showNoticeDetail(this.notices[0]): ''
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

      changScroll(e){
        this.scrollPosition = e.target.scrollTop
      },

      scrollDown(){
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
</style>