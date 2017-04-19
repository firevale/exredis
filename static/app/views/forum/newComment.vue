<template>
  <div>
    <div class="has-text-left" style="padding: 1rem 0;">
      <h6 class="title is-6" style="font-weight: 400">{{$t('forum.detail.replyBtn') + ": " + currentPostTitle}}</h6>
    </div>
    <form class="post" @submit.prevent="handleSubmit" v-show="currentPostTitle">
      <quill-editor v-model="content" :placeholder="$t('forum.newPost.textAreaPlaceHolder')" @ready="setEditor" @input="handleValidation($v.content)"
        @image="onInsertImage">
      </quill-editor>
      <div class="tile is-full has-text-left" style="margin-top: 0.5rem" v-show="errorHint">
        <span class="icon is-sign">!</span>
        <span class="is-primary" style="font-size: 1rem">{{errorHint}}</span>
      </div>
      <div class="tile is-full has-text-centered" style="justify-content: center; margin-top: 0.5rem">
        <input type="submit" :value="$t('forum.newPost.btnTitle')" class="button is-info" :class="processing ? 'is-disabled' : ''"
        />
      </div>
    </form>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import menuModal from '../../components/menuModal'

import {
  showFileUploadDialog
} from 'common/components/fileUpload'

import Toast from 'common/components/toast'

import * as utils from 'common/js/utils'

const touchMap = new WeakMap()

import {
  required,
} from 'vuelidate/lib/validators'

export default {
  computed: {
    ...mapGetters(['userInfo', 'currentPostTitle']),

    errorHint: function() {
      if (!this.$v.content.required) {
        return this.$t('error.validation.commentContentRequired')
      } else if (!this.$v.content.minLength) {
        return this.$t('error.validation.commentContentRequired')
      }

      return ''
    },
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
      content: '',
      editor: undefined,
      errorMessage: '',
      processing: false,
    }
  },

  validations: {
    content: {
      required: required,
      minLength: utils.minLength(5),
    }
  },

  methods: {
    ...mapActions([
      'setCurrentPostTitle'
    ]),

    setEditor: function(editor) {
      this.editor = editor
    },

    handleValidation: function($v) {
      $v.$reset()
      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v))
      }
      touchMap.set($v, setTimeout($v.$touch(), 2000))
    },

    onInsertImage: function(editor) {
      showFileUploadDialog({
        postAction: '/forum_actions/upload_post_image',
        accept: 'image/jpeg, image/png',
        data: {
          forum_id: this.$route.params.forumId
        },
        extensions: ['png', 'jpg', 'jpeg'],
        callback: response => {
          if (response.success) {
            editor.focus()
            let range = editor.getSelection()
            editor.insertEmbed(range.index, 'image', response.link)
          } else if (response.i18n_message) {
            Toast.show(this.$t(response.i18n_message, response.i18n_message_object))
          } else if (response.message) {
            Toast.show(response.message)
          } else {
            Toast.show(this.$t('error.server.networkError'))
          }
        },
      })
    },

    // preview() {
    //   postPreview({
    //     visible: true,
    //     item: {
    //       user: this.userInfo,
    //       rank: '',
    //       time: utils.nowFromServer(),
    //       content: this.content,
    //     },
    //   })
    // },

    handleSubmit: async function() {
      if (!this.$v.$invalid && !this.processing) {
        this.processing = true
        let postId = this.$route.params.postId
        let result = await this.$acs.addComment(postId, this.content)
        if (result.success) {
          Toast.show(this.$t('forum.writeComment.addSuccess'))
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