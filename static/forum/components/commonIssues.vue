<template>
  <div style="margin-top: 2rem;">
    <div v-show="!issueDetail" class="content-item">
      <div class="row-menu is-child content-item">
          <div style="display: flex; flex: 3;position: relative;">
            <input class="search-input" v-model="issueKey" type="text" :placeholder="$t('forum.customService.searchPlaceHolder')" @keyup.enter="searchIssueByKey(issueKey)"></input>
            <i v-show="issueKey" class="fa fa-times times-icon" style="top: .5rem;" aria-hidden="true" @click="issueKey=''"></i>
            <i class="fa fa-search search-icon" aria-hidden="true" style="top: .5rem;"></i>
          </div>
          <input class="search-button" type="button" :value="$t('forum.customService.searchBtn')" @click="searchIssueByKey(issueKey)"></input>
        </div>
      <div v-show="!issueKey && !result.length" style="margin-top: 2rem;">
        <div class="float-container">
          <div v-for="item in commonIssues" class="issue" @click="searchIssueByKey(item)">{{item}}</div>
        </div>
      </div>
      <div style="margin-top: 2rem;">
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
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import pagination from './pagination.vue'

  export default {
    components: {
      pagination,
    },
    data() {
      return {
        issueKey: '',
        issuePageCount: 5,
        issueCurrentPage: 1,
        issues: ['闪退卡顿', '登录', '无法连接', '充值', '游客账号'],
        result: [],
        simulateResult: [{
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
          {
            id: '003',
            title: '问题：登录不上去,闪退卡顿',
          },
        ],
        issueDetail: null,
      }
    },
    
    watch: {
      'issueKey'(newVal, oldVal){
        if(oldVal && !newVal){
          this.result = []
        }
      }
    },

    computed: {
      ...mapGetters(['commonIssues']),

      issueTitle() {
        return this.$t('forum.customService.issueTitle', {
          title: this.issueDetail && this.issueDetail.title
        })
      }
    },
    methods: {
      getIssueDetail(issue) {
        Vue.set(this, 'issueDetail', {
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
      searchIssueByKey(key) {
        this.issueKey = key
        this.result = this.simulateResult.filter(
          function(item){
            return new RegExp(key,"g").test(item.title)
        })
      },
    }
  }
</script>