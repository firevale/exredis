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
          <p class="subtitle is-4" style="color:#ff6600;">{{ getPrice(goods.price) }}</p>
          <p class="subtitle is-4">X {{ this.quantity }}</p>
          <p class="subtitle is-4" style="color:#ff6600;">{{ $t('mall.order.totalPrice', {price: this.totalPrice, postage: getPrice(goods.postage)})
            }}
          </p>
        </article>
      </div>
    </div>
    <div class="columns">
      <div class="column is-3">
        <v-touch class="button is-info is-large is-fullwidth" @tap="onPrepay('wechat')">{{$t('mall.order.wechatPay')}}</v-touch>
      </div>
      <div class="column is-3">
        <v-touch class="button is-info is-large is-fullwidth" @tap="onPrepay('alipay')">{{$t('mall.order.aliPay')}}</v-touch>
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
import * as filter from 'common/js/filters'

export default {
  mounted: async function() {
    await this.getGoodsDetail()
  },
  data: function() {
    return {
      canGoBack: false,
      inApp: window.acsConfig.inApp,
      quantity: 1,
      totalPrice: "",
      goods: {},
      goodsId: "",
    }
  },
  methods: {
    getPrice: function(price) {
      return "¥" + filter.formatPrice(price)
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
        this.totalPrice = "¥" + parseFloat((this.goods.price * this.quantity + this.goods.postage) /
          100).toFixed(2)
      }
    },

    onPrepay: async function(payType) {
      let result = await this.$acs.createMallOrder(this.goodsId, this.quantity, payType)
      if (result.success) {
        let order_id = result.order.id
        switch (payType) {
          case 'alipay':
            this.alipayRedirect(order_id)
            break;
          case 'wechat':
            this.wechatPay(order_id)
            break;
        }
      }
    },
    onWechatPay: async function(order_id) {
      let result = await this.$acs.wechatPrepay(order_id)
      if (result.success) {
        nativeApi.openWechatPay(JSON.stringify(result))
      }
    },
    alipayRedirect: async function(order_id) {
      let result = await this.$acs.alipayRedirect(order_id,
        `${window.location.protocol}//${window.location.hostname}${window.location.pathname}?merchant_order_id=${order_id}`,
        `${window.location.protocol}//${window.location.hostname}${window.location.pathname}`
      )
      if (result.success) {
        window.location = result.redirect_uri
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