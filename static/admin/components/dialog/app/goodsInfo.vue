<template>
  <modal :visible="visible">
    <div class="box">
      <div class="has-text-centered" style="width: 100%; margin-bottom: 10px">
        <h5 class="title is-5">{{ $t('admin.titles.editGoodsInfo', {appName: appName}) }}</h5>
      </div>
      <form name="goods" @submit.prevent="handleSubmit">
        <label class="label"> {{ $t('admin.app.goods.id') }}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="goods.id">
        </p>
        <label class="label"> {{ $t('admin.app.goods.name') }}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="goods.name">
        </p>
        <label class="label"> {{ $t('admin.app.goods.description') }}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="goods.description">
        </p>
        <label class="label"> {{ $t('admin.app.goods.price') + '[' + $t('admin.currency.' + currency) + ']' }}: </label>
        <p class="control">
          <input class="input" type="number" v-model.trim="price">
        </p>
        <div class="has-text-centered" style="margin-top: 15px">
          <a class="button is-primary" :class="{'is-loading': processing}" @click.prevent="handleSubmit">{{ $t('admin.submit') }}</a>
        </div>
      </form>
    </div>
  </modal>
</template>
<script>
import {
  Modal
} from 'vue-bulma-modal'

import {
  openNotification,
  processAjaxError
} from 'admin/miscellaneous'

export default {
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    appId: String,
    appName: String,
    goods: Object,
    currency: String,
    callback: Function,
  },

  data() {
    return {
      processing: false,
      price: 0,
    }
  },

  mounted: function() {
    this.price = this.goods.price / 100
  },

  watch: {
    price: function(val) {
      this.goods.price = Math.round(val * 100)
    }
  },

  methods: {
    handleSubmit: async function() {
      this.processing = true
      let result = await this.$acs.updateAppGoodsInfo({
        app_id: this.appId,
        goods: this.goods,
      }, this.$t('admin.notification.message.goodsInfoUpdated', {
        goodsName: this.goods.name
      }))

      if (this.callback) {
        this.callback(result.goods)
      }

      this.visible = false
      this.processing = false
    }
  },

  components: {
    Modal,
  },
}
</script>