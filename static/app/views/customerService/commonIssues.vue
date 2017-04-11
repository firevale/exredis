<template>
  <div class="common-issues">
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
    <div v-if="questions" class="my-service">
      <question-item class="row" v-for="item in questions" :question="item">
      </question-item>
    </div>
    <div v-else class="columns is-mobile is-multiline is-gapless">
      <div v-for="item in keywords" class="column is-half-mobile is-one-third-tablet is-one-quarter-desktop has-text-centered">
        <h5 class="title is-5">{{item.title}}</h5>
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
      keywords: undefined,
      questions: undefined,
      keyword: "",
      searching: false,
      page: 1,
      total: 0,
      records_per_page: 10,
    }
  },
  mounted: async function() {
    let result = await this.$acs.getCommonIssues(this.$route.params.appId)
    if (result.success) {
      this.keywords = result.issues
    }
  },

  computed: {

  },

  methods: {
    search: async function() {
      this.searching = true

      let result = await this.$acs.searchQuestion(this.$route.params.appId, this.keyword, this.page,
        this.records_per_page)
      if (result.success) {
        this.questions = result.questions
      }

      this.searching = false
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