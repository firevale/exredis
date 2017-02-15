<template>
  <div class="g-doc">
    <div ref="gCon" class="g-con">
      <span v-show="canGoBack" class="icon nav-icon icon-back show-in-app" @click.prevent="$router.back()">
      </span>
      <span class="icon nav-icon pull-right icon-close show-in-app" @click="onClose">
      </span>
      <div class="g-mask">
        <transition :name="transitionName">
          <router-view> </router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'

  import nativeApi from '../common/nativeApi'
  import 'payment/scss/payment.scss'

  export default {
    data: function() {
      return {
        canGoBack: false,
      }
    },

    created: function() {},

    computed: {
      ...mapGetters([
        'transitionName'
      ]),
    },

    methods: {
      ...mapActions([
        'setTransitionName'
      ]),

      onClose: function() {
        nativeApi.closeWebviewWithResult({success: false, message: "user cancel"})
      },
    },

    watch: {
      '$route' (to, from) {
        this.canGoBack = (history.state != null)
      }
    },
  }
</script>