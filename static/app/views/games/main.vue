<template>
  <div class="tile is-ancestor is-vertical root-container games">
    <span class="icon image-icon icon-close" @click="onBtnBackClicked"></span>
    <slider-nav class="flex-fixed-size" :menus="menus" @onSelect="switchMenu">
    </slider-nav>
    <div class="flex-take-rest" style="position: relative">
      <transition :name="transitionName">
        <router-view> </router-view>
      </transition>
    </div>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import nativeApi from 'common/js/nativeApi'
import sliderNav from '../../components/sliderNav'

export default {
  data: function() {
    return {
      inApp: window.acsConfig.inApp,
      canGoBack: false,
      currentTab: "activity",
      menus: [{
        text: this.$t('games.tab.activity'),
        value: 'activity'
      }, {
        text: this.$t('games.tab.notice'),
        value: 'notice'
      }, {
        text: this.$t('games.tab.news'),
        value: 'news'
      }],
    }
  },

  computed: {
    ...mapGetters([
      'transitionName'
    ]),
  },

  methods: {
    ...mapActions([
      'setTransitionName'
    ]),

    switchMenu: function(menu) {
      if (menu.value != this.currentTab) {
        this.currentTab = menu.value
        this.$router.replace({
          path: `/games/${this.$route.params.app_id}/${menu.value}`
        })
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

  components: {
    sliderNav
  }
}
</script>
<style lang="scss">
.games .icon-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 99;
}
</style>