<template>
  <div class="person">
     <article class="media info">
      <figure class="media-left" @click="onShowImageUpload">
        <p class="image is-64x64 avatar-image">
          <img :src="this.userInfo.avatar_url"></img>
         </p>
         <img-upload url="/forum_actions/update_user_avatar" @crop-success="cropSuccess" @crop-upload-success="cropUploadSuccess" @crop-upload-fail="cropUploadFail" field="avatar" :params="uploadParams" v-model="showImgUpload"></img-upload>
       </figure>
      <div class="media-content">   
        <p>
          {{ $t('forum.personal.nickName') }} <span>{{ this.userInfo.nickName }}</span>
        </p>
         <p>
           {{ $t('forum.personal.postCount') }} <span>{{ this.userInfo.postCount }}</span>
         </p>
         <p>
            {{ $t('forum.personal.registerTime') }}<span>{{ this.userInfo.registerTime }}</span>
         </p>
      </div>
      </article>
      <nav class="nav">
        <div class="nav-center">
          <a class="nav-item is-tab has-right-line" :class="{'is-active': type == 'myPosts'}" @click="switchMenu('myPosts')">{{ $t('forum.personal.myPosts') }}</a>
          <a class="nav-item is-tab has-right-line" :class="{'is-active': type == 'myComments'}" @click="switchMenu('myComments')">{{ $t('forum.personal.myComments') }}</a>
          <a class="nav-item is-tab" :class="{'is-active': type == 'myFavor'}" @click="switchMenu('myFavor')">{{ $t('forum.personal.myFavor') }}</a>
        </div>
      </nav>
    <div class="content" v-show="type == 'myPosts'">
      <my-posts v-for="(item, index) in postList" :key="item.id" :item-data="item" :on-item-deleted="onItemDelete" :item-index="index"></my-posts>
    </div>
    <div class="content" v-show="type == 'myComments'">
      <my-comments v-for="item in commentList" :key="item.id" :item-data="item"></my-comments>
    </div>
    <div class="content" v-show="type == 'myFavor'">
      <my-favorate v-for="(item, index) in favoriteList" :key="item.id" :item-data="item" :on-item-deleted="onItemDelete" :item-index="index"></my-favorate>
    </div>
    <div class="column is-full" v-show="total > 1">
      <pagination ref="pag" :on-page-change="onPageChange" :page-count="total" :current-page="page"></pagination>
    </div>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import myPosts from "../components/myPosts"
import myFavorate from "../components/myFavorate"
import myComments from "../components/myComments"
import pagination from "../components/pagination"
import imgUpload from "vue-image-crop-upload/upload-2.vue"

export default {
  components: {
    myPosts,
    myFavorate,
    pagination,
    myComments,
    imgUpload,
  },

  mounted: function() {
    this.$refs.pag.$on('switch-page', this.getPostPage)
    this.getPostPage(this.page)
  },

  computed: {
    ...mapGetters([
      'userInfo'
    ]),

    uploadParams() {
      return {
        user_id: this.userInfo.id
      }
    }
  },

  data() {
    return {
      type: 'myPosts',
      postList: [],
      commentList: [],
      favoriteList: [],
      page: 1,
      total: 1,
      recordsPerPage: 6,
      postRecords: 0,
      showImgUpload: false
    }
  },
  methods: {
    ...mapActions([
      'serUserProfile'
    ]),

    switchMenu: function(menu) {
      if (menu != this.type) {
        this.page = 1
        this.total = 1
        this.type = menu
        this.onPageChange(this.page)
      }
    },
    onShowImageUpload: function() {
      this.showImgUpload = true
    },
    cropSuccess(data, field, key) {

    },
    cropUploadSuccess(data, field, key) {

    },
    cropUploadFail(status, field, key) {

    },

    onPageChange: function(page) {
      switch (this.type) {
        case "myPosts":
          this.getPostPage(page)
          break;
        case "myComments":
          this.getCommentPage(page)
          break;
        case "myFavor":
          this.getFavoritePage(page)
          break;
      }
    },

    onItemDelete(index) {
      switch (this.type) {
        case "myPosts":
          this.postRecords--;
          this.postList.splice(index, 1)
          break;
        case "myFavor":
          this.favoriteList.splice(index, 1)
          break;
      }
    },

    getUserInfo: async function() {
      let result = await this.$acs.getUserInfo()

      if (result.success) {
        this.serUserProfile(result.user)
      }
    },

    getPostPage: async function(page) {
      if (!this.processing) {
        this.processing = true

        let result = await this.$acs.getUserPagedPost(this.$router.currentRoute.params.forumId,
          page, this.recordsPerPage)

        if (result.success) {
          this.postList = result.posts
          this.total = result.total
          this.page = page
          this.postRecords = result.records
        }
        this.processing = false
      }
    },

    getCommentPage: async function(page) {
      if (!this.processing) {
        this.processing = true

        let result = await this.$acs.getUserPostComments(page, this.recordsPerPage)

        if (result.success) {
          this.commentList = result.comments
          this.total = result.total
          this.page = page
        }
        this.processing = false
      }
    },

    getFavoritePage: async function(page) {
      if (!this.processing) {
        this.processing = true

        let result = await this.$acs.getUserPostFavorites(page, this.recordsPerPage)

        if (result.success) {
          this.favoriteList = result.favorites
          this.total = result.total
          this.page = page
        }
        this.processing = false
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