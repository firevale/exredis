<template>
<div class="tile is-ancestor is-vertical root-container">
  <div class="level is-full stay-top title-bar has-text-centered has-bottom-thick-line">
    <span v-show="canGoBack" class="icon nav-icon icon-back" @click.prevent="$router.back()"></span>
    <span class="icon nav-icon pull-right icon-close show-in-app" @click="onClose"></span>
    <h4 class="level-item title is-4" style="font-weight: 400">{{forumInfo.title}}</h4>
  </div>
  <transition :name="transitionName">
    <router-view class="content-container"> </router-view>
  </transition>
</div>
</template>

<script>
import Vue from '../vue-installed'
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

  computed: {
    ...mapGetters([
      'transitionName', 'forumInfo'
    ]),
  },

  beforeRouteEnter: async function(to, from, next) {
    try {
      let response = await Vue.http.post('/forum_actions/get_forum_info', {
        forum_id: to.params.forumId
      })
      let result = await response.json()

      if (result.success) {
        next(vm => {
          vm.updateForumInfo(result.forum)
        })
      } else {
        next({name: 'error'})
      }
    } catch (_) {
      next({name: 'error'})
    }
  },

  methods: {
    ...mapActions([
      'setTransitionName', 'updateForumInfo'
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
