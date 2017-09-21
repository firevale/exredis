<template>
  <div class="tile is-ancestor is-vertical root-container payment-page">
    <div class="top-bar">
      <div class="title-bar">
        <h4 class="title is-4">{{$t('payment.paymentTitle')}}</h4>
      </div>
      <nav class="nav">
        <div class="nav-left has-text-left">
          <span v-show="inApp" class="icon image-icon icon-back" @click="onBtnBackClicked"></span>
        </div>
      </nav>
    </div>
    <transition :name="transitionName">
      <router-view class="content-container"> </router-view>
    </transition>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import nativeApi from 'common/js/nativeApi'

export default {
  data: function() {
    return {
      inApp: window.acsConfig.inApp,
      canGoBack: false,
    }
  },

  created: function() {
    if (window.acsConfig.order_status == 0 || window.acsConfig.order_status == 2) {
      nativeApi.closeWebviewWithResult({
        success: false
      })      
    }
  },

  computed: {
    ...mapGetters([
      'transitionName'
    ]),
  },

  methods: {
    ...mapActions([
      'setTransitionName'
    ]),

    onBtnBackClicked: function() {
      if (this.canGoBack) {
        this.$router.back()
      } else if (this.inApp) {
        nativeApi.closeWebviewWithResult({
          success: false
        })
      }
    },
  },

  watch: {
    '$route' (to, from) {
      this.canGoBack = (history.state != null)
    }
  },
}
</script>