<template>
  <div class="box">
    <validation name="news" @submit.prevent="handleSubmit" v-if="news">
      <label class="label"> {{ $t('admin.news.title') }}: </label>
      <p class="control">
        <input class="input" type="text" v-model.trim="news.title">
      </p>
      <label class="label"> {{ $t('admin.news.content') }}: </label>
      <p class="control">
        <quill-editor style="min-height: 200px" v-model.trim="news.content" @ready="setEditor" @input="handleValidation($v.news.content)"
          @image="onInsertImage">
        </quill-editor>
      </p>
      <div class="has-text-centered" style="margin-top: 15px">
        <a class="button is-primary" :class="{'is-loading': processing}" @click.prevent="onSubmit">{{ $t('admin.submit') }}</a>
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

    onSubmit: function() {
      if (this.news.title.length == 0 || this.news.content.length == 0) {
        openNotification({
          title: this.$t('admin.titles.warning'),
          message: this.$t('admin.news.requireTitleContent'),
          type: 'danger',
          duration: 4500,
          container: '.notifications',
        })
        return;
      }

      this.handleSubmit()
    },

    handleSubmit: async function() {
      this.processing = true
      if (!this.news.id) this.news.id = 0
      let result = await this.$acs.updateNews(this.news.id, this.news.app_id, this.news.title,
        this.news.content, this.news.group, false)
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
      }
    },
  }
}
</script>