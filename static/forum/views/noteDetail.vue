<template>
  <div class="is-ancestor is-parent is-vertical">
    <div class="is-child fixed-top row-line">
      <div class="arrow-back">
        <i class="fa fa-angle-left title is-2 dark" aria-hidden="true" @click="$router.go(-1)"></i>
      </div>
      <div class="row-line top-title" style="font-weight: bold;">
        {{ $t('forum.detail.title') }}
      </div>
      <input type="button" class="reply-btn" :value="$t('forum.detail.replyBtn')" @click="replyNote"></input>
    </div>
    <div ref="scrollBox" class="is-chid scroll-box" @scroll="onScroll" style="padding: 0 .5rem 0 .5rem;">
      <note-item-detail v-for="item,index in displayList" @toggle-floorHost="toggleFloorHost" :item-data="item" :item-index="index"></note-item-detail>
      <div v-if="displayList&&displayList.length" class="column is-full" style="padding-right: 0;padding-left: 0;" v-show="searchPageCount > 1">
        <pagination ref="pag" :page-count="searchPageCount" :current-page="searchCurrentPage" @switch-page="freshListByPage"></pagination>
      </div>
    </div>
    <div v-show="canBackTop" class="back-top" @click="onBackTop">
      <i class="fa fa-caret-up" aria-hidden="true"></i> {{ $t('forum.detail.goBack') }}
    </div>
  </div>
</template>
<script>
  import noteItemDetail from '../components/noteItemDetail.vue'
  import menuModal from '../components/menuModal'
  import pagination from '../components/pagination.vue'
  
  export default {
    mounted () {
      this.displayList = this.detailList.slice(0)
    },

    components: {
      noteItemDetail,
      pagination,
    },
    computed: {
      noteId() {
        return this.$router.currentRoute.params.id
      },
      canBackTop() {
        return this.scrollPosition > 0
      }
    },
    data() {
      return {
        scrollPosition: 0,
        searchPageCount: 10,
        searchCurrentPage: 1,
        detailList: [{
            ID: 'note_001',
            level: 'LV1. 烟雨游友',
            rank: '楼主',
            portrait: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3293038046,4198898802&fm=21&gp=0.jpg',
            collection: false,
            title: '[游戏攻略] 游戏攻略-奶妈培养推荐-蝴蝶精分析-御魂攻略',
            time: '2016-10-10 17:56:16',
            author: '火谷测试',
            img: [{
                url: 'http://img0.imgtn.bdimg.com/it/u=254098918,3417200360&fm=21&gp=0.jpg'
              },
              {
                url: 'http://img4.imgtn.bdimg.com/it/u=4273566151,3638976385&fm=21&gp=0.jpg'
              },
              {
                url: 'http://img2.imgtn.bdimg.com/it/u=10048629,298641743&fm=23&gp=0.jpg'
              }
            ],
            description: '一级技能解析：【香气迎人】普通技能， 造成100%伤害。点评：普通攻击没亮点<br>1.鸡肋技能<br>2.但随等级提高伤害增加。',
          },
          {
            level: 'LV3. 妙语书生',
            rank: '沙发',
            portrait: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3293038046,4198898802&fm=21&gp=0.jpg',
            title: '',
            time: '2016-10-10 18:56:26',
            author: 'zsq',
            img: [],
            description: '谢谢楼主分享',
          },
          {
            level: 'LV2. 杏坛小葩',
            rank: '板凳',
            portrait: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3293038046,4198898802&fm=21&gp=0.jpg',
            title: '',
            time: '2016-10-10 19:36:46',
            author: 'llw',
            img: [],
            description: '抢沙发',
          },
          {
            level: 'LV1. 烟雨游友',
            rank: '4楼',
            portrait: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3293038046,4198898802&fm=21&gp=0.jpg',
            title: '',
            time: '2016-10-10 19:36:46',
            author: '火谷测试',
            img: [],
            description: '抢沙发',
          },
        ],
        displayList: [],
      }
    },

    methods: {
      loadNoteDetail(page) {
        this.$http({
          method: 'post',
          url: '/detail?id=' + this.noteId + 'page=' + page,
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

      replyNote() {
        this.$router.push({
          name: 'replyNote',
          params: {
            id: this.noteId,
            title: this.detailList[0].title
          }
        })
      },

      onBackTop() {
        this.$refs.scrollBox.scrollTop = 0;
      },

      onScroll(e) {
        this.scrollPosition = e.target.scrollTop
      },

      toggleFloorHost(author){ 
        if(this.displayList && this.displayList.length && this.displayList.length != this.detailList.length){
          this.displayList = this.detailList.slice(0)
        }else{
          this.displayList = this.detailList.filter(function(item){
            if(item.author == author){
              return true
            }
          })
        }
      },

      freshListByPage(page=1){
        this.loadNoteDetail(page)
      },
    }
  }
</script>