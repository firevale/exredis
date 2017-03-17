<template>
  <div class="search-page">
    <div class="search-bar is-full" :class="postList && postList.length > 0 ? 'has-bottom-line' : ''">
      <div class="field is-grouped">
        <p class="control is-expanded has-icon">
          <input type="input" class="input" 
            v-model.trim="keyword" 
            @keydown.enter="search"
            :placeholder="$t('forum.search.placeholder')">
          </input>
          <span class="icon image-icon icon-search"></span>
        </p>
        <p class="control">
          <a class="button is-info" @click.prevent="search">{{ $t('forum.search.searchBtn') }}</a>
        </p>
      </div>
    </div>
  
    <p v-if="searchTip">
      <span class="is-grey" style="font-size: 1rem">{{ searchTip }} </span>
    </p>
  
    <div v-if="!postList && searchKeywordHistory.length" style="padding: 1rem 1px">
      <div v-for="(row, i) in searchHistoryTable" class="columns is-mobile is-gapless" style="margin-bottom: 0">
        <div v-for="(keyword, j) in row" 
             class="column has-text-centered has-hairline-border" 
             :class="{'hairline-hide-right': j < historyTableColumns - 1, 
                      'hairline-hide-top': i > 0,
                      'is-half': historyTableColumns == 2,
                      'is-4': historyTableColumns == 3,
                      'is-3': historyTableColumns == 4,
                      'is-clickable': keyword}"
             style="padding: 0.5rem 0" @click="search(keyword)">
          <span class="title is-5" style="font-weight: 400; font-size: 1.1rem"> {{keyword}} </span>
        </div>
      </div>
    </div>

    <div class="has-text-centered" style="width: 100%">
      <span v-show="!postList && searchKeywordHistory.length" 
        class="is-primary is-clickable" 
        @click="clearSearchHistory">
        {{ $t('forum.search.clearHisRecord') }}
      </span>
    </div>

    <post-list-item v-for="item in postList" :search-keyword="keyword" :post-info="item"></post-list-item>

    <div v-if="postList && postList.length" class="column is-full" v-show="total > 1" style="">
      <pagination ref="pag" :page-count="total" :current-page="page" :on-page-change="onPageChange">
      </pagination>
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
  import * as utils from 'common/utils'

  export default {
    components: {
      postListItem,
      pagination,
    },

    mounted: function () {
      window.addEventListener('resize', e => {
        let width = window.innerWidth || document.documentElement.clientWidth || document.body
          .clientWidth
        if (width < 768) {
          this.historyTableColumns = 2
        } else if (width > 768 && width < 1384) {
          this.historyTableColumns = 3
        } else {
          this.historyTableColumns = 4
        }
      })
    },

    watch: {
      'postList' (newVal, oldVal) {
        if (newVal && newVal.length) {
          this.$nextTick(function () {
            this.$refs.pag.$on('switch-page', this.refreshList)
          })
        }
      }
    },

    computed: {
      ...mapGetters(['searchKeywordHistory']),

      searchHistoryTable: function () {
        const size = this.searchKeywordHistory.length
        let row = 0
        let result = []

        if (size > 0) {
          while (row < Math.floor(size / this.historyTableColumns)) {
            result.push(this.searchKeywordHistory.slice(row * this.historyTableColumns, (row + 1) *
              this.historyTableColumns))
            row++
          }
          let n = this.historyTableColumns - (size % this.historyTableColumns)
          if (n < this.historyTableColumns) {
            let last = this.searchKeywordHistory.slice(row * this.historyTableColumns)
            while (n > 0) {
              last.push('')
              n--
            }
            result.push(last)
          }
        }

        return result
      },

      searchTip: function () {
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
        keyword: "",
        searching: false,
        historyTableColumns: 2,
      }
    },

    methods: {
      ...mapActions(['setSearchKeyword', 'clearSearchHistory']),

      orderChoose() {
        menuModal.showModal(null, this.onOrderTypeChoose, this.noteOrderTypeStr)
      },

      onOrderTypeChoose(type) {
        this.setPostsOrderByField(type)
        this.refreshPage()
      },

      onPageChange: function (page) {
        this.refreshList(page)
      },

      search(keyword) {
        if (keyword) {
          this.keyword = keyword
        }
        this.page = 1
        this.refreshList()
        this.setSearchKeyword(this.keyword)
      },

      refreshList: async function (page = 1) {
        this.searching = false
        let result = await this.$acs.search(this.$route.params.forumId, this.keyword, page, this.pageCount)
        if (result.success) {
          this.postList = result.postList
          this.total = result.total
          this.page = page
        }
        this.searching = true
      },

      clearKey() {
        this.setSearchKeyword('')
        this.postList = null
      },
    },
  }
</script>