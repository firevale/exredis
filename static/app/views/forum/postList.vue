<template>
  <div style="overflow-y: hidden">
    <div class="has-bottom-line">
      <div class="tab-bar">
        <span class="icon image-icon icon-pull-down" @click="selectOrderByField"></span>
        <span class="seperator"></span>
        <div class="tile">
          <a class="button" :class="currentSectionId == 0 ? 'is-primary' : 'is-grey'" @click="setCurrentSectionId(0)">
            {{ $t('forum.postList.all') }}
          </a>
          <a class="button" v-for="section in forumInfo.sections" :class="currentSectionId == section.id ? 'is-primary' : 'is-grey'" @click="setCurrentSectionId(section.id)">
            {{section.title}}
          </a>
        </div>
      </div>
    </div>
    <div style="position: static; height: 100%">
      <div style="position: relative; height: 100%">
        <scroller :on-refresh="refresh" :on-load-more="loadmore" ref="scroller">
          <post-list-item class="row" v-for="(item, index) in postList" :key="item.id" :post-info="item">
          </post-list-item>
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

import scroller from '../../components/scroller'
import postListItem from '../../components/postListItem'
import menuModal from '../../components/menuModal'

export default {
  components: {
    scroller,
    postListItem,
  },

  watch: {
    'currentSectionId' (newVal, oldVal) {
      this.resetScroller()
    }
  },

  computed: {
    ...mapGetters([
      'currentSectionId', 'postsOrderByField', 'forumInfo'
    ]),
  },

  data() {
    return {
      postList: [],
      page: 0,
      total: 1,
      recordsPerPage: 10,
    }
  },

  methods: {
    ...mapActions([
      'setCurrentSectionId',
      'setPostsOrderByField',
    ]),

    selectOrderByField() {
      menuModal.showModal({
        menuItems: [{
            value: 'last_reply_at',
            title: this.$t('forum.orderType.last_reply_at')
          },
          {
            value: 'inserted_at',
            title: this.$t('forum.orderType.inserted_at')
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
          if (selectedItem.value != this.postsOrderByField) {
            this.setPostsOrderByField(selectedItem.value)
            this.resetScroller()
          }
        },
      })
    },

    resetScroller: function() {
      this.page = 0
      this.total = 1
      this.postList = []
      if (this.$refs.scroller) {
        this.$refs.scroller.$emit('reset')
      }
    },

    refresh: async function() {
      this.page = 0
      this.total = 1
      await this.loadmore()
    },

    loadmore: async function() {
      let result = await this.$acs.getPagedPost(this.page + 1, this.recordsPerPage, this.postsOrderByField,
        this.currentSectionId, this.$router.currentRoute.params.forumId)

      if (result.success) {
        this.postList = this.page == 0 ? result.posts : this.postList.concat(result.posts)
        this.total = result.total
        this.page = this.page + 1

        if (this.$refs.scroller && this.page >= this.total) {
          this.$refs.scroller.$emit('all-loaded')
        }
      }
    }

  },
}
</script>