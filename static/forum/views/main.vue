<template>
  <div class="box is-ancestor is-parent is-vertical ">
    <div class="tile is-child columns">
      <span class="column is-3 ">
        <i class="fa fa-angle-left title is-2" aria-hidden="true"></i>
      </span>
      <span class="column is-6" style="margin-bottom: 0; text-align: center;">
        <span class="title is-3">游戏论坛</span>
      </span>
      <span class="column is-1">
        <i class="fa fa-search title is-4" aria-hidden="true"></i>
      </span>
      <span class="column is-1">
        <i class="fa fa-user title is-4" aria-hidden="true"></i>
      </span>
      <span class="column is-1">
        <a class="button">发帖</a>
      </span>
    </div>
    <hr></hr>
    <div class="tile is-chid">
      <div class="tile control">
        <a class="button is-active">全部</a>
        <a class="button">综合讨论</a>
        <a class="button">攻略心得</a>
        <a class="button">转帖分享</a>
        <a class="button">玩家原创</a>
        <a class="button">问题求助</a>
      </div>
      <div class="control">
        <span>发帖时间排序</span>
        <i class="fa fa-caret-down title is-2" aria-hidden="true" style="vertical-align: middle;"></i>
      </div>
    </div>
    
    <div class="box is-chid is-parent">
      <note-item></note-item>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import noteItem from '../components/noteItem.vue'

export default {
  components: {
    noteItem,    
  },

  beforeMount () {
    
  },

  
}
</script>
<style lang="scss">
  @import "../scss/forum";
</style>