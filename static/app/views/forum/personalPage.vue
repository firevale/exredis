<template>
  <div class="person">
    <article class="media info flex-fixed-size">
      <figure class="media-left" @click="onShowImageUpload">
        <p class="image is-64x64 avatar-image">
          <img :src="avatarUrl"></img>
        </p>
        <img-upload url="/forum_actions/update_user_avatar" @crop-upload-success="cropUploadSuccess" @crop-upload-fail="cropUploadFail"
          field="avatar" :params="uploadParams" v-model="showImgUpload"></img-upload>
      </figure>
      <div class="media-content">
        <p>
          {{ $t('forum.personal.nickname') }} <span>{{ this.userInfo.nickname }}</span>
        </p>
        <p>
          {{ $t('forum.personal.postCount') }} <span>{{ this.userInfo.post_count}}</span>
        </p>
        <p>
          {{ $t('forum.personal.registerTime') }}<span>{{ this.userInfo.inserted_at | formatServerDateTime }}</span>
        </p>
      </div>
    </article>
    <nav class="nav flex-fixed-size">
      <div class="nav-center">
        <a class="nav-item is-tab has-right-line" :class="{'is-active': type == 'myPosts'}" @click="switchMenu('myPosts')">{{ $t('forum.personal.myPosts') }}</a>
        <a class="nav-item is-tab has-right-line" :class="{'is-active': type == 'myComments'}" @click="switchMenu('myComments')">{{ $t('forum.personal.myComments') }}</a>
        <a class="nav-item is-tab" :class="{'is-active': type == 'myFavor'}" @click="switchMenu('myFavor')">{{ $t('forum.personal.myFavor') }}</a>
        <div class="slider" :style="{'background-position':sliderPosition}" />
      </div>
    </nav>
    <div class="content flex-take-rest" style="position: relative">
      <scroller :on-load-more="loadmore" ref="scroller">
        <my-post-list-item v-if="type == 'myPosts'" v-for="(item, index) in postList" :key="item.id" :item-data="item" @item-deleted="onItemDelete"
          :item-index="index"></my-post-list-item>
        <my-comment-list-item v-if="type == 'myComments'" v-for="item in commentList" :key="item.id" :item-data="item"></my-comment-list-item>
        <my-favorite-list-item v-if="type == 'myFavor'" v-for="(item, index) in favoriteList" :key="item.id" :item-data="item" @item-deleted="onItemDelete"
          :item-index="index"></my-favorite-list-item>
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

import imgUpload from "vue-image-crop-upload/upload-2.vue"
import scroller from 'common/components/scroller'

import myPostListItem from "../../components/myPostListItem"
import myFavoriteListItem from "../../components/myFavoriteListItem"
import myCommentListItem from "../../components/myCommentListItem"

export default {
  components: {
    scroller,
    myPostListItem,
    myFavoriteListItem,
    myCommentListItem,
    imgUpload,
  },

  computed: {
    ...mapGetters([
      'userInfo'
    ]),

    uploadParams() {
      return {
        user_id: this.userInfo.id
      }
    },
    sliderPosition() {
      switch (this.type) {
        case "myPosts":
          return "10% bottom"
        case "myComments":
          return "50% bottom"
        case "myFavor":
          return "90% bottom"
      }
    },
    avatarUrl() {
      return this.userInfo.avatar_url ? this.userInfo.avatar_url : window.acsConfig.defaultAvatarUrl
    }
  },

  data() {
    return {
      type: 'myPosts',
      postList: [],
      commentList: [],
      favoriteList: [],
      page: 0,
      total: 1,
      recordsPerPage: 10,
      showImgUpload: false
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
      'setUserProfile', 'updateUserPostCount', 'decrUserPostCount'
    ]),

    switchMenu: function(menu) {
      if (menu != this.type) {
        this.type = menu
        this.resetScroller();
      }
    },

    onShowImageUpload: function() {
      // let menu = showMobileMenu({
      //   visible: true,
      //   items: [{title: "xxxxxxxxasdfasdfadsfadsfasdfasdfasdfadsfadsfasa"}, {title: "yyyy"}]
      // })

      // menu.$on('item-selected', (item) => {
      //   console.log('mobile menu item selected: ', item)
      // })
      this.showImgUpload = true
    },

    cropUploadSuccess(result, field, key) {
      if (result.success) {
        this.setUserProfile(result.user)
      }
    },

    cropUploadFail(status, field, key) {},

    onPageChange: function(page) {},

    resetScroller: function() {
      this.page = 0
      this.total = 1
      this.postList = []
      this.commentList = []
      this.favoriteList = []
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
      }
    },

    onItemDelete(type, index) {
      switch (type) {
        case "myPost":
          this.decrUserPostCount()
          this.postList.splice(index, 1)
          break;

        case "myFavorite":
          this.favoriteList.splice(index, 1)
          break;
      }
    },

    getPostPage: async function() {
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
      let result = await this.$acs.getUserPostComments(this.$route.params.forumId, this.page + 1, this.recordsPerPage)

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
      let result = await this.$acs.getUserPostFavorites(this.$route.params.forumId, this.page + 1, this.recordsPerPage)

      if (result.success) {
        this.favoriteList = this.page == 0 ? result.favorites : this.favoriteList.concat(result.favorites)
        this.total = result.total
        this.page = this.page + 1

        if (this.$refs.scroller && this.page >= this.total) {
          this.$refs.scroller.$emit('all-loaded')
        }
      }
    },
  },
}
</script>
<style lang="css">
.vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area,
.vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload {
  height: 175px;
}
</style>