<template>
  <div class="post-detail has-bottom-line">
    <article class="media">
      <div class="media-left" style="margin: 0 1rem 0 0">
        <figure class="image is-32x32 avatar-image">
          <img :src="avatarUrl"></img>
        </figure>
        <div class="has-text-centered" style="margin-top: 0.5rem">
          <h6 class="title is-6 is-lightred" style="font-weight: 400; font-size: 1rem">{{ $t('forum.detail.author') }}</h6>
        </div>
      </div>
      <div class="media-content">
        <nav class="nav">
          <div class="nav-left has-text-left">
            <span class="post-title">
              [{{section}}] {{title | filterKeyword}}
            </span>
          </div>
        </nav>
        <p>
          <span class="is-grey">
            <timeago :since="nowdate" :auto-update="60"></timeago>
          </span>
          <span class="is-primary">{{ userInfo.nickName }}</span>
        </p>
        <div class="post-content">
          <div class="ql-editor" v-html="filterContent">
          </div>
        </div>
      </div>
    </article>
    <div class="tile is-full has-text-centered" >
        <input type="button" @click="close" :value="$t('forum.newPost.backAndEdit')" class="button is-info" />        
        <input type="submit" @click="handleSubmit" :value="$t('forum.newPost.btnTitle')" class="button is-info" />
      </div>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import message from '../../components/message'
import * as utils from 'common/js/utils'
import * as filter from 'common/js/filters'

export default {
  mounted: function() {
    this.content = this.$route.params.content
    this.section = this.$route.params.section
    this.title = this.$route.params.title
    this.selectedSectionId = this.$route.params.selectedSectionId
  },

  data() {
    return {
      content: "",
      nowdate: utils.nowFromServer(),
      section: "",
      title: "",
      selectedSectionId: 0,
      processing: false,
    }
  },

  computed: {
    ...mapGetters([
      'userInfo',
    ]),

    avatarUrl() {
      return this.userInfo.avatar_url || window.acsConfig.defaultAvatarUrl
    },

    filterContent() {
      return filter.filterKeyword(this.content)
    }
  },

  methods: {
    close: function() {
      window.history.go(-1)
    },

    handleSubmit: async function() {
      if (!this.processing) {
        this.processing = true
        let forumId = this.$router.currentRoute.params.forumId
        let result = await this.$acs.addPost(forumId, this.selectedSectionId,
          this.title, this.content)

        if (result.success) {
          message.showMsg(this.$t('forum.newPost.addSuccess'))
          this.$router.replace({
            name: 'postList'
          })
        }
        this.processing = false
      }
    },
  }
}
</script>