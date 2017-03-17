<template>
  <div>
    <div class="row-line content-item">
      <div class="column-line" style="margin-left: 1rem;">
        <figure class="image is-64x64" style="margin: auto;border-radius:50%;border: 1px solid;overflow: hidden;" @click="onShowImageUpload">
          <img :src="this.userInfo.avatar_url"></img>
        </figure>
        <img-upload url="/forum_actions/update_user_avatar" @crop-success="cropSuccess" @crop-upload-success="cropUploadSuccess" @crop-upload-fail="cropUploadFail" field="avatar" :params="uploadParams" v-model="showImgUpload"></img-upload>
      </div>
      <div class="column-line" style="flex: 1;text-align: left;margin: 0 3rem;">
        <div>
          {{ $t('forum.personal.nickName') }}
          <span>{{ this.userInfo.nickName }}</span>
        </div>
        <div>
          {{ $t('forum.personal.postCount') }}
          <span>{{ this.postRecords }}</span>
        </div>
        <div>
          {{ $t('forum.personal.registerTime') }}
          <span>{{ this.userInfo.reg_at | formatServerDateTime }}</span>
        </div>
      </div>
      <div>
      </div>
    </div>
    <div class="horizontal-seperator"></div>
    <div class="is-child  row-menu">
      <div class="service-menu" :class="{'menu-selected': type=='myPosts'}" @click="switchMenu('myPosts')">
        <span>{{ $t('forum.personal.myPosts') }}</span>
      </div>
      <div class="service-menu" :class="{'menu-selected': type=='myComments'}" @click="switchMenu('myComments')">
        <span>{{ $t('forum.personal.myComments') }}</span>
      </div>
      <div class="service-menu" :class="{'menu-selected': type=='myFavor'}" @click="switchMenu('myFavor')">
        <span>{{ $t('forum.personal.myFavor') }}</span>
      </div>
    </div>
    <div class="horizontal-seperator">
      <div :class="{'move-box-left': type=='myPosts','move-box-center': type=='myComments','move-box-right': type=='myFavor'}">
        <div class="arrow-down"></div>
      </div>
    </div>
    <div class="content-item" v-show="type == 'myPosts'">
      <my-posts v-for="(item, index) in postList" :item-data="item" :on-item-deleted="onItemDelete" :item-index="index"></my-posts>
    </div>
    <div class="content-item" v-show="type == 'myComments'">
      <my-comments v-for="item in commentList" :item-data="item"></my-comments>
    </div>
    <div class="content-item" v-show="type == 'myFavor'">
      <my-favorate v-for="(item, index) in favoriteList" :item-data="item" :on-item-deleted="onItemDelete" :item-index="index"></my-favorate>
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

    mounted: function () {
      this.$refs.pag.$on('switch-page', this.getPostPage)
      this.getUserInfo()
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

      switchMenu: function (menu) {
        if (menu != this.type) {
          this.page = 1
          this.total = 1
          this.type = menu
          this.onPageChange(this.page)
        }
      },
      onShowImageUpload: function () {
        this.showImgUpload = true
      },
      cropSuccess(data, field, key) {

      },
      cropUploadSuccess(data, field, key) {

      },
      cropUploadFail(status, field, key) {

      },

      onPageChange: function (page) {
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

      getUserInfo: async function () {
        let result = await this.$acs.getUserInfo()

        if (result.success) {
          this.serUserProfile(result.user)
        }
      },

      getPostPage: async function (page) {
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

      getCommentPage: async function (page) {
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

      getFavoritePage: async function (page) {
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