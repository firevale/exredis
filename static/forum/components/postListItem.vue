<template>
<div class="post-list-item">
  <div class="columns">
    <div class="column is-10" @click="showDetail">
      <a v-if="postInfo.is_top" class="header-tag">{{ $t('forum.postList.top') }}</a> [{{postInfo.section.title}}]
      <span class="post-title" v-html="filterKey"></span>
      <i v-if="postInfo.has_pic" class="fa fa-picture-o note-picture"></i>
      <a v-if="postInfo.is_vote" class="header-tag excellent">{{ $t('forum.postList.vote') }}</a>
      <a v-if="postInfo.is_hot" class="header-tag">{{ $t('forum.postList.hot') }}</a>
    </div>
    <div class="column is-2 txt-right post-info">{{postInfo.last_reply_at | formatServerDateTime}}</div>
  </div>
  <div class="columns">
    <div class="column is-10">
      <span class="author-name">{{postInfo.user.nickname}}</span>
    </div>
    <div class="column is-2 txt-right post-info">{{postInfo.comms}}/{{postInfo.reads}}</div>
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
    postInfo: {
      type: Object,
      default: null,
    },
  },
  computed: {
    ...mapGetters(['searchKey']),

    filterKey() {
      return this.searchModel ?
        this.postInfo.title.replace(new RegExp(this.searchKey, 'g'),
          `<span class="red">${this.searchKey}</span>`) :
        this.postInfo.title
    }
  },

  methods: {
    showDetail() {
      this.$router.push({
        name: 'detail',
        params: {
          id: this.postInfo.id
        },
      })
    }
  },
}
</script>
