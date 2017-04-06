<template>
  <div>
    <scroller ref="scroller" :on-load-more="loadmore">
      <post-detail-view v-if="postDetail" :post-data="postDetail">
      </post-detail-view>
      <post-comment-view v-for="(comment, index) in commentList" 
        :key="comment.id" :comment-data="comment" :item-index="index" :nth="index + 1" 
        :on-item-deleted="onItemDelete">
      </post-comment-view>
    </scroller>
  </div>
</template>
<script>
import Vue from '../../vue-installed'
import {
  mapGetters,
  mapActions
} from 'vuex'
import scroller from 'common/components/scroller'
import postDetailView from '../../components/postDetailView.vue'
import postCommentView from '../../components/postCommentView.vue'

export default {
  mounted: async function() {
    await this.getPostDetail()
  },

  components: {
    postDetailView,
    postCommentView,
    scroller,
  },
  computed: {
    postId() {
      return this.$route.params.postId
    },
  },
  data() {
    return {
      postDetail: undefined,
      commentList: [],
      page: 0,
      total: 1,
      totalRecords: 0,
      recordsPerPage: 10,
    }
  },

  methods: {
    ...mapActions([
      'setCurrentPostTitle'
    ]),

    onItemDelete(index) {
      this.totalRecords--;
      this.commentList.splice(index, 1)
    },

    getPostDetail: async function() {
      let result = await this.$acs.getPostDetail(this.postId)
      if (result.success) {
        this.setCurrentPostTitle(result.detail.title)
        this.postDetail = result.detail
      }
    },

    refresh: async function() {
      this.page = 0
      this.total = 1
      this.commentList = []
    },

    loadmore: async function() {
      let result = await this.$acs.getPostComments(this.postId, this.page + 1, this.recordsPerPage)
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