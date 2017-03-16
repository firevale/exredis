<template>
<div class="tile is-ancestor is-vertical root-container">
  <div class="stay-top top-bar">
    <div class="title-bar">
      <h4 class="title is-4">{{forumInfo.title}}</h4>
    </div>
    <nav class="nav">
      <div class="nav-left has-text-left">
        <span v-show="canGoBack || inApp" class="icon image-icon icon-back" @click.prevent="onBtnBackClicked"></span>
      </div>
      <div class="nav-center">
      </div>
      <div class="nav-right has-text-right">
        <router-link v-if="$route.name == 'postList'" class="icon image-icon icon-search" :to="{name: 'search'}"></router-link>
        <a v-if="$route.name == 'postList'" class="icon image-icon icon-user" @click.prevent="showPage('personalPage')"></a>
        <a v-if="$route.name == 'postList'" class="button level-button is-info" @click.prevent="showPage('newPost')">{{$t('forum.postList.newPost')}}</a>
        <a v-if="$route.name == 'detail'" class="button level-button is-info" @click.prevent="showPage('newComment')">{{$t('forum.writeComment.btnTxt')}}</a>
      </div>
    </nav>
  </div>
  <transition :name="transitionName">
    <router-view class="content-container"> </router-view>
  </transition>
</div>
</template>

<script>

import 'quill/assets/snow.styl'
import 'quill/assets/core.styl'
import 'forum/scss/forum.scss'

import Vue from '../vue-installed'
import {
  mapGetters,
  mapActions
} from 'vuex'

import nativeApi from 'common/nativeApi'
import * as acs from 'common/acs'

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
    },

    showPage: function(routerName) {
      acs.checkIsLogin(_ => {
        this.$router.push({
          name: routerName
        })
      })
    }
  },

  watch: {
    '$route' (to, from) {
      this.canGoBack = (history.state != null)
    }
  },
}
</script>
