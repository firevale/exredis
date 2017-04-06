<template>
  <div class="person">
    <slider-nav :menus="menus" :onSelect="switchMenu"></slider-nav>
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

import sliderNav from '../../components/sliderNav'
import gameActivity from "../../components/gameActivity"
import gameNotice from "../../components/gameNotice"
import gameNews from "../../components/gameNews"

export default {
  components: {
    gameActivity,
    gameNotice,
    gameNews,
    sliderNav,
  },

  data() {
    return {
      type: "activity",
      menus: [{
          text: this.$t('games.tab.activity'),
          value: 'activity'
        }, {
          text: this.$t('games.tab.notice'),
          value: 'notice'
        },
        {
          text: this.$t('games.tab.news'),
          value: 'news'
        }
      ]
    }
  },

  methods: {
    switchMenu: function(menu) {
      if (menu != this.type) {
        this.type = menu.value
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