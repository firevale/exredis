<template>
<div class="post-detail has-bottom-line">
  <article class="media">
    <div class="media-left" style="margin: 0 1rem 0 0">
      <figure class="image is-64x64 avatar-image">
        <img :src="avatarUrl"></img>
      </figure>
      <div class="has-text-centered" style="margin-top: 0.5rem">
        <h6 class="title is-6 is-lightred" style="font-weight: 400">{{ $t('forum.detail.author') }}</h6>
      </div>
    </div>
    <div class="media-content">
      <nav class="nav">
        <div class="nav-left has-text-left">
          <span v-if="postData.is_top" class="tag is-danger">{{ $t('forum.postList.top') }}</span>
          <span class="title is-5">
            [{{postData.section.title}}] {{postData.title}}
          </span>
          <span v-if="postData.is_vote" class="tag is-essence">{{ $t('forum.postList.essence') }}</span>
          <span v-if="postData.is_hot" class="tag is-danger">{{ $t('forum.postList.hot') }}</span>
        </div>
        <div class="nav-right has-text-right" style="flex-glow: 0">
          <a class="button level-button is-primary">{{$t('forum.detail.showAuthorOnly')}}</a>
        </div>
      </nav>
      <p>
        <span class="is-grey">
          <timeago :since="(postData.created_at) | convertServerDateTime" :auto-update="60"></timeago>
        </span>
        <span class="is-primary">{{ postData.user.nickname }}</span>
      </p>
      <div class="content">
        <p class="post-content" v-html="postData.content">
        </p>
        <div class="tile">
          <span class="icon image-icon is-clickable" :class="postData.is_favorite ? 'icon-heart' : 'icon-heart-o'"
            @click="toggleFavorite"></span>
          <span class="is-grey is-clickable" @click="toggleFavorite">
            {{ postData.is_favorite? $t('forum.detail.removeFromFavorites'): $t('forum.detail.addToFavorite') }}
          </span>
        </div>
      </div>
    </div>
  </article>
  <nav v-if="isManager" class="nav post-manage-bar">
    <div class="nav-left has-text-left" @click="toggleActive">
      <a class="button is-danger">
        <span class="icon image-icon icon-times" style="">
        </span> {{ postData.active? $t('forum.detail.closePost'): $t('forum.detail.openPost')
        }}
      </a>
    </div>
    <div class="nav-center has-text-center" @click="toggleEssence">
      <a class="button is-primary">
        <span class="icon image-icon icon-star" style="">
        </span> {{ postData.is_vote? $t('forum.detail.unEssencePost'): $t('forum.detail.essencePost')
        }}
      </a>
    </div>
    <div class="nav-right has-text-right" @click="toggleUp">
      <a class="button is-info">
        <span class="icon image-icon icon-top" style="">
        </span> {{ postData.is_top? $t('forum.detail.unUpPost'): $t('forum.detail.upPost') }}
      </a>
    </div>
  </nav>
</div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
import {
  swiperContainer,
  preViewing
} from '../components/swiper'
import md5 from 'js-md5'
import message from './message'

export default {
  mounted() {
    // this.$refs.contentContainer.addEventListener('click', this.checkImgClick)
    // let imgs = []
    // let htmlCollection = this.$refs.contentContainer.getElementsByTagName('img')
    // for (var i = 0; i < htmlCollection.length; i++) {
    //   this.imgsPreview.push({
    //     url: htmlCollection[i].src,
    //     id: md5(htmlCollection[i].src)
    //   })
    // }
  },

  destroyed() {
    // this.$refs.contentContainer.removeEventListener('click', this.checkImgClick)
  },

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
    }
  },

  computed: {
    isManager() {
      return true
    },

    avatarUrl() {
      return this.postData.user.avatar_url || window.acsConfig.defaultAvatarUrl
    }
  },

  methods: {

    toggleShowAuthorOnly() {
      this.showAuthorOnly = !this.showAuthorOnly
    },

    toggleFavorite: async function() {
      if (window.acsConfig.accessToken) {
        let result = await this.$acs.togglePostFavorite(this.postData.id)
        if (result.success) {
          this.postData.is_favorite = !this.postData.is_favorite
          message.showMsg(this.$t(result.i18n_message))
        }
      }
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
      if (window.acsConfig.accessToken) {
        let result = await this.$acs.togglePostStatus({
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
          message.showMsg(this.$t(result.i18n_message))
        }
      }
    },
  }
}
</script>
