<template>
  <div class="issues-page">
    <div class="field is-grouped">
      <p class="control is-expanded has-icon is-medium">
        <input type="input" class="input is-medium" v-model.trim="keyword" @keydown.enter="search" @keydown.esc="keyword = ''"
          :placeholder="$t('customerService.commonIssues.searchPlaceHolder')">
        </input>
        <span class="icon image-icon is-medium" :class="{
            'icon-circle rotating': searching, 
            'icon-search': !searching,
           }"></span>
      </p>
      <p class="control">
        <a class="button is-info is-medium" @click.prevent="search">{{ $t('customerService.commonIssues.btnTitle') }}</a>
      </p>
    </div>
    <div>
      <div class="columns is-mobile is-multiline is-gapless">
        <div v-for="item in issues" class="column is-half-mobile is-one-third-tablet is-one-quarter-desktop has-text-centered has-hairline-border">
          <span>{{item.title}}</span>
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

export default {
  components: {},
  data() {
    return {
      issues: undefined,
      keyword: "",
      searching: false,
      historyTableColumns: 2,
    }
  },
  mounted: async function() {
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

    let result = await this.$acs.getCommonIssues(this.$route.params.appId)
    if (result.success) {
      this.issues = result.issues
    }

  },

  computed: {
    searchHistoryTable: function() {
      const size = this.issues.length
      let row = 0
      let result = []

      if (size > 0) {
        while (row < Math.floor(size / this.historyTableColumns)) {
          result.push(this.issues.slice(row * this.historyTableColumns, (row + 1) *
            this.historyTableColumns))
          row++
        }
        let n = this.historyTableColumns - (size % this.historyTableColumns)
        if (n < this.historyTableColumns) {
          let last = this.issues.slice(row * this.historyTableColumns)
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

  },

  watch: {
    keyword(val) {
      if (!val) {
        this.postList = undefined
      }
    }
  }
}
</script>