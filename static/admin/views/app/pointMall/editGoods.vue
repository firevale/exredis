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
                <label class="label">{{ $t('admin.mall.goods.price') }}</label>
              </div>
              <div class="field-body">
                <input class="input" type="number" v-model.trim="goods.price">
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label">
                <label class="label">{{ $t('admin.mall.goods.stock') }}</label>
              </div>
              <div class="field-body">
                <input class="input" type="number" v-model.trim="goods.stock">
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label">
                <label class="label">{{ $t('admin.mall.goods.is_virtual') }}</label>
              </div>
              <div class="field-body">
                <label class="checkbox">
                  <input type="checkbox" v-model.trim="goods.is_virtual">
                </label>
              </div>
            </div>
            <div v-if="!goods.is_virtual" class="field is-horizontal">
              <div class="field-label">
                <label class="label">{{ $t('admin.mall.goods.postage') }}</label>
              </div>
              <div class="field-body">
                <input class="input" type="number" v-model.trim="realPostage">
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label">
                <label class="label">{{ $t('admin.mall.goods.time') }}</label>
              </div>
              <div class="field-body">
                从&nbsp;
                <el-date-picker v-model.trim="goods.begin_time" :editable="false" type="date" :placeholder="$t('admin.mall.goods.begin_time')">
                </el-date-picker>&nbsp;到&nbsp;
                <el-date-picker v-model.trim="goods.end_time" :editable="false" type="date" :placeholder="$t('admin.mall.goods.end_time')">
                </el-date-picker>
              </div>
            </div>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child">
            <center style="padding:0 4rem 0 4rem;">
              <div v-dragula="pics" :bag="bagId" class="columns is-multiline container2">
                <div class="column is-4" v-for="(pic, index) in pics" :key="pic">
                  <figure class="image" style="display: block" @click="onShowImageUpload(index)">
                    <img :src="pic ? pic: 'https://placehold.it/256x256?text=400X400' | imageStaticUrl" style="width:120px; height:120px;"></img>
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
          <span class="icon is-small"><i class="fa fa-backward"></i></span>
          <span>{{ $t('common.return') }}</span>
        </a>
        <a class="button is-primary" v-if="!this.isNew" :class="{'is-loading': deleting}" @click.prevent="onDelete">
          <span class="icon is-small"><i class="fa fa-close"></i></span>
          <span>{{ $t('admin.mall.goods.delete') }}</span>
        </a>
        <a class="button is-primary" v-if="!this.isNew" :class="{'is-loading': publishing}" @click.prevent="onPublish">
          <span class="icon is-small"><i class="fa " :class="goods.active==true? ' fa-level-down' : ' fa-level-up'"></i></span>
          <span>{{ goods.active==true? $t('admin.mall.goods.unPublish') : $t('admin.mall.goods.publish') }}</span>
        </a>
        <a class="button is-primary" :class="{'is-loading': saving}" @click.prevent="onSave">
          <span class="icon is-small"><i class="fa fa-save"></i></span>
          <span>{{ $t('admin.mall.goods.save') }}</span>
        </a>
      </div>
    </form>
  </div>
</template>
<script>
import Vue from 'vue'
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
  showImageUploadDialog
} from 'common/components/imageUpload'

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
        app_id: this.$route.params.appId,
        is_virtual: true,
        begin_time: '',
        end_time: '',
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
      realPostage: 0.00,
      bagId: "picBag"
    }
  },

  created: function() {
    Vue.vueDragula.options(this.bagId, {
      direction: 'horizontal',
    })
  },

  ready: function() {
    Vue.vueDragula.eventBus.$on(
      'drop',
      function(args) {
        console.log('drop: ' + args[0])
        console.log(this.pics)
      }
    )
    Vue.vueDragula.eventBus.$on(
      'dropModel',
      function(args) {
        console.log('dropModel: ' + args)
        console.log(this.pics)
      }
    )
  },

  watch: {
    realPostage: function() {
      this.goods.postage = Math.round(this.realPostage * 100)
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

    onShowImageUpload: function(index) {
      if (this.goods.id.length > 0) {
        showImageUploadDialog(this.$i18n, {
          postAction: '/admin_actions/pmall/update_goods_pic',
          data: {
            goods_id: this.goods.id
          },
          headers: {
            'x-csrf-token': window.acsConfig.csrfToken
          },
          title: this.$t('admin.titles.uploadGoodsPic'),
          width: 400,
          height: 400,
          callback: response => this.pics.splice(index, 1, response.pic_url),
        })
      } else {
        this.showWarning(this.$t('admin.mall.goods.saveFirst'))
      }
    },

    getGoodsDetail: async function(goodsId) {
      this.loading = true
      let result = await this.$acs.getPointGoodsDetail({
        goods_id: goodsId
      })
      if (result.success) {
        this.goods = result.goods
        if (this.goods.postage > 0) this.realPostage = parseFloat(this.goods.postage / 100).toFixed(
          2)
        this.pics = this.goods.pic ? this.goods.pic.split('|') : "|||||".split('|')
        this.pics.length = 6
      }
      this.loading = false
    },

    onInsertImage: function(editor) {
      showFileUploadDialog(this.$i18n, {
        postAction: '/admin_actions/pmall/update_goods_content_pic',
        accept: 'image/jpeg, image/png',
        data: {
          app_id: this.goods.app_id
        },
        headers: {
          'x-csrf-token': window.acsConfig.csrfToken
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
            let result = await this.$acs.deletePointGoods({
              app_id: this.goods.app_id,
              goods_id: this.goods.id
            }, this.$t('admin.notification.message.mallGoodsDeleted'))
            if (result.success) {
              this.$router.replace({
                name: 'EditPointGoods',
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
      let result = await this.$acs.togglePMallGoodsStatus({
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
      this.$router.go(-1)
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
      let result = await this.$acs.updatePMallGoods({
        id: this.goods.id,
        app_id: this.goods.app_id,
        name: this.goods.name,
        pic: this.pics.filter(t => t != "").join("|"),
        description: this.goods.description,
        price: this.goods.price,
        postage: this.goods.postage,
        stock: this.goods.stock,
        is_virtual: this.goods.is_virtual,
        begin_time: this.goods.begin_time,
        end_time: this.goods.end_time,
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
<style scoped>
.gu-mirror {
  position: fixed !important;
  margin: 0 !important;
  z-index: 9999 !important;
  opacity: 0.8;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=80)";
  filter: alpha(opacity=80);
}

.gu-hide {
  display: none !important;
}

.gu-unselectable {
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  user-select: none !important;
}

.gu-transit {
  opacity: 0.2;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=20)";
  filter: alpha(opacity=20);
}
</style>