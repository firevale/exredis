<template>
  <div class="root-container">
    <transition>
      <router-view class="content-container flex-take-rest"> </router-view>
    </transition>
  </div>
</template>
<script>
import Vue from '../vue-installed'
import {
  mapGetters,
  mapActions
} from 'vuex'

import nativeApi from 'common/js/nativeApi'
import * as acs from 'common/js/acs'

export default {
  data: function() {
    return {
      inApp: window.acsConfig.inApp,
      canGoBack: false,
      showFooterBar: true,
    }
  },

  computed: {
    ...mapGetters([
      'transitionName',
    ]),
  },



  methods: {
    ...mapActions([
      'setTransitionName', 'setUserProfile'
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

    showPage: function(routerName) {
      acs.checkIsLogin(_ => {
        this.$router.push({
          name: routerName
        })
      })
    },
    closeFooter: function() {
      this.showFooterBar = false
    }
  },

  watch: {
    '$route' (to, from) {
      this.canGoBack = (history.state != null)
    }
  },
}
</script>