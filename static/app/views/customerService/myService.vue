<template>
  <div class="my-service">
    <scroller :on-load-more="loadmore" ref="scroller">
      <div v-for="item in questionList" @click="selectedId==item.id?selectedId='':selectedId=item.id">
        <div class="level-content">
          <nav class="level is-mobile">
            <div class="level-left">
              <span style="flex: 1;">{{item.inserted_at | formatServerDateTime}}</span>
            </div>
            <div class="level-right">
              <span v-if="item.answer === null">未回复</span>
              <span v-else class="service-reply">已回复</span>
            </div>
          </nav>
        </div>
        <div class="level-content">
          <nav class="level is-mobile">
            <div class="level-left">
              <span style="flex: 1;">{{item.title}}</span>
            </div>
            <div class="level-right">
              <a class="button is-white is-medium">></a>
            </div>
          </nav>
        </div>
        <hr>
      </div>
    </scroller>
  </div>
</template>
<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'

  import scroller from '../../components/scroller'

  export default {
    components: {
      scroller
    },
    data() {
      return {
        questionList: [],
        selectedId: '',
        page: 0,
        total: 1,
        recordsPerPage: 12,
        postRecords: 0
      }
    },
    computed: {

    },
    methods: {
      resetScroller: function () {
        this.page = 0
        this.total = 1
        this.questionList = []
        if (this.$refs.scroller) {
          this.$refs.scroller.$emit('reset')
        }
      },
      loadmore: async function () {
        let appId = this.$router.currentRoute.params.appId
        let result = await this.$acs.getServicePagedPost(appId, this.page + 1, this.recordsPerPage)

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