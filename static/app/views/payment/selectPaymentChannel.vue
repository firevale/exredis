<template>
  <div class="login-box">
    <div class="row-login">
      <p class="title">{{ $t('payment.selectPaymentChannel') }}</p>
    </div>
    <div class="horizontal-stack-box">
      <div class="tile" v-for="channel in channels">
        <a class="sdk-icon" :class="channel + (activeChannel  == channel ? ' rotating' : '')" @click="onPurchaseByChannel(channel)">
        </a>
        <p>{{ $t(`payment.channel.${channel}`) }}</p>
      </div>
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
      channels = nativeApi.isWechatPaySupport() ? ['alipay', 'wechat'] : ['alipay']
    }

    return {
      channels: channels,
      activeChannel: null,
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
    onPurchaseByChannel: function(channel) {
      this.activeChannel = channel

      switch (channel) {
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
      this.activeChannel = null
      window.location = result.redirect_uri
    },

    wechatPay: async function() {
      let result = await this.$acs.wechatPrepay(window.acsConfig.order_id)
      this.activeChannel = null
      nativeApi.openWechatPay(JSON.stringify(result))
    }
  },
}
</script>