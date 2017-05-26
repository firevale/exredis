<template>
  <div class="post-detail has-bottom-line">
    <article class="media">
      <div class="media-left" style="margin: 0 1rem 0 0">
        <figure class="image is-32x32 avatar-image" v-lazy:background-image="avatarUrl">
        </figure>
        <div class="has-text-centered" style="margin-top: 0.5rem">
          <h6 class="title is-6 is-lightred" style="font-weight: 400; font-size: 1rem">{{ nthName }}</h6>
        </div>
      </div>
      <div class="media-content">
        <nav class="nav">
          <div class="nav-left has-text-left">
            <span class="is-grey" style="margin-right: 0.5rem; margin-top:0.65rem">
              <timeago :since="(commentData.inserted_at) | convertServerDateTime" :auto-update="60"></timeago>
            </span>
            <span class="is-primary" style="font-size:1.1rem;margin-top:0.65rem">{{ commentData.user.nickname }}</span>
          </div>
          <div v-if="isManager && commentData.active" class="nav-right has-text-right" style="display: flex;flex-basis: 5rem; align-items:center;">
            <span class="icon image-icon icon-trash is-clickable" @click.prevent="confirmDeleteComment"></span>
            <span class="is-darkred is-clickable" style="margin-top: 0.25rem; margin-left:0.1rem" @click.prevent="confirmDeleteComment">
              {{ $t('common.delete') }} </span>
          </div>
        </nav>
        <quill-content class="quill-editor ql-snow post-content" :style="{color:!commentData.active?'#979797':''}" :key="filterContent"
          :content="filterContent" style="font-size:1.1rem"></quill-content>
      </div>
    </article>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
import AlertDialog from 'common/components/alertDialog'
import Toast from 'common/components/toast'
import * as filter from 'common/js/filters'

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

    avatarUrl() {
      return {
        src: filter.imageStaticUrl(this.commentData.user.avatar_url || window.acsConfig.defaultAvatarUrl),
        error: window.acsConfig.defaultAvatarUrl,
        loading: window.acsConfig.defaultAvatarUrl
      }
    },

    filterContent() {
      return filter.filterKeyword(this.commentData.content)
    },

    nthName: function() {
      switch (this.nth) {
        case 1:
          return this.$t('forum.detail.firstComment');
        case 2:
          return this.$t('forum.detail.secondComment');
        default:
          return this.$t('forum.detail.nthComment', {
            nth: this.nth
          });
      }
    }
  },

  methods: {
    confirmDeleteComment() {
      AlertDialog.show({
        visible: true,
        okText: this.$t('common.ok'),
        cancelText: this.$t('common.cancel'),
        message: this.$t('forum.detail.deleteTip', {
          nth: this.nth
        }),
        onOk: async _ => {
          let result = await this.$acs.deleteComment(this.commentData.id, this.$route.params.forumId)
          if (result.success) {
            Toast.show(this.$t(result.i18n_message))
            this.$emit('on-item-deleted', this.itemIndex);
          }
        },
      })
    },

  }
}
</script>