<template>
  <div class="content-item">
    <div v-for="item in records" class="content-item" @click="selectedId==item.id?selectedId='':selectedId=item.id">
      <div class="row-menu ">
        <span style="flex: 1;">{{item.time}}</span>
        <span :class="{'link': item.state=='已回复'}">{{item.state}}</span>
      </div>
      <div class="row-menu">
        <span style="flex: 1;">{{item.title}}</span>
        <i v-show="selectedId!=item.id" class="fa fa-angle-right title is-3 dark" aria-hidden="true"></i>
      </div>
      <div v-show="selectedId==item.id" class="reply-box">
        {{item.content}}
      </div>
      <hr>
    </div>
    <div class="column is-full" v-show="recordPageCount > 1">
      <pagination ref="pag" :page-count="recordPageCount" :current-page="recordCurrentPage"></pagination>
    </div>
  </div>
</template>
<script>
  import pagination from './pagination.vue'

  export default {
    components: {
      pagination,
    },
    data() {
      return {
        selectedId: '',
        recordPageCount: 5,
        recordCurrentPage: 1,
        records: [{
            id: '001',
            time: '2016-11-31 18:32',
            title: '总是充值失败',
            state: '未回复',
            content: '已有奖品重新发送至您的账号中，敬请查收。',
          },
          {
            id: '002',
            time: '2016-11-21 8:32',
            title: '总是充值失败',
            state: '已回复',
            content: '已有奖品重新发送至您的账号中，敬请查收。',
          },
          {
            id: '003',
            time: '2016-10-31 18:32',
            title: '总是充值失败',
            state: '已回复',
            content: '已有奖品重新发送至您的账号中，敬请查收。',
          },
        ],
      }
    },
    computed: {

    },
    methods: {

    }
  }
</script>
<style lang="scss">
  @import "../scss/forum";
  .reply-box {
    border: 1px solid $dark;
    height: 5rem;
  }
  
  .link {
    color: $link;
  }
</style>