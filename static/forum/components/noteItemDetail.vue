<template>
  <div class="dark-bottom">
    <div class="columns " style="margin: 0;">
      <div style="padding: 1rem 0 1rem .5rem;">
        <figure class="image is-64x64" style="margin: auto;border-radius:50%;border: 1px solid;overflow: hidden;">
          <img :src="itemData.portrait"></img>
        </figure>
        <div class="title is-6 txt-center dark" style="margin-top: 1rem; margin-bottom: 1rem;">{{itemData.level}}</div>
        <div class="title is-6 txt-center" :class="{'red': itemIndex < 3 }">{{itemData.rank}}</div>
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
          <span class="note-time dark" style="font-size: .8rem;">{{ itemData.time }}</span>
          <span class="note-author" style="font-size: .9rem;">{{ itemData.author }}</span>
          <span v-if="itemData.rank != $t('forum.detail.author') && !preView" class="note-delete" @click="deleteNoteQuestion" style="font-size: .9rem;">{{ $t('forum.detail.delete') }}</span>
        </div>
        <!--<div v-if="itemData.img&&itemData.img.length" class="column detail-imgs">
          <figure v-for="(item, index) in itemData.img" class="image is-256x256">
            <img :src="item.url" @click="showAllImgInSwiper(index)"></img>
            <i v-if="preView" class="fa fa-times-circle img-remove-icon" @click="$emit('img-delete', item)"></i>
          </figure>
        </div>-->
        <div class="column" style="font-weight: bold;" v-html="itemData.description">
        </div>
        <div v-if="itemData.rank == $t('forum.detail.author')" class="column pointer">
          <i class="fa fa-heart" :class="{'red': itemData.collection }" style="vertical-align: middle;"></i>
          <span class="dark" style="font-size: .9rem;" @click="noteCollection">{{ itemData.collection? $t('forum.detail.cancelCollection'): $t('forum.detail.collection') }}</span>
        </div>
      </div>
    </div>
    <div v-if="itemData.rank=='楼主' && isManager" class="row-menu dark-background" style="font-size: 1rem; padding: .5rem;justify-content: space-between;">
      <i class="fa fa-level-down red-background button" style="padding-top: .5rem;" aria-hidden="true" @click="sealNote">{{ $t('forum.detail.closeNote') }}</i>
      <i class="fa fa-level-up primary-background button" style="padding-top: .5rem;" aria-hidden="true" @click="essenceNote">{{ $t('forum.detail.essenceNote') }}</i>
      <i class="fa fa-level-up primary-background button" style="padding-top: .5rem;" aria-hidden="true" @click="recommendNote">{{ $t('forum.detail.recommendNote') }}</i>
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
    swiperContainer
  } from '../components/swiper'
  import message from './message'

  export default {
    mounted() {
      if(this.itemData.rank == '楼主'){
        window.document.addEventListener('click', this.checkImgClick)
      }
    },

    destroyed () {
      if(this.itemData.rank == '楼主'){
        window.document.removeEventListener('click', this.checkImgClick)
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
      preView: {
        type: Boolean,
        default: false,
      },
    },

    data() {
      return {
        onlyHost: false,
        imgsPreview: document.getElementsByTagName('img'),
      }
    },

    computed: {
      isManager() {
        return true
        // this.$http({
        //   method: 'post',
        //   params: {
        //     noteID: this.itemData.ID,
        //     user: '',
        //   },
        //   url: '/checkNoteManager',
        // }).then(response => {
        //   response? Promise.resolve(true): Promise.reject(false)
        // }).catch(error =>
        //   true
        //    //Promise.reject(false)
        // )

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
            noteID: this.itemData.ID,
          },
        }).then().catch()
      },

      floorHost() {
        this.$emit('toggle-floorHost', this.itemData.author)
        this.onlyHost = !this.onlyHost
      },

      noteCollection() {
        this.itemData.collection = !this.itemData.collection
        //   this.$http({
        //     method: 'post',
        //     url: '/noteCollection',
        //     params: {
        //       noteID: this.itemData.ID,
        //     },
        //   }).then((response)=>{

        //   }).catch()
      },

      showAllImgInSwiper(index) {
        if (!this.preView) {
          swiperContainer({
            visible: true,
            imgs: this.imgsPreview,
            rank: index,
          })
        }
      },

      sealNote(){
        this.$http({
          url: 'sealNote',
          method: 'post',
          params: {
            noteID: this.itemData.ID,
          },
        }).then().catch()

        message.showMsg(this.$t('forum.detail.sealNote'))
        
      },

      essenceNote(){
        this.$http({
          url: 'essenceNote',
          method: 'post',
          params: {
            noteID: this.itemData.ID,
          },
        }).then().catch()
      },

      recommendNote(){
        this.$http({
          url: 'recommendNote',
          method: 'post',
          params: {
            noteID: this.itemData.ID,
          },
        }).then().catch()
      },

      checkImgClick(e){
        if(e.target.tagName.toLowerCase()=="img"){
          this.showAllImgInSwiper(0)
        }
      },

    }
  }
</script>