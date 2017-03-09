<template>
<div>
  <div ref="scrollBox" class="is-chid content-container" @scroll="onScroll" style="padding: 0 .5rem 0 .5rem;">
    <post-detail-view :item-data="postDetail" @toggle-floorHost="toggleFloorHost"></post-detail-view>
    <post-common-view v-for="item in commonList" @toggle-floorHost="toggleFloorHost" :item-data="item"
      :item-index="item.id"></post-common-view>
    <div v-if="commonList&&commonList.length" class="column is-full" style="padding-right: 0;padding-left: 0;"
      v-show="total > 1">
      <pagination ref="pag" :page-count="total" :current-page="page" @switch-page="onPageChange"></pagination>
    </div>
  </div>
  <div v-show="canBackTop" class="back-top" @click="onBackTop">
    <i class="fa fa-caret-up" aria-hidden="true"></i> {{ $t('forum.detail.goBack') }}
  </div>
</div>
</template>
<script>
import postDetailView from '../components/postDetailView.vue'
import postCommonView from '../components/postCommonView.vue'
import pagination from '../components/pagination.vue'

export default {
  mounted() {
    this.getPostDetail()
    this.refreshPage(this.page)
  },

  components: {
    postDetailView,
    postCommonView,
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
      postDetail: {},
      commonList: [],
      page: 1,
      total: 1,
      recordsPerPage: 10,
    }
  },

  methods: {
    replyNote() {
      this.$router.push({
        name: 'replyNote',
        params: {
          id: this.postId,
          title: this.postDetail.title
        }
      })
    },

    onPageChange: function(page) {
      this.refreshPage(page)
    },

    onBackTop() {
      this.$refs.scrollBox.scrollTop = 0;
    },

    onScroll(e) {
      this.scrollPosition = e.target.scrollTop
    },

    getPostDetail: async function() {
      try {
        let result = await this.$acs.getPostDetail(this.postId)
        if (result.success) {
          this.postDetail = result.detail
        } else {
          console.log(this.$t(result.i18n_message))
        }
      } catch (e) {
        console.log(this.$t('forum.error.networkError'))
      }
    },

    refreshPage: async function(page) {
      if (!this.processing) {
        this.processing = true
        try {
          let result = await this.$acs.getPostCommons(this.postId, page, this.recordsPerPage)
          if (result.success) {
            this.commonList = result.commons
            this.total = result.total
            this.page = page
          } else {
            console.log(this.$t(result.i18n_message))
          }
        } catch (e) {
          console.log(this.$t('forum.error.networkError'))
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
