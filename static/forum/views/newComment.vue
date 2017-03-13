<template>
<div>
  <div class="column is-full" style="padding-top: 0;padding-bottom: 0;">
    {{ $t('forum.writeComment.title') + ": " + this.currentPostTitle }}
    <i class="fa fa-search-plus dark" aria-hidden="true" style="margin: .3rem 0 0 2rem;"></i>
    <span class="pointer dark" @click="preview()">{{ $t('forum.newPost.preview') }}</span>
  </div>
  <div class="column is-full" style="position: relative; padding-bottom: 0;">
    <quill-editor ref="myTextEditor" v-model="content" :config="editorOption" @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)" @ready="onEditorReady($event)" @change="onEditorChange($event)">
    </quill-editor>
  </div>
  <div v-show="messageTip" class="column is-full red" style="padding: 0 1rem;">
    <i class="fa fa-exclamation-circle " style="vertical-align: middle;" aria-hidden="true"></i>
    <span>{{messageTip}}</span>
  </div>
  <div class="column is-full" style="text-align: center;">
    <a class="button new-note" @click="writeComment">{{ $t('forum.newPost.btnTxt') }}</a>
  </div>
</div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
import postDetailView from '../components/postDetailView.vue'
import menuModal from '../components/menuModal'
import pagination from '../components/pagination.vue'
import upload from '../components/fileUpload'
import {postPreview} from '../components/preview'
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
    ...mapGetters(['userInfo','currentPostTitle']),

    replyTitle() {
      return this.$t('forum.writeComment.title') + ':' + this.$router.currentRoute.params.title
    },

    messageTip() {
      if (!this.content) {
        return this.$t('forum.newPost.requireContent')
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
      noteOrderTypeStr: this.$t('forum.postList.discussion'),
    }
  },

  methods: {
    writeComment() {
      if (!this.content) {
        message.showMsg(this.$t('forum.newPost.textAreaPlaceHolder'))
      } else {
        this.$http({
            url: '',
            method: 'post',
            params: {},
          })
          .then(_ => {

          })
          .catch(_ => {

          })
      }
    },

    orderChoose() {
      menuModal.showModal([{
          name: this.$t('forum.postList.discussion'),
          code: 'discussion'
        },
        {
          name: this.$t('forum.postList.experience'),
          code: 'experience'
        },
        {
          name: this.$t('forum.postList.ras'),
          code: 'ras'
        },
        {
          name: this.$t('forum.postList.original'),
          code: 'original'
        },
        {
          name: this.$t('forum.postList.appeal'),
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
      postPreview({
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
    onEditorChange(e) {
      this.content = e.html
    },

  }
}
</script>
