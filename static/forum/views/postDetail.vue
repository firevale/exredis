<template>
<div>
  <div>
    <post-detail-view v-if="postDetail" :post-data="postDetail" @toggle-floorHost="toggleFloorHost"></post-detail-view>
    <post-comment-view v-for="(comment, index) in commentList" @toggle-floorHost="toggleFloorHost" :comment-data="comment"
      :item-index="index" :nth="((page - 1) * recordsPerPage) + index" :on-item-deleted="onItemDelete">
    </post-comment-view>
    <div v-if="commentList && commentList.length > 0" class="column is-full" v-show="total > 1">
      <pagination ref="pag" :page-count="total" :current-page="page" :on-page-change="onPageChange"> </pagination>
    </div>
  </div>
  <div v-show="canBackTop" class="back-top" @click="onBackTop">
    <i class="fa fa-caret-up" aria-hidden="true"></i> {{ $t('forum.detail.goBack') }}
  </div>
</div>
</template>
<script>
import Vue from '../vue-installed'
import {
  mapGetters,
  mapActions
} from 'vuex'

import postDetailView from '../components/postDetailView.vue'
import postCommentView from '../components/postCommentView.vue'
import pagination from '../components/pagination.vue'

export default {
  mounted: function() {
    //this.$refs.pag.$on('switch-page', this.refreshPage)
    this.getPostDetail()
    this.refreshPage(this.page)
  },

  components: {
    postDetailView,
    postCommentView,
    pagination,
  },
  computed: {
    postId() {
      return this.$router.currentRoute.params.postId
    },
    canBackTop() {
      return this.scrollPosition > 0
    }
  },
  data() {
    return {
      postDetail: undefined,
      commentList: [],
      page: 1,
      total: 1,
      recordsPerPage: 10,
    }
  },

  methods: {
    ...mapActions([
      'setCurrentPostTitle'
    ]),

    onPageChange: function(page) {
      this.refreshPage(page)
    },

    onBackTop() {
      this.$refs.scrollBox.scrollTop = 0;
    },

    onScroll(e) {
      this.scrollPosition = e.target.scrollTop
    },

    onItemDelete(index) {
      this.commentList.splice(index, 1)
    },

    getPostDetail: async function() {
      let result = await this.$acs.getPostDetail(this.postId)
      if (result.success) {
        this.setCurrentPostTitle(result.detail.title)
        this.postDetail = result.detail
      }
    },

    refreshPage: async function(page) {
      if (!this.processing) {
        this.processing = true
        let result = await this.$acs.getPostComments(this.postId, page, this.recordsPerPage)
        if (result.success) {
          this.commentList = result.comments
          this.total = result.total
          this.page = page
        }
        this.processing = false
      }
    },

    toggleFloorHost(author) {
      // if (this.displayList && this.displayList.length && this.displayList.length != this.detailList
      //   .length) {
      //   this.displayList = this.detailList.slice(0)
      // } else {
      //   this.displayList = this.detailList.filter(function(item) {
      //     if (item.author == author) {
      //       return true
      //     }
      //   })
      // }
    },

  }
}
</script>
