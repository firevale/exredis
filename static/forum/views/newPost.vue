<template>
  <div class="is-ancestor is-parent is-vertical">
    <div class="is-child fixed-top  row-line">
      <div class="arrow-back" style="left: 1rem;">
        <i class="fa fa-angle-left title is-2 dark" aria-hidden="true" @click="$router.go(-1)"></i>
      </div>
      <div class="row-line top-title">
        <span class="title is-4">{{ $t('forum.newNote.title') }}</span>
      </div>
    </div>
    <div class="scroll-box">
      <div class="column is-full">
        <div class="pointer">
          <span class="dark" @click="orderChoose">{{ noteOrderTypeStr }}</span>
          <i class="fa fa-caret-down dark" style="font-size: 1.5rem;" aria-hidden="true"></i>
          <i class="fa fa-search-plus dark" aria-hidden="true" style="margin: .3rem 0 0 2rem;"></i>
          <span class="pointer dark" @click="preview()">{{ $t('forum.newNote.preView') }}</span>
        </div>
      </div>
      <div>
        <div class="column is-full" style="padding-bottom: 0;padding-top: 0;">
          <input class="note-new" maxlength="50" v-model="title" :placeholder="$t('forum.newNote.titlePlaceholder')"></input>
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
      </div>
      <div class="column is-full" style="text-align: center;">
        <a class="button new-note" @click="sentNote">{{ $t('forum.newNote.btnTxt') }}</a>
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
  } from '../components/preview'
  import message from '../components/message'

  import * as utils from 'common/utils'

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

    components: {

    },
    computed: {
      ...mapGetters(['userInfo']),

      messageTip() {
        if (!this.title) {
          return this.$t('forum.newNote.requireTitle')
        } else if (!this.content) {
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
        noteOrderTypeStr: this.$t('forum.main.discussion'),
      }
    },

    methods: {
      orderChoose() {
        menuModal.showModal([{
            name: this.$t('forum.main.discussion'),
            code: 'discussion'
          },
          {
            name: this.$t('forum.main.experience'),
            code: 'experience'
          },
          {
            name: this.$t('forum.main.ras'),
            code: 'ras'
          },
          {
            name: this.$t('forum.main.original'),
            code: 'original'
          },
          {
            name: this.$t('forum.main.appeal'),
            code: 'appeal'
          }
        ], this.onOrderTypeChoose, this.noteOrderTypeStr)
      },

      onOrderTypeChoose(type) {
        this.noteOrderTypeStr = type.name
      },

      preview() {
        preViewNote({
          visible: true,
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

      sentNote() {
        if (!this.title) {
          message.showMsg(this.$t('forum.newNote.titlePlaceholder'))
        } else if (!this.content) {
          message.showMsg(this.$t('forum.newNote.textAreaPlaceHolder'))
        } else {
          this.$http({
            url: '',
            method: 'post',
            params: {},
          }).then(_ => {

          }).catch(_ => {

          })
        }
      },
      onEditorBlur(e) {

      },
      onEditorFocus(e) {

      },
      onEditorReady(e) {

      },
      onEditorChange(e) {
        this.content = e.html
      },



    }
  }
</script>
