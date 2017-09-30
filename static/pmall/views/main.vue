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
  beforeRouteEnter: function(to, from, next) {
    if (window.acsConfig.user.user_id || to.name == 'bind_mobile') {
      next()
    } else {
      next({
        name: 'bind_mobile',
        params: { ...to.params,
          back: to
        }
      })
    }
  },
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
    showProgress() {
      return this.$route.name != 'draw'
    }
  },

  async mounted() {
    this.initProgress()
    this.setWcpUser(window.acsConfig.user)
    this.setUserPoints(window.acsConfig.user.points)
  },
  methods: {
    ...mapActions([
      'setTransitionName', 'setWcpUser', 'setUserPoints'
    ]),
    initProgress() {
      axios.interceptors.request.use(config => {
        this.loading = this.showProgress && true
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