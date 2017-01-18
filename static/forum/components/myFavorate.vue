<template>
  <div class="myFavor-item rowLine">
    <div style="flex: 1;text-align: left;">
      <div @click="showDetail">
        <span class="note-title">{{ itemData.title }}</span>
        <a v-show="itemData.newReply" class="button excellentBtn">{{ $t('forum.personal.newReply') }}</a>
      </div>
      <div class="note-info">
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
