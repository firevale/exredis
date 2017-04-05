<template>
  <div class="person">
    <nav class="nav">
      <div class="nav-center">
        <a class="nav-item is-tab has-right-line" :class="{'is-active': type == 'myPosts'}" @click="switchMenu('myPosts')">{{ $t('forum.personal.myPosts') }}</a>
        <a class="nav-item is-tab has-right-line" :class="{'is-active': type == 'myComments'}" @click="switchMenu('myComments')">{{ $t('forum.personal.myComments') }}</a>
        <a class="nav-item is-tab" :class="{'is-active': type == 'myFavor'}" @click="switchMenu('myFavor')">{{ $t('forum.personal.myFavor') }}</a>
        <div class="slider" :style="{'background-position':sliderPosition}"/>
      </div>
    </nav>
    <div class="content" style="position: absolute; top: 12rem;left: 0;right: 0; bottom: 0;">
      <div style="position: relative; height: 100%">
        <scroller :on-load-more="loadmore" ref="scroller">
          <game-activity v-if="type == 'activity'" v-for="(item, index) in activityList" :key="item.id" :item-data="item" :item-index="index"></game-activity>
          <game-notice v-if="type == 'notice'" v-for="item in noticeList" :key="item.id" :item-data="item"></game-notice>
          <game-news v-if="type == 'news'" v-for="(item, index) in newsList" :key="item.id" :item-data="item" :item-index="index"></game-news>
       </scroller>
      </div>
    </div>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import scroller from '../../components/scroller'
import gameActivity from "../../components/gameActivity"
import gameNotice from "../../components/gameNotice"
import gameNews from "../../components/gameNews"

export default {
  components: {
    scroller,
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
      activityList: [],
      noticeList: [],
      newsList: [],
      page: 0,
      total: 1,
      recordsPerPage: 10,
      postRecords: 0
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
      this.page = 0
      this.total = 1
      this.postList = []
      this.commentList = []
      this.favoriteList = []
      if (this.$refs.scroller) {
        this.$refs.scroller.$emit('reset')
      }
    },

    loadmore: async function() {
      let result = await this.$acs.getPagedNews(app_id, this.type, this.page + 1, this.recordsPerPage)

      if (result.success) {
        switch (this.type) {
          case "activity":
            this.activityList = this.page == 0 ? result.news : this.activityList.concat(result.news)
          case "notice":
            this.noticeList = this.page == 0 ? result.news : this.noticeList.concat(result.news)
          case "news":
            this.newsList = this.page == 0 ? result.news : this.newsList.concat(result.news)
        }
        
        this.total = result.total
        this.page = this.page + 1

        if (this.$refs.scroller && this.page >= this.total) {
          this.$refs.scroller.$emit('all-loaded')
        }
      }
    },

  },
}
</script>