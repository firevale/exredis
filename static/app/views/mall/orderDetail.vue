<template>
  <div class="my-orders" v-if="order">
    <div class="card">
      <header class="card-header has-bottom-line">
        <div class="card-header-title is-vertical">
          <p class="is-thickness"> {{$t('mall.order.fields.address.name') }}：{{order.address.name}} </p>
          <p class="is-thickness"> {{$t('mall.order.fields.address.mobile') }}：{{order.address.mobile}} </p>
          <p class="is-thickness"> {{$t('mall.order.fields.address.address') }}：{{order.address.area}}{{order.address.address}}
          </p>
        </div>
        <p class="card-header-icon">
          >
        </p>
      </header>
      <div class="card-content has-bottom-line">
        <div class="columns is-mobile is-multiline" style="margin:0;">
          <div v-for="detail in order.details" class="column is-narrow">
            <div class="media" style="margin-right:1rem;">
              <figure class="media-left">
                <p class="image is-64x64">
                  <img :src="detail.goods_pic">
                </p>
              </figure>
              <div class="media-content">
                <p>{{detail.goods_name}}</p>
                <p class="is-primary" :class="['currency', order.currency]">{{detail.price | formatPrice}}</p>
                <p>X{{detail.amount}} </p>
              </div>
            </div>
          </div>
          <p class="column is-12 has-text-right is-primary">
            {{$t('mall.order.fields.total') }}:
            <span :class="['currency', order.currency]">{{order.price | formatPrice}}</span> ({{$t('mall.order.fields.with_postage')}}
            <span :class="['currency', order.currency]">{{order.postage | formatPrice}}</span> )
          </p>
        </div>
      </div>
      <footer class="card-footer has-bottom-line">
        <div class="card-footer-item is-vertical">
          <p class="is-thickness">{{$t('mall.order.fields.id') }}：{{order.id}} </p>
          <p class="is-thickness">{{$t('mall.order.fields.status') }}：{{$t('mall.order.status.'+order.status) }} </p>
          <p class="is-thickness">{{$t('mall.order.fields.inserted_at') }}：{{order.inserted_at | formatServerDateTime}} </p>
        </div>
      </footer>
    </div>
    <div>
      <template v-if="order.status==0">
        <v-touch v-if="this.isSupportWechat()" class="button is-fullwidth is-info is-medium" @tap="onPrepay('wechat')">
          {{$t('mall.order.buttons.wechatPay')}}
        </v-touch>
        <v-touch class="button is-fullwidth is-info is-medium" @tap="onPrepay('alipay')">
          {{$t('mall.order.buttons.aliPay')}}
        </v-touch>
      </template>
      <v-touch v-if="order.status==2" class="button is-fullwidth is-info is-medium">
        {{$t('mall.order.buttons.reciept') }}
      </v-touch>
      <v-touch v-if="order.status==-1 || order.status==4" class="button is-fullwidth is-info is-medium" @tap="onReOrder()">
        {{$t('mall.order.buttons.reOrder') }}
      </v-touch>
    </div>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import * as utils from 'common/js/utils'

export default {
  components: {},
  data() {
    return {
      order: undefined
    }
  },
  mounted: async function() {
    let result = await this.$acs.fetchMallOrder({
      order_id: this.$route.params.orderId
    })

    if (result.success) {
      this.order = result.order
    }
  },

  computed: {},
  methods: {
    isSupportWechat: function() {
      return window.acsConfig.inApp && nativeApi.isWechatPaySupport()
    },
    onReOrder: function() {
      this.$router.push({
        name: 'mallOrder',
        params: {
          goodsId: this.order.details[0].mall_goods_id,
          quantity: this.order.details[0].amount
        },
      })
    },
    onPrepay: async function(payType) {
      this.loading = true
      //check stock
      this.checkStock(payType)
    },
    checkStock: async function(payType) {
      let result = await this.$acs.getGoodsStock(this.order.details[0].mall_goods_id)
      if (result.success) {
        let stock = result.stock
        if (this.order.details[0].amount > stock) {
          Toast.show(this.$t('mall.order.stockOut'))
          this.loading = false
        } else {
          switch (payType) {
            case 'alipay':
              this.alipayRedirect(this.order.id)
              break;
            case 'wechat':
              this.wechatPay(this.order.id)
              break;
          }
          setInterval(() => {
            this.loading = false
          }, 3500)
        }
      }
    },
    wechatPay: async function(order_id) {
      let result = await this.$acs.wechatMallPrepay(order_id)
      if (result.success) {
        nativeApi.openWechatPayWithCallback(JSON.stringify(result),
          async rst => {
            if (order_id) {
              this.$router.push({
                name: 'myOrderDetail',
                params: {
                  orderId: order_id
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
}
</script>