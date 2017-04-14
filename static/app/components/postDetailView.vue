<template>
  <div class="post-detail has-bottom-line">
    <article class="media" :class="isManager ? 'has-bottom-line' : ''">
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
            <span v-if="postData.is_top" class="tag is-danger">{{ $t('forum.postList.top') }}</span>
            <span class="post-title">
              [{{postData.section.title}}] {{postData.title | filterKeyword}}
            </span>
            <span v-if="postData.is_vote" class="tag is-essence">{{ $t('forum.postList.essence') }}</span>
            <span v-if="postData.is_hot" class="tag is-danger">{{ $t('forum.postList.hot') }}</span>
          </div>
          <div class="nav-right has-text-right" style="flex-glow: 0">
            <v-touch tag="a" class="button level-button is-primary" @tap="toggleShowAuthorOnly">
              {{$t('forum.detail.showAuthorOnly')}}
            </v-touch>
          </div>
        </nav>
        <p>
          <span class="is-grey">
            <timeago :since="(postData.inserted_at) | convertServerDateTime" :auto-update="60"></timeago>
          </span>
          <span class="is-primary">{{ postData.user.nickname }}</span>
        </p>
        <div class="post-content">
          <div class="ql-editor" v-html="filterContent">
          </div>
        </div>
        <div class="tile" style="margin-bottom: 0.5rem; align-items: center">
          <span v-if="favoriting" class="icon image-icon icon-circle rotating" style="margin-right: 0.1rem"></span>
          <v-touch v-else tag="span" :class="postData.is_favorite ? 'icon-heart' : 'icon-heart-o'" class="icon image-icon is-clickable"
            style="margin-right: 0.1rem" @tap="toggleFavorite">
          </v-touch>
          <span v-if="favoriting" class="is-grey">
            {{ $t('forum.detail.favoriting') }}
          </span>
          <v-touch v-else tag="span" class="is-grey is-clickable" @tap="toggleFavorite">
            {{ postData.is_favorite? $t('forum.detail.removeFromFavorites'): $t('forum.detail.addToFavorite') }}
          </v-touch>
        </div>
      </div>
    </article>
    <nav v-if="isManager" class="nav post-manage-bar">
      <v-touch class="nav-left has-text-left" @tap="toggleActive">
        <a class="button is-danger">
          <span class="icon image-icon icon-times" style="">
          </span> {{ postData.active? $t('forum.detail.closePost'): $t('forum.detail.openPost') }}
        </a>
      </v-touch>
      <v-touch class="nav-center has-text-center" @tap="toggleEssence">
        <a class="button is-primary">
          <span class="icon image-icon icon-star" style="">
          </span> {{ postData.is_vote? $t('forum.detail.unEssencePost'): $t('forum.detail.essencePost') }}
        </a>
      </v-touch>
      <v-touch class="nav-right has-text-right" @tap="toggleUp">
        <a class="button is-info">
          <span class="icon image-icon icon-top" style="">
          </span> {{ postData.is_top? $t('forum.detail.unUpPost'): $t('forum.detail.upPost') }}
        </a>
      </v-touch>
    </nav>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import Toast from 'common/components/toast'
import * as acs from 'common/js/acs'
import * as filter from 'common/js/filters'

export default {
  props: {
    postData: {
      type: Object,
      default: null,
    },
    itemIndex: {
      type: Number,
    },
    preview: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      showAuthorOnly: false,
      imgsPreview: [],
      favoriting: false,
    }
  },

  computed: {
    isManager() {
      return window.acsConfig.isAdmin == true
    },

    avatarUrl() {
      return this.postData.user.avatar_url || window.acsConfig.defaultAvatarUrl
    },

    filterContent() {
      return filter.filterKeyword(this.postData.content)
    }
  },

  methods: {
    toggleShowAuthorOnly() {
      this.showAuthorOnly = !this.showAuthorOnly
    },

    toggleFavorite: function() {
      acs.checkIsLogin(async _ => {
        this.favoriting = true
        let result = await this.$acs.togglePostFavorite(this.postData.id)
        if (result.success) {
          this.postData.is_favorite = !this.postData.is_favorite
        }
        this.favoriting = false
      })
    },

    toggleActive() {
      this.togglePostStatus({
        active: !this.postData.active
      }, "active")
    },

    toggleEssence() {
      this.togglePostStatus({
        is_vote: !this.postData.is_vote
      }, "is_vote")
    },

    toggleUp() {
      this.togglePostStatus({
        is_top: !this.postData.is_top
      }, "is_top")
    },

    togglePostStatus: async function(params, pos) {
      if (window.acsConfig.isAdmin == true) {
        let result = await this.$acs.togglePostStatus({
          forum_id: this.$route.params.forumId,
          post_id: this.postData.id,
          ...params
        })
        if (result.success) {
          switch (pos) {
            case "active":
              this.postData.active = !this.postData.active
              break;
            case "is_vote":
              this.postData.is_vote = !this.postData.is_vote
              break;
            case "is_top":
              this.postData.is_top = !this.postData.is_top
          }
          Toast.show(this.$t(result.i18n_message))
        }
      }
    },
  }
}
</script>