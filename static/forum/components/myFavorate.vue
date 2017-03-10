<template>
<div class="my-favorite-list-item row-line">
  <div style="flex: 1;text-align: left;">
    <div @click="showDetail">
      <span class="post-title">{{ itemData.title }}</span>
      <a v-show="itemData.newComment" class="button excellent-btn">{{ $t('forum.personal.newComment') }}</a>
    </div>
    <div class="post-info">
      <span>{{ itemData.time }}</span>
      <span>{{ itemData.noteCount }}</span>
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
          id: this.itemData.noteId
        },
      })
    }
  },
}
</script>
