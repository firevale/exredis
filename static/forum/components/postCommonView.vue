<template>
<div class="dark-bottom">
  <div class="columns " style="margin: 0;">
    <div style="padding: 1rem 0 1rem .5rem;">
      <figure class="image is-64x64" style="margin: auto;border-radius:50%;border: 1px solid;overflow: hidden;">
        <img :src="itemData.user.avatar_url"></img>
      </figure>
      <div class="title is-6 has-text-centered" :class="{'red': itemIndex < 3 }">{{itemData.rank}}</div>
    </div>
    <div class="column is-10.5 ql-editor">
      <div class="column detail-info">
        <span class="note-time dark" style="font-size: .8rem;">{{ itemData.created_at }}</span>
        <span class="note-author" style="font-size: .9rem;">{{ itemData.user.nickname }}</span>
        <span v-if="itemData.rank != $t('forum.detail.author') && !preview" class="note-delete" @click="deleteNoteQuestion"
          style="font-size: .9rem;">{{ $t('forum.detail.delete') }}</span>
      </div>
      <div ref="contentContainer" class="column" style="font-weight: bold;" v-html="itemData.content">
      </div>
    </div>
  </div>
</div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
import AlertDialog from './alertDialog'
import {
  swiperContainer,
  preViewing
} from '../components/swiper'
import message from './message'
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
    deleteNoteQuestion() {
      AlertDialog.showModal({
        message: this.$t('forum.detail.deleteTip'),
        onOk: this.deleteFollowNote,
        onCancel: null,
      })
    },

    deleteFollowNote() {
      this.$http({
          url: 'deleteFollowNote',
          method: 'POST',
          params: {
            noteID: this.itemData.id,
          },
        })
        .then()
        .catch()
    },

    floorHost() {
      this.$emit('toggle-floorHost', this.itemData.author)
      this.onlyHost = !this.onlyHost
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
