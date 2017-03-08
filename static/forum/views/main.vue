<template>
<div class="tile is-ancestor is-vertical">
  <div class="tile is-child is-full stay-top title-bar">
    <span class="icon nav-icon icon-back"></span>
    <div class="top-title">
      {{forumInfo.title}}
    </div>
  </div>
  <transition :name="transitionName">
    <router-view> </router-view>
  </transition>
</div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import nativeApi from 'common/nativeApi'

export default {
  data: function() {
    return {
      canGoBack: false,
    }
  },

  created: function() {},

  computed: {
    ...mapGetters([
      'transitionName', 'forumInfo'
    ]),
  },

  methods: {
    ...mapActions([
      'setTransitionName'
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

<style lang="scss">@import "forum/scss/forum";</style>
