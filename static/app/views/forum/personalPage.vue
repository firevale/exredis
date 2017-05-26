<template>
  <div class="person">
    <article class="media info flex-fixed-size">
      <figure class="media-left is-clickable" @click="onShowMyProfile">
        <p class="image is-64x64 avatar-image" v-lazy:background-image="avatarUrl">
        </p>
      </figure>
      <div>
        <p>
          {{ $t('forum.personal.nickname') }}
          <span>{{ this.userInfo.nickname }}</span>
        </p>
        <p>
          {{ $t('forum.personal.postCount') }}
          <span>{{ this.userInfo.post_count}}</span>
        </p>
        <p>
          {{ $t('forum.personal.registerTime') }}
          <span>{{ this.userInfo.inserted_at | formatServerDate }}</span>
        </p>
      </div>
    </article>
    <slider-nav class="flex-fixed-size" :menus="menus" @onSelect="switchMenu" ref="nav"></slider-nav>
    <div class="content flex-take-rest" style="position: relative">
      <scroller :on-load-more="loadmore" ref="scroller">
        <my-post-list-item v-if="type == 'myPosts'" v-for="(item, index) in postList" :key="item.id" :item-data="item"
          @item-deleted="onItemDelete" :item-index="index"></my-post-list-item>
        <my-comment-list-item v-if="type == 'myComments'" v-for="item in commentList" :key="item.id" :item-data="item"></my-comment-list-item>
        <my-favorite-list-item v-if="type == 'myFavor'" v-for="(item, index) in favoriteList" :key="item.id"
          :item-data="item" @item-deleted="onItemDelete" :item-index="index"></my-favorite-list-item>
        <my-post-list-item v-if="type == 'myBan' && isManager" v-for="(item, index) in banList" :key="item.id"
          :item-data="item" @item-deleted="onItemDelete" :item-index="index"></my-post-list-item>
      </scroller>
    </div>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import {
  showMobileMenu
} from "common/components/mobileMenu"

import Vue from 'vue'
import sliderNav from '../../components/sliderNav'
import myPostListItem from "../../components/myPostListItem"
import myFavoriteListItem from "../../components/myFavoriteListItem"
import myCommentListItem from "../../components/myCommentListItem"
import CropUploadDialog from 'common/components/imageCropUpload'
import * as filter from 'common/js/filters'

export default {
  components: {
    sliderNav,
    myPostListItem,
    myFavoriteListItem,
    myCommentListItem,
  },

  computed: {

    isManager() {
      return window.acsConfig.isAdmin == true
    },
    ...mapGetters([
      'userInfo'
    ]),
    avatarUrl() {
      return {
        src: filter.imageStaticUrl(this.userInfo.avatar_url || window.acsConfig.defaultAvatarUrl),
        error: window.acsConfig.defaultAvatarUrl,
        loading: window.acsConfig.defaultAvatarUrl
      }
    },
  },

  data() {
    return {
      type: 'myPosts',
      menus: window.acsConfig.isAdmin == true ? [{
          text: this.$t('forum.personal.myPosts'),
          value: 'myPosts'
        }, {
          text: this.$t('forum.personal.myComments'),
          value: 'myComments'
        },
        {
          text: this.$t('forum.personal.myFavor'),
          value: 'myFavor'
        },
        {
          text: this.$t('forum.personal.myBan'),
          value: 'myBan'
        }
      ] : [{
          text: this.$t('forum.personal.myPosts'),
          value: 'myPosts'
        }, {
          text: this.$t('forum.personal.myComments'),
          value: 'myComments'
        },
        {
          text: this.$t('forum.personal.myFavor'),
          value: 'myFavor'
        }
      ],
      postList: [],
      commentList: [],
      favoriteList: [],
      banList: [],
      page: 0,
      total: 1,
      recordsPerPage: 10,
    }
  },

  mounted: async function() {
    if (this.userInfo.post_count == 0) {
      let result = await this.$acs.getUserPostCount(this.$route.params.forumId)

      if (result.success) {
        this.updateUserPostCount(result.post_count)
      }
    }
  },

  methods: {
    ...mapActions([
      'updateUserPostCount', 'decrUserPostCount'
    ]),

    switchMenu: function(item, index) {
      this.type = item.value
      this.resetScroller();
    },

    onShowMyProfile: function() {
      this.$router.push({
        path: '/account/my_profile'
      })
    },

    resetScroller: function() {
      this.page = 0
      this.total = 1
      this.postList = []
      this.commentList = []
      this.favoriteList = []
      this.banList = []
      if (this.$refs.scroller) {
        this.$refs.scroller.$emit('reset')
      }
    },

    loadmore: async function() {
      switch (this.type) {
        case "myPosts":
          await this.getPostPage()
          break;
        case "myComments":
          await this.getCommentPage()
          break;
        case "myFavor":
          await this.getFavoritePage()
          break;
        case "myBan":
          await this.getBanPage()
          break;
      }
    },

    onItemDelete(type, index) {
      switch (type) {
        case "myPost":
          this.decrUserPostCount()
          this.postList.splice(index, 1)
          break;
        case "banPost":
          this.banList.splice(index, 1)
          break;
        case "myFavorite":
          this.favoriteList.splice(index, 1)
          break;
      }
    },

    getPostPage: async function() {
      // cancel last get paged post if we're requesting 
      this.$acs.cancelGetUserPagedPost()
      this.$acs.cancelGetUserPostComments()
      this.$acs.cancelGetUserPostFavorites()
      this.$acs.cancelGetPagedBanPost()

      let result = await this.$acs.getUserPagedPost(this.$route.params.forumId,
        this.page + 1, this.recordsPerPage)

      if (result.success) {
        this.postList = this.page == 0 ? result.posts : this.postList.concat(result.posts)
        this.total = result.total
        this.page = this.page + 1

        if (this.$refs.scroller && this.page >= this.total) {
          this.$refs.scroller.$emit('all-loaded')
        }
      }
    },

    getCommentPage: async function() {
      // cancel last get paged post if we're requesting 
      this.$acs.cancelGetUserPagedPost()
      this.$acs.cancelGetUserPostComments()
      this.$acs.cancelGetUserPostFavorites()
      this.$acs.cancelGetPagedBanPost()

      let result = await this.$acs.getUserPostComments(this.$route.params.forumId, this.page + 1,
        this.recordsPerPage)

      if (result.success) {
        this.commentList = this.page == 0 ? result.comments : this.commentList.concat(result.comments)
        this.total = result.total
        this.page = this.page + 1

        if (this.$refs.scroller && this.page >= this.total) {
          this.$refs.scroller.$emit('all-loaded')
        }
      }
    },

    getFavoritePage: async function() {
      // cancel last get paged post if we're requesting 
      this.$acs.cancelGetUserPagedPost()
      this.$acs.cancelGetUserPostComments()
      this.$acs.cancelGetUserPostFavorites()
      this.$acs.cancelGetPagedBanPost()

      let result = await this.$acs.getUserPostFavorites(this.$route.params.forumId, this.page + 1,
        this.recordsPerPage)

      if (result.success) {
        this.favoriteList = this.page == 0 ? result.favorites : this.favoriteList.concat(result.favorites)
        this.total = result.total
        this.page = this.page + 1

        if (this.$refs.scroller && this.page >= this.total) {
          this.$refs.scroller.$emit('all-loaded')
        }
      }
    },

    getBanPage: async function() {
      if (this.isManager) {
        // cancel last get paged post if we're requesting
        this.$acs.cancelGetUserPagedPost()
        this.$acs.cancelGetUserPostComments()
        this.$acs.cancelGetUserPostFavorites()
        this.$acs.cancelGetPagedBanPost()

        let result = await this.$acs.getPagedBanPost(this.$route.params.forumId, this.page + 1,
          this.recordsPerPage)

        if (result.success) {
          this.banList = this.page == 0 ? result.posts : this.banList.concat(result.posts)
          this.total = result.total
          this.page = this.page + 1

          if (this.$refs.scroller && this.page >= this.total) {
            this.$refs.scroller.$emit('all-loaded')
          }
        }
      }
    }
  },
}
</script>
<style lang="css">
div.vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area,
div.vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload {
  height: 200px !important;
}
</style>