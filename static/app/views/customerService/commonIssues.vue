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
    <!--<div class="my-service">
      <question-item class="row" v-for="item in issues" :question="item">
      </question-item>
    </div>-->
    <div class="columns is-mobile is-multiline is-gapless">
      <div v-for="item in issues" class="column is-half-mobile is-one-third-tablet is-one-quarter-desktop has-text-centered">
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
      issues: undefined,
      keyword: "",
      searching: false,
    }
  },
  mounted: async function() {

    let result = await this.$acs.getCommonIssues(this.$route.params.appId)
    if (result.success) {
      this.issues = result.issues
    }

  },

  computed: {

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