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
    <div ref="msg">
    </div>
  </div>
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
      canGoBack: false,
    }
  },

  created: function() {
    if (this.$route.query.redirect_uri) {
      this.setRedirectUri(atob(this.$route.query.redirect_uri))
    }
  },

  computed: {
    ...mapGetters([
      'transitionName'
    ]),
  },

  methods: {
    ...mapActions([
      'setTransitionName', 'setRedirectUri'
    ]),

    onClose: function() {
      nativeApi.closeWebviewWithResult({
        success: false
      })
    },
  },

  watch: {
    '$route' (to, from) {
      this.canGoBack = (history.state != null)
    }
  },
}
</script>

<style lang="scss">@import 'login/scss/login'</style>
