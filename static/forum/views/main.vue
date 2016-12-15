<template>
  <div class="is-ancestor is-parent is-vertical ">
    <div class="control is-child columns content-item">
      <span class="column is-3 ">
        <i class="fa fa-angle-left title is-2" style="color: #A6A6A6;" aria-hidden="true"></i>
      </span>
      <span class="column is-6" style="margin-bottom: 0; text-align: center;">
        <span class="title is-3">{{ $t('forum.main.title') }}</span>
      </span>
      <span class="column is-3 txt-right clear-right">
        <i class="fa fa-search title is-4" style="margin-right: 2rem;" aria-hidden="true" @click="$router.push({name:'search'})"></i>
        <i class="fa fa-user title is-4" style="margin-right: 2rem;" aria-hidden="true"></i>
        <a class="button txt-right" style="color: black;">{{ $t('forum.main.newNote') }}</a>
      </span>
    </div>
    <hr class="horizontal-line"></hr>
    <div class="tile is-chid content-item">
      <div class="tile control">
        <a class="button" :class="{'is-active': noteLoadType=='all'}" @click="setNoteLoadType('all')">{{ $t('forum.main.all') }}</a>
        <a class="button" :class="{'is-active': noteLoadType=='discussion'}" @click="setNoteLoadType('discussion')">{{ $t('forum.main.discussion') }}</a>
        <a class="button" :class="{'is-active': noteLoadType=='experience'}" @click="setNoteLoadType('experience')">{{ $t('forum.main.experience') }}</a>
        <a class="button" :class="{'is-active': noteLoadType=='ras'}" @click="setNoteLoadType('ras')">{{ $t('forum.main.ras') }}</a>
        <a class="button" :class="{'is-active': noteLoadType=='original'}" @click="setNoteLoadType('original')">{{ $t('forum.main.original') }}</a>
        <a class="button" :class="{'is-active': noteLoadType=='appeal'}" @click="setNoteLoadType('appeal')">{{ $t('forum.main.appeal') }}</a>
      </div>
      <div class="pointer" @click="orderChoose">
        <span>{{ noteOrderTypeStr }}</span>
        <i class="fa fa-caret-down title is-2" aria-hidden="true" style="vertical-align: middle;"></i>
      </div>
    </div>
    <div class="box is-chid is-parent content-item" style="padding-left: 0;padding-right: 0;">
      <note-item v-for="item in noteList" :item-data="item"></note-item>
    </div>
    <div class="column is-full" v-show="notePageCount > 1">
      <pagination ref="pag" :page-count="notePageCount" :current-page="noteCurrentPage"></pagination>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import noteItem from '../components/noteItem.vue'
import menuModal from '../components/menuModal'
import pagination from '../components/pagination.vue'
export default {
  components: {
    noteItem,  
    pagination,  
  },

  mounted: function(){
    this.$refs.pag.$on('switch-page', this.refreshPage)
  },

  watch: {
    'noteLoadType' (newVal, oldVal){
      this.refreshPage()
    }
  },

  computed: {
    ...mapGetters(['noteLoadType','noteLoadUrl','noteOrderType','noteOrderTypeStr','notePageCount','noteCurrentPage']),
  },

  data(){
    return {
      noteList:[
        {
            headerTag:[
              {name: '置顶', bgColor: '#f00', color: '#fff'},
              {name: '推荐', bgColor: '#0f0', color: '#00f'},
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
        },
        {
            headerTag:[
              
            ],
            title: '【问题求助】游戏一只闪退肿么破？？',
            hasPicture: false,
            tailTag:[
            
            ],
            author: '游客',
            time: '1小时前',
            noteCount: '0/0',
        },
        {
            headerTag:[
              
            ],
            title: '【BUG反馈】副本闪退',
            hasPicture: true,
            tailTag:[
              {name: 'HOT', bgColor: '#f00', color: '#fff'},
            ],
            author: '火谷测试',
            time: '一天前',
            noteCount: '2/11',
        },
        {
            headerTag:[
              {name: '置顶', bgColor: '#f00', color: '#fff'},
              ],
            title: '【玩家原创】新手练级指南',
            hasPicture: true,
            tailTag:[
              {name: '精', bgColor: '#ff0', color: '#fff', isTag: true},
            ],
            author: '火谷测试',
            time: '2016-11-1 21:06',
            noteCount: '22/133',
        },
        {
            headerTag:[
              
              ],
            title: '【玩家原创】新手练级指南',
            hasPicture: true,
            tailTag:[
              {name: '精', bgColor: '#ff0', color: '#fff', isTag: true},
            ],
            author: '火谷测试',
            time: '2016-10-11 14:06',
            noteCount: '22/433',
        },
      ]
    }
  },

  methods: {
    ...mapActions(['setNoteLoadType','setNoteOrderType','setNotePageCount','setNoteCurrentPage']),

    orderChoose(){
      menuModal.showModal(null, this.onOrderTypeChoose, this.noteOrderTypeStr)
    },

    onOrderTypeChoose(type){
      this.setNoteOrderType(type)
      this.refreshPage()
    },

    refreshPage(page = 1){
      this.$http({
        method: 'post',
        url: this.noteLoadUrl+'?page='+page+'&order='+this.noteOrderType,
        params: {
          
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
    },

  },
}
</script>
<style lang="scss">
  @import "../scss/forum";
  .pointer { 
    font-size: .9rem;
    cursor: pointer;
  }
</style>