<template>
  <div class="post-detail">
    <article class="media has-bottom-line">
      <div class="media-left" style="margin: 0 1rem 0 0">
        <figure class="image is-32x32 avatar-image" v-lazy:background-image="avatarUrl">
        </figure>
        <div class="has-text-centered" style="margin-top: 0.5rem">
          <h6 class="title is-6 is-lightred" style="font-weight: 400; font-size: 1rem">{{ $t('forum.detail.author') }}</h6>
        </div>
      </div>
      <div class="media-content">
        <nav class="nav">
          <div class="nav-left has-text-left">
            <span class="post-title">
              [{{editingPostData.sectionTitle}}] {{editingPostData.title | filterKeyword}}
            </span>
          </div>
        </nav>
        <p>
          <span class="is-grey">
            <timeago :since="nowdate" :auto-update="60"></timeago>
          </span>
          <span class="is-primary">{{ userInfo.nickname }}</span>
        </p>
        <quill-content class="post-content" :content="filterContent"></quill-content>
      </div>
    </article>
    <div class="tile is-full has-text-centered">
      <p style="margin: 1rem auto;">
        <input type="button" style="margin: 0.5rem; border-radius: 0; min-width: 8rem; font-weight: 500; font-size: 1rem; padding-bottom: 0.4em; padding-top: 0.35em; "
          @click="close" :value="$t('forum.newPost.backAndEdit')" class="button is-info" />
        <input type="submit" style="display: inline-block; margin: 0.5rem; font-size: 1rem;" @click="handleSubmit" :value="$t('forum.newPost.btnTitle')"
          class="button is-primary" />
      </p>
    </div>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import Toast from 'common/components/toast'
import * as utils from 'common/js/utils'
import * as filter from 'common/js/filters'

export default {
  data() {
    return {
      nowdate: utils.nowFromServer(),
      processing: false,
    }
  },

  computed: {
    ...mapGetters([
      'userInfo', 'editingPostData'
    ]),

    avatarUrl() {
      return {
        src: filter.imageStaticUrl(this.userInfo.avatar_url || window.acsConfig.defaultAvatarUrl),
        error: window.acsConfig.defaultAvatarUrl,
        loading: window.acsConfig.defaultAvatarUrl
      }
    },

    filterContent() {
      return filter.filterKeyword(this.editingPostData.content)
    }
  },

  methods: {
    ...mapActions([
      'resetPostEditingData'
    ]),

    close: function() {
      this.$router.back()
    },

    handleSubmit: async function() {
      if (!this.processing) {
        this.processing = true
        let forumId = this.$router.currentRoute.params.forumId
        let result = await this.$acs.addPost({
          forum_id: forumId, 
          section_id: this.editingPostData.selectedSectionId,
          id: this.editingPostData.id,
          title: this.editingPostData.title, 
          content: this.editingPostData.content})

        if (result.success) {
          this.resetPostEditingData()
          Toast.show(this.$t('forum.newPost.addSuccess'))
          this.$router.back()
        }
        this.processing = false
      }
    },
  }
}
</script>