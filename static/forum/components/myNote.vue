<template>
  <div class="mynote-item rowLine">
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
  
  .note-title:hover {
    cursor: pointer;
  }
  
  .note-info {
    color: $dark;
    font-size: .7rem;
  }
  
  .excellentBtn {
    border-color: $olive !important;
    color: $olive;
    font-size: .5rem;
    height: 1.6rem !important;
  }
  
  .mynote-item {
    padding: 1rem;
    margin: 0 1rem 0 1rem;
    border: 1px solid $text-grey;
    border-bottom: none;
    display: flex;
    flex-direction: row;
    span.button {
      background-color: $red;
      color: $white;
      font-size: .5rem;
      height: 2rem;
      width: 4rem;
    }
  }
  
  .mynote-item:last-child {
    border-bottom: 1px solid $text-grey;
  }
  
  .mynote-item .column {
    padding-top: 0;
    padding-bottom: 0;
  }
</style>