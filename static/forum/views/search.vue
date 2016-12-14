<template>
  <div class="is-ancestor is-parent is-vertical ">
    <div class="control is-child columns content-item">
      <div class="column">
        <i class="fa fa-angle-left title is-2" style="color: #ccc;" aria-hidden="true"></i>
      </div>
      <div class="column is-7" style="position: relative;">
        <i class="fa fa-search search-icon" aria-hidden="true"></i>
        <input class="search-box" placeholder="搜索帖子"></input>
        <i class="fa fa-times times-icon" aria-hidden="true"></i>
      </div>
      <div class="column is-4">
        <input type="button" class="search-btn" style="width: 100%;" :value="$t('forum.search.searchBtn')"></input>
      </div>
      <div class="column"></div>
    </div>
    <hr class="horizontal-line" style="margin-top: .3rem;"></hr>
    <div class="is-chid content-item search-tip">
      {{ $t('forum.search.searchHis') }}
      <div v-if="searchKeyHis.length" class="his-box">
        <div v-for="item in searchKeyHis" class="his-key">{{item}}</div>
      </div>
    </div>
    <div v-if="0" class="box is-chid is-parent content-item" style="padding-left: 0;padding-right: 0; ">
      <note-item v-for="item in noteList" :item-data="item"></note-item>
    </div>
    <div class="column is-full" v-show="searchPageCount > 1" style="">
      <pagination ref="pag" :page-count="searchPageCount" :current-page="searchCurrentPage"></pagination>
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
    ...mapGetters(['searchKey','searchKeyHis','searchPageCount','searchCurrentPage']),
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
        //this.notList = response.json()
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
    font-size: 1.2rem;
    cursor: pointer;
  }
  
  .search-box {
    width: 100%;
    font-size: 1.6rem;
    padding: .6rem;
    padding-left: 3rem;
    padding-right: 4rem;
    border: none;
    border-bottom: .1rem solid $red;
  }
  
  .search-btn {
    width: 100%;
    color: $white;
    font-size: 1.6rem;
    padding: .6rem;
    background: $primary;
  }
  
  .control .column {
    padding-top: 0;
    padding-bottom: 0;
  }
  
  .search-icon {
    position: absolute;
    left: 1rem;
    bottom: .8rem;
    font-size: 2rem;
  }
  
  .times-icon {
    position: absolute;
    right: 1rem;
    bottom: .8rem;
    font-size: 2.5rem;
  }
  
  .content-item {
    margin: 1rem auto;
    justify-content: space-around;
  }
  
  .search-tip {
    text-align: left;
    font-size: 2rem;
    color: $dark;
    margin-bottom: 2rem;
  }

  .his-key{
    width: 50%;
    padding: .5rem;
    float: left;
    border: 1px solid $dark;
    box-sizing: border-box;
    text-align: center;
    color: $black;
    font-size: 1.5rem;
  }
  .his-box:after{
    content: '';
    display: block;
    clear: both;
  }
</style>