<template>
  <div class="my-posts-list-item row-line">
    <div style="flex: 1;text-align: left;">
      <div @click="showDetail">
        <span class="post-title">[{{ itemData.section.title }}] {{ itemData.title }}</span>
        <a v-show="itemData.newComment" class="button excellent-btn">{{ $t('forum.personal.newComment') }}</a>
      </div>
      <div class="post-info">
        <span>{{ itemData.inserted_at | formatServerDateTime }}</span>
        <span> | </span>
        <span>{{ itemData.comms + '/' + itemData.reads }}</span>
      </div>
    </div>
    <div>
      <span class="button">{{ $t('forum.personal.deleteBtn') }}</span>
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
            postId: this.itemData.id
          },
        })
      }
    },
  }
</script>
