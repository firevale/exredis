<template>
<div style="padding-top: .2rem;">
  <div class="is-chid content-item">
    <p v-show="searchTip" class="control search-tip">{{ searchTip }}</p>
    <div v-if="!noteList && searchKeywordHistory.length" class="his-box">
      <div v-for="item in searchKeywordHistory" class="his-key" @click="searchByKey(item)">{{item}}</div>
    </div>
    <p v-show="!noteList && searchKeywordHistory.length" class="pointer clear-his" @click="clearHisSearch">{{ $t('forum.search.clearHisRecord') }}</p>
  </div>
  <div v-if="noteList && noteList.length" class="box is-chid is-parent content-item" style="padding: 0;">
    <post-list-item v-for="item in noteList" search-model :post-info="item" :mark-key="key"></post-list-item>
  </div>
  <div v-if="noteList && noteList.length" class="column is-full" v-show="searchPageCount > 1" style="">
    <pagination ref="pag" :page-count="searchPageCount" :current-page="searchCurrentPage"></pagination>
  </div>
</div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
import postListItem from '../components/postListItem'
import menuModal from '../components/menuModal'
import pagination from '../components/pagination'
export default {
  components: {
    postListItem,
    pagination,
  },

  mounted: function() {

  },

  watch: {
    'noteList' (newVal, oldVal) {
      if (newVal && newVal.length) {
        this.$nextTick(function() {
          this.$refs.pag.$on('switch-page', this.refreshList)
        })
      }
    }
  },

  computed: {
    ...mapGetters(['searchKeyword', 'searchKeywordHistory', 'searchPageCount', 'searchCurrentPage']),

    searchTip() {
      if (this.noteList && this.noteList.length) {
        return ''
      } else if (this.noteList && !this.noteList.length) {
        return this.$t('forum.search.noSearchResult')
      } else if (!(this.noteList && this.noteList.length) && this.searchKeywordHistory.length) {
        return this.$t('forum.search.searchHis')
      } else {
        return this.$t('forum.search.noSearchRecord')
      }
    }
  },

  data() {
    return {
      key: '',
      noteList: null,
    }
  },

  methods: {
    ...mapActions(['setSearchKeyword', 'clearSearchHis', 'setSearchPageCount',
      'setSearchCurrentPage'
    ]),

    orderChoose() {
      menuModal.showModal(null, this.onOrderTypeChoose, this.noteOrderTypeStr)
    },

    onOrderTypeChoose(type) {
      this.setPostsOrderByField(type)
      this.refreshPage()
    },

    searchByKey(item) {
      this.key = item
      this.setSearchKeyword(item)
      this.$nextTick(function() {
        this.noteList = [{
          headerTag: [{
            name: '置顶',
            bgColor: '#f00',
            color: '#fff'
          }, ],
          title: '【游戏攻略】指南攻略新手练级指南',
          hasPicture: true,
          tailTag: [{
              name: '精',
              bgColor: '#ff0',
              color: '#fff',
              isTag: true
            },
            {
              name: 'HOT',
              bgColor: '#f00',
              color: '#fff'
            },
          ],
          author: '火谷测试',
          time: '2分钟前',
          noteCount: '2/11',
        }]
      })

      this.refreshList()
    },

    refreshList(page = 1) {
      this.$http({
          method: 'post',
          url: '/searchNote?page=' + page + '&key=' + this.key,
          params: {

          }
        })
        .then(response => {
          //this.noteList = response.json()
          //this.setSearchPageCount(this.noteList.length)
          //this.setSearchCurrentPage(page)
        })
        .then(result => {
          if (result.success) {
            this.setSearchCurrentPage(page);
          } else {

          }
        })
    },

    clearKey() {
      this.key = ''
      this.setSearchKeyword('')
      this.noteList = null
    },

    clearHisSearch() {
      this.clearSearchHis()
    }
  },
}
</script>
