<template>
<div>
  <div class="main-menu">
    <router-link class="icon image-icon icon-search" :to="{name: 'search'}"></router-link>
    <router-link class="icon image-icon icon-user" :to="{name: 'personalPage'}"></router-link>
    <router-link class="button is-info" :to="{name: 'newPost'}">{{$t('forum.postList.newPost')}}</router-link>
  </div>
  <div class="has-bottom-line">
    <div class="tab-bar">
      <span class="icon image-icon icon-pull-down" @click="selectOrderByField"></span>
      <span class="seperator"></span>
      <a class="button" :class="currentSectionId == 0 ? 'is-primary' : 'is-grey'" @click="setCurrentSectionId(0)">
        {{ $t('forum.postList.all') }}
      </a>
      <a class="button" v-for="section in forumInfo.sections" :class="currentSectionId == section.id ? 'is-primary' : 'is-grey'"
        @click="setCurrentSectionId(section.id)">
        {{section.title}}
      </a>
    </div>
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
    this.refreshPage(this.page)
  },

  watch: {
    'currentSectionId' (newVal, oldVal) {
      this.refreshPage(1)
    }
  },

  computed: {
    ...mapGetters([
      'currentSectionId', 'postsOrderByField', 'forumInfo', 'forumId'
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
      'setCurrentSectionId',
      'setPostsOrderByField',
      'updateForumInfo'
    ]),

    selectOrderByField() {
      menuModal.showModal({
        menuItems: [{
            value: 'last_reply_at',
            title: this.$t('forum.orderType.last_reply_at')
          },
          {
            value: 'created_at',
            title: this.$t('forum.orderType.created_at')
          },
          {
            value: 'is_hot',
            title: this.$t('forum.orderType.is_hot')
          },
          {
            value: 'is_vote',
            title: this.$t('forum.orderType.is_vote')
          }
        ],
        selectedValue: this.postsOrderByField,
        onOk: selectedItem => {
          this.setPostsOrderByField(selectedItem.value)
          this.refreshPage(1)
        },
      })
    },

    onPageChange: function(page) {
      this.refreshPage(page)
    },

    refreshPage: async function(page) {
      if (!this.processing) {
        this.processing = true
        let result = await this.$acs.getPagedPost(page, this.recordsPerPage, this.postsOrderByField,
          this.currentSectionId, this.$router.currentRoute.params.forumId)

        console.log('get paged post', result)
        if (result.success) {
          this.postList = result.posts
          this.total = result.total
          this.page = page
        }
        this.processing = false
      }
    }

  },
}
</script>
