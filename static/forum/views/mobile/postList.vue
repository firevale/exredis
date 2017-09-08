<template>
  <div class="list-page">
    <slider-nav class="has-divider" :menus="sections" ref="nav"></slider-nav>
    <div class="card top-article has-divider">
      <div class="card-content">
        <v-touch class="article">
          <p class="title is-ellipsis"> <i class="icon icon-top" />如何评价 LPL夏季总决赛 EDG 夏季总决赛 EDG vs RNG 3:2 胜利？</p>
        </v-touch>
        <v-touch class="article">
          <p class="title is-ellipsis"> <i class="icon icon-top" />如何评价 LPL夏季总决赛 EDG 夏季总决赛 EDG vs RNG 3:2 胜利？</p>
        </v-touch>
        <v-touch class="article">
          <p class=" title is-ellipsis"> <i class="icon icon-top" />如何评价 LPL夏季总决赛 EDG 夏季总决赛 EDG vs RNG 3:2 胜利？</p>
        </v-touch>
        <div class="">
          <a class="button load-more">查看更多</a>
        </div>
      </div>
    </div>
    <div class="card has-divider">
      <header class="card-header">
        <p class="card-header-title">
          全部 | 热门 | 精品
        </p>
      </header>
      <div class="card-content">
        <router-link class="article" :to="{name: 'list'}" tag="div">
          如何评价 LPL 夏季总决赛 EDG vs RNG 3:2 胜利？ <i class="icon icon-hot" /><i class="icon icon-vie" />
          <div class="thumbs">
            <img class="thumb" src="https://placehold.it/380x214?text=380x214">
            <img class="thumb" src="https://placehold.it/380x214?text=380x214">
            <img class="thumb" src="https://placehold.it/380x214?text=380x214">
          </div>
          <div class="article-footer">
            <figure class="author">
              <img src="~assets/themes/jqxs_mobile/2-5_03_03.png">
            </figure>
            <p class="footer-left subtitle">
              firevale-城岸
              <br/> 2017-06-28 17:56
            </p>
            <p class="footer-right subtitle">回复/查看 110/1000 </p>
          </div>
        </router-link>
        <router-link class="article" :to="{name: 'list'}" tag="div">
          如何评价 LPL 夏季总决赛 EDG vs RNG 3:2 胜利？ <i class="icon icon-hot" /><i class="icon icon-vie" />
          <div class="thumbs">
            <img class="thumb" src="https://placehold.it/380x214?text=380x214">
            <img class="thumb" src="https://placehold.it/380x214?text=380x214">
            <img class="thumb" src="https://placehold.it/380x214?text=380x214">
          </div>
          <div class="article-footer">
            <figure class="author">
              <img src="~assets/themes/jqxs_mobile/2-5_03_03.png">
            </figure>
            <p class="footer-left subtitle">
              firevale-城岸
              <br/> 2017-06-28 17:56
            </p>
            <p class="footer-right subtitle">回复/查看 110/1000 </p>
          </div>
        </router-link>
        <router-link class="article" :to="{name: 'list'}" tag="div">
          如何评价 LPL 夏季总决赛 EDG vs RNG 3:2 胜利？ <i class="icon icon-hot" /><i class="icon icon-vie" />
          <div class="thumbs">
            <img class="thumb" src="https://placehold.it/380x214?text=380x214">
            <img class="thumb" src="https://placehold.it/380x214?text=380x214">
            <img class="thumb" src="https://placehold.it/380x214?text=380x214">
          </div>
          <div class="article-footer">
            <figure class="author">
              <img src="~assets/themes/jqxs_mobile/2-5_03_03.png">
            </figure>
            <p class="footer-left subtitle">
              firevale-城岸
              <br/> 2017-06-28 17:56
            </p>
            <p class="footer-right subtitle">回复/查看 110/1000 </p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import sliderNav from 'forum/components/sliderNav'
import menuModal from '../../components/menuModal'

export default {
  components: {
    sliderNav,
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
      sections: [{
          text: "综合讨论",
          value: 'commonIssues'
        }, {
          text: "综合讨论",
          value: 'commonIssues1'
        },
        {
          text: "综合讨论",
          value: 'commonIssues2'
        },
        {
          text: "综合讨论",
          value: 'commonIssues3'
        }
      ]
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