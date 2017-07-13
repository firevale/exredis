<template>
  <v-touch class="has-bottom-line post-list-item" :class="{isTop: postInfo.is_top}" v-if="$route.params.forumId == postInfo.forum.id"
    v-on:tap="showPostDetail">
    <article class="media">
      <div class="media-left" style="margin: 0.3rem 0.8rem 0 0">
        <figure class="image is-32x32 avatar-image" v-lazy:background-image="avatarUrl">
        </figure>
      </div>
      <div class="media-content">
        <div class="post-title">
          <div class="post-title-content flex-take-rest" @click="showPostDetail">
            <span v-if="postInfo.is_top" class="tag is-danger">{{ $t('forum.postList.top') }}</span>
            <span v-if="$route.name == 'search'" class="title is-5" style="width: calc(100vw - 19rem);">
              [{{postInfo.section.title}}] {{ strenghtenKeywordTitle }}
            </span>
            <span v-else class="title is-5">
              [{{postInfo.section.title}}] {{ strenghtenKeywordTitle }}
            </span>
            <span v-if="postInfo.has_pic" class="tag image-tag has-picture"></span>
            <span v-if="postInfo.is_vote" class="tag is-essence">{{ $t('forum.postList.essence') }}</span>
            <span v-if="postInfo.is_hot" class="tag is-danger">{{ $t('forum.postList.hot') }}</span>
          </div>
          <div class="post-title-time has-text-right grey-text flex-fixed-size" style="margin-top: 0">
            <timeago class="fn-nowrap" style="padding-left: 1rem;" :since="(postInfo.last_reply_at || postInfo.inserted_at) | convertServerDateTime" :auto-update="60"></timeago>
          </div>
        </div>
        <div class="level is-mobile">
          <div class="level-left level-item">
            <span class="is-primary">{{ postInfo.user.nickname }}</span>
          </div>
          <div class="level-right level-item has-text-right grey-text">{{postInfo.comms}}/{{postInfo.reads}}</div>
        </div>
      </div>
    </article>
  </v-touch>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import * as filter from 'common/js/filters'

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
    avatarUrl() {
      return {
        src: filter.imageStaticUrl(this.postInfo.user.avatar_url || window.acsConfig.defaultAvatarUrl),
        error: window.acsConfig.defaultAvatarUrl,
        loading: window.acsConfig.defaultAvatarUrl
      }
    },
    strenghtenKeywordTitle() {
      return this.searchKeyword ?
        this.postInfo.title.replace(new RegExp(this.searchKeyword, 'g'),
          `<span class="is-danger" style="font-weight: 400; font-style: italic; margin-right:0.2rem">${this.searchKeyword}</span>`
        ) :
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

<style lang="scss" scoped>
  .post-title {
    display: flex;

    &-content {
      display: flex;
      align-items: flex-start;
      span.tag {
        display: inline-flex;
        margin-top: 0.15rem;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
      }
      span.title.is-5 {
        display: inline-block;
        overflow-wrap: break-word;
        line-height: 1.3;
      }
    }
  }
</style>