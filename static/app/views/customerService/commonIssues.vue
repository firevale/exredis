<template>
  <div class="common-issues">
    <div class="field is-grouped">
      <p class="control is-expanded has-icon">
        <input type="input" class="input " v-model.trim="keyword" @keydown.enter="search" @keydown.esc="keyword = ''"
          :placeholder="$t('customerService.commonIssues.searchPlaceHolder')">
        </input>
        <span class="icon image-icon" :class="{
            'icon-circle rotating': searching, 
            'icon-search': !searching,
           }"></span>
      </p>
      <p class="control">
        <a class="button is-info" @click.prevent="search">{{ $t('customerService.commonIssues.btnTitle') }}</a>
      </p>
    </div>
    <div v-if="questions||searching" class="my-service flex-take-rest" style="position:relative;top:1rem;">
      <scroller :on-load-more="loadmore" ref="scroller">
        <question-item class="row" v-for="item in questions" :question="item">
        </question-item>
      </scroller>
    </div>
    <div v-else style="padding: 1rem 1px">
      <div v-for="(row, i) in searchHistoryTable" class="columns is-mobile is-gapless" style="margin-bottom: 0">
        <div v-for="(keyword, j) in row" class="column has-text-centered has-hairline-border" :class="{'hairline-hide-right': j < historyTableColumns - 1, 
                      'hairline-hide-top': i > 0,
                      'is-half': historyTableColumns == 2,
                      'is-4': historyTableColumns == 3,
                      'is-3': historyTableColumns == 4,
                      'is-clickable': keyword}" style="padding: 0.5rem 0;overflow:hidden; white-space:nowrap; text-overflow:ellipsis;"
          @click="search(keyword)">
          <span class="title is-5" style="font-weight: 400; font-size: 1.1rem"> {{keyword}} </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import * as utils from 'common/js/utils'
import questionItem from '../../components/questionItem'

export default {
  components: {
    questionItem
  },
  data() {
    return {
      keywords: [],
      questions: undefined,
      keyword: "",
      searching: false,
      page: 0,
      total: 1,
      records_per_page: 10,
      historyTableColumns: 2,
    }
  },
  mounted: async function() {
    this.resize()
    window.addEventListener('resize', e => {
      this.resize()
    })

    let result = await this.$acs.getCommonIssues(this.$route.params.appId)
    if (result.success) {
      this.keywords = result.issues
    }
  },

  computed: {
    searchHistoryTable: function() {
      const size = this.keywords.length
      let row = 0
      let result = []

      if (size > 0) {
        while (row < Math.floor(size / this.historyTableColumns)) {
          result.push(this.keywords.slice(row * this.historyTableColumns, (row + 1) *
            this.historyTableColumns))
          row++
        }
        let n = this.historyTableColumns - (size % this.historyTableColumns)
        if (n < this.historyTableColumns) {
          let last = this.keywords.slice(row * this.historyTableColumns)
          while (n > 0) {
            last.push('')
            n--
          }
          result.push(last)
        }
      }

      return result
    },
  },

  methods: {
    resize: function() {
      let width = window.innerWidth || document.documentElement.clientWidth || document.body
        .clientWidth
      if (width < 768) {
        this.historyTableColumns = 2
      } else if (width > 768 && width < 1384) {
        this.historyTableColumns = 3
      } else {
        this.historyTableColumns = 4
      }
    },
    search: async function(keyword) {
      if (keyword && typeof keyword == 'string') {
        this.keyword = keyword
      }

      this.searching = true
      this.page = 0;
      this.resetScroller()
      await this.loadmore()
      this.searching = false
    },
    resetScroller: function() {
      if (this.$refs.scroller) {
        this.$refs.scroller.$emit('reset')
      }
    },
    loadmore: async function() {
      let result = await this.$acs.searchQuestion(this.$route.params.appId, this.keyword, this.page +
        1, this.records_per_page)

      if (result.success) {
        this.questions = this.page == 0 ? result.questions : this.questions.concat(result.questions)
        this.total = result.total
        this.page = this.page + 1

        if (this.$refs.scroller && this.page >= this.total) {
          this.$refs.scroller.$emit('all-loaded')
        }
      }
    }
  },
  watch: {
    keyword(val) {
      if (!val) {
        this.questions = undefined
      }
    }
  }
}
</script>