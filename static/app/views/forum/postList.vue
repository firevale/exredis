<template>
  <div>
    <div class="flex-fixed-size has-bottom-line">
      <div class="tab-bar">
        <span class="icon image-icon icon-pull-down" @click="selectOrderByField"></span>
        <span class="seperator"></span>
        <div class="tile">
          <v-touch @tap="setCurrentSectionId(0)" class="button" :class="currentSectionId == 0 ? 'is-primary' : 'is-grey'" tag="a">
            {{ $t('forum.postList.all') }}
          </v-touch>
          <v-touch v-for="section in forumInfo.sections" @tap="setCurrentSectionId(section.id)" class="button" :key="section.id" :class="currentSectionId == section.id ? 'is-primary' : 'is-grey'"
            tag="a">
            {{ section.title }}
          </v-touch>
        </div>
      </div>
    </div>
    <div class="flex-take-rest" style="position: relative">
      <scroller :on-refresh="refresh" :on-load-more="loadmore" ref="scroller">
        <post-list-item class="row" v-for="item in postList" :key="item.id" :post-info="item">
        </post-list-item>
      </scroller>
    </div>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import scroller from 'common/components/scroller'
import postListItem from '../../components/postListItem'
import menuModal from '../../components/menuModal'

export default {
  components: {
    scroller,
    postListItem,
  },

  watch: {
    'currentSectionId' (newVal, oldVal) {
      if (oldVal != newVal) {
        this.$nextTick(_ => this.resetScroller())
      }
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
      recordsPerPage: 20,
      loading: false,
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
      this.loading = true

      // cancel last get paged post if we're requesting 
      this.$acs.cancelGetPagedPost()

      let result = await this.$acs.getPagedPost({
        page: this.page + 1,
        records_per_page: this.recordsPerPage,
        order: this.postsOrderByField,
        section_id: this.currentSectionId,
        forum_id: this.$router.currentRoute.params.forumId
      })

      if (result.success) {
        this.postList = (this.page == 0 ? (result.posts || []) : this.postList.concat(result.posts))
        this.total = result.total
        this.page = this.page + 1

        if (this.$refs.scroller && this.page >= this.total) {
          this.$refs.scroller.$emit('all-loaded')
        }
      } else {
        // canceled or network error
        this.$refs.scroller.$emit('all-loaded')
      }

      this.loading = false
    }

  },
}
</script>