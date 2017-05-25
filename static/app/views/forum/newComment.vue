<template>
  <div style="position: relative">
    <scroller :options="{
      preventDefault: false,
      mouseWheel: true,
      scrollX: false,
      scrollY: true,
    }">
      <div class="has-text-left" style="padding: 1rem 0;">
        <h6 class="title is-6" style="font-weight: 400">{{$t('forum.detail.replyBtn') + ": " + currentPostTitle}}</h6>
      </div>
      <form class="post" @submit.prevent="handleSubmit" v-show="currentPostTitle">
        <quill-editor v-model="content" :placeholder="$t('forum.newPost.textAreaPlaceHolder')" @ready="setEditor"
          @input="handleValidation($v.content)" @image="onInsertImage">
        </quill-editor>
        <div class="tile is-full has-text-left" style="margin-top: 0.5rem" v-show="errorHint">
          <span class="icon is-sign">!</span>
          <span class="is-primary" style="font-size: 1rem">{{errorHint}}</span>
        </div>
        <div class="tile is-full has-text-centered" style="justify-content: center; margin-top: 0.5rem">
          <input type="submit" :value="$t('forum.writeComment.title')" class="button is-info" :disabled="processing"
            :class="processing ? 'is-disabled' : ''" />
        </div>
      </form>
    </scroller>
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
import {
  showMobileMenu
} from 'common/components/mobileMenu'
import {
  showProgress
} from 'common/components/progress'

import Toast from 'common/components/toast'

import nativeApi from 'common/js/nativeApi'
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
      id: undefined,
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

    onInsertImage: async function(editor) {
      if (window.acsConfig.inApp) {
        let items = [{
          title: this.$t('common.cancel'),
          value: 'cancel',
        }]

        let isPhotoLibAvailable = await nativeApi.isMediaSourceTypeAvailable('photoLib')
        if (isPhotoLibAvailable) {
          items.unshift({
            title: this.$t('common.photoLib'),
            value: 'photoLib',
          })
        }

        let isCameraAvailable = await nativeApi.isMediaSourceTypeAvailable('camera')
        if (isCameraAvailable) {
          items.unshift({
            title: this.$t('common.camera'),
            value: 'camera',
          })
        }

        let menu = showMobileMenu({
          visible: true,
          items: items
        })

        menu.$on('item-selected', (item) => {
          switch (item.value) {
            case 'camera':
              nativeApi.pickImageFrom('camera', result => this.handlePickImageResult(editor,
                result))
              break;

            case 'photoLib':
              nativeApi.pickImageFrom('photoLib', result => this.handlePickImageResult(editor,
                result))
              break;
          }
        })
      } else {
        showFileUploadDialog(this.$i18n, {
          postAction: '/forum_actions/upload_comment_image',
          accept: 'image/jpeg, image/png',
          data: {
            forum_id: this.$route.params.forumId,
            post_id: this.$route.params.postId,
            comment_id: this.id,
          },
          extensions: ['png', 'jpg', 'jpeg'],
          callback: response => {
            if (response.success) {
              editor.focus()
              let range = editor.getSelection()
              editor.insertEmbed(range.index, 'image', response.link)
              editor.formatText(range.index, 1, 'width', response.width)
              editor.formatText(range.index, 1, 'height', response.height)
              this.id = response.comment_id
            } else if (response.i18n_message) {
              Toast.show(this.$t(response.i18n_message, response.i18n_message_object))
            } else if (response.message) {
              Toast.show(response.message)
            } else {
              Toast.show(this.$t('error.server.networkError'))
            }
          },
        })
      }
    },

    handlePickImageResult: async function(editor, result) {
      if (result.success) {
        let progress = showProgress({
          visible: true
        })

        let upload_result = await this.$acs.uploadCommentImage({
          file: {
            base64_content: result.image,
          },
          forum_id: this.$route.params.forumId,
          post_id: this.$route.params.postId,
          comment_id: this.id,
        }, value => {
          progress.setProgress(value)
        })

        progress.close()

        if (upload_result.success) {
          editor.focus()
          let range = editor.getSelection()
          editor.insertEmbed(range.index, 'image', upload_result.link)
          editor.formatText(range.index, 1, 'width', upload_result.width)
          editor.formatText(range.index, 1, 'height', upload_result.height)
        }
      }
    },

    handleSubmit: async function() {
      if (!this.$v.$invalid && !this.processing) {
        this.processing = true
        let postId = this.$route.params.postId
        let result = await this.$acs.addComment({
          comment_id: this.id,
          post_id: postId,
          content: this.content
        })
        if (result.success) {
          Toast.show(this.$t('forum.writeComment.addSuccess'))
          this.$router.replace({
            name: 'detail'
          })
        }
        this.processing = false
      }
    },
  },
}
</script>