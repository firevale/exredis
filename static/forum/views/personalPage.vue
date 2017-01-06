<template>
  <div class="is-ancestor is-parent is-vertical ">
    <div class="is-child content-item rowLine">
      <div class="arrow-back">
        <i class="fa fa-angle-left title is-2 dark" aria-hidden="true" @click="$router.go(-1)"></i>
      </div>
      <div class="search-title">
        {{ $t('forum.personal.title') }}
      </div>
    </div>
    <div class="horizontal-seprate"></div>
    <div class="rowLine content-item">
      <div class="columnLine">
        <figure class="image is-64x64" style="margin: auto;border-radius:50%;border: 1px solid;overflow: hidden;">
          <img :src="personal.portrait"></img>
        </figure>
        <div class="title is-6 txt-center olive" style="margin-top: 1rem; margin-bottom: .5rem;">{{personal.level}}</div>
      </div>
      <div class="columnLine" style="flex: 1;text-align: left;margin: 0 3rem;">
        <div>
          {{ $t('forum.personal.nickName') }}
          <span>{{ personal.name }}</span>
        </div>
        <div>
          {{ $t('forum.personal.noteCount') }}
          <span>{{ personal.sentNoteCount }}</span>
        </div>
        <div>
          {{ $t('forum.personal.registerTime') }}
          <span>{{ personal.registerTime }}</span>
        </div>
      </div>
      <div>
      </div>
    </div>
    <div class="horizontal-seprate"></div>
    <div class="is-chid  row-menu">
      <div class="service-menu" :class="{'menu-selected': type=='myNote'}" @click="type='myNote'">{{ $t('forum.personal.myNote') }}</div>
      <div class="service-menu" :class="{'menu-selected': type=='myReply'}" @click="type='myReply'">{{ $t('forum.personal.myReply') }}</div>
      <div class="service-menu" :class="{'menu-selected': type=='myFavor'}" @click="type='myFavor'">{{ $t('forum.personal.myFavor') }}</div>
    </div>
    <div class="horizontal-seprate">
      <div :class="{'move-box-left': type=='myNote','move-box-center': type=='myReply','move-box-right': type=='myFavor'}">
        <div class="arrow-down"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        type: 'myNote',
        personal: {
          id: 100,
          portrait: 'https://assets.servedby-buysellads.com/p/manage/asset/id/28536',
          level: 'LV1烟雨游友',
          name: '火谷测试',
          sentNoteCount: 121,
          registerTime: '2015-8-18 16:09',
          myNote: [{
            noteId: '',
            headerTag:[
              {name: '置顶', bgColor: '#f00', color: '#fff'},
              ],
            title: '【游戏攻略】新手练级指南',
            hasPicture: true,
            tailTag:[
              {name: '精', bgColor: '#ff0', color: '#fff', isTag: true},
              {name: 'HOT', bgColor: '#f00', color: '#fff'},
            ],
            author: '火谷测试',
            time: '2分钟前',
            noteCount: '2/11',
        },],
          myReply: [{
            noteId: '',
            headerTag:[
              {name: '置顶', bgColor: '#f00', color: '#fff'},
              ],
            title: '【游戏攻略】新手练级指南',
            hasPicture: true,
            tailTag:[
              {name: '精', bgColor: '#ff0', color: '#fff', isTag: true},
              {name: 'HOT', bgColor: '#f00', color: '#fff'},
            ],
            author: '火谷测试',
            time: '2分钟前',
            noteCount: '2/11',
        },],
          myFavor: [{
            noteId: '',
            headerTag:[
              {name: '置顶', bgColor: '#f00', color: '#fff'},
              ],
            title: '【游戏攻略】新手练级指南',
            hasPicture: true,
            tailTag:[
              {name: '精', bgColor: '#ff0', color: '#fff', isTag: true},
              {name: 'HOT', bgColor: '#f00', color: '#fff'},
            ],
            author: '火谷测试',
            time: '2分钟前',
            noteCount: '2/11',
        },],
        },
      }
    },

  }
</script>
<style lang="scss">
  @import "../scss/color";
  .row-menu {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    position: relative;
    justify-content: space-around;
    font-size: 1.3rem;
    margin: .5rem 1rem;
    .service-menu{
      font-size: 1rem;
    }
  }
  
  .horizontal-seprate {
    height: .3rem;
    margin: .2rem 1rem;
    background-color: $text-grey;
    .move-box-left {
      height: 100%;
      background-color: $link;
      width: 16.66%;
      margin-left: 8.4%;
      transition: margin 1s ease;
    }
    .move-box-center {
      height: 100%;
      background-color: $link;
      width: 16.66%;
      margin-left: 41.6%;
      transition: margin 1s ease;
    }
    .move-box-right {
      height: 100%;
      background-color: $link;
      width: 16.66%;
      margin-left: 74.9%;
      transition: margin 1s ease;
    }
    .arrow-down {
      height: .4rem;
      width: .4rem;
      border: .5rem solid transparent;
      border-top: .7rem solid $link;
      margin: 0 auto;
    }
  }
</style>