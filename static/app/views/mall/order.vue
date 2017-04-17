<template>
  <div class="columns is-vertical">
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input class="input is-large" type="text" :placeholder="$t('mall.order.addressPlaceholder')">
        <span class="icon is-medium is-left">
        <i class="fa fa-pencil"></i>
        </span>
        <span class="icon is-medium is-right">
        <i class="fa fa-angle-right"></i>
        </span>
      </p>
    </div>
    <div class="columns" v-if="goods">
      <div class="column is-parent is-one-third">
        <figure class="image" style="display: block">
          <img :src="goods.pic ? goods.pic: 'https://placehold.it/256x256?text=未上传'" style="width:160px; height:160px;"></img>
        </figure>
      </div>
      <div class="column is-parent is-vertical">
        <article class="tile is-child">
          <p class="subtitle is-4">{{ goods.name}}</p>
          <p class="subtitle is-4">{{ getPrice(goods.price) }}</p>
          <p class="subtitle is-4">{{ this.quantity }}</p>
          <p class="subtitle is-4">{{ $t('mall.order.totalPrice', {currency: '¥', price: getPrice(goods.price), postage: getPrice(goods.postage)}) }}</p>
        </article>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from '../../vue-installed'
import {
  mapGetters,
  mapActions
} from 'vuex'

import nativeApi from 'common/js/nativeApi'

export default {
  mounted: async function() {
    await this.getGoodsDetail()
  },
  data: function() {
    return {
      canGoBack: false,
      inApp: window.acsConfig.inApp,
      quantity: 1,
      goods: {},
      goodsId: "",
    }
  },
  methods: {
    getPrice: function(price) {
      return "¥" + parseFloat(price / 100).toFixed(2)
    },
    onBtnBackClicked: function() {
      if (this.canGoBack) {
        this.$router.back()
      } else if (this.inApp) {
        nativeApi.closeWebviewWithResult({
          success: false
        })
      }
    },
    getGoodsDetail: async function() {
      this.goodsId = this.$route.params.goodsId
      this.quantity = this.$route.params.quantity
      let result = await this.$acs.getGoodsDetail(this.goodsId)
      if (result.success) {
        this.goods = result.goods
      }
    },
  },
  watch: {
    '$route' (to, from) {
      this.canGoBack = (history.state != null)
    }
  }
}
</script>