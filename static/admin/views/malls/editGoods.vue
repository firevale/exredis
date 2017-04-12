<template>
  <div class="box">
    <form name="goods" @submit.prevent="handleSubmit" v-if="goods">
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">{{ $t('admin.mall.goods.name') }}</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control is-expanded">
              <input class="input" :placeholder="$t('admin.mall.goods.namePlaceholder')" type="text" v-model.trim="goods.name">
            </p>
          </div>
        </div>
      </div>
      <div class="tile">
        <div class="tile is-parent">
          <article class="tile is-child">
            <center>
              <figure class="image is-128x128" style="display: block">
                <img src="https://placehold.it/128x128?text=400X400">
              </figure>
              <p class="help">{{ $t('admin.mall.goods.picPlaceholder') }}</p>
            </center>
          </article>
        </div>
        <div class="tile is-parent is-vertical">
          <article class="tile is-child">
            <div class="columns">
              <div class="column">
                {{ $t('admin.mall.goods.price') }}
              </div>
              <div class="column is-10">
                <input class="input" type="text" v-model.trim="goods.price">
              </div>
            </div>
            <div class="columns">
              <div class="column">
                {{ $t('admin.mall.goods.postage') }}
              </div>
              <div class="column is-10">
                <input class="input" type="text" v-model.trim="goods.postage">
              </div>
            </div>
            <div class="columns">
              <div class="column">
                {{ $t('admin.mall.goods.stock') }}
              </div>
              <div class="column is-10">
                <input class="input" type="text" v-model.trim="goods.stock">
              </div>
            </div>
          </article>
        </div>
      </div>
      <div>
        <label> {{ $t('admin.mall.goods.description') }} </label>
        <quill-editor v-model.trim="goods.description" :placeholder="$t('admin.mall.goods.descPlaceholder')"
          style="min-height: 200px" @ready="setEditor" @input="handleValidation($v.goods.description)"
          @image="onInsertImage">
        </quill-editor>
      </div>
      <div style="margin-top: 15px">
        <a class="button is-primary" :class="{'is-loading': processing}" @click.prevent="onDelete">
          <span class="icon is-small"><i class="fa fa-close"></i></span><span>{{ $t('admin.mall.goods.delete') }}</span></a>
        <a class="button is-primary" :class="{'is-loading': processing}" @click.prevent="onPublish">
          <span class="icon is-small"><i class="fa fa-level-up"></i></span><span>{{ $t('admin.mall.goods.publish') }}</span></a>
        <a class="button is-primary" :class="{'is-loading': processing}" @click.prevent="onSave">
          <span class="icon is-small"><i class="fa fa-save"></i></span><span>{{ $t('admin.mall.goods.save') }}</span></a>
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
    this.goods = this.$route.params.goods
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

    onSave: function() {
      if (this.goods.name.length == 0 || this.goods.description.length == 0 || this.goods.price.length ==
        0 ||
        this.goods.stock.length == 0 || this.goods.postage.length == 0 || this.goods.pic.length ==
        0) {
        openNotification({
          title: this.$t('admin.titles.warning'),
          message: this.$t('admin.mall.goods.pleaseFill'),
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
        name: this.goods.name,
        pic: this.goods.pic,
        description: this.goods.description,
        price: this.goods.price,
        postage: this.goods.postage,
        stock: this.goods.stock
      })
      if (result.success) {
        this.$router.go(-1)
      }
      this.processing = false
    },
  }
}
</script>