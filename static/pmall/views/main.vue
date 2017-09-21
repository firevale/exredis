<template>
  <div class="root-container">
    <div class="loading bg-full bg-loading" v-show="loading"></div>
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
import axios from 'axios'

export default {
  data: function() {
    return {
      loading: false,
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
    this.initProgress()
    await this.getUserInfo()
  },
  methods: {
    ...mapActions([
      'setTransitionName', 'setWcpUser', 'setUserPoints'
    ]),
    initProgress() {
      axios.interceptors.request.use(config => {
        this.loading = true
        return config
      }, error => {
        return Promise.reject(error)
      })

      axios.interceptors.response.use(response => {
        this.loading = false
        return response
      }, error => {
        if (!axios.isCancel(error)) {
          this.loading = false
        }
        return Promise.reject(error)
      })
    },
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