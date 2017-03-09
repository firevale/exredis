<template>
<div>
  <div class="main-menu">
    <router-link class="icon image-icon icon-search":to="{name: 'search'}"></router-link>
    <router-link class="icon image-icon icon-user":to="{name: 'personalPage'}"></router-link>
    <router-link class="button is-info" :to="{name: 'newPost'}">{{$t('forum.postList.newPost')}}</router-link>
  </div>
  <div class="tab-bar has-bottom-line">
    <span class="icon image-icon icon-pull-down" @click="selectOrderByField"></span>
    <span class="seperator"></span>
    <a class="button" :class="currentSection == 0 ? 'is-primary' : 'is-grey'" @click="setCurrentSection(0)">
        {{ $t('forum.postList.all') }}
      </a>
    <a class="button" v-for="section in forumInfo.sections" :class="currentSection == section.id ? 'is-primary' : 'is-grey'"
      @click="setCurrentSection(section.id)">
        {{section.title}}
      </a>
  </div>
  <div>
    <post-list-item v-for="item in postList" :key="item.id" :post-info="item"></post-list-item>
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
      this.refreshPage(1)
    }
  },

  computed: {
    ...mapGetters([
      'currentSection', 'postsOrderByField', 'forumInfo', 'forumId'
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
      'updateForumInfo'
    ]),

    selectOrderByField() {
      menuModal.showModal(null, this.onOrderTypeChoose, this.postsOrderByField)
    },

    onOrderTypeChoose(type) {
      this.setPostsOrderByField(type)
      this.refreshPage(1)
    },

    onPageChange: function(page) {
      this.refreshPage(page)
    },

    getForumInfo: async function() {
      try {
        let result = await this.$acs.getForumInfo(this.$router.currentRoute.params.forumId)
        if (result.success) {
          this.updateForumInfo(result.forum)
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
          let result = await this.$acs.getPagedPost(page, this.recordsPerPage, this.postsOrderByField,
            this.currentSection, this.$router.currentRoute.params.forumId)
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
