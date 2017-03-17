<template>
<div class="myComments-item">
  <div>
    <span>{{ $t('forum.personal.reply') }}</span>
    <span>{{ delHtmlTag(itemData.content) }}</span>
  </div>
  <div class="post-info">
    <span>{{ itemData.inserted_at | formatServerDateTime }}</span>
    <span> | </span>
    <span>{{ itemData.post.comms + '/' + itemData.post.reads }}</span>
  </div>
  <div class="original-note" @click="showDetail">
    <span>{{ $t('forum.personal.originalPost') }}</span>
    <span class="post-title">[{{ itemData.post.section.title }}] {{ itemData.post.title }}</span>
  </div>
</div>
</template>
<script>
export default {
  props: {
    itemData: {
      type: Object,
      default: null,
    },
  },

  computed: {

  },

  methods: {
    showDetail() {
      this.$router.push({
        name: 'detail',
        params: {
          postId: this.itemData.post.id
        },
      })
    },
    delHtmlTag(html) {
      return html.replace(/<[^>]+>/g,"").trim().substring(0,20)
    }
  },
}
</script>
