<template>
<div class="dark-bottom">
  <div class="columns " style="margin: 0;">
    <div style="padding: 1rem 0 1rem .5rem;">
      <figure class="image is-64x64" style="margin: auto;border-radius:50%;border: 1px solid;overflow: hidden;">
        <img :src="itemData.user.avatar_url"></img>
      </figure>
      <div class="title is-6 has-text-centered red">{{itemData.rank}}</div>
    </div>
    <div class="column is-10.5 ql-editor">
      <div v-if="itemData.title" class="columns" style="margin: 0;">
        <div class="column is-10 title is-5 detail-title">
          <p>{{itemData.title}}</p>
        </div>
        <div class="column is-2" style="text-align: right;">
          <span v-if="itemData.rank == $t('forum.detail.author')" class="button follow-btn" @click="floorHost">{{ onlyHost? $t('forum.detail.followAll'): $t('forum.detail.follow') }}</span>
        </div>
      </div>
      <div class="column detail-info">
        <span class="note-time dark" style="font-size: .8rem;">{{ itemData.created_at | formatServerDateTime }}</span>
        <span class="note-author" style="font-size: .9rem;">{{ itemData.user.nickname }}</span>
        <span v-if="itemData.rank != $t('forum.detail.author') && !preview" class="note-delete" @click="deletePostQuestion"
          style="font-size: .9rem;">{{ $t('forum.detail.delete') }}</span>
      </div>
      <div ref="contentContainer" class="column" style="font-weight: bold;" v-html="itemData.content">[aaa]
      </div>
      <div v-if="itemData.rank == $t('forum.detail.author')" class="column pointer">
        <i class="fa fa-heart" :class="{'red': itemData.collection }" style="vertical-align: middle;"></i>
        <span class="dark" style="font-size: .9rem;" @click="ToggleFavorite">{{ itemData.collection? $t('forum.detail.cancelCollection'): $t('forum.detail.collection') }}</span>
      </div>
    </div>
  </div>
  <div v-if="itemData.rank=='楼主' && isManager" class="row-menu dark-background" style="font-size: 1rem; padding: .5rem;justify-content: space-between;">
    <i class="fa fa-level-down red-background button" style="padding-top: .5rem;" aria-hidden="true" @click="closePost">{{ $t('forum.detail.closePost') }}</i>
    <i class="fa fa-level-up primary-background button" style="padding-top: .5rem;" aria-hidden="true" @click="essencePost">{{ $t('forum.detail.essencePost') }}</i>
    <i class="fa fa-level-up primary-background button" style="padding-top: .5rem;" aria-hidden="true" @click="upPost">{{ $t('forum.detail.upPost') }}</i>
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

export default {
  mounted() {
    if (this.itemData.rank == '楼主') {
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
    if (this.itemData.rank == '楼主') {
      this.$refs.contentContainer.removeEventListener('click', this.checkImgClick)
    }
  },

  props: {
    itemData: {
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
      onlyHost: false,
      imgsPreview: [],
    }
  },

  computed: {
    isManager() {
      return true
      //this.$http()
    },
  },

  methods: {

    floorHost() {
      this.$emit('toggle-floorHost', this.itemData.user.nickname)
      this.onlyHost = !this.onlyHost
    },

    ToggleFavorite: async function() {
      if (window.acsConfig.accessToken) {
        let result = await this.$acs.togglePostFavorite(this.itemData.id)
        if (result.success) {
          this.itemData.collection = !this.itemData.collection
          message.showMsg(this.$t(result.i18n_message))
        }
      } else {
        this.loginAndRedirect()
      }
    },

    closePost() {
      this.setPostStatus("close")
    },

    essencePost() {
      this.setPostStatus("essence")
    },

    upPost() {
      this.setPostStatus("up")
    },

    setPostStatus: async function(status) {
      if (window.acsConfig.accessToken) {
        let result = await this.$acs.setPostStatus(this.itemData.id, status)
        if (result.success) {
          message.showMsg(this.$t(result.i18n_message))
        }
      } else {
        this.loginAndRedirect()
      }
    },

    loginAndRedirect() {
      this.$router.push({
        path: '/login',
        query: {
          redirect_uri: btoa(location.href)
        }
      })
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
