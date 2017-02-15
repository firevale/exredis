<template>
  <div class="login-box">
    <div class="row-login">
      <p class="title">{{ $t('payment.selectPaymentChannel') }}</p>
    </div>
    <div class="horizontal-stack-box">
      <div class="tile" v-for="channel in channels">
        <a class="sdk-icon" :class="channel + (processing ? ' rotating' : '')" @click="onPurchaseByChannel(channel)"> </a>
        <p>{{ $t(`payment.channel.${channel}`) }}</p>
      </div>
    </div>
  </div>

</template>
<script>
  import utils from '../common/utils'
  import nativeApi from '../common/nativeApi'
  import {
    mapGetters,
    mapActions
  } from 'vuex'

  export default {
    data: function() {
      return {
        channels: ['alipay'],
        processing: false,
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
        switch (channel) {
          case 'alipay':
            this.alipayRedirect()
            break;
        }
      },

      alipayRedirect: function() {
        this.processing = true
        this.$http({
          method: 'post',
          url: '/api/alipay/redirect',
          params: {
            payment_order_id: window.acsConfig.order_id,
            merchant_url: `${window.location.protocol}//${window.location.hostname}${window.location.pathname}?merchant_order_id=${window.acsConfig.order_id}`,
            callback_url: `${window.location.protocol}//${window.location.hostname}${window.location.pathname}`,
          }
        }).then(response => {
          this.processing = false
          return response.json()
        }).then(result => {
          if (result.success) {
            window.location = result.redirect_uri
          } else {
            nativeApi.closeWebviewWithResult({success: false, message: 'something went wrong'})
          }
        }).catch(e => {
          console.error(e)
          this.processing = false
          nativeApi.closeWebviewWithResult({success: false, message: 'something went wrong'})
        })
      }
    },
  }
</script>