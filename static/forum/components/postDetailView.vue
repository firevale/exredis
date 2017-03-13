<template>
<div class="has-bottom-line">
  <div class="tile is-parent">
    <div class="tile is-child is-vertical is-1">
      <figure class="image is-64x64 avatar-image" style="margin-top: 1rem">
        <img :src="avatarUrl"></img>
      </figure>
      <div class="has-text-centered" style="margin-top: 1rem">
        <h5 class="title is-5 is-danger" style="font-weight: 400">{{ $t('forum.detail.author') }}</h5>
      </div>
    </div>
    <div class="tile is-child is-vertical is-11">
      <div class="level">
        <div class="level-item level-left has-text-left">
          <h5 class="title is-5" style="font-weight: 400">[{{postData.section.title}}] {{postData.title}}</h5>
        </div>
        <div class="level-item level-right has-text-right">
          <a class="button is-primary"></a>
        </div>
      </div>
      <div class="column detail-info">
        <span class="note-time dark" style="font-size: .8rem;">{{ postData.created_at | formatServerDateTime }}</span>
        <span class="note-author" style="font-size: .9rem;">{{ postData.user.nickname }}</span>
      </div>
      <div ref="contentContainer" class="column" style="font-weight: bold;" v-html="postData.content">[aaa]
      </div>
      <div v-if="postData.rank == $t('forum.detail.author')" class="column pointer">
        <i class="fa fa-heart" :class="{'red': postData.collection }" style="vertical-align: middle;"></i>
        <span class="dark" style="font-size: .9rem;" @click="toggleFavorite">{{ postData.collection? $t('forum.detail.cancelCollection'): $t('forum.detail.collection') }}</span>
      </div>
    </div>
  </div>
  <div v-if="isManager" class="row-menu dark-background" style="font-size: 1rem; padding: .5rem;justify-content: space-between;">
    <i class="fa fa-level-down red-background button" style="padding-top: .5rem;" aria-hidden="true" @click="toggleActive">{{ postData.active? $t('forum.detail.closePost'): $t('forum.detail.openPost') }}</i>
    <i class="fa fa-level-up primary-background button" style="padding-top: .5rem;" aria-hidden="true" @click="toggleEssence">{{ postData.is_vote? $t('forum.detail.unEssencePost'): $t('forum.detail.essencePost') }}</i>
    <i class="fa fa-level-up primary-background button" style="padding-top: .5rem;" aria-hidden="true" @click="toggleUp">{{ postData.is_top? $t('forum.detail.unUpPost'): $t('forum.detail.upPost') }}</i>
  </div>
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
    if (this.postData.rank == '楼主') {
      this.$refs.contentContainer.addEventListener('click', this.checkImgClick)
      let imgs = []
      let htmlCollection = this.$refs.contentContainer.getElementsByTagName('img')
      for (var i = 0; i < htmlCollection.length; i++) {
        this.imgsPreview.push({
          url: htmlCollection[i].src,
          id: md5(htmlCollection[i].src)
        })
      }
    }
  },

  destroyed() {
    if (this.postData.rank == '楼主') {
      this.$refs.contentContainer.removeEventListener('click', this.checkImgClick)
    }
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
      isManager: true,
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
          this.postData.collection = !this.postData.collection
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

    showAllImgInSwiper(index) {
      if (!this.preview && !preViewing()) {
        swiperContainer({
          visible: true,
          imgs: this.imgsPreview,
          rank: index,
        })
      }
    },

    checkImgClick(e) {
      if (e.target.tagName.toLowerCase() == "img") {
        let imgId = md5(e.target.src)
        this.showAllImgInSwiper(this.imgsPreview.findIndex(item => item.id == imgId))
      }
    },

  }
}
</script>
