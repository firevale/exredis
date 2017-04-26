<template>
  <div class="place-order">
    <div class="card is-mobile">
      <v-touch class="card-header is-mobile" tag="header" @tap="selectAddress()">
        <article v-if="this.selectedAddress.id > 0" class="tile is-vertical">
          <p class="title is-5 is-thickness">{{$t('mall.address.fields.name') }}：{{this.selectedAddress.name}}</p>
          <p class="title is-5 is-thickness">{{$t('mall.address.fields.mobile') }}：{{this.selectedAddress.mobile}}</p>
          <p class="title is-5 is-thickness">{{$t('mall.address.fields.address') }}：{{this.selectedAddress.area.replace(/-/g," ") }} {{this.selectedAddress.address}}</p>
        </article>
        <p v-else class="card-header-title">
          <span class="icon nav-icon icon-pen"></span>
          <span class="subtitle is-5 is-thickness">{{$t('mall.order.addressPlaceholder') }}</span>
        </p>
        <p class="card-header-icon">
          >
        </p>
      </v-touch>
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <p class="image is-64x64" style="overflow:hidden">
              <img :src="goodsItem.goods.pic ? goodsItem.goods.pic: 'https://placehold.it/64x64?text=loading...'">
            </p>
          </div>
          <div class="media-content is-marginless is-paddingless">
            <p class="title is-normal is-5">{{ goodsItem.goods.name}}</p>
            <p class="title is-normal is-5 is-primary">{{ getPrice(goodsItem.goods.price) }}</p>
            <p class="title is-normal is-5">X{{ goodsItem.quantity }}</p>
          </div>
        </div>
      </div>
      <div class="content has-text-right">
        <p class="subtitle is-5 is-primary is-normal">
          {{ $t('mall.order.totalPrice', {price: this.totalPrice, postage: getPrice(goodsItem.goods.postage)})
          }}
        </p>
      </div>
    </div>
    <div class="order-bottom">
      <div class="is-fullwidth" v-if="this.isSupportWechat()">
        <v-touch class="button is-info is-large is-fullwidth" :class="loading?'is-loading':''" @tap="onPrepay('wechat')">{{$t('mall.order.wechatPay')}}</v-touch>
      </div>
      <div class="is-fullwidth">
        <v-touch class="button is-info is-large is-fullwidth" :class="loading?'is-loading':''" @tap="onPrepay('alipay')">{{$t('mall.order.aliPay')}}</v-touch>
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
      'shoppingCart', 'selectedAddress'
    ]),
  },

  mounted: function() {
    this.goodsItem.goodsId = this.$route.params.goodsId ? this.$route.params.goodsId : this.shoppingCart
      .goodsId
    this.goodsItem.quantity = this.$route.params.quantity ? this.$route.params.quantity : this.shoppingCart
      .quantity
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

    if (this.selectedAddress.id == 0) {
      this.getDefaultAddress()
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
      loading: false,
      totalPrice: "0",
      orderId: "",
    }
  },
  methods: {
    ...mapActions([
      'updateShoppingCart', 'updateSelectedAddress'
    ]),

    selectAddress: function() {
      this.$router.push({
        name: 'selectAddress'
      })
    },

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
    getDefaultAddress: async function() {
      let result = await this.$acs.getDefaultAddress()
      if (result.success) {
        if (result.address) {
          this.updateSelectedAddress(result.address)
        }
      }
    },
    getGoodsDetail: async function() {
      let result = await this.$acs.getGoodsDetail(this.goodsItem.goodsId)
      if (result.success) {
        this.goodsItem.goods = result.goods
        this.totalPrice = "¥ " + parseFloat((this.goodsItem.goods.price * this.goodsItem.quantity +
          this.goodsItem.goods.postage) / 100).toFixed(2)
        this.updateShoppingCart(this.goodsItem)
      }
    },
    onPrepay: async function(payType) {
      //check address
      if (this.selectedAddress.id == 0) {
        Toast.show(this.$t('mall.order.addressPlaceholder'))
        return;
      }
      this.loading = true
      //check stock
      this.checkStock(payType)

    },
    checkStock: async function(payType) {
      let result = await this.$acs.getGoodsStock(this.goodsItem.goodsId)
      if (result.success) {
        let stock = result.stock
        if (stock <= this.goodsItem.quantity) {
          Toast.show(this.$t('mall.order.stockOut'))
          this.loading = false
        } else {
          this.prepay(payType)

          setInterval(() => {
            this.loading = false
          }, 3500)
        }
      }
    },
    prepay: async function(payType) {
      let result = await this.$acs.createMallOrder(this.goodsItem.goodsId, parseInt(this.goodsItem
          .quantity),
        payType, this.selectedAddress)
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