<template>
  <div class="is-ancestor is-parent is-vertical">
    <div class="is-child  fixed-top row-line">
      <div class="arrow-back" style="left: 1rem;">
        <i class="fa fa-angle-left title is-2 dark" aria-hidden="true" @click="goBack"></i>
      </div>
      <div class="row-line top-title">
        <span class="title is-4">{{ $t('forum.replyNote.title') }}</span>
      </div>
    </div>
    <div v-show="!pageView" class="scroll-box">
      <div class="column is-full" style="padding-top: 0;padding-bottom: 0;">
        {{ replyTitle }}
        <i class="fa fa-search-plus dark" aria-hidden="true" style="margin: .3rem 0 0 2rem;"></i>
        <span class="pointer dark" @click="preview()">{{ $t('forum.newNote.preView') }}</span>
      </div>
      <div class="column is-full" style="position: relative; padding-bottom: 0;">
        <quill-editor ref="myTextEditor" v-model="content" :config="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)" @change="onEditorChange($event)">
        </quill-editor>
      </div>
      <div v-show="messageTip" class="column is-full red" style="padding: 0 1rem;">
        <i class="fa fa-exclamation-circle " style="vertical-align: middle;" aria-hidden="true"></i>
        <span>{{messageTip}}</span>
      </div>
      <div class="column is-full" style="text-align: center;">
        <a class="button new-note" @click="replyNote">{{ $t('forum.newNote.btnTxt') }}</a>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import noteItemDetail from '../components/noteItemDetail.vue'
  import menuModal from '../components/menuModal'
  import pagination from '../components/pagination.vue'
  import upload from '../components/fileUpload'
  import {
    preViewNote
  } from '../components/preView'
  import utils from '../common/utils'
  import message from '../components/message'

  var marked = require('marked');
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
  });

  export default {
    mounted() {

    },

    components: {

    },

    computed: {
      ...mapGetters(['userInfo']),
      replyTitle() {
        return this.$t('forum.replyNote.title') + ':' + this.$router.currentRoute.params.title
      },

      messageTip() {
        if (!this.content) {
          return this.$t('forum.newNote.requireContent')
        } else {
          return ""
        }
      },
    },

    data() { 
      return {
        editorOption: {},
        title: '',
        content: '',
        pageView: false,
        noteOrderTypeStr: this.$t('forum.main.discussion'),
      }
    },

    methods: {
      replyNote(){
        if(!this.content){
          message.showMsg(this.$t('forum.newNote.textAreaPlaceHolder'))
        }else{
          this.$http({
            url: '',
            method: 'post',
            params: {},
          }).then( _ => {

          }).catch( _ => {

          })
        }
      },

      orderChoose() {
        menuModal.showModal([{
            name: '综合讨论',
            code: 'discussion'
          },
          {
            name: '攻略心得',
            code: 'experience'
          },
          {
            name: '转帖分享',
            code: 'ras'
          },
          {
            name: '玩家原创',
            code: 'original'
          },
          {
            name: '问题求助',
            code: 'appeal'
          }
        ], this.onOrderTypeChoose, this.noteOrderTypeStr)
      },

      onOrderTypeChoose(type) {
        this.noteOrderTypeStr = type.name
      },

      goBack() {
        this.$router.push({
          name: 'forum'
        })
      },

      preview() {
        preViewNote({
          visible: true,
          deleteImgFunc: this.deleteUploadImg,
          item: {
            level: this.userInfo.level,
            rank: '',
            portrait: this.userInfo.portrait,
            title: this.replyTitle,
            time: utils.getNowFormatDate(),
            author: this.userInfo.userName,
            img: this.imgs,
            description: this.content,
          },
        })
      },

      onEditorBlur(e) {

      },
      onEditorFocus(e) {

      },
      onEditorReady(e) {

      },
      onEditorChange(e){
        this.content = e.html
      },

    }
  }
</script>