<template>
<div style="padding-top: .2rem;">
  <div class="columns box">
    <input class="search-box column is-three-quarters" maxlength="50" v-model="keyword" :placeholder="$t('forum.search.placeholder')"></input>
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
    <post-list-item v-for="item in postList" search-model :post-info="item" :mark-key="keyword"></post-list-item>
  </div>
  <div v-if="postList && postList.length" class="column is-full" v-show="total > 1" style="">
    <pagination ref="pag" :page-count="total" :current-page="page" :on-page-change="onPageChange"></pagination>
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
      keyword: ""
    }
  },

  methods: {
    ...mapActions(['setSearchKeyword', 'clearSearchHis']),

    orderChoose() {
      menuModal.showModal(null, this.onOrderTypeChoose, this.noteOrderTypeStr)
    },

    onOrderTypeChoose(type) {
      this.setPostsOrderByField(type)
      this.refreshPage()
    },

    onPageChange: function(page) {
      this.refreshList(page)
    },

    handleSubmit() {
      this.page = 1
      this.searchByKey(this.keyword)
    },

    searchByKey(item) {
      if (!this.keyword) {
        this.keyword = item
      }
      this.setSearchKeyword(item)
      this.refreshList()
    },

    refreshList: async function(page = 1) {
      let result = await this.$acs.search(this.$router.currentRoute.params.forumId, this.searchKeyword,
        page, this.pageCount)
      if (result.success) {
        this.postList = result.postList
        this.total = result.total
        this.page = page
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
