<template>
<div class="post-detail has-bottom-line">
  <article class="media">
    <div class="media-left" style="margin: 0 1rem 0 0">
      <figure class="image is-64x64 avatar-image">
        <img :src="avatarUrl"></img>
      </figure>
      <div class="has-text-centered" style="margin-top: 0.5rem">
        <h6 class="title is-6 is-lightred" style="font-weight: 400">{{ nthName }}</h6>
      </div>
    </div>
    <div class="media-content">
      <nav class="nav">
        <div class="nav-left has-text-left">
          <span class="is-grey" style="margin-right: 0.5rem">
            <timeago :since="(commentData.inserted_at) | convertServerDateTime" :auto-update="60"></timeago>
          </span>
          <span class="is-primary">{{ commentData.user.nickname }}</span>
        </div>
        <div v-if="isManager" class="nav-right has-text-right" style="flex-glow: 0; flex-basis: 5rem; align-items: center">
          <span class="icon image-icon icon-trash is-clickable" @click.prevent="confirmDeleteComment"> </span>
          <span class="is-darkred is-clickable" @click.prevent="confirmDeleteComment"> 删除 </span>
        </div>
      </nav>
      <div class="post-content">
        <div class="ql-editor" v-html="commentData.content">
        </div>
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
import AlertDialog from './alertDialog'
import message from './message'

export default {
  props: {
    commentData: {
      type: Object,
      default: null,
    },
    itemIndex: {
      type: Number,
    },
    nth: {
      type: Number,
    },
    preview: {
      type: Boolean,
      default: false,
    },
    onItemDeleted: {
      type: Function,
      default: undefined
    }
  },

  computed: {
    isManager() {
      return window.acsConfig.isAdmin == true
    },

    avatarUrl: function() {
      return this.commentData.user.avatar_url || window.acsConfig.defaultAvatarUrl
    },

    nthName: function() {
      switch(this.nth) {
        case 1:
          return this.$t('forum.detail.firstComment');
        case 2:
          return this.$t('forum.detail.secondComment');
        default:
          return this.$t('forum.detail.nthComment', {nth: this.nth});
      }
    }
  },

  methods: {
    confirmDeleteComment() {
      AlertDialog.showModal({
        message: this.$t('forum.detail.deleteTip', {nth: this.nth}),
        onOk: async _ => {
          let result = await this.$acs.deleteComment(this.commentData.id, this.$route.params.forumId)
          if (result.success) {
            message.showMsg(this.$t(result.i18n_message))
            if (this.onItemDeleted)
              this.onItemDeleted(this.itemIndex)
          }
        },
        onCancel: null,
      })
    },

  }
}
</script>
