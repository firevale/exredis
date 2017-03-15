<template>
<div>
  <div class="tile is-full has-text-left" style="padding: 1rem 0">
    <h6 class="title is-6" style="font-weight: 400">{{$t('forum.detail.replyBtn') + ": " + currentPostTitle}}</h6>
  </div>
  <form @submit.prevent="handleSubmit" v-show="currentPostTitle">
    <quill-editor ref="commentEditor" v-model="content" :config="editorOption" @input="handleValidation()">
    </quill-editor>
    <div class="tile is-full has-text-left" style="margin-top: 0.5rem" v-show="errorHint">
      <span class="icon is-sign">!</span>
      <span class="is-primary" style="font-size: 1rem">{{errorHint}}</span>
    </div>
    <div class="tile is-full has-text-centered" style="justify-content: center; margin-top: 0.5rem">
      <input type="submit" :value="$t('forum.newPost.btnTxt')" class="button is-info" :class="processing ? 'is-disabled' : ''" />
    </div>
  </form>
</div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import menuModal from '../components/menuModal'
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

    errorHint: function() {
      if (!this.$v.content.required) {
        return this.$t('forum.error.commentContentRequired')
      }

      return ''
    }
  },

  mounted: async function() {
    if (!this.currentPostTitle) {
      let result = await this.$acs.getPostDetail(this.$route.params.postId)
      if (result.success) {
        this.setCurrentPostTitle(result.detail.title)
      }
    }
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
      processing: false,
    }
  },

  validations: {
    content: {
      required: function(val) {
        if (this.$refs.commentEditor) {
          let editor = this.$refs.commentEditor.quillEditor
          let text = editor.getText()
            .trim()
          return text.length >= 5
        }

        return true
      }
    }
  },

  methods: {
    ...mapActions([
      'setCurrentPostTitle'
    ]),

    handleValidation: function() {
      this.$v.$touch()
      this.errorMessage = ''
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
      if (!this.$v.$error && !this.processing) {
        this.processing = true
        let postId = this.$route.params.postId
        let result = await this.$acs.addComment(postId, this.content)
        if (result.success) {
          message.showMsg(this.$t('forum.writeComment.addSuccess'))
          this.$router.replace({
            name: 'detail'
          })
        }
        this.processing = false
      }
    },
  }
}
</script>
