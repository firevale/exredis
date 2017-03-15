<template>
<div class="tile is-vertical has-bottom-line post-list-item" v-if="$route.params.forumId == postInfo.forum.id"
  @click="showPostDetail">
  <div class="level is-mobile">
    <div class="level-left level-item" @click="showPostDetail">
      <span v-if="postInfo.is_top" class="level-item tag is-danger">{{ $t('forum.postList.top') }}</span>
      <div class="level-item">
        <h5 class="title is-5" style="margin-bottom: 0"> [{{postInfo.section.title}}] </h5>
        <h5 class="title is-5" v-html="filterKey"></h5>
      </div>
      <span v-if="postInfo.has_pic" class="level-item tag image-tag has-picture"></span>
      <span v-if="postInfo.is_vote" class="level-item tag is-essence">{{ $t('forum.postList.essence') }}</span>
      <span v-if="postInfo.is_hot" class="level-item tag is-danger">{{ $t('forum.postList.hot') }}</span>
    </div>
    <div class="level-right level-item has-text-right grey-text" style="margin-top: 0">
      <timeago :since="(postInfo.last_reply_at || postInfo.inserted_at) | convertServerDateTime" :auto-update="60"></timeago>
    </div>
  </div>
  <div class="level is-mobile">
    <div class="level-left level-item">
      <span class="is-primary">{{postInfo.user.nickname}}</span>
    </div>
    <div class="level-right level-item has-text-right grey-text">{{postInfo.comms}}/{{postInfo.reads}}</div>
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
    ...mapGetters(['searchKeyword']),

    filterKey() {
      return this.searchModel ?
        this.postInfo.title.replace(new RegExp(this.searchKeyword, 'g'),
          `<span class="red">${this.searchKeyword}</span>`) :
        this.postInfo.title
    },


  },

  methods: {
    showPostDetail() {
      this.$router.push({
        name: 'detail',
        params: {
          postId: this.postInfo.id
        },
      })
    }
  },
}
</script>
