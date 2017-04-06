<template>
  <div class="person">
    <nav class="nav">
      <div class="nav-center">
        <a class="nav-item is-tab has-right-line" :class="{'is-active': type == 'activity'}" @click="switchMenu('activity')">{{ $t('games.tab.activity') }}</a>
        <a class="nav-item is-tab has-right-line" :class="{'is-active': type == 'notice'}" @click="switchMenu('notice')">{{ $t('games.tab.notice') }}</a>
        <a class="nav-item is-tab" :class="{'is-active': type == 'news'}" @click="switchMenu('news')">{{ $t('games.tab.news') }}</a>
        <div class="slider" :style="{'background-position':sliderPosition}" />
      </div>
    </nav>
    <div class="content" style="position: absolute; top: 12rem;left: 0;right: 0; bottom: 0;">
      <div style="position: relative; height: 100%">
        <game-activity v-if="type == 'activity'"></game-activity>
        <game-notice v-if="type == 'notice'"></game-notice>
        <game-news v-if="type == 'news'"></game-news>
      </div>
    </div>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import gameActivity from "../../components/gameActivity"
import gameNotice from "../../components/gameNotice"
import gameNews from "../../components/gameNews"

export default {
  components: {
    gameActivity,
    gameNotice,
    gameNews,
  },

  computed: {
    sliderPosition() {
      switch (this.type) {
        case "activity":
          return "10% bottom"
        case "notice":
          return "50% bottom"
        case "news":
          return "90% bottom"
      }
    }
  },

  data() {
    return {
      type: 'activity',
    }
  },

  methods: {
    switchMenu: function(menu) {
      if (menu != this.type) {
        this.type = menu
        this.resetScroller();
      }
    },

    resetScroller: function() {
      if (this.$refs.scroller) {
        this.$refs.scroller.$emit('reset')
      }
    },
    
  },
}
</script>