<template>
  <div class="detail-html">
    <div v-show="!showDetail" class="row-menu" style="justify-content: space-around; margin: 0;">
      <img v-for="item in campaigns" :src="item.url" @click="showCampaignDetail(item)"></img>
    </div>
    <div v-show="showDetail" v-html="detailHtml">
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
    props: {
      campaigns: {
        type: Array,
      },

    },

    data() {
      return {
        detailHtml: "",
        showDetail: false,
      }
    },

    methods: {
      showCampaignDetail(item) {
        this.detailHtml = marked(item.content)
        this.showDetail = true
      },

    }
  }
</script>
