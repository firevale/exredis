<template>
<div class="tile is-ancestor is-vertical root-container">
  <div class="top-bar">
    <div class="title-bar">
      <h4 class="title is-4">{{$t('customerService.title')}}</h4>
    </div>
    <nav class="nav">
      <div class="nav-left has-text-left">
        <span v-show="canGoBack && inApp" class="icon image-icon icon-back" @click.prevent="onBtnBackClicked"></span>
      </div>
    </nav>
  </div>
  <div class="slider-nav">
    <div class="nav">
      <div class="nav-center">
        <a class="nav-item is-tab has-right-line" :class="{'is-active': type == 'myPosts'}" @click="switchMenu('myPosts')">{{ $t('customerService.commonIssues.title') }}</a>
        <a class="nav-item is-tab has-right-line" :class="{'is-active': type == 'myComments'}" @click="switchMenu('myComments')">{{ $t('customerService.contactService.title') }}</a>
        <a class="nav-item is-tab" :class="{'is-active': type == 'myFavor'}" @click="switchMenu('myFavor')">{{ $t('customerService.serviceRecord.title') }}</a>
        <div class="slider" :style="{'background-position':sliderPosition}"></div>
      </div>
    </div>
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
import 'forum/scss/transition.scss'

import Vue from '../../vue-installed'
import {
  mapGetters,
  mapActions
} from 'vuex'

import nativeApi from 'common/nativeApi'
import * as acs from 'common/acs'
import * as filter from 'common/keywordFilter'

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

  methods: {
    ...mapActions([
      'setTransitionName', 'updateForumInfo', 'updateKeyword', 'serUserProfile'
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