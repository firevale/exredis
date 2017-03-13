<template>
<div class="tile is-ancestor is-vertical root-container">
  <div class="stay-top top-bar">
    <div class="title-bar has-text-centered">
      <h4 class="title is-4" style="font-weight: 400">{{forumInfo.title}}</h4>
    </div>
    <div class="level is-mobile">
      <div class="level-item level-left has-text-left">
        <span v-show="canGoBack || inApp" class="icon image-icon icon-back" @click.prevent="onBtnBackClicked"></span>
      </div>
      <div class="level-item level-right has-text-right">
        <router-link v-show="$route.name == 'postList'" class="level-item icon image-icon icon-search" :to="{name: 'search'}"></router-link>
        <router-link v-show="$route.name == 'postList'" class="level-item icon image-icon icon-user" :to="{name: 'personalPage'}"></router-link>
        <router-link v-show="$route.name == 'postList'" class="level-item button level-button is-info" :to="{name: 'newPost', params:{forumId: forumInfo.id}}">{{$t('forum.postList.newPost')}}</router-link>
      </div>
    </div>
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
      inApp: window.acsConfig.inApp,
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
        next({
          name: 'error'
        })
      }
    } catch (_) {
      next({
        name: 'error'
      })
    }
  },

  methods: {
    ...mapActions([
      'setTransitionName', 'updateForumInfo'
    ]),

    onBtnBackClicked: function() {
      if (this.canGoBack) {
        this.$router.back()
      } else if (this.inApp) {
        nativeApi.closeWebviewWithResult({
          success: false
        })
      }
    }
  },

  watch: {
    '$route' (to, from) {
      this.canGoBack = (history.state != null)
    }
  },
}
</script>

<style lang="scss">@import "forum/scss/forum";</style>
