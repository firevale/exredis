<template>
<div>
  <div class="tile is-full has-text-left" style="padding: 0.5rem 0">
    <h5 class="title is-5" style="font-weight: 400">{{$t('forum.detail.replyBtn') + ": " + currentPostTitle}}</h5>
  </div>
  <form @submit.prevent="handleSubmit">
    <quill-editor ref="commentEditor" v-model="content" :config="editorOption">
    </quill-editor>
    <p class="control is-horizontal" v-show="errorMessage">
      <span class="help icon image-icon icon-sign"></span>
      <span class="help is-danger">{{errorMessage}}</span>
    </p>
    <p class="control is-horizontal" style="justify-content: center; margin-top: 0.5rem">
      <input type="submit" :value="$t('forum.newPost.btnTxt')" class="button is-info" />
    </p>
  </form>
</div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import menuModal from '../components/menuModal'
import pagination from '../components/pagination.vue'
import upload from '../components/fileUpload'

import {
  postPreview
} from '../components/preview'
import message from '../components/message'

import * as utils from 'common/utils'
import * as acs from 'common/acs'


export default {

  computed: {
    ...mapGetters(['userInfo', 'currentPostTitle']),
  },

  data() {
    return {
      editorOption: {
        modules: {
          toolbar: acs.getQuillToolbarConfig(),
        },
      },
      content: '',
      errorMessage: '',
    }
  },

  methods: {

    goBack() {
      this.$router.push({
        name: 'detail'
      })
    },

    preview() {
      postPreview({
        visible: true,
        item: {
          user: this.userInfo,
          rank: '',
          time: utils.nowFromServer(),
          content: this.content,
        },
      })
    },

    handleSubmit: async function() {
      if (!this.content) {
        message.showMsg(this.$t('forum.writeComment.textAreaPlaceHolder'))
        return;
      }

      let postId = this.$router.currentRoute.params.postId
      let result = await this.$acs.addComment(postId, this.content)
      if (result.success) {
        message.showMsg(this.$t('forum.writeComment.addSuccess'))
        this.$router.replace({
          name: 'detail'
        })
      }
    },
  }
}
</script>
