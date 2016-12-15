<template>
  <div class="is-ancestor is-parent is-vertical ">
    <div class="control is-child columns content-item">
      <div class="column">
        <i class="fa fa-angle-left title is-2" style="color: #ccc;" aria-hidden="true" @click="$router.push({name:'forum'})"></i>
      </div>
      <div class="column is-7" style="position: relative;">
        <i class="fa fa-search search-icon" aria-hidden="true"></i>
        <input v-model.trim="key" maxlength="30" class="search-box" :placeholder="$t('forum.search.placeholder')"></input>
        <i v-show="key" class="fa fa-times times-icon" aria-hidden="true" @click="clearKey"></i>
      </div>
      <div class="column is-4">
        <input type="button" class="search-btn" style="width: 100%;" :value="$t('forum.search.searchBtn')" @click="searchByKey(key)"></input>
      </div>
      <div class="column"></div>
    </div>
    <hr class="horizontal-line" style="margin-top: .3rem;"></hr>
    <div class="is-chid content-item ">
      <p class="control search-tip">{{ searchTip }}</p>
      <div v-if="!noteList&&searchKeyHis.length" class="his-box">
        <div v-for="item in searchKeyHis" class="his-key" @click="searchByKey(item)">{{item}}</div>
      </div>
      <p v-show="!noteList&&searchKeyHis.length" class="pointer clear-his" @click="clearHisSearch">{{ $t('forum.search.clearHisRecord') }}</p>
    </div>
    <div v-if="noteList&&noteList.length" class="box is-chid is-parent content-item" style="padding-left: 0;padding-right: 0; ">
      <note-item v-for="item in noteList" :item-data="item" :mark-key="key"></note-item>
    </div>
    <div v-if="noteList&&noteList.length" class="column is-full" v-show="searchPageCount > 1" style="">
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
    
  },

  watch: {
    'noteList' (newVal, oldVal){
      if(newVal&&newVal.length){
        this.$nextTick(function(){
          this.$refs.pag.$on('switch-page', this.refreshList)
        })
      }
    }
  },

  computed: {
    ...mapGetters(['searchKey','searchKeyHis','searchPageCount','searchCurrentPage']),

    searchTip(){
      if(this.noteList&&this.noteList.length){
        return this.$t('forum.search.followSearchResult')
      }else if(this.noteList&&!this.noteList.length){
        return this.$t('forum.search.noSearchResult')
      }else if(!(this.noteList&&this.noteList.length)&&this.searchKeyHis.length){
        return this.$t('forum.search.searchHis')
      }else{
        return this.$t('forum.search.noSearchRecord')
      } 
    }
  },

  data(){
    return {
      key: '',
      noteList: null,
    }
  },

  methods: {
    ...mapActions(['setSearchKey','setSearchHis','clearSearchHis','setSearchPageCount','setSearchCurrentPage']),

    orderChoose(){
      menuModal.showModal(null, this.onOrderTypeChoose, this.noteOrderTypeStr)
    },

    onOrderTypeChoose(type){
      this.setNoteOrderType(type)
      this.refreshPage()
    },

    searchByKey(item){
      this.key = item
      this.setSearchKey(item)
      this.setSearchHis(item)
      this.$nextTick(function(){
        this.noteList=[{
            headerTag:[
              {name: '置顶', bgColor: '#f00', color: '#fff'},
              ],
            title: '【游戏攻略】指南攻略新手练级指南',
            hasPicture: true,
            tailTag:[
              {name: '精', bgColor: '#ff0', color: '#fff', isTag: true},
              {name: 'HOT', bgColor: '#f00', color: '#fff'},
            ],
            author: '火谷测试',
            time: '2分钟前',
            noteCount: '2/11',
        }
        ]
      })
      
      this.refreshList()
    },

    refreshList(page=1){
      this.$http({
        method: 'post',
        url: '/searchNote?page='+page+'&key='+this.key,
        params: {
          
        }
      }).then(response => {
        //this.noteList = response.json()
        //this.setSearchPageCount(this.noteList.length)
        //this.setSearchCurrentPage(page)
      }).then(result => {
        if (result.success) {
          this.setSearchCurrentPage(page);
        } else {
          
        }
      })
    },

    clearKey(){
      this.key=''
      this.setSearchKey('')
      this.noteList=null
    },

    clearHisSearch(){
      this.clearSearchHis()
    }
  },
}
</script>
<style lang="scss">
  @import "../scss/forum";
  .pointer {
    font-size: 1rem;
    cursor: pointer;
  }
  
  .search-box {
    width: 100%;
    font-size: 1.2rem;
    padding: .6rem;
    padding-left: 3rem;
    padding-right: 4rem;
    border: none;
    border-bottom: .1rem solid $red;
  }
  
  .search-btn {
    width: 100%;
    color: $white;
    font-size: 1.3rem;
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
    bottom: 1rem;
    font-size: 1.5rem;
  }
  
  .times-icon {
    position: absolute;
    right: 1rem;
    bottom: .8rem;
    font-size: 2rem;
  }
  
  .content-item {
    margin: 1rem auto;
    justify-content: space-around;
  }
  
  .search-tip {
    text-align: left;
    font-size: 1.3rem;
    color: $dark;
    margin-bottom: 2rem;
  }
  
  .his-key {
    width: 50%;
    padding: .5rem;
    float: left;
    border-bottom: 1px solid $dark;
    border-right: 1px solid $dark;
    box-sizing: border-box;
    text-align: center;
    color: $black;
    font-size: 1.3rem;
  }
  
  .his-key:hover {
    color: $primary;
    cursor: pointer;
  }
  
  .his-box {
    border-top: 1px solid $dark;
    border-left: 1px solid $dark;
  }
  
  .his-box:after {
    content: '';
    display: block;
    clear: both;
  }

  .clear-his{
    text-align: center;
    color: $primary;
    font-size: 1.3rem;
    margin-top: 2rem;
  }
</style>