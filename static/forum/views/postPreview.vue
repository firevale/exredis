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
          <span class="is-primary">{{ nickname }}</span>
        </p>
        <div class="post-content">
          <div class="ql-editor" v-html="filterContent">
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

import * as utils from 'common/utils'
import * as filter from 'common/filters'

export default {
  mounted: function() {
    this.avatarUrl = this.$route.params.avatarUrl
    this.content = this.$route.params.content
    this.nickname = this.$route.params.nickname
    this.section = this.$route.params.section
    this.title = this.$route.params.title
  },

  data() {
    return {
      avatarUrl: "",
      content: "",
      nickname: "",
      nowdate: utils.nowFromServer(),
      section: "",
      title: "",
    }
  },

  computed: {
    avatarUrl() {
      return this.avatarUrl || window.acsConfig.defaultAvatarUrl
    },

    filterContent() {
      return filter.filterKeyword(this.content)
    }
  },

}
</script>