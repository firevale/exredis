<template>
  <div>
    <div class="tile is-full has-text-left" style="padding: 1rem 0">
      <span class="title is-5 is-clickable" style="margin: 0 0.5rem 0 0; font-weight: 400" @click="showSelectSectionMenu">
         {{ selectedSectionTitle }}
      </span>
      <span class="icon image-icon icon-pull-down is-clickable" @click="showSelectSectionMenu"> 
      </span>
    </div>
    <form class="post" @submit.prevent="handleSubmit" v-show="selectedSectionTitle">
      <p class="control is-horizontal" style="margin-bottom: 1.5rem">
        <input class="input" style="border-radius: 0" type="text" v-model.trim="editingPostData.title" :placeholder="$t('forum.newPost.titlePlaceholder')"></input>
      </p>
      <quill-editor v-model.trim="editingPostData.content" @ready="setEditor" @input="handleValidation($v.editingPostData.content)"
        @image="onInsertImage">
      </quill-editor>
      <div class="tile is-full has-text-left" style="margin-top: 0.5rem" v-show="errorHint">
        <span class="icon is-sign">!</span>
        <span class="is-primary" style="font-size: 1rem">{{errorHint}}</span>
      </div>
      <div class="tile is-full has-text-centered">
        <p style="margin: 0 auto">
          <input type="button" style="min-width: 8rem; padding-bottom: 0.4em; padding-top: 0.35em; margin: 0.5rem 0;" @click="preview"
            :value="$t('forum.newPost.preview')" class="button is-info" :class="processing || $v.$invalid ? 'is-disabled' : ''"
          />
          <input type="submit" style="display: inline-block; font-size: 1rem;" :value="$t('forum.newPost.btnTitle')" class="button is-primary" :class="processing || $v.$invalid ? 'is-disabled' : ''"
          />
        </p>
      </div>
    </form>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import {
  required,
  minLength,
  maxLength
} from 'vuelidate/lib/validators'

import menuModal from '../../components/menuModal'
import {
  showFileUploadDialog
} from 'common/components/fileUpload'

import Toast from 'common/components/toast'

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
        return this.$t('forum.error.postTitleMinLength')
      } else if (!this.$v.editingPostData.title.maxLength) {
        return this.$t('forum.error.postTitleMaxLength')
      } else if (!this.$v.editingPostData.content.required) {
        return this.$t('forum.error.commentContentRequired')
      }

      return ''
    },
  },

  validations: {
    editingPostData: {
      title: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(30),
      },
      content: {
        required,
        minLength: minLength(5),
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
      this.editingPostData.selectedSectionId = this.currentSectionId || 1
      this.forumInfo.sections.forEach(section => {
        menuItems[section.id] = {
          title: section.title,
          value: section.id
        }
      })
      this.sectionMenuItems = menuItems
    })
  },

  methods: {
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
      this.$router.push({
        name: 'preview',
        params: {
          content: this.editingPostData.content,
          section: this.sectionMenuItems[this.editingPostData.selectedSectionId].title,
          title: this.editingPostData.title,
          selectedSectionId: this.editingPostData.selectedSectionId
        },
      })
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
            Toast.show(this.$t('forum.error.networkError'))
          }
        },
      })
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
        let result = await this.$acs.addPost(forumId, this.editingPostData.selectedSectionId,
          this.editingPostData.title, this.editingPostData.content)

        if (result.success) {
          Toast.show(this.$t('forum.newPost.addSuccess'))
          this.$router.replace({
            name: 'postList'
          })
        }
        this.processing = false
      }
    },
  }
}
</script>