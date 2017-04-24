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
    <div class="columns" v-if="goodsItem.goods">
      <div class="column is-parent is-one-third">
        <center>
          <figure class="image" style="display: block">
            <img :src="goodsItem.goods.pic ? goodsItem.goods.pic: 'https://placehold.it/256x256?text=未上传'" style="width:160px; height:160px;"></img>
          </figure>
        </center>
      </div>
      <div class="column is-parent is-vertical">
        <article class="tile is-child">
          <p class="subtitle is-4">{{ goodsItem.goods.name}}</p>
          <p class="subtitle is-4" style="color:#ff6600;">{{ getPrice(goodsItem.goods.price) }}</p>
          <p class="subtitle is-4">x {{ goodsItem.quantity }}</p>
          <p class="subtitle is-4" style="color:#ff6600;">{{ $t('mall.order.totalPrice', {price: this.totalPrice, postage: getPrice(goodsItem.goods.postage)})
            }}
          </p>
        </article>
      </div>
    </div>
    <div class="tile">
      <div class="tile" style="padding: 1rem;" v-if="this.isSupportWechat()">
        <v-touch class="button is-info is-large is-fullwidth" @tap="onPrepay('wechat')">{{$t('mall.order.wechatPay')}}</v-touch>
      </div>
      <div class="tile" style="padding: 1rem;">
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
  computed: {
    ...mapGetters([
      'shoppingCart',
    ]),
  },

  mounted: function() {
    this.goodsItem.goodsId = this.$route.params.goodsId ? this.$route.params.goodsId : this.shoppingCart.goodsId
    this.goodsItem.quantity = this.$route.params.quantity ? this.$route.params.quantity : this.shoppingCart.quantity
    if (this.goodsItem.goodsId && this.goodsItem.quantity) {
      this.getGoodsDetail()
    } else {
      this.$router.push({
        name: 'goodsIndex',
        params: {
          appId: this.$route.params.appId
        },
      })
    }
  },
  data: function() {
    return {
      canGoBack: false,
      inApp: window.acsConfig.inApp,
      goodsItem: {
        goodsId: "",
        quantity: 1,
        goods: {},
      },
      totalPrice: "0",
      address: {
        id: "",
        name: "",
        mobile: "",
        area: "",
        address: "",
        area_code: ""
      },
      orderId: "",
    }
  },
  methods: {
    ...mapActions([
      'updateShoppingCart'
    ]),

    isSupportWechat: function() {
      return window.acsConfig.inApp && nativeApi.isWechatPaySupport()
    },

    getPrice: function(price) {
      return "¥ " + filter.formatPrice(price)
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
      let result = await this.$acs.getGoodsDetail(this.goodsItem.goodsId)
      if (result.success) {
        this.goodsItem.goods = result.goods
        this.totalPrice = "¥ " + parseFloat((this.goodsItem.goods.price * this.goodsItem.quantity + this.goodsItem.goods.postage) / 100).toFixed(2)
        this.updateShoppingCart(this.goodsItem)
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
      let result = await this.$acs.getGoodsStock(this.goodsItem.goodsId)
      if (result.success) {
        let stock = result.stock
        if (stock <= this.goodsItem.quantity) {
          Toast.show(this.$t('mall.order.stockOut'))
        } else {
          this.prepay(payType)
        }
      }
    },
    prepay: async function(payType) {
      let result = await this.$acs.createMallOrder(this.goodsItem.goodsId, this.goodsItem.quantity, payType, this.address)
      if (result.success) {
        this.orderId = result.order_id
        switch (payType) {
          case 'alipay':
            this.alipayRedirect(this.orderId)
            break;
          case 'wechat':
            this.wechatPay(this.orderId)
            break;
        }
      }
    },
    wechatPay: async function(order_id) {
      let result = await this.$acs.wechatMallPrepay(order_id)
      if (result.success) {
        nativeApi.openWechatPayWithCallback(JSON.stringify(result),
          async rst => {
            if (this.orderId) {
              this.$router.push({
                name: 'myOrderDetail',
                params: {
                  orderId: this.orderId
                },
              })
            }
          })
      }
    },
    alipayRedirect: async function(order_id) {
      let result = await this.$acs.alipayMallRedirect(order_id,
        `${window.location.protocol}//${window.location.hostname}${window.location.pathname}?merchant_order_id=${order_id}`,
        `${window.location.protocol}//${window.location.hostname}${window.location.pathname}`,
        `${window.location.protocol}//${window.location.hostname}/api/pay/alipay/mall_notify`
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