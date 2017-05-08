<template>
  <div style="position: relative">
    <scroller :options="{
      preventDefault: false,
      mouseWheel: true,
      scrollX: false,
      scrollY: true,
    }">
      <div class="has-text-left" style="padding: 1rem 0;">
        <v-touch tag="span" class="title is-5 is-clickable" style="margin: 0 0.5rem 0 0; font-weight: 400" @tap="showSelectSectionMenu">
          {{ selectedSectionTitle }}
        </v-touch>
        <v-touch tag="span" class="icon image-icon icon-pull-down is-clickable" @tap="showSelectSectionMenu">
        </v-touch>
      </div>
      <form class="post" @submit.prevent="handleSubmit" v-show="selectedSectionTitle">
        <p class="control is-horizontal" style="margin-bottom: 1.5rem">
          <input class="input" style="border-radius: 0" type="text" v-model.trim="editingPostData.title" :placeholder="$t('forum.newPost.titlePlaceholder')"></input>
        </p>
        <quill-editor v-model.trim="editingPostData.content" :placeholder="$t('forum.newPost.textAreaPlaceHolder')" @ready="setEditor"
          @input="handleValidation($v.editingPostData.content)" @image="onInsertImage">
        </quill-editor>
        <div class="tile is-full has-text-left" style="margin-top: 0.5rem" v-show="errorHint">
          <span class="icon is-sign">!</span>
          <span class="is-primary" style="font-size: 1rem">{{errorHint}}</span>
        </div>
        <div class="tile is-full has-text-centered">
          <p style="margin: 0 auto">
            <input type="button" style="min-width: 8rem; padding-bottom: 0.4em; padding-top: 0.35em; margin: 0.5rem 0; display: inline-block"
              @click="preview" :value="$t('forum.newPost.preview')" class="button is-info" :class="processing || $v.$invalid ? 'is-disabled' : ''"
            />
            <input type="submit" style="display: inline-block; font-size: 1rem;" :value="$t('forum.newPost.btnTitle')" class="button is-primary"
              :class="processing || $v.$invalid ? 'is-disabled' : ''" />
          </p>
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

import {
  required,
} from 'vuelidate/lib/validators'

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

import scroller from 'common/components/scroller'
import Toast from 'common/components/toast'

import nativeApi from 'common/js/nativeApi'
import * as utils from 'common/js/utils'
import * as acs from 'common/js/acs'

const touchMap = new WeakMap()

export default {

  computed: {
    ...mapGetters([
      'forumInfo',
      'currentSectionId',
      'editingPostData',
    ]),

    selectedSectionTitle() {
      let item = this.sectionMenuItems[this.editingPostData.selectedSectionId]
      return item ? item.title : ''
    },

    errorHint: function() {
      if (!this.$v.editingPostData.title.required) {
        return this.$t('forum.newPost.titlePlaceholder')
      } else if (!this.$v.editingPostData.title.minLength) {
        return this.$t('error.validation.postTitleMinLength')
      } else if (!this.$v.editingPostData.title.maxLength) {
        return this.$t('error.validation.postTitleMaxLength')
      } else if (!this.$v.editingPostData.title.emoji) {
        return this.$t('error.validation.emojiPostTitle')
      } else if (!this.$v.editingPostData.content.required) {
        return this.$t('error.validation.commentContentRequired')
      }

      return ''
    },
  },

  validations: {
    editingPostData: {
      title: {
        required,
        minLength: utils.minLength(10),
        maxLength: utils.maxLength(50),
        emoji: function(val) {
          return !(/\ud83d[\ude00-\ude4f]/.test(val))
        },
      },
      content: {
        required,
        minLength: utils.minLength(10),
      }
    }
  },

  data() {
    return {
      sectionMenuItems: {},
      processing: false,
      editor: undefined,
    }
  },

  mounted: function() {
    this.$nextTick(_ => {
      let menuItems = {}
      this.forumInfo.sections.forEach(section => {
        if (this.editingPostData.selectedSectionId == 0) {
          this.editingPostData.selectedSectionId = (this.currentSectionId == 0 ? section.id : this.currentSectionId)
        }
        menuItems[section.id] = {
          title: section.title,
          value: section.id
        }
      })

      this.sectionMenuItems = menuItems
    })
  },

  methods: {
    ...mapActions([
      'resetPostEditingData'
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

    preview: function() {
      this.editingPostData.sectionTitle = this.sectionMenuItems[this.editingPostData.selectedSectionId].title
      this.$router.push({
        name: 'preview'
      })
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

        let isCameraLibAvailable = await nativeApi.isMediaSourceTypeAvailable('camera')
        if (isCameraLibAvailable) {
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
              nativeApi.pickImageFrom('camera', result => this.handlePickImageResult(editor, result))
              break;

            case 'photoLib':
              nativeApi.pickImageFrom('photoLib', result => this.handlePickImageResult(editor, result))
              break;
          }
        })
      } else {
        showFileUploadDialog(this.$i18n, {
          postAction: '/forum_actions/upload_post_image',
          accept: 'image/jpeg, image/png',
          data: {
            forum_id: this.$route.params.forumId,
            section_id: this.editingPostData.selectedSectionId,
            post_id: this.editingPostData.id, 
          },
          extensions: ['png', 'jpg', 'jpeg'],
          callback: response => {
            if (response.success) {
              editor.focus()
              let index = editor.getSelection().index
              editor.insertEmbed(index, 'image', response.link)
              editor.formatText(index, 1, 'width', response.width)
              editor.formatText(index, 1, 'height', response.height)
              this.editingPostData.id = response.post_id
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

        let upload_result = await this.$acs.uploadPostImage({
          file: {
            base64_content: result.image
          },
          post_id: this.editingPostData.id,
          forum_id: this.$route.params.forumId,
          section_id: this.editingPostData.selectedSectionId,
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
          this.editingPostData.id = upload_result.post_id
        }
      }
    },

    showSelectSectionMenu() {
      menuModal.showModal({
        menuItems: this.sectionMenuItems,
        selectedValue: this.editingPostData.selectedSectionId,
        onOk: menuItem => this.editingPostData.selectedSectionId = menuItem.value
      })
    },

    handleSubmit: async function() {
      if (!this.$v.$invalid && !this.processing) {
        this.processing = true
        let forumId = this.$router.currentRoute.params.forumId
        let result = await this.$acs.addPost({
          forum_id: forumId, 
          section_id: this.editingPostData.selectedSectionId,
          post_id: this.editingPostData.id,
          title: this.editingPostData.title, 
          content: this.editingPostData.content})

        if (result.success) {
          this.resetPostEditingData()
          Toast.show(this.$t('forum.newPost.addSuccess'))
          this.$router.replace({
            name: 'postList'
          })
        }
        this.processing = false
      }
    },
  },

  components: {
    scroller
  }
}
</script>