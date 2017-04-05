<template>
  <div class="content-item">
    <div v-for="item in questionList" class="content-item" @click="selectedId==item.id?selectedId='':selectedId=item.id">
      <div class="row-menu">
        <span style="flex: 1;">{{item.time}}</span>
        <span :class="{'link': item.state=='已回复'}">{{item.state}}</span>
      </div>
      <div class="row-menu">
        <span style="flex: 1;">{{item.title}}</span>
        <i v-show="selectedId!=item.id" class="fa fa-angle-right title is-3 dark" aria-hidden="true"></i>
      </div>
      <div v-show="selectedId==item.id" class="reply-box">
        {{item.answer}}
      </div>
      <hr>
    </div>
    <div class="column is-full" v-show="total > 1">
      <pagination ref="pag" :page-count="total" :current-page="page"></pagination>
    </div>
  </div>
</template>
<script>
  import pagination from '../../components/pagination.vue'

  export default {
    components: {
      pagination,
    },
    data() {
      return {
        selectedId: '',
        page: 0,
        total: 0,
        questionList: [],
        recordsPerPage: 10
      }
    },
    computed: {

    },
    methods: {
      getServicePage: async function () {
        let appId = this.$router.currentRoute.params.appId
        let result = await this.$acs.getServicePagedPost(appId, this.page + 1, this.recordsPerPage)

        if (result.success) {
          this.questionList = this.page == 0 ? result.questions : this.questionList.concat(result.questions)
          this.total = result.total
          this.page = this.page + 1
        }
      }
    },
    created: function(){
      this.getServicePage()
    }
  }
</script>