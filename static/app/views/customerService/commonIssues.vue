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
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import * as utils from 'common/utils'

export default {
  components: {},

  mounted: function() {},

  computed: {

  },

  data() {
    return {
      page: 0,
      total: 0,
      pageCount: 10,
      postList: undefined,
      keyword: "",
      searching: false,
      historyTableColumns: 2,
    }
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