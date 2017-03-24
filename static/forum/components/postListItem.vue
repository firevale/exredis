<template>
<div class="tile is-vertical has-bottom-line post-list-item" v-if="$route.params.forumId == postInfo.forum.id"
   v-touch:tap="showPostDetail">
  <article class="media">
    <div class="media-left" style="margin: 0.3rem 0.8rem 0 0">
      <figure class="image is-32x32 avatar-image">
        <img :src="avatarUrl"></img>
      </figure>
    </div>
    <div class="media-content">
      <div class="level is-mobile">
        <div class="level-left level-item is-narrow" @click="showPostDetail">
          <span v-if="postInfo.is_top" class="level-item tag is-danger">{{ $t('forum.postList.top') }}</span>
          <div class="level-item">
            <h5 class="title is-5" style="margin-bottom: 0; margin-right: 0.2rem"> [{{postInfo.section.title}}] </h5>
            <h5 class="title is-5" v-html="strenghtenKeywordTitle"></h5>
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
  </article>
</div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

// import * as filter from '../common/keywordFilter'

export default {
  props: {
    searchKeyword: {
      type: String,
      default: '',
    },
    postInfo: {
      type: Object,
      default: null,
    },
  },
  computed: {
    avatarUrl: function() {
      return this.postInfo.user.avatar_url || window.acsConfig.defaultAvatarUrl
    },
    strenghtenKeywordTitle() {
      return this.searchKeyword ?
        this.postInfo.title.replace(new RegExp(this.searchKeyword, 'g'),
          `<span class="is-danger" style="font-weight: 400; font-style: italic;">${this.searchKeyword}</span>`
        ) : this.postInfo.title
      // filter.filterKeyword(this.postInfo.title)
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