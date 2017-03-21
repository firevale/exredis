<template>
  <div style="overflow-y: hidden">
    <div>
      <scroller :on-refresh="refresh" :on-infinite="infinite" ref="my_scroller">
        <post-detail-view v-if="postDetail" :post-data="postDetail" @toggle-floorHost="toggleFloorHost"></post-detail-view>
        <post-comment-view v-for="(comment, index) in commentList" :key="comment.id" @toggle-floorHost="toggleFloorHost" :comment-data="comment" :item-index="index" :nth="(page - 1) * recordsPerPage + index + 1" :on-item-deleted="onItemDelete">
        </post-comment-view>
      </scroller>
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
  import scroller from 'vue-scroller'
  import postDetailView from '../components/postDetailView.vue'
  import postCommentView from '../components/postCommentView.vue'
  
  export default {
    mounted: function() {
      this.getPostDetail()
    },
  
    components: {
      postDetailView,
      postCommentView,
      scroller,
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
  
      onBackTop() {
        this.$refs.scrollBox.scrollTop = 0;
      },
  
      onScroll(e) {
        this.scrollPosition = e.target.scrollTop
      },
  
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
  
      refresh() {
        if (this.$refs.my_scroller)
          this.$refs.my_scroller.finishInfinite()
  
        this.page = 0
        this.total = 1
        this.commentList = []
      },
  
      infinite() {
        setTimeout(() => {
          this.refreshPage(this.page + 1).then(
            () => {
              this.bottom = this.bottom + this.recordsPerPage;
  
              if (this.$refs.my_scroller)
                this.$refs.my_scroller.finishInfinite()
  
              if (this.page >= this.total && this.$refs.my_scroller) {
                this.$refs.my_scroller.finishInfinite(true)
              }
            }
          )
        }, 800)
      },
  
      refreshPage: async function(page) {
        let result = await this.$acs.getPostComments(this.postId, page, this.recordsPerPage)
        if (result.success && result.comments.length > 0) {
          this.commentList = this.commentList.concat(result.comments)
          this.total = result.total
          this.totalRecords = result.records
          this.page = page
        } else {
          this.total = result.total
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
