<template>
<div>
  <div class="column is-full">
    <span class="icon image-icon icon-pull-down" @click="showSelectSectionMenu">{{ selectedSectionTitle }}</span>
    <i class="fa fa-caret-down dark" style="font-size: 1.5rem;" aria-hidden="true"></i>
    <i class="fa fa-search-plus dark" aria-hidden="true" style="margin: .3rem 0 0 2rem;"></i>
    <span class="pointer dark" @click="preview()">{{ $t('forum.newPost.preview') }}</span>
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
    <a class="button new-note" @click="handleSubmit">{{ $t('forum.newPost.btnTxt') }}</a>
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
    ...mapGetters([
      'userInfo',
      'forumInfo',
      'currentSectionId'
    ]),

    selectedSectionTitle() {
      let item = this.sectionMenuItems[this.selectedSectionId]
      return item ? item.title : ''
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
      selectedSectionId: 0,
      sectionMenuItems: {},
    }
  },

  created: function() {
    this.selectedSectionId = this.currentSectionId
    this.forumInfo.sections.forEach(section => {
      this.sectionMenuItems[section.id] = {
        title: section.title,
        value: section.id
      }
    })
  },

  methods: {
    showSelectSectionMenu() {
      menuModal.showModal({
        menuItems: this.sectionMenuItems,
        selectedValue: this.selectedSectionId,
        onOk: menuItem => this.selectedSectionId = menuItem.value
      })
    },

    preview() {
      postPreview({
        visible: true,
        item: {
          user:this.userInfo,
          rank: '楼主',
          section:this.sectionMenuItems[this.selectedSectionId],
          title: this.title,
          time: utils.getNowFormatDate(),
          content: this.content
        },
      })
    },

    handleSubmit: async function() {
      if (!this.title) {
        message.showMsg(this.$t('forum.newPost.titlePlaceholder'))
        return;
      }

      if (!this.content) {
        message.showMsg(this.$t('forum.newPost.textAreaPlaceHolder'))
        return;
      }

      if(!this.selectedSectionId){
        message.showMsg(this.$t('forum.newPost.requireSection'))
        return
      }

      var forumId=this.$router.currentRoute.params.forumId
      let result = await this.$acs.addPost(forumId, this.selectedSectionId, this.title, this.content)
      if (result.success) {
        message.showMsg(this.$t('forum.newPost.addSuccess'))
        this.$router.replace({
          name: 'postList'
        })
      }
    },
    onEditorBlur(e) {},
    onEditorFocus(e) {},
    onEditorReady(e) {},
    onEditorChange(e) {
      this.content = e.html
    },
  }
}
</script>
