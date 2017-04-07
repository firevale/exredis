<template>
  <modal :visible="visible">
    <div class="box">
      <div class="has-text-centered" style="width: 100%; margin-bottom: 10px">
        <h5 class="title is-5">{{ $t('admin.titles.editGoodsProductId', {goodsName: goodsName, sdk: $t('admin.sdks.' + productIdInfo.sdk)}) }}</h5>
      </div>
      <validation name="productId" @submit.prevent="handleSubmit">
        <label class="label"> {{ $t('admin.app.goods.productId', {sdk: productIdInfo.sdk}) }}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="productIdInfo.product_id">
        </p>
        <div class="has-text-centered" style="margin-top: 15px">
          <a class="button is-primary" :class="{'is-loading': processing}" @click.prevent="handleSubmit">{{ $t('admin.submit') }}</a>
        </div>
      </validation>
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
    goodsName: String,
    productIdInfo: Object,
    callback: Function,
  },

  data() {
    return {
      processing: false,
    }
  },

  methods: {
    handleSubmit: async function() {
      this.processing = true

      let result = await this.$acs.updateAppGoodsProductI({
        product_id_info: this.productIdInfo,
        app_id: this.appId,
      }, this.$t('admin.notification.message.goodsProductIdUpdated', {
        goodsName: this.goodsName,
        sdk: this.$t('admin.sdks.' + result.product_id_info.sdk)
      }))

      this.processing = false
      
      if (this.callback) {
        this.callback(result.product_id_info)
      }
      this.visible = false
    }
  },

  components: {
    Modal,
  },
}
</script>