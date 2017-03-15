<template>
<div class="my-favorite-list-item row-line">
  <div style="flex: 1;text-align: left;">
    <div @click="showDetail">
      <span class="post-title">[{{ itemData.post.section.title }}] {{ itemData.post.title }}</span>
    </div>
    <div class="post-info">
      <span>{{ itemData.post.inserted_at | formatServerDateTime }}</span>
      <span> | </span>
      <span>{{ itemData.post.comms + '/' + itemData.post.reads }}</span>
    </div>
  </div>
  <div>
    <span class="button">{{ $t('forum.personal.cancelFavor') }}</span>
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
    }
  },
}
</script>
