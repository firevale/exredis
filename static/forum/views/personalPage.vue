<template>
<div class="is-ancestor is-parent is-vertical ">
  <div class="is-child fixed-top  row-line">
    <div class="arrow-back">
      <i class="fa fa-angle-left title is-2 dark" aria-hidden="true" @click="$router.go(-1)"></i>
    </div>
    <div class="row-line top-title">
      {{ $t('forum.personal.title') }}
    </div>
  </div>
  <div class="scroll-box">
    <div class="row-line content-item">
      <div class="column-line" style="margin-left: 1rem;">
        <figure class="image is-64x64" style="margin: auto;border-radius:50%;border: 1px solid;overflow: hidden;">
          <img :src="personal.portrait"></img>
        </figure>
        <div class="title is-6 txt-center olive" style="margin-top: 1rem; margin-bottom: .5rem;">{{personal.level}}</div>
      </div>
      <div class="column-line" style="flex: 1;text-align: left;margin: 0 3rem;">
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
    <div class="is-child  row-menu">
      <div class="service-menu" :class="{'menu-selected': type=='myNote'}" @click="type='myNote'">
        <span>{{ $t('forum.personal.myNote') }}</span>
        <span v-show="personal.myNotes.length" class="note-count">{{ personal.myNotes.length }}</span>
      </div>
      <div class="service-menu" :class="{'menu-selected': type=='myReply'}" @click="type='myReply'">
        <span>{{ $t('forum.personal.myReply') }}</span>
      </div>
      <div class="service-menu" :class="{'menu-selected': type=='myFavor'}" @click="type='myFavor'">
        <span>{{ $t('forum.personal.myFavor') }}</span>
      </div>
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
        })
        .then(response => {
          //this.noteList = response.json()
          //this.setNotePageCount(this.noteList.length)
          //this.setNoteCurrentPage(page)
        })
        .then(result => {
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
