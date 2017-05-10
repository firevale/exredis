<template>
  <div class="my-service">
    <scroller :on-load-more="loadmore" ref="scroller">
      <question-item class="row" v-for="item in questionList" :question="item">
      </question-item>
    </scroller>
  </div>
</template>
<script>

import questionItem from '../../components/questionItem'

export default {
  components: {
    questionItem
  },
  data() {
    return {
      questionList: [],
      page: 0,
      total: 1,
      recordsPerPage: 12,
      postRecords: 0
    }
  },
  methods: {
    resetScroller: function() {
      this.page = 0
      this.total = 1
      this.questionList = []
      if (this.$refs.scroller) {
        this.$refs.scroller.$emit('reset')
      }
    },
    loadmore: async function() {
      // cancel last get paged post if we're requesting 
      this.$acs.cancelGetServicePaged()

      let appId = this.$router.currentRoute.params.appId
      let result = await this.$acs.getServicePaged(appId, this.page + 1, this.recordsPerPage)

      if (result.success) {
        this.questionList = this.page == 0 ? result.questions : this.questionList.concat(result.questions)
        this.total = result.total
        this.page = this.page + 1

        if (this.$refs.scroller && this.page >= this.total) {
          this.$refs.scroller.$emit('all-loaded')
        }
      }
    }
  }
}
</script>