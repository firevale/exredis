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
      <div class="columnLine" style="margin-left: 1rem;">
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
    <div class="content-item" v-show="type == 'myNote'">
      <my-note v-for="item in personal.myNotes" :item-data="item"></my-note>
    </div>
    <div class="content-item" v-show="type == 'myReply'">
      <my-reply v-for="item in personal.myReplys" :item-data="item"></my-reply>
    </div>
    <div class="content-item" v-show="type == 'myFavor'">
      <my-favorate v-for="item in personal.myFavors" :item-data="item"></my-favorate>
    </div>
    <div class="column is-full" v-show="notePageCount > 1">
      <pagination ref="pag" @switch-page="loadListByPage" :page-count="notePageCount" :current-page="noteCurrentPage"></pagination>
    </div>
  </div>
</template>
<script>
  import myNote from "../components/myNote"
  import myFavorate from "../components/myFavorate"
  import myReply from "../components/myReply"
  import pagination from "../components/pagination"
  export default {
    data() {
      return {
        noteLoadUrl: 'http://firevale.com',
        notePageCount: 6,
        noteCurrentPage: 1,
        type: 'myReply',
        personal: {
          id: 100,
          portrait: 'https://assets.servedby-buysellads.com/p/manage/asset/id/28536',
          level: 'LV1烟雨游友',
          name: '火谷测试',
          sentNoteCount: 121,
          registerTime: '2015-8-18 16:09',
          myNotes: [{
            noteId: '',
            title: '[游戏攻略]新手练级指南',
            newReply: true,
            author: '火谷测试',
            time: '2分钟前',
            noteCount: '2/11',
          }, {
            noteId: '',
            title: '[游戏攻略]新手练级指南',
            newReply: false,
            author: '火谷测试',
            time: '2分钟前',
            noteCount: '2/11',
          }, ],
          myReplys: [{
            noteId: '',
            title: '[游戏攻略]新手练级指南',
            content: '好文章，收藏了。',
            author: '火谷测试',
            time: '2016-12-08 18:09:19',
            noteCount: '2/11',
          }, ],
          myFavors: [{
            noteId: '',
            title: '[游戏攻略]新手练级指南收藏',
            author: '火谷测试',
            time: '2016-10-30 16:02:23',
            noteCount: '20/101',
          }, ],
        },
      }
    },
    methods: {
      loadListByPage(page) {
        this.$http({
          method: 'post',
          url: this.noteLoadUrl,
          params: {
            page: page,
            type: this.type,
          }
        }).then(response => {
          //this.noteList = response.json()
          //this.setNotePageCount(this.noteList.length)
          //this.setNoteCurrentPage(page)
        }).then(result => {
          if (result.success) {
            this.setNoteCurrentPage(page);
          } else {

          }
        })
      }
    },
    components: {
      myNote,
      myFavorate,
      pagination,
      myReply,
    }
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
    .service-menu {
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