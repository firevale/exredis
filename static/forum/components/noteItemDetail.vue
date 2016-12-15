<template>
  <div class="note-item">
    <div class="columns">
      <div class="column is-2">
        <figure class="image is-64x64" style="margin: auto;border-radius:50%;border: 1px solid;overflow: hidden;">
          <img src="http://placehold.it/64x64"></img>
        </figure>
        <div class="title is-6 txt-center">LV1. 烟雨游友</div>
        <div class="title is-5 txt-center">楼主</div>
      </div>
      <div class="column is-10 ">
        <div class="columns">
          <div class="column is-10 title is-5" style="margin-top: 1rem;">
            【游戏攻略】指南攻略新手练级指南
          </div>
          <div class="column is-2 txt-right" style="margin-top: 1rem; text-align: right;padding-right: 0;"> 
            <span class="follow-btn">只看楼主</span>
          </div>
        </div>
        <div class="column detail-info">
          <span class="note-time">2016-10-10 17:56:20</span>
          <span class="note-author">火谷测试</span>
        </div>
        <div class="column detail-imgs">
          <figure class="image is-128x128">
            <img src="http://placehold.it/256x256"></img>
          </figure>
        </div>
        <div class="column">
          一级技能解析：【香气迎人】普通技能， 造成100%伤害。点评：普通攻击没亮点<br>
          1.鸡肋技能<br>
          2.但随等级提高伤害增加。
        </div>
        <div class="column pointer" style="margin-top: 1rem;">
          <i class="fa fa-heart" style="vertical-align: middle;"></i>
          <span>收藏该帖</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    props:{
      itemData:{
        type: Object,
        default: null,
      },
    },
    computed: {
      
    },
  }
</script>
<style lang="scss">
  @import "../scss/color";
  .follow-btn{
    padding: .2rem;
    cursor: pointer;
    background-color: $link;
  }
</style>