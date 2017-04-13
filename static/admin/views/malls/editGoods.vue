<template>
  <div class="box">
    <form name="goods" @submit.prevent="handleSubmit" v-if="goods">
      <div class="tile">
        <div class="field-label">
          <label class="label">{{ $t('admin.mall.goods.name') }}</label>
        </div>
        <div class="field-body">
          <input class="input" :placeholder="$t('admin.mall.goods.namePlaceholder')" type="text" v-model.trim="goods.name">
        </div>        
        <div class="field-label">
          <label class="label">{{ $t('admin.mall.goods.id') }}</label>
        </div>
        <div class="field-body">
          <input class="input" type="text" v-model.trim="goods.id" :disabled="!isNew">
        </div>
      </div>
      <div class="tile">
        <div class="tile is-parent">
          <article class="tile is-child">
            <center>
              <figure class="image is-128x128" style="display: block" @click="onShowImageUpload">
                <img src="https://placehold.it/256x256?text=400X400">
              </figure>
              <p class="help">{{ $t('admin.mall.goods.picPlaceholder') }}</p>
            </center>
          </article>
        </div>
        <div class="tile is-parent is-vertical">
          <article class="tile is-child">
            <div class="field is-horizontal">
              <div class="field-label">
                <label class="label">{{ $t('admin.mall.goods.currency') }}</label>
              </div>
              <div class="field-body">
                <input class="input" type="text" disabled v-model.trim="goods.currency">
              </div>
            </div>            
            <div class="field is-horizontal">
              <div class="field-label">
                <label class="label">{{ $t('admin.mall.goods.price') }}</label>
              </div>
              <div class="field-body">
                <input class="input" type="text" v-model.trim="goods.price">
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label">
                <label class="label">{{ $t('admin.mall.goods.postage') }}</label>
              </div>
              <div class="field-body">
                <input class="input" type="text" v-model.trim="goods.postage">
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label">
                <label class="label">{{ $t('admin.mall.goods.stock') }}</label>
              </div>
              <div class="field-body">
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
        <a class="button is-primary" :class="{'is-loading': deleting}" @click.prevent="onDelete">
          <span class="icon is-small"><i class="fa fa-close"></i></span><span>{{ $t('admin.mall.goods.delete') }}</span></a>
        <a class="button is-primary" :class="{'is-loading': publishing}" @click.prevent="onPublish">
          <span class="icon is-small"><i class="fa fa-level-up"></i></span><span>{{ $t('admin.mall.goods.publish') }}</span></a>
        <a class="button is-primary" :class="{'is-loading': saving}" @click.prevent="onSave">
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

import imgUpload from "vue-image-crop-upload/upload-2.vue"

import {
  showFileUploadDialog
} from 'common/components/fileUpload'

const touchMap = new WeakMap()

export default {
  components: {
    imgUpload,
  },

  mounted: function() {
    this.goods = this.$route.params.goods
    if(this.goods.id.length == 0) this.isNew = true
  },

  data() {
    return {
      goods: undefined,
      deleting: false,
      saving: false,
      publishing: false,
      isNew: false,
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

    onShowImageUpload: function() {
      if (this.goods.id) {
        this.showImgUpload = true
      } else {
        openNotification({
          title: this.$t('admin.titles.warning'),
          message: this.$t('admin.mall.goods.saveFirst'),
          type: 'danger',
          duration: 4500,
          container: '.notifications',
        })
      }
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

    onDelete: function() {
      // 点击删除按钮，需判断该商品是否已有销量，销量不为0的商品不可删除，需文字提示：该商品已销售不可删除；
      // 商品销量为0，则可删除，仍需有二次文字信息提示：请确认是否删除该商品？
      // 选择确认，则成功在前后端删除，返回商品管理页；
      // 选择取消，则不删除，返回商品详情页；
    },

    onPublish: function() {
      // 点击发布按钮，判断必填项是否为空或都按规则填写； // 全部正确填写，则成功发布，发布按钮变为取消按钮，可在前端显示并搜索到该商品； // 为空或未按规则填写，则需分别报错提示： // 请上传正确的商品图片；
      // 请正确填写商品名称/单价／邮费/库存/商品详情； // 点击取消按钮，取消按钮变为发布按钮，不可在前端显示并搜索到该商品；
    },

    onSave: function() {
      if (this.goods.name.length == 0 || this.goods.description.length == 0 || this.goods.price.length ==
        0 ||
        this.goods.stock.length == 0 || this.goods.postage.length == 0) {
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
      this.saving = true
      if (!this.goods.id) this.goods.id = ""
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
      this.saving = false
    },
  }
}
</script>