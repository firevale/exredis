<template>
  <div class="my-orders">
    <div class="card">
      <header class="card-header has-bottom-line">
        <div class="card-header-title is-vertical">
          <p class="is-thickness"> {{$t('mall.order.fields.address.name') }}：{{this.selectedOrder.address.name}} </p>
          <p class="is-thickness"> {{$t('mall.order.fields.address.mobile') }}：{{this.selectedOrder.address.mobile}} </p>
          <p class="is-thickness"> {{$t('mall.order.fields.address.address') }}：{{this.selectedOrder.address.area}}{{this.selectedOrder.address.address}}
          </p>
        </div>
        <!--<p class="card-header-icon">
          >
        </p>-->
      </header>
      <div class="card-content has-bottom-line">
        <div class="columns is-mobile is-multiline" style="margin:0;">
          <div v-for="detail in this.selectedOrder.details" class="column is-narrow" @click.prevent="viewSnapshot(detail.mall_goods_id)">
            <div class="media" style="margin-right:1rem;">
              <figure class="media-left">
                <p class="image is-64x64">
                  <img :src="detail.goods_pic.split('|')[0]">
                </p>
              </figure>
              <div class="media-content">
                <p>{{detail.goods_name}}</p>
                <p class="is-primary currency" :class="selectedOrder.currency">{{detail.price | formatPrice}}</p>
                <p>X{{detail.amount}} </p>
              </div>
            </div>
          </div>
          <p class="column is-12 has-text-right is-primary">
            {{$t('mall.order.fields.total') }}:
            <span class="currency" :class="selectedOrder.currency">{{this.selectedOrder.price | formatPrice}}</span> ({{$t('mall.order.fields.with_postage')}}
            <span class="currency" :class="selectedOrder.currency">{{this.selectedOrder.postage | formatPrice}}</span> )
          </p>
        </div>
      </div>
      <footer class="card-footer has-bottom-line">
        <div class="card-footer-item is-vertical">
          <p class="is-thickness">{{$t('mall.order.fields.id') }}：{{this.selectedOrder.id}} </p>
          <p class="is-thickness">{{$t('mall.order.fields.status') }}：{{$t('mall.order.status.'+this.selectedOrder.status) }}
          </p>
          <p class="is-thickness">{{$t('mall.order.fields.inserted_at') }}：{{this.selectedOrder.inserted_at | formatServerDateTime}}
          </p>
        </div>
      </footer>
    </div>
    <div>
      <template v-if="this.selectedOrder.status==0">
        <v-touch v-if="this.isSupportWechat()" class="button is-fullwidth is-info is-medium" @tap="onPrepay('wechat')">
          {{$t('mall.order.buttons.wechatPay')}}
        </v-touch>
        <v-touch :class="loading?'is-loading':''" class="button is-fullwidth is-info is-medium" @tap="onPrepay('alipay')">
          {{$t('mall.order.buttons.aliPay')}}
        </v-touch>
      </template>
      <v-touch v-if="this.selectedOrder.status==1 || this.selectedOrder.status==2" class="button is-fullwidth is-info is-medium"
        @tap="confirmRecieved">
        {{$t('mall.order.buttons.reciept') }}
      </v-touch>
      <v-touch v-if="this.selectedOrder.status==-1 || this.selectedOrder.status==4" class="button is-fullwidth is-info is-medium"
        @tap="onReOrder()">
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
  computed: {
    ...mapGetters([
      'selectedOrder'
    ]),
  },
  mounted: async function() {
    if (this.selectedOrder.id == "") {
      let result = await this.$acs.fetchMallOrder({
        order_id: this.$route.params.orderId
      })

      if (result.success) {
        this.updateSelectedOrder(result.order)
      }
    }
  },
  data: function() {
    return {
      loading: false
    }
  },
  methods: {
    ...mapActions([
      'updateSelectedOrder'
    ]),
    isSupportWechat: function() {
      return window.acsConfig.inApp && nativeApi.isWechatPaySupport()
    },
    viewSnapshot(goodsId) {
      let snapshot = this.selectedOrder.snapshots[goodsId]
      this.$router.push({
        name: 'goodsSnapshots',
        params: {
          goods: snapshot,
        },
      })
    },
    onReOrder: function() {
      this.$router.push({
        name: 'mallOrder',
        params: {
          goodsId: this.selectedOrder.details[0].mall_goods_id,
          quantity: this.selectedOrder.details[0].amount
        },
      })
    },
    onPrepay: async function(payType) {
      this.loading = true
      //check stock
      this.checkStock(payType)
    },
    checkStock: async function(payType) {
      let result = await this.$acs.getGoodsStock(this.selectedOrder.details[0].mall_goods_id)
      if (result.success) {
        let stock = result.stock
        if (this.selectedOrder.details[0].amount > stock) {
          Toast.show(this.$t('mall.order.stockOut'))
          this.loading = false
        } else {
          switch (payType) {
            case 'alipay':
              this.alipayRedirect(this.selectedOrder.id)
              break;
            case 'wechat':
              this.wechatPay(this.selectedOrder.id)
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
    confirmRecieved: async function() {
      let result = await this.$acs.confirmRecieved({
        order_id: this.selectedOrder.id
      })
      if (result.success) {
        this.order = result.order
      }
    }
  },
}
</script>