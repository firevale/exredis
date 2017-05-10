<template>
  <div class="tile is-ancestor is-vertical root-container games">
    <span v-if="inApp" class="icon image-icon icon-back" @click="onBtnBackClicked"></span>
    <span v-if="inApp" class="icon image-icon icon-close" @click="onBtnCloseClicked"></span>
    <slider-nav class="flex-fixed-size" :menus="menus" @onSelect="switchMenu" ref="nav">
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
        this.$router.push({
          path: `/games/${this.$route.params.app_id}/${menu.value}`
        })
      }
    },

    onBtnBackClicked: function() {
      this.$router.back()
    },

    onBtnCloseClicked: function() {
      nativeApi.closeWebviewWithResult({
        success: false
      })
    },
  },

  watch: {
    '$route' (to, from) {
      this.canGoBack = (history.state != null)
      switch(to.name) {
        case 'gameActivity':
          this.$refs.nav && this.$refs.nav.$emit('select', 'activity')
          this.currentTab = 'activity'
          break;
        case 'gameNotice':
          this.$refs.nav && this.$refs.nav.$emit('select', 'notice')
          this.currentTab = 'notice'
          break;
        case 'gameNews':
          this.$refs.nav && this.$refs.nav.$emit('select', 'news')
          this.currentTab = 'news'
          break;
      }
    }
  },

  components: {
    sliderNav
  }
}
</script>
<style lang="scss">
.games {
  .icon.icon-close,
  .icon.icon-back {
    position: absolute;
    top: 1.5rem;
    z-index: 99;
  }

  .icon.icon-close {
    right: 1rem;
  }

  .icon.icon-back {
    left: 1rem;
  }
}
</style>