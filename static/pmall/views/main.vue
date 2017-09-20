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

  async mounted() {
    await this.getUserInfo()
  },
  methods: {
    ...mapActions([
      'setTransitionName', 'setWcpUser','setUserPoints'
    ]),
    async getUserInfo() {
      let result = await this.$acs.getUserInfo()
      if (result.success) {
        this.setWcpUser(result.wcp_user)
        this.setUserPoints(result.wcp_user.points)
      }
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
  },

  watch: {
    '$route' (to, from) {
      this.canGoBack = (history.state != null)
    }
  },
}
</script>