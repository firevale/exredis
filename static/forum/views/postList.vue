<template>
<div class="is-ancestor is-parent is-vertical ">
  <div class="is-child fixed-top  row-line">
    <div class="arrow-back" style="left: 1rem;">
      <i class="fa fa-angle-left title is-2 dark" aria-hidden="true" @click="$router.go(-1)"></i>
    </div>
    <div class="row-line top-title">
      {{forumInfo.title}}
    </div>
    <div class="main-menu">
      <span class="fa fa-search" style="margin-right: .2rem;" aria-hidden="true" @click="$router.push({name:'search'})"></span>
      <span class="fa fa-user" style="margin-right: .2rem;" aria-hidden="true" @click="$router.push({name: 'personalPage'})"></span>
      <a class="button create-note" @click="$router.push({name:'newPost'})">{{ $t('forum.main.newPost') }}</a>
    </div>
  </div>
  <div class="scroll-box">
    <div class="tile content-item">
      <div class="tile control" style="margin-bottom: 0.8rem;">
        <a class="button" :class="{'is-active': currentSection == 0}" @click="setCurrentSection(0)">{{ $t('forum.main.all') }}</a>
        <a class="button" v-for="section in forumInfo.sections" :class="{'is-active': currentSection == section.id}"
            @click="setCurrentSection(section.id)">{{section.title}}</a>
      </div>
      <div class="pointer" @click="orderChoose">
        <span>{{ $t('forum.orderType.'+this.postsOrderByField) }}</span>
        <i class="fa fa-caret-down title is-3" aria-hidden="true" style="vertical-align: middle;"></i>
      </div>
    </div>
    <div class="box is-chid is-parent content-item" style="padding: 0;">
      <post-list-item v-for="item in postList" :key="item.id" :post-info="item"></post-list-item>
    </div>
    <div class="column is-full" v-show="total > 1">
      <pagination ref="pag" :page-count="total" :current-page="page" :on-page-change="onPageChange"></pagination>
    </div>
  </div>
</div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
import postListItem from '../components/postListItem'
import menuModal from '../components/menuModal'
import pagination from '../components/pagination'
export default {
  components: {
    postListItem,
    pagination,
  },

  mounted: function() {
    this.$refs.pag.$on('switch-page', this.refreshPage)
    this.getForumInfo()
    this.refreshPage(this.page)
  },

  watch: {
    'currentSection' (newVal, oldVal) {
      this.refreshPage()
    }
  },

  computed: {
    ...mapGetters([
      'currentSection',
      'postsOrderByField',
      'forumInfo'
    ]),
  },

  data() {
    return {
      postList: [],
      page: 1,
      total: 1,
      recordsPerPage: 10,
    }
  },

  methods: {
    ...mapActions([
      'setCurrentSection',
      'setPostsOrderByField',
      'updateForum'
    ]),

    orderChoose() {
      menuModal.showModal(null, this.onOrderTypeChoose, this.$t(`forum.orderType.${this.postsOrderByField}`))
    },

    onOrderTypeChoose(type) {
      this.setPostsOrderByField(type)
      this.refreshPage(1)
    },

    getForumInfo: async function(forum_id = 1) {
      try {
        let result = await this.$acs.getForumInfo(forum_id)
        if (result.success) {
          this.updateForum(result.forum)
        } else {
          console.log(this.$t(result.i18n_message))
        }
      } catch (e) {
        console.log(this.$t('forum.error.networkError'))
      }
    },

    onPageChange: function(page) {
      this.refreshPage(page)
    },

    refreshPage: async function(page) {
      if (!this.processing) {
        this.processing = true
        try {
          let result = await this.$acs.getPagedPost(page, this.recordsPerPage, this.postsOrderByField,
            this.currentSection)
          if (result.success) {
            this.postList = result.posts
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
    }

  },
}
</script>
