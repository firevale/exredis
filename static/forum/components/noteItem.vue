<template>
  <div class="note-item">
    <div class="columns">
      <div class="column is-10" @click="showDetail">
        <a v-if="itemData.is_top" class="header-tag">置顶</a>
        [{{itemData.section}}] <span class="note-title" v-html="filterKey"></span>
        <i v-if="itemData.has_pic" class="fa fa-picture-o note-picture"></i>
        <a v-if="itemData.is_vote" class="header-tag excellent">精</a>
        <a v-if="itemData.is_hot" class="header-tag">HOT</a>
      </div>
      <div class="column is-2 txt-right note-info">{{itemData.last_reply_at | formatServerDateTime}}</div>
    </div>
    <div class="columns">
      <div class="column is-10">
        <span class="author-name">{{itemData.author}}</span>
      </div>
      <div class="column is-2 txt-right note-info">{{itemData.comms}}/{{itemData.reads}}</div>
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
      searchModel: {
        type: Boolean,
        default: false,
      },
      itemData: {
        type: Object,
        default: null,
      },
    },
    computed: {
      ...mapGetters(['searchKey']),

      filterKey() {
        return this.searchModel?this.itemData.title.replace(new RegExp(this.searchKey, 'g'), '<span class="red">' + this.searchKey +
          '</span>'): this.itemData.title
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
