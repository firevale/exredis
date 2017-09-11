<template>
  <div class="detail-page">
    <scroller class="flex-fixed-rest" ref="scroller" :on-load-more="loadmore">
      <div class="card author-info">
        <div class="card-content ">
          <div class="comp-author-info">
            <figure>
              <img src="~assets/themes/jqxs_mobile/2-5_03_03.png">
            </figure>
            <p class="item-left subtitle">
              firevale-城岸
              <br/> LV.1 烟雨游友
            </p>
            <div class="item-right">
              <a class="button is-info is-small">楼主</a>
              <a class="button is-primary is-small">回贴</a>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-content ">
          <p class="title">
            <strong>[综合讨论]</strong> 如何评价 LPL 夏季总决赛 EDG vs RNG 3:2 胜利？
          </p>
          <p class="subtitle is-relative">
            <span>2017-09-07 14:00</span>
            <span class="is-right">查看数/回复数 100/20</span>
          </p>
          <div class="content">
            最『宏大』的一个陷阱应该是，建立了把消费水平与个人成功、自我认同、和人生幸福划等号的价值体系。因为中国教育体系中对成功、幸福、梦想等关键话题的失语，这些关键词的定义权便被拱手送给了网红、微商、和购物导流网站。你没有梦想的时候，旅游公众号告
          </div>
          <div class="card vote">
            <header class="card-header">
              <p class="card-header-title">
                本次测试中您最满意的地方？（己投票)
              </p>
            </header>
            <div class="card-content">
              <div class="vote-item columns is-mobile is-gapless">
                <p class="column is-three-quarters">
                  剧情还原
                  <br/>
                  <progress class="progress is-info" value="85" max="100">15%</progress>
                </p>
                <p class="column is-one-quarters has-text-right">
                  <br/> 3188票 41%
                </p>
              </div>
              <div class="vote-item columns is-mobile">
                <p class="column is-three-quarters">
                  剧情还原
                  <br/>
                  <progress class="progress is-info" value="45" max="100">15%</progress>
                </p>
                <p class="column is-one-quarters has-text-right">
                  <br/> 3188票 41%
                </p>
              </div>
            </div>
            <div class="card-footer">
              <div class="card-footer-item">
                己投票
                <!-- <a class="button is-link">投票</a> -->
              </div>
            </div>
          </div>
          <div class="card vote">
            <header class="card-header">
              <p class="card-header-title">
                本次测试中您最满意的地方？（单选)
              </p>
            </header>
            <div class="card-content">
              <div class="control">
                <label class="radio">
                  <input type="radio" name="member">  剧情还原
                </label>
              </div>
              <div class="control">
                <label class="radio">
                  <input type="radio" name="member">  剧情还原
                </label>
              </div>
            </div>
            <div class="card-footer">
              <div class="card-footer-item">
                <a class="button is-link">投票</a>
              </div>
            </div>
          </div>
          <div class="card vote">
              <header class="card-header">
                <p class="card-header-title">
                  本次测试中您最满意的地方？（多选)
                </p>
              </header>
              <div class="card-content">
                <div class="control">
                  <label class="checkbox">
                    <input type="checkbox" name="member">  剧情还原
                  </label>
                </div>
                <div class="control">
                  <label class="checkbox">
                    <input type="checkbox" name="member">  剧情还原
                  </label>
                </div>
              </div>
              <div class="card-footer">
                <div class="card-footer-item">
                  <a class="button is-link">投票</a>
                </div>
              </div>
            </div>
          <div class="is-relative">
            <a class="button is-link">举报</a>
            <a class="button is-link is-right">
              <span class="icon is-small">
                <i class="fa fa-heart-o"></i>
              </span>
              <span>收藏</span>
            </a>
          </div>
        </div>
      </div>
      <div class="card comments">
        <div class="card-content">
          <div class="comment">
            <div class="comp-author-info">
              <figure>
                <img src="~assets/themes/jqxs_mobile/2-5_03_03.png">
              </figure>
              <p class="item-left subtitle">
                firevale-城岸
                <span class="tag is-info subtitle">官方版主</span>
                <br/> LV.1 烟雨游友
              </p>
              <div class="item-right subtitle has-text-right">
                沙发
                <br/> 2017-09-07 14:00
              </div>
            </div>
            <div class="content is-relative">
              <blockquote>
                <span class="subtitle">firevale发表于 2017-09-03 14:00
                  <br/> 谢谢楼主分享</span>
              </blockquote>
              谢谢分享
              <a class="button is-link is-right">举报</a>
            </div>
          </div>
          <div class="comment">
            <div class="comp-author-info">
              <figure>
                <img src="~assets/themes/jqxs_mobile/2-5_03_03.png">
              </figure>
              <p class="item-left subtitle">
                firevale-城岸
                <span class="tag is-success subtitle">官方版主</span>
                <br/> LV.1 烟雨游友
              </p>
              <div class="item-right subtitle has-text-right">
                沙发
                <br/> 2017-09-07 14:00
              </div>
            </div>
            <div class="content is-relative">
              <blockquote>
                <span class="subtitle">firevale发表于 2017-09-03 14:00
                  <br/> 谢谢楼主分享</span>
              </blockquote>
              谢谢分享
              <a class="button is-link is-right">举报</a>
            </div>
          </div>
          <div class="comment">
            <div class="comp-author-info">
              <figure>
                <img src="~assets/themes/jqxs_mobile/2-5_03_03.png">
              </figure>
              <p class="item-left subtitle">
                firevale-城岸
                <span class="tag is-primary subtitle">官方版主</span>
                <br/> LV.1 烟雨游友
              </p>
              <div class="item-right subtitle has-text-right">
                沙发
                <br/> 2017-09-07 14:00
              </div>
            </div>
            <div class="content is-relative">
              <blockquote>
                <span class="subtitle">firevale发表于 2017-09-03 14:00
                  <br/> 谢谢楼主分享</span>
              </blockquote>
              谢谢分享
              <a class="button is-link is-right">举报</a>
            </div>
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>
<script>
import Vue from '../../vue-installed'
import {
  mapGetters,
  mapActions
} from 'vuex'

import postDetailView from '../../components/postDetailView.vue'
import postCommentView from '../../components/postCommentView.vue'

export default {
  mounted: async function() {
    await this.getPostDetail()
  },

  components: {
    postDetailView,
    postCommentView,
  },
  computed: {
    postId() {
      return this.$route.params.postId
    },
    isManager() {
      return window.acsConfig.isAdmin == true
    }
  },
  data() {
    return {
      postDetail: undefined,
      commentList: [],
      page: 0,
      total: 1,
      totalRecords: 0,
      recordsPerPage: 20,
      showAuthorOnly: false,
    }
  },

  methods: {
    ...mapActions([
      'setCurrentPostTitle'
    ]),

    onItemDelete(index) {
      //this.totalRecords--;
      this.commentList[index].content = "回复已被删除"
      this.commentList[index].active = false
    },

    onShowAuthorOnly(isShowAuthor) {
      this.showAuthorOnly = isShowAuthor
      this.refresh()
    },

    getPostDetail: async function() {
      let result = await this.$acs.getPostDetail(this.postId)
      if (result.success) {
        this.setCurrentPostTitle(result.detail.title)
        this.postDetail = result.detail

        if (!this.isManager && !this.postDetail.active) {
          this.$router.push({
            name: "postList"
          })
        }
      }
    },

    refresh: async function() {
      this.page = 0
      this.total = 1
      this.commentList = []
      await this.loadmore()
    },

    loadmore: async function() {
      let author_id = 0
      if (this.showAuthorOnly) author_id = this.postDetail.user.id
      let result = await this.$acs.getPostComments(this.postId, this.page + 1, author_id, this.recordsPerPage)
      if (result.success) {
        this.commentList = this.commentList.concat(result.comments)
        this.total = result.total
        this.totalRecords = result.records
        this.page = this.page + 1
        if (this.$refs.scroller && this.page >= this.total) {
          this.$refs.scroller.$emit('all-loaded')
        }
      }
    }
  }
}
</script>