<template>
<div>
  <div class="row-line content-item">
    <div class="column-line" style="margin-left: 1rem;">
      <figure class="image is-64x64" style="margin: auto;border-radius:50%;border: 1px solid;overflow: hidden;">
        <img :src="this.userInfo.avatar_url"></img>
      </figure>
    </div>
    <div class="column-line" style="flex: 1;text-align: left;margin: 0 3rem;">
      <div>
        {{ $t('forum.personal.nickName') }}
        <span>{{ this.userInfo.nickName }}</span>
      </div>
      <div>
        {{ $t('forum.personal.postCount') }}
        <span>{{ this.userInfo.post_count }}</span>
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
    <div class="service-menu" :class="{'menu-selected': type=='myPosts'}" @click="type='myPosts'">
      <span>{{ $t('forum.personal.myPosts') }}</span>
    </div>
    <div class="service-menu" :class="{'menu-selected': type=='myComments'}" @click="type='myComments'">
      <span>{{ $t('forum.personal.myComments') }}</span>
    </div>
    <div class="service-menu" :class="{'menu-selected': type=='myFavor'}" @click="type='myFavor'">
      <span>{{ $t('forum.personal.myFavor') }}</span>
    </div>
  </div>
  <div class="horizontal-seperator">
    <div :class="{'move-box-left': type=='myPosts','move-box-center': type=='myComments','move-box-right': type=='myFavor'}">
      <div class="arrow-down"></div>
    </div>
  </div>
  <div class="content-item" v-show="type == 'myPosts'">
    <my-note v-for="item in postList" :item-data="item"></my-note>
  </div>
  <div class="content-item" v-show="type == 'myComments'">
    <my-reply v-for="item in commentList" :item-data="item"></my-reply>
  </div>
  <div class="content-item" v-show="type == 'myFavor'">
    <my-favorite v-for="item in favoriteList" :item-data="item"></my-favorite>
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
export default {
  components: {
    myPosts,
    myFavorate,
    pagination,
    myComments,
  },

  mounted: function() {
    this.$refs.pag.$on('switch-page', this.getPostPage)
    this.getUserInfo()
    this.getPostPage(this.page)
  },

  computed: {
    ...mapGetters([
      'userInfo', 'forumId'
    ]),

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
    }
  },
  methods: {
    ...mapActions([
      'serUserProfile'
    ]),

    onPageChange: function(page) {
      this.refreshPage(page)
    },

    getUserInfo: async function() {
      if (!this.processing) {
        this.processing = true
        let result = await this.$acs.getUserInfo()

        if (result.success) {
          console.log(result.user)
          this.serUserProfile(result.user)
        }
        this.processing = false
      }
    },

    getPostPage: async function(page) {
      if (!this.processing) {
        this.processing = true
        let result = await this.$acs.getUserPagedPost(this.forumId, page, this.recordsPerPage)

        if (result.success) {
          this.postList = result.posts
          this.total = result.total
          this.page = page
        }
        this.processing = false
      }
    },


  },
}
</script>
