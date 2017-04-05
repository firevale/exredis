<template>
  <div class="tile is-ancestor is-vertical root-container">
    <div class="top-bar">
      <div class="title-bar">
        <h4 class="title is-4">{{ $t('games.title') }}</h4>
      </div>
    </div>
    <transition :name="transitionName">
      <router-view class="content-container games"> </router-view>
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

export default {
  data: function() {
    return {
      inApp: window.acsConfig.inApp,
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

  }
}
</script>