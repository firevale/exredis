<template>
  <div class="root-container">
    <nav class="header level is-mobile is-marginless">
      <div class="level-item">
      </div>
      <div class="level-item">
        <router-link class="icon icon-jqxs" :to="{name: 'index'}"></router-link>
      </div>
      <div class="level-item is-menu menu-right">
        <router-link class="menu icon icon-user" :to="{name: 'myProfile'}"></router-link>
        <router-link class="menu icon icon-search" :to="{name: 'search'}"></router-link>
      </div>
    </nav>
    <transition :name="transitionName">
      <router-view class="content-container flex-take-rest"> </router-view>
    </transition>
  </div>
</template>
<script>
import Vue from '../../vue-installed'
import {
  mapGetters,
  mapActions
} from 'vuex'

import nativeApi from 'common/js/nativeApi'
import * as acs from 'common/js/acs'
import * as filter from 'common/js/keywordFilter'

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
      let result = await Vue.axios.post('/forum_actions/get_forum_info_with_keyword', {
        forum_id: to.params.forumId
      }).then(response => response.data)

      if (result.success) {
        next(vm => {
          vm.updateForumInfo(result.forum)
          filter.init(result.keyword)

          if (window.acsConfig.user) {
            vm.setUserProfile(window.acsConfig.user)
          }
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
      'setTransitionName', 'updateForumInfo', 'updateKeyword', 'setUserProfile'
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