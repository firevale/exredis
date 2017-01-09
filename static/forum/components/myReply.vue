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
<style lang="scss">
  @import "../scss/forum";
  .note-title {
    vertical-align: middle;
    font-size: 1rem;
    cocor: $black;
  }
  
  .originalNote{
    background-color: $text-grey; 
  }

  .note-title:hover {
    cursor: pointer;
  }
  
  .note-info {
    color: $dark;
    font-size: .7rem;
  }
  
  .myReply-item {
    padding: 1rem;
    margin: 0 1rem 0 1rem;
    border: 1px solid $text-grey;
    border-bottom: none;
    span.button {
      background-color: $red;
      color: $white;
      font-size: .5rem;
      height: 2rem;
      width: 4rem;
    }
  }
  
  .myReply-item:last-child {
    border-bottom: 1px solid $text-grey;
  }
  
  .myReply-item .column {
    padding-top: 0;
    padding-bottom: 0;
  }
</style>