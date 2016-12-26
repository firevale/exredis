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

    methods: {

      onPurchaseByChannel: function(channel) {
        switch (channel) {
          case 'alipay':
            break;
        }
      },

      anonymousLogin: function() {

      }
    },
  }
</script>