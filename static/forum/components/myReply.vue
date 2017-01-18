<template>
  <div class="myReply-item">
    <div>
      <span>{{ $t('forum.personal.reply') }}</span>
      <span>{{ itemData.content }}</span>
    </div>
    <div class="note-info">
      <span>{{ itemData.time }}</span>
    </div>
    <div class="originalNote" @click="showDetail">
      <span>{{ $t('forum.personal.originalNote') }}</span>
      <span class="note-title">{{ itemData.title }}</span>
    </div>
    <div class="note-info">
      <span class="fa fa-list-alt" style="font-size: 1rem;vertical-align: middle;"></span>
      <span>{{ itemData.noteCount }}</span>
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
