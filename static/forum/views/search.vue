<template>
<div style="padding-top: .2rem;">
  <div class="columns box">
    <input class="search-box column is-three-quarters" maxlength="50" v-model="searchKeyword" :placeholder="$t('forum.search.placeholder')"></input>
    <a class="search-btn is-primary column" @click.prevent="handleSubmit">{{ $t('forum.search.searchBtn') }}</a>
  </div>
  <div class="is-chid content-item">
    <p v-show="searchTip" class="control search-tip">{{ searchTip }}</p>
    <div v-if="!postList && searchKeywordHistory.length" class="his-box">
      <div v-for="item in searchKeywordHistory" class="his-key" @click="searchByKey(item)">{{item}}</div>
    </div>
    <p v-show="!postList && searchKeywordHistory.length" class="pointer clear-his" @click="clearHisSearch">{{ $t('forum.search.clearHisRecord') }}</p>
  </div>
  <div v-if="postList && postList.length" class="box is-chid is-parent content-item" style="padding: 0;">
    <post-list-item v-for="item in postList" search-model :post-info="item" :mark-key="key"></post-list-item>
  </div>
  <div v-if="postList && postList.length" class="column is-full" v-show="searchPageCount > 1" style="">
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
    'postList' (newVal, oldVal) {
      if (newVal && newVal.length) {
        this.$nextTick(function() {
          this.$refs.pag.$on('switch-page', this.refreshList)
        })
      }
    }
  },

  computed: {
    ...mapGetters(['searchKeyword', 'searchKeywordHistory']),

    searchTip() {
      if (this.postList && this.postList.length) {
        return ''
      } else if (this.postList && !this.postList.length) {
        return this.$t('forum.search.noSearchResult')
      } else if (!(this.postList && this.postList.length) && this.searchKeywordHistory.length) {
        return this.$t('forum.search.searchHis')
      } else {
        return this.$t('forum.search.noSearchRecord')
      }
    }
  },

  data() {
    return {
      page: 0,
      pageCount: 10,
      postList: null,
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

    handleSubmit() {
      this.searchByKey(this.searchKeyword)
    },

    searchByKey(item) {
      this.key = item
      this.setSearchKeyword(item)
      this.$nextTick(function() {
        this.postList = [{
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

    refreshList: async function(page = 1) {
      let result = await this.$acs.search(forumId, this.searchKeyword, page, this.pageCount)
      if (result.success) {
        message.showMsg(this.$t('forum.newPost.addSuccess'))
        this.$router.push({
          name: 'index'
        })
      }
    },

    clearKey() {
      this.setSearchKeyword('')
      this.postList = null
    },

    clearHisSearch() {
      this.clearSearchHis()
    }
  },
}
</script>
