<template>
  <div class="box">
    <form name="goods" @submit.prevent="handleSubmit" v-if="goods">
      <div class="tile">
        <div class="tile is-parent is-vertical">
          <article class="tile is-child">
            <div class="field is-horizontal">
              <div class="field-label">
                <label class="label">{{ $t('admin.mall.goods.name') }}</label>
              </div>
              <div class="field-body">
                <input class="input" :placeholder="$t('admin.mall.goods.namePlaceholder')" type="text" v-model.trim="goods.name">
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label">
                <label class="label">{{ $t('admin.mall.goods.id') }}</label>
              </div>
              <div class="field-body">
                <input class="input" type="text" v-model.trim="goods.id" :disabled="!isNew">
              </div>
            </div>
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
                <input class="input" type="text" v-model.trim="realPrice">
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label">
                <label class="label">{{ $t('admin.mall.goods.postage') }}</label>
              </div>
              <div class="field-body">
                <input class="input" type="text" v-model.trim="realPostage">
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
        <div class="tile is-parent">
          <article class="tile is-child">
            <center style="padding:0 4rem 0 4rem;">
              <div class="columns is-multiline">
                <div class="column is-4" v-for="(pic, index) in pics">
                  <figure class="image" style="display: block" @click="onShowImageUpload(index)">
                    <img :src="pic ? pic: 'https://placehold.it/256x256?text=400X400'" style="width:120px; height:120px;"></img>
                  </figure>
                </div>
              </div>
              <p class="help">{{ $t('admin.mall.goods.picPlaceholder') }}</p>
            </center>
          </article>
        </div>
      </div>
      <div>
        <label> {{ $t('admin.mall.goods.description') }} </label>
        <quill-editor v-model.trim="goods.description" :full-featured="true" :placeholder="$t('admin.mall.goods.descPlaceholder')"
          style="min-height: 200px" @ready="setEditor" @input="handleValidation($v.goods.description)"
          @image="onInsertImage">
        </quill-editor>
      </div>
      <div class="tile is-full has-text-left" style="margin-top: 0.5rem" v-show="errorHint">
        <span class="icon is-sign">!</span>
        <span class="is-primary" style="font-size: 1rem">{{errorHint}}</span>
      </div>
      <div style="margin-top: 15px">
        <a class="button is-white" @click.prevent="onBack">
          <span class="icon is-small"><i class="fa fa-backward"></i></span><span>{{ $t('admin.mall.goods.back') }}</span></a>
        <a class="button is-primary" v-if="!this.isNew" :class="{'is-loading': deleting}" @click.prevent="onDelete">
          <span class="icon is-small"><i class="fa fa-close"></i></span><span>{{ $t('admin.mall.goods.delete') }}</span></a>
        <a class="button is-primary" v-if="!this.isNew" :class="{'is-loading': publishing}" @click.prevent="onPublish">
          <span class="icon is-small"><i class="fa " :class="goods.active==true? ' fa-level-down' : ' fa-level-up'"></i></span><span>{{ goods.active==true? $t('admin.mall.goods.unPublish') : $t('admin.mall.goods.publish') }}</span></a>
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

import {
  showFileUploadDialog
} from 'common/components/fileUpload'

import {
  showMessageBox
} from 'admin/components/dialog/messageBox'

const touchMap = new WeakMap()

export default {
  mounted: function() {
    let gid = this.$route.params.goodsId
    let currency = this.$route.params.currency
    if (gid) {
      this.isNew = false
      this.getGoodsDetail(gid)
    } else {
      this.isNew = true
      this.goods = {
        id: '',
        pic: '',
        name: '',
        description: '',
        price: 0,
        postage: 0,
        stock: 0,
        currency: currency,
        app_id: this.$route.params.appId,
      }
      this.pics = new Array(6);
    }
  },

  computed: {
    errorHint: function() {
      if (!this.$v.goods.name.required) {
        return this.$t('admin.mall.goods.pleaseFill')
      } else if (!this.$v.goods.name.maxLength) {
        return this.$t('admin.mall.goods.namePlaceholder')
      } else if (!this.$v.goods.description.required) {
        return this.$t('admin.mall.goods.descPlaceholder')
      } else if (!this.$v.goods.description.maxLength) {
        return this.$t('admin.mall.goods.descPlaceholder')
      }

      return ''
    },
  },

  validations: {
    goods: {
      name: {
        required,
        maxLength: maxLength(50),
      },
      description: {
        required,
        maxLength: maxLength(8000),
      }
    }
  },

  data() {
    return {
      goods: {},
      pics: [],
      loading: false,
      deleting: false,
      saving: false,
      publishing: false,
      isNew: false,
      editor: undefined,
      realPrice: 0.00,
      realPostage: 0.00,
    }
  },

  watch: {
    realPrice: function() {
      this.goods.price = Math.round(this.realPrice * 100)
    },
    realPostage: function() {
      this.goods.postage = Math.round(this.realPostage * 100)
    }
  },

  methods: {
    getPrice: function(price) {
      if (price)
        return parseFloat(price / 100).toFixed(2)
      else
        return 0
    },

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

    onShowImageUpload: function(index) {
      if (this.goods.id.length > 0) {
        showFileUploadDialog(this.$i18n, {
          postAction: '/mall_actions/update_goods_pic',
          accept: 'image/jpeg, image/png',
          data: {
            goods_id: this.goods.id
          },
          extensions: ['png', 'jpg', 'jpeg'],
          title: this.$t('admin.titles.uploadGoodsPic'),
          imageValidator: {
            square: true,
            minWidth: 400,
          },
          callback: response => this.pics.splice(index,1,response.pic_url),
        })
      } else {
        this.showWarning(this.$t('admin.mall.goods.saveFirst'))
      }
    },

    getGoodsDetail: async function(goodsId) {
      this.loading = true
      let result = await this.$acs.getGoodsDetail({
        goods_id: goodsId
      })
      if (result.success) {
        this.goods = result.goods
        if (this.goods.price > 0) this.realPrice = parseFloat(this.goods.price / 100).toFixed(2)
        if (this.goods.postage > 0) this.realPostage = parseFloat(this.goods.postage / 100).toFixed(2)
        this.pics = this.goods.pic.split('|')
        this.pics.length = 6
      }
      this.loading = false
    },

    onInsertImage: function(editor) {
      showFileUploadDialog(this.$i18n, {
        postAction: '/mall_actions/update_goods_content_pic',
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
      if (this.goods.sold > 0) {
        this.showWarning(this.$t('admin.mall.soldCanNotDelete'))
      } else {
        showMessageBox({
          visible: true,
          title: this.$t('admin.titles.warning'),
          message: this.$t('admin.messages.confirmDeleteMallGoods'),
          type: 'danger',
          onOK: async _ => {
            let result = await this.$acs.deleteMallGoods({
              app_id: this.goods.app_id,
              goods_id: this.goods.id
            }, this.$t('admin.notification.message.mallGoodsDeleted'))
            if (result.success) {
              this.$router.replace({
                name: 'EditMall',
                params: {
                  appId: this.goods.app_id
                }
              })
            }
          },
        })
      }
    },

    onPublish: function() {
      if (this.goods.active) {
        //下架
        showMessageBox({
          visible: true,
          title: this.$t('admin.titles.warning'),
          message: this.$t('admin.messages.confirmUnPublishGoods'),
          type: 'danger',
          onOK: async _ => {
            this.toggleStatus()
          },
        })
      } else {
        //上架
        if (this.goods.name.length == 0 || this.goods.description.length == 0 || this.goods.price
          .length == 0 || this.goods.stock.length == 0 || this.goods.postage.length == 0 || this.goods
          .id.length == 0) {
          this.showWarning(this.$t('admin.mall.goods.pleaseFill'))
          return;
        }
        if (!this.goods.pic || this.goods.pic.length == 0) {
          this.showWarning(this.$t('admin.mall.goods.pleaseUpPic'))
          return;
        }
        this.toggleStatus()
      }
    },

    toggleStatus: async function() {
      let result = await this.$acs.toggleGoodsStatus({
        goods_id: this.goods.id
      }, this.$t('admin.operateSuccess'))
      if (result.success) {
        this.goods.active = !this.goods.active
      }
    },

    showWarning: function(message) {
      openNotification({
        title: this.$t('admin.titles.warning'),
        message: message,
        type: 'danger',
        duration: 4500,
        container: '.notifications',
      })
    },

    onBack: function() {
      this.$router.replace({
        name: 'EditMall',
        params: {
          appId: this.goods.app_id
        }
      })
    },

    onSave: function() {
      if (this.goods.name.length == 0 || this.goods.description.length == 0 || this.goods.price.length ==
        0 ||
        this.goods.stock.length == 0 || this.goods.postage.length == 0 || this.goods.id.length ==
        0) {
        this.showWarning(this.$t('admin.mall.goods.pleaseFill'))
        return;
      }

      this.handleSubmit()
    },

    handleSubmit: async function() {
      this.saving = true
      let result = await this.$acs.updateGoods({
        id: this.goods.id,
        app_id: this.goods.app_id,
        name: this.goods.name,
        pic: this.pics.join("|"),
        description: this.goods.description,
        price: this.goods.price,
        postage: this.goods.postage,
        stock: this.goods.stock,
        currency: this.goods.currency,
        is_new: this.isNew
      })
      if (result.success) {
        this.isNew = false
      }
      this.saving = false
    },
  }
}
</script>