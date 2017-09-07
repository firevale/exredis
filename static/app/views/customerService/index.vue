<template>
  <div class="tile is-ancestor is-vertical root-container">
    <div class="top-bar flex-fixed-size">
      <div class="title-bar">
        <h4 class="title is-4">{{$t('customerService.title')}}</h4>
      </div>
      <nav class="nav">
        <div class="nav-left has-text-left">
          <span v-show="inApp" class="icon image-icon icon-back" @click.prevent="onBtnBackClicked"></span>
        </div>
      </nav>
    </div>
    <slider-nav class="flex-fixed-size" :menus="menus" :selectedValue="$route.name" @onSelect="switchMenu" ref="nav"></slider-nav>
    <transition>
      <router-view class="content-container customer-service flex-take-rest"> </router-view>
    </transition>
  </div>
</template>
<script>
import Vue from '../../vue-installed'
import {
  mapGetters,
  mapActions
} from 'vuex'

import sliderNav from '../../components/sliderNav'
import nativeApi from 'common/js/nativeApi'
import * as acs from 'common/js/acs'
import * as filter from 'common/js/keywordFilter'
import Toast from 'common/components/toast'

export default {
  components: {
    sliderNav
  },
  data: function() {
    return {
      inApp: window.acsConfig.inApp,
      canGoBack: false,
      menus: [{
          text: this.$t('customerService.commonIssues.title'),
          value: 'commonIssues'
        }, {
          text: this.$t('customerService.contactService.title'),
          value: 'contactService'
        },
        {
          text: this.$t('customerService.myService.title'),
          value: 'myService'
        }
      ]
    }

  },

  computed: {
    ...mapGetters([
      'transitionName',
    ]),
  },

  methods: {
    ...mapActions([
      'setTransitionName',  'setUserProfile'
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

    switchMenu: function(item, index) {
      this.$router.push({
        name: item.value
      })
    }
  },

  watch: {
    '$route' (to, from) {
      this.canGoBack = (history.state != null)
      this.$refs.nav.$emit('select',to.name)
    }
  },
}
</script>