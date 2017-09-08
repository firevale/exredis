<template>
  <div class="common-page">
    <div class="card has-divider">
      <div class="card-content">
        <div class="comp-author-info">
          <i class="icon icon-head-portrait" />
          <div class="item-left">
            <p class="title">
              昵称：firevale</p>
            <p class="title">
              ID：10238988323</p>
            <p class="title">
              等级：LV.1烟雨悠悠</p>
          </div>
          <div class="item-right has-text-top">
            <p class="title">
              <router-link class="button is-primary is-thickness has-radius" :to="{name: 'editResident'}"><small>个人资料</small></router-link>
            </p>
            <p class="title">
              <router-link class="button is-primary is-thickness has-radius" :to="{name: 'editResident'}"><small>我的消息</small></router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
    <slider-nav class="has-divider" :menus="menus" @onSelect="switchMenu" ref="nav"></slider-nav>
    <div class="card has-divider">
      <div class="card-content">
        <div v-for="n in 15" class="article">
          <div class="comp-author-info">
            <div class="item-left">
              <p class="title is-ellipsis">
                <strong>[综合讨论]</strong> 如何评价 LPL 夏季总决赛 EDG vs RNG 3:2 胜利？
              </p>
              <p class="subtitle">
                为什么猪女会这么打？ 第一个原因
              </p>
            </div>
            <p class="item-right  has-text-bottom">
              <i class="icon icon-remove" /><small><strong>删除</strong></small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import Vue from 'vue'
import sliderNav from '../../components/sliderNav'

export default {
  components: {
    sliderNav
  },
  data() {
    return {
      menus: window.acsConfig.isAdmin == true ? [{
          text: this.$t('forum.personal.myPosts'),
          value: 'myPosts'
        }, {
          text: this.$t('forum.personal.myComments'),
          value: 'myComments'
        },
        {
          text: this.$t('forum.personal.myFavor'),
          value: 'myFavor'
        },
        {
          text: this.$t('forum.personal.myBan'),
          value: 'myBan'
        }
      ] : [{
          text: this.$t('forum.personal.myPosts'),
          value: 'myPosts'
        }, {
          text: this.$t('forum.personal.myComments'),
          value: 'myComments'
        },
        {
          text: this.$t('forum.personal.myFavor'),
          value: 'myFavor'
        }
      ]
    }
  },

}
</script>