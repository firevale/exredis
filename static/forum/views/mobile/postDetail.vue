<template>
  <div class="detail-page">
    <scroller class="flex-fixed-rest" ref="scroller" :on-load-more="loadmore">
      <div class="card author-info has-divider">
        <div class="card-content ">
          <div class="comp-author-info">
            <figure>
              <img src="~assets/themes/jqxs_mobile/2-5_03_03.png">
            </figure>
            <p class="item-left subtitle">
              firevale-城岸
              <br/> LV.1 烟雨游友
            </p>
            <p class="item-right">回复/查看 110/1000 </p>
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