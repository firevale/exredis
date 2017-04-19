<template>
  <div class="columns is-vertical">
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input class="input is-large" type="text" :placeholder="$t('mall.order.addressPlaceholder')">
        <span class="icon is-medium is-left">
        <i class="fa fa-email"></i>
        </span>
        <span class="icon is-medium is-right">
        <i class="fa fa-angle-right"></i>
        </span>
      </p>
    </div>
    <div class="columns" v-if="goods">
      <div class="column is-parent is-one-third">
        <center>
          <figure class="image" style="display: block">
            <img :src="goods.pic ? goods.pic: 'https://placehold.it/256x256?text=未上传'" style="width:160px; height:160px;"></img>
          </figure>
        </center>
      </div>
      <div class="column is-parent is-vertical">
        <article class="tile is-child">
          <p class="subtitle is-4">{{ goods.name}}</p>
          <p class="subtitle is-4" style="color:#ff6600;">{{ getPrice(goods.price) }}</p>
          <p class="subtitle is-4">x {{ this.quantity }}</p>
          <p class="subtitle is-4" style="color:#ff6600;">{{ $t('mall.order.totalPrice', {price: this.totalPrice, postage: getPrice(goods.postage)})
            }}
          </p>
        </article>
      </div>
    </div>
    <div class="columns">
      <div class="column is-half">
        <v-touch class="button is-info is-large is-fullwidth" @tap="onPrepay('wechat')">{{$t('mall.order.wechatPay')}}</v-touch>
      </div>
      <div class="column is-half">
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

import Toast from 'common/components/toast'
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
      address: "地址地址",
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
      if (this.goodsId && this.quantity) {
        let result = await this.$acs.getGoodsDetail(this.goodsId)
        if (result.success) {
          this.goods = result.goods
          this.totalPrice = "¥" + parseFloat((this.goods.price * this.quantity + this.goods.postage) /
            100).toFixed(2)
        }
      } else {
        this.$router.push({
          name: 'goodsIndex',
          params: {
            appId: this.$route.params.appId
          },
        })
      }
    },
    onPrepay: async function(payType) {
      //check address
      if (this.address == "") {
        Toast.show(this.$t('mall.order.addressPlaceholder'))
        return;
      }
      //check stock
      this.checkStock(payType)
    },
    checkStock: async function(payType) {
      let result = await this.$acs.getGoodsStock(this.goodsId)
      if (result.success) {
        let stock = result.stock
        if (stock <= this.quantity) {
          Toast.show(this.$t('mall.order.stockOut'))
        } else {
          this.prepay(payType)
        }
      }
    },
    prepay: async function(payType) {
      let result = await this.$acs.createMallOrder(this.goodsId, this.quantity, payType, this.address)
      if (result.success) {
        let order_id = result.order_id
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
    wechatPay: async function(order_id) {
      let result = await this.$acs.wechatMallPrepay(order_id)
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