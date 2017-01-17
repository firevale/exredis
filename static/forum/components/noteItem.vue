<template>
  <div class="note-item">
    <div class="columns">
      <div class="column is-10" @click="showDetail">
        <a v-for="item in itemData.headerTag" class="headerTag">{{item.name}}</a>
        <span class="note-title" v-html="filterKey"></span>
        <i v-if="itemData.hasPicture" class="fa fa-picture-o note-picture"></i>
        <a v-for="item in itemData.tailTag" class="tailTag" :class="{'excellent': item.isTag}">{{item.name}}</a>
      </div>
      <div class="column is-2 txt-right note-info">{{itemData.time}}</div>
    </div>
    <div class="columns">
      <div class="column is-10">
        <span class="author-name">{{itemData.author}}</span>
      </div>
      <div class="column is-2 txt-right note-info">{{itemData.noteCount}}</div>
    </div>
  </div>
</template>
<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  export default {
    props: {
      tagBgColor: {
        type: String,
        default: '#f00',
      },
      tagColor: {
        type: String,
        default: '#fff',
      },
      itemData: {
        type: Object,
        default: null,
      },
    },
    computed: {
      ...mapGetters(['searchKey']),

      filterKey() {
        return this.itemData.title.replace(new RegExp(this.searchKey, 'g'), '<span class="red">' + this.searchKey +
          '</span>')
      }
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
</style>