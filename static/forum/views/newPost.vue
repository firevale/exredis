<template>
<div>
  <div class="column is-full">
    <div class="pointer">
      <span class="dark" @click="orderChoose">{{ selectedSection.name}}</span>
      <i class="fa fa-caret-down dark" style="font-size: 1.5rem;" aria-hidden="true"></i>
      <i class="fa fa-search-plus dark" aria-hidden="true" style="margin: .3rem 0 0 2rem;"></i>
      <span class="pointer dark" @click="preview()">{{ $t('forum.newPost.preView') }}</span>
    </div>
  </div>
  <div>
    <div class="column is-full" style="padding-bottom: 0;padding-top: 0;">
      <input class="note-new" maxlength="50" v-model="title" :placeholder="$t('forum.newPost.titlePlaceholder')"></input>
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
  </div>
  <div class="column is-full" style="text-align: center;">
    <a class="button new-note" @click="sentNote">{{ $t('forum.newPost.btnTxt') }}</a>
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
    ...mapGetters([
      'userInfo',
      'forumInfo',
      'currentSection'
    ]),
    sections() {
      if (!this.forumInfo.sections) {
        return
      }

      let sections = {};

      this.forumInfo.sections.forEach(function(sec) {
        sections[sec.id] = {
          name: sec.title,
          code: sec.id
        }
      })

      return sections
    },
    selectedSection() {
      let sectionId = this.selectedSectionID | this.currentSection
      if (!sectionId && this.sections) {
        sectionId = this.forumInfo.sections[0].id
      }
      return this.sections[sectionId]
    },
    messageTip() {
      if (!this.title) {
        return this.$t('forum.newPost.requireTitle')
      } else if (!this.content) {
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
      selectedSectionID: 0
    }
  },

  methods: {

    orderChoose() {
      let selectItem = this.selectedSection
      console.info(selectItem)
      menuModal.showModal(this.sections, this.onOrderTypeChoose, selectItem.code)
    },

    onOrderTypeChoose(section) {
      this.selectedSectionID = section.code
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

    sentNote: async function() {
      if (!this.title) {
        message.showMsg(this.$t('forum.newPost.titlePlaceholder'))
        return;
      }

      if (!this.content) {
        message.showMsg(this.$t('forum.newPost.textAreaPlaceHolder'))
        return;
      }

      try {
        let result = await this.$acs.addPost(1, 1, this.title, this.content)
        console.info("success:" + result.success)
        if (result.success) {
          message.showMsg(this.$t('forum.newPost.addSuccess'))
          this.goForum()

        } else {
          message.showMsg(this.$t(result.message))
        }
      } catch (e) {
        console.info(e)
        message.showMsg(this.$t('forum.error.networkError'))
      }

    },
    goForum: function() {
      this.$router.push({
        name: 'forum'
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
