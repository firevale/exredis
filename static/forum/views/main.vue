<template>
<div class="tile is-ancestor is-vertical root-container">
  <div class="tile is-child is-full stay-top title-bar has-text-centered has-bottom-thick-line">
    <span v-show="canGoBack" class="icon nav-icon icon-back" @click.prevent="$router.back()"></span>
    <span class="icon nav-icon pull-right icon-close show-in-app" @click="onClose"></span>
    <h4 class="title is-4" style="font-weight: 400">{{forumInfo.title}}</h4>
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

import nativeApi from 'common/nativeApi'

export default {
  data: function() {
    return {
      canGoBack: true,
    }
  },

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
