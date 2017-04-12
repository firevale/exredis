<template>
  <div class="box">
    <form name="goods" @submit.prevent="handleSubmit" v-if="goods">
      <label class="label"> {{ $t('admin.mall.goods.name') }}: </label>
      <p class="control">
        <input class="input" type="text" v-model.trim="goods.name">
      </p>
      <label class="label"> {{ $t('admin.mall.goods.pic') }}: </label>
      <p class="control">
        <input class="input" type="text" v-model.trim="goods.pic">
      </p>      
      <label class="label"> {{ $t('admin.mall.goods.description') }}: </label>
      <p class="control">
        <quill-editor style="min-height: 200px" v-model.trim="goods.description" @ready="setEditor" @input="handleValidation($v.goods.description)"
          @image="onInsertImage">
        </quill-editor>
      </p>
      <div class="has-text-centered" style="margin-top: 15px">
        <a class="button is-primary" :class="{'is-loading': processing}" @click.prevent="onSubmit">{{ $t('admin.submit') }}</a>
        <a class="button is-primary" :class="{'is-loading': processing}" @click.prevent="onSubmit">{{ $t('admin.submit') }}</a>
        <a class="button is-primary" :class="{'is-loading': processing}" @click.prevent="onSubmit">{{ $t('admin.submit') }}</a>
      </div>
    </form>
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
} from 'common/components/fileUpload'

const touchMap = new WeakMap()

export default {
  mounted: function() {
    this.news = this.$route.params.news
  },

  data() {
    return {
      goods: undefined,
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
        postAction: '/admin_actions/update_goods_pic',
        accept: 'image/jpeg, image/png',
        data: {
          app_id: this.goods.app_id
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
      if (this.goods.title.length == 0 || this.goods.description.length == 0) {
        openNotification({
          title: this.$t('admin.titles.warning'),
          message: this.$t('admin.mall.goods.requireTitleContent'),
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
      if (!this.goods.id) this.goods.id = 0
      let result = await this.$acs.updateGoods({
        goods_id: this.goods.id,
        app_id: this.goods.app_id,
        title: this.goods.title,
        content: this.goods.content,
        group: this.goods.group,
        is_top: false
      })
      if (result.success) {
        this.$router.go(-1)
      }
      this.processing = false
    },
  }
}
</script>