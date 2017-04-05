<template>
  <div>
    <article class="media" style="margin-top: 1rem; margin-bottom: 1rem;">
      <figure class="media-left">
        <p class="image is-48x48">
          <img src="http://bulma.io/images/placeholders/128x128.png">
        </p>
      </figure>
      <div class="media-content">
        <div class="level is-mobile" style="margin-bottom: 0.5rem">
          <div class="level-left">
            <label>{{ $t('payment.orderDetail') }}: </label>
            <label style="margin-left: 0.5rem">{{ goodsName }}</label>
          </div>
        </div>
        <div class="level is-mobile">
          <div class="level-left">
            <label>{{ $t('payment.orderPrice') }}: </label>
            <label :class="currency" style="margin-left: 0.5rem">{{ price }}</label>
          </div>
        </div>
      </div>
    </article>
    <p class="is-seperator">{{ $t('payment.selectPaymentChannel') }}
    </p>
    <div class="tile is-vertical" <div class="tile is-payment-channel has-bottom-line" v-for="channel in channels">
      <div class="level is-mobile" style="padding: 0.5rem 0; width: 100%; cursor: pointer" @click="setActiveChannel(channel)">
        <div class="level-left">
          <a class="sdk-icon" :class="channel">
          </a>
          <div class="tile is-vertical" style="margin-left: 1rem">
            <p>{{ $t(`payment.channel.${channel}`) }}</p>
            <p>{{ $t(`payment.slogan.${channel}`) }}</p>
          </div>
        </div>
        <div class="level-right">
          <span class="icon image-icon circle-icon" :class="activeChannel == channel ? 'active' : ''">
            </span>
        </div>
      </div>
    </div>
    <div class="has-text-centered" style="position: absolute; width: 100%; height: 3rem; bottom: 1rem;">
      <a class="button is-primary is-medium" style="min-width: 60%" @click="onPurchaseByChannel">
        {{ $t('payment.buyNow') }}
      </a>  
    </div>
  </div>
</template>
<script>
import nativeApi from 'common/js/nativeApi'

import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  data: function() {
    let channels = []

    if (nativeApi.isGGPlayPaySupported()) {
      channels.push('ggplay')
    } else {
      channels = nativeApi.isWechatPaySupport() ? ['wechat', 'alipay'] : ['alipay']
    }

    return {
      channels: channels,
      activeChannel: channels[0],
      goodsName: window.acsConfig.goods_name,
      price: (window.acsConfig.price / 100).toFixed(2),
      currency: window.acsConfig.currency,
    }
  },

  mounted: function() {
    if (this.$route.query.result) {
      nativeApi.closeWebviewWithResult({
        success: this.$route.query.result == "success",
        order_id: this.$route.query.out_trade_no,
        trade_no: this.$route.trade_no,
      })
    }
  },

  methods: {
    setActiveChannel: function(channel) {
      this.activeChannel = channel
    },

    onPurchaseByChannel: function() {
      switch (this.activeChannel) {
        case 'alipay':
          this.alipayRedirect()
          break;

        case 'wechat':
          this.wechatPay()
          break;

        case 'ggplay':
          nativeApi.closeWebviewWithResult({
            success: false,
            channel: 'ggplay',
            order_id: window.acsConfig.order_id,
            goods_id: window.acsConfig.goodsId,
          })
          break;
      }
    },

    alipayRedirect: async function() {
      let result = await this.$acs.alipayRedirect(window.acsConfig.order_id,
        `${window.location.protocol}//${window.location.hostname}${window.location.pathname}?merchant_order_id=${window.acsConfig.order_id}`,
        `${window.location.protocol}//${window.location.hostname}${window.location.pathname}`
      )
      window.location = result.redirect_uri
    },

    wechatPay: async function() {
      let result = await this.$acs.wechatPrepay(window.acsConfig.order_id)
      nativeApi.openWechatPay(JSON.stringify(result))
    }
  },
}
</script>