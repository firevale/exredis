<template>
  <div class="is-ancestor is-parent is-vertical ">
    <div class="is-child fixed-top" style="display: flex; flex-direction: row;">
      <div style="text-align: left;">
        <i class="fa fa-angle-left title is-2 dark" aria-hidden="true" @click="$router.push({name:'forum'})"></i>
      </div>
      <div class="search-title">
        {{ $t('forum.detail.title') }}
      </div>
      
        <input type="button" class="reply-btn" :value="$t('forum.detail.replyBtn')" @click="replyNote"></input>
      
    </div>
    <div ref="scrollBox" class="is-chid scroll-box" @scroll="onScroll">
      <note-item-detail v-for="item in detailList" :item-data="item"></note-item-detail>
      <div v-if="detailList&&detailList.length" class="column is-full" v-show="searchPageCount > 1">
        <pagination ref="pag" :page-count="searchPageCount" :current-page="searchCurrentPage"></pagination>
      </div>
    </div>
    <div v-show="canBackTop" class="backTop" @click="onBackTop">
      <i class="fa fa-caret-up" aria-hidden="true"></i> {{ $t('forum.detail.goBack') }}
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import noteItemDetail from '../components/noteItemDetail.vue'
import menuModal from '../components/menuModal'
import pagination from '../components/pagination.vue'
export default {
  components: {
    noteItemDetail,
    pagination,
  },
  computed:{
    noteId(){
      return this.$router.currentRoute.params.id
    },
    canBackTop(){
      return this.scrollPosition>0
    }
  },
  data() {
    return {
      scrollPosition: 0,
      searchPageCount: 10,
      searchCurrentPage: 1,
      detailList:[
        {level: 'LV1. 烟雨游友', rank: '楼主', portrait: 'http://img0.imgtn.bdimg.com/it/u=968493712,3702984510&fm=23&gp=0.jpg', 
        collection: true, title: '[游戏攻略] 游戏攻略-奶妈培养推荐-蝴蝶精分析-御魂攻略', 
        time: '2016-10-10 17:56:16', author: '火谷测试',
        img: [{src:'http://img2.imgtn.bdimg.com/it/u=1739151439,314609329&fm=21&gp=0.jpg'},
        {src:'http://img1.imgtn.bdimg.com/it/u=2263497983,1623296276&fm=21&gp=0.jpg'}],
        description: '一级技能解析：【香气迎人】普通技能， 造成100%伤害。点评：普通攻击没亮点<br>1.鸡肋技能<br>2.但随等级提高伤害增加。',
        },
        {level: 'LV3. 妙语书生', rank: '沙发', 
        title: '', 
        time: '2016-10-10 18:56:26', author: '火谷测试',
        img: [{src:'http://img2.imgtn.bdimg.com/it/u=1739151439,314609329&fm=21&gp=0.jpg'},],
        description: '谢谢楼主分享',},
        {level: 'LV2. 杏坛小葩', rank: '板凳', 
        title: '', 
        time: '2016-10-10 19:36:46', author: '火谷测试',
        img: [],
        description: '抢沙发',},
      ],
    }
  },

  methods: {
    loadNoteDetail(page){
      this.$http({
        method: 'post',
        url: '/detail?id='+this.noteId+'page='+page,
        params: {
          
        }
      }).then(response => {
        //this.noteList = response.json()
      }).then(result => {
        if (result.success) {
          this.setSearchCurrentPage(page);
        } else {
          
        }
      })
    },

    replyNote(){
      this.$router.push({name:'replyNote',params: {id: this.noteId, title: this.detailList[0].title} })
    },

    onBackTop(){
      this.$refs.scrollBox.scrollTop=0;
    },

    onScroll(e){
      this.scrollPosition = e.target.scrollTop
    },
  }
}
</script>
