<template>
  <div class="person">
    <article class="media info">
      <figure class="media-left" @click="onShowImageUpload">
        <p class="image is-64x64 avatar-image">
          <img :src="this.userInfo.avatar_url"></img>
         </p>
         <img-upload url="/forum_actions/update_user_avatar"  @crop-upload-success="cropUploadSuccess" @crop-upload-fail="cropUploadFail" field="avatar" :params="uploadParams" v-model="showImgUpload"></img-upload>
       </figure>
      <div class="media-content">
        <p>
          {{ $t('forum.personal.nickName') }} <span>{{ this.userInfo.nickName }}</span>
        </p>
         <p>
           {{ $t('forum.personal.postCount') }} <span>{{ this.postRecords}}</span>
         </p>
         <p>
            {{ $t('forum.personal.registerTime') }}<span>{{ this.userInfo.reg_at | formatServerDateTime }}</span>
         </p>
      </div>
    </article>
    <nav class="nav">
      <div class="nav-center">
        <a class="nav-item is-tab has-right-line" :class="{'is-active': type == 'myPosts'}" @click="switchMenu('myPosts')">{{ $t('forum.personal.myPosts') }}</a>
        <a class="nav-item is-tab has-right-line" :class="{'is-active': type == 'myComments'}" @click="switchMenu('myComments')">{{ $t('forum.personal.myComments') }}</a>
        <a class="nav-item is-tab" :class="{'is-active': type == 'myFavor'}" @click="switchMenu('myFavor')">{{ $t('forum.personal.myFavor') }}</a>
        <div class="slider" :style="{'background-position':sliderPosition}"/>
      </div>
    </nav>
    <div class="content" style="position: absolute; top: 12rem;left: 0;right: 0; bottom: 0;">
      <div style="position: relative; height: 100%">
        <scroller :on-load-more="loadmore" ref="scroller">
          <my-posts v-if="type == 'myPosts'" v-for="(item, index) in postList" :key="item.id" :item-data="item" :on-item-deleted="onItemDelete" :item-index="index"></my-posts>
          <my-comments v-if="type == 'myComments'" v-for="item in commentList" :key="item.id" :item-data="item"></my-comments>
          <my-favorate v-if="type == 'myFavor'" v-for="(item, index) in favoriteList" :key="item.id" :item-data="item" :on-item-deleted="onItemDelete" :item-index="index"></my-favorate>
       </scroller>
      </div>
    </div>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import imgUpload from "vue-image-crop-upload/upload-2.vue"
import scroller from '../../components/scroller'
import myPosts from "../../components/myPosts"
import myFavorate from "../../components/myFavorate"
import myComments from "../../components/myComments"


export default {
  components: {
    scroller,
    myPosts,
    myFavorate,
    myComments,
    imgUpload,
  },

  // mounted: function() {
  //   this.$refs.pag.$on('switch-page', this.getPostPage)
  //   this.getPostPage(this.page)
  // }, 

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
        this.type = menu
        this.resetScroller();
      }
    },

    onShowImageUpload: function() {
      this.showImgUpload = true
    },    

    cropUploadSuccess(result, field, key) {
      if (result.success) {
        this.serUserProfile(result.user)
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

    getPostPage: async function() {
      let result = await this.$acs.getUserPagedPost(this.$router.currentRoute.params.forumId,
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
      let result = await this.$acs.getUserPostComments(this.page + 1, this.recordsPerPage)

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
      let result = await this.$acs.getUserPostFavorites(this.page + 1, this.recordsPerPage)

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