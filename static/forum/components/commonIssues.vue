<template>
  <div>
    <div v-show="!issueDetail">
      <div v-show="!result.length&&issues&&issues.length" class="is-chid content-item">
        <div class="row-menu">
          <input class="search-input" type="text" :placeholder="$t('forum.customService.searchPlaceHolder')"></input>
          <input class="search-button" type="button" :value="$t('forum.customService.searchBtn')"></input>
          <i class="fa fa-search search-icon" aria-hidden="true" style="top: .5rem;"></i>
        </div>
        <div class="float-container">
          <div v-for="item in issues" class="issue">{{item}}</div>
        </div>
      </div>
      <div v-show="result&&result.length" class="is-chid content-item">
        <div class="row-menu">
          <input class="search-input" type="text" :placeholder="$t('forum.customService.searchPlaceHolder')"></input>
          <input class="search-button" type="button" :value="$t('forum.customService.searchBtn')"></input>
          <i class="fa fa-search search-icon" aria-hidden="true" style="top: .5rem;"></i>
        </div>
      </div>
      <div class="is-child content-item">
        <div v-for="item in result" class="search-result" @click="getIssueDetail(item)">
          {{item.title}}
          <i class="fa fa-angle-right title is-4 dark" aria-hidden="true" style="position:absolute; right: 1rem;"></i>
        </div>
      </div>

      <div class="column is-full" v-show="issuePageCount > 1">
        <pagination ref="pag" :page-count="issuePageCount" :current-page="issueCurrentPage"></pagination>
      </div>
    </div>
    <div v-show="issueDetail" class="content-item">
      <div class="row-menu">
        <input class="search-input" style="padding-left:1rem;" disabled type="text" :value="issueTitle">
        </input>
      </div>
      <div class="row-menu" style="padding-top: 2rem;">
        <textarea disabled class="issue-content" :value="issueDetail&&issueDetail.content">
        </textarea>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import pagination from '../components/pagination.vue'

  export default{
    components:{
      pagination,
    },
    data () {
      return {
        issuePageCount: 5,
        issueCurrentPage: 1,
        issues: ['闪退卡顿','无法登录','无法连接','充值问题','游客账号'],
        result: [
          {
            id: '001',
            title: '问题：总是充值失败',
          },
          {
            id: '002',
            title: '问题：充值问题',
          },
          {
            id: '003',
            title: '问题：充值未到账',
          },
        ],
        issueDetail:null,
      }
    },
    computed:{
      issueTitle(){
        return this.$t('forum.customService.issueTitle', {title: this.issueDetail&&this.issueDetail.title})
      }
    },
    methods:{
      getIssueDetail(issue){
        Vue.set(this,'issueDetail',{
          id: '001',
          title: '无法登录',
          state: 'Edited',
          content: '回复:\n无法登录一般是网速不好导致(角色等级越高，需要实时传输的数据就越多，对网络环境要求就更高)，即使连接的是4g。',
        })
        // this.$http(
        // {
        //   method: 'post',
        //   url: '/issueDetail?id='+issue.id,
        //   params: {},
        // }
        // ).then(response=>{

        // }).then(result=>{

        // })
      },  
    }
  }
</script>
<style lang="scss">
  @import "../scss/forum";
  .service-menu {
    flex: 1;
    border-right: 1px solid $dark;
    text-align: center;
    cursor: pointer;
  }
  
  .service-menu:last-child {
    border-right: none;
  }
  
  .menu-selected {
    color: $link;
  }
  
  .search-input {
    flex: 3;
    font-size: 1.2rem;
    padding: .6rem;
    padding-left: 3rem;
  }
  
  .search-button {
    flex: 1;
    background-color: $primary;
    color: $white;
    font-size: 1.2rem;
    margin-left: 2rem;
  }
  
  .search-result {
    margin-left: 1rem;
    font-size: 1.2rem;
    padding: 1rem;
    border-bottom: 1px solid $dark;
    position: relative;
    cursor: pointer;
  }
  
  .float-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    border-left: 1px solid $dark;
    margin: auto 1rem;
    flex-wrap: wrap;
    .issue {
      text-align: center;
      border: 1px solid $dark;
      border-left: none;
      padding: .5rem;
      font-size: 1.2rem;
      cursor: pointer;
      float: left;
      width: 33.33%;
      box-sizing: border-box;
    }
    .issue:nth-child(n+4) {
      border-top: none;
    }
  }
  
  .issue-content {
    resize: vertical;
    flex: 1;
    height: 18rem;
    padding: 0 1rem;
    font-size: 1.2rem;
  }
</style>