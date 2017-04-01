<template>
  <div class="box">
    <validation name="news" @submit.prevent="handleSubmit">
      <label class="label"> {{ $t('admin.news.title') }}: </label>
      <p class="control">
        <input class="input" type="text" v-model.trim="news.title">
      </p>
      <label class="label"> {{ $t('admin.news.content') }}: </label>
      <p class="control">
        <quill-editor style="min-height: 200px" v-model.trim="news.content" @ready="setEditor" @input="handleValidation($v.news.content)"
          @image="onInsertImage">
        </quill-editor>
        <div class="tile is-full has-text-left" style="margin-top: 0.5rem" v-show="errorHint">
          <span class="icon is-sign">!</span>
          <span class="is-primary" style="font-size: 1rem">{{errorHint}}</span>
        </div>
      </p>
      <div class="has-text-centered" style="margin-top: 15px">
        <a class="button is-primary" :class="{'is-loading': processing}" @click.prevent="handleSubmit">{{ $t('admin.submit') }}</a>
      </div>
    </validation>
  </div>
</template>
<script>
import {
  required,
  minLength,
  maxLength
} from 'vuelidate/lib/validators'

import {
  openNotification,
  processAjaxError
} from 'admin/miscellaneous'

import {
  showFileUploadDialog
} from 'admin/components/fileUpload'

const touchMap = new WeakMap()

export default {
  mounted: function() {
    this.news = this.$route.params.news
  },

  data() {
    return {
      news: undefined,
      processing: false,
      editor: undefined,
    }
  },

  computed: {
    errorHint: function() {
      if (!this.$v.news.title.required) {
        return this.$t('admin.news.titlePlaceholder')
      } else if (!this.$v.news.title.minLength) {
        return this.$t('admin.serverError.newsTitleMinLength')
      } else if (!this.$v.news.title.maxLength) {
        return this.$t('admin.serverError.newsTitleMaxLength')
      } else if (!this.$v.news.content.required) {
        return this.$t('admin.serverError.newsContentRequired')
      }

      return ''
    },
  },

  validations: {
    news: {
      title: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(30),
      },
      content: {
        required: function(val) {
          return this.editor && this.editor.getText().trim().length >= 5
        }
      }
    }
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

    onInsertImage: function(editor) {
      showFileUploadDialog({
        postAction: '/admin_actions/update_news_pic',
        accept: 'image/jpeg, image/png',
        data: {
          app_id: this.news.app_id
        },
        extensions: ['png', 'jpg', 'jpeg'],
        callback: response => {
          if (response.success) {
            editor.focus()
            let range = editor.getSelection()
            editor.insertEmbed(range.index, 'image', response.link)
          } else if (response.i18n_message) {
            message.showMsg(this.$t(response.i18n_message, response.i18n_message_object))
          } else if (response.message) {
            message.showMsg(response.message)
          } else {
            message.showMsg(this.$t('admin.error.networkError'))
          }
        },
      })
    },

    handleSubmit: async function() {
      this.processing = true
      if (!this.news.id) this.news.id = 0
      let result = await this.$acs.updateNews(this.news.id, this.news.app_id, this.news.title,
        this.news.content, "activity", false)
      this.processing = false
      if (result.success) {
        openNotification({
          title: this.$t('admin.titles.updateSuccess'),
          message: this.$t(result.i18n_message),
          type: 'success',
          duration: 4500,
          container: '.notifications',
        })

        this.$router.go(-1)

        // if (this.callback) {
        //   this.callback(result.news)
        // }
      }
    }
  },

}
</script>