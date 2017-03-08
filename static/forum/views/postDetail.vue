<template>
<div>
  <div ref="scrollBox" class="is-chid scroll-box" @scroll="onScroll" style="padding: 0 .5rem 0 .5rem;">
    <post-detail-view v-for="item,index in displayList" @toggle-floorHost="toggleFloorHost" :item-data="item"
      :item-index="index"></post-detail-view>
    <div v-if="displayList&&displayList.length" class="column is-full" style="padding-right: 0;padding-left: 0;"
      v-show="searchPageCount > 1">
      <pagination ref="pag" :page-count="searchPageCount" :current-page="searchCurrentPage" @switch-page="freshListByPage"></pagination>
    </div>
  </div>
  <div v-show="canBackTop" class="back-top" @click="onBackTop">
    <i class="fa fa-caret-up" aria-hidden="true"></i> {{ $t('forum.detail.goBack') }}
  </div>
</div>
</template>
<script>
import postDetailView from '../components/postDetailView.vue'
import menuModal from '../components/menuModal'
import pagination from '../components/pagination.vue'

export default {
  mounted() {
    this.displayList = this.detailList.slice(0)
  },

  components: {
    postDetailView,
    pagination,
  },
  computed: {
    postId() {
      return this.$router.currentRoute.params.id
    },
    canBackTop() {
      return this.scrollPosition > 0
    }
  },
  data() {
    return {
      scrollPosition: 0,
      searchPageCount: 10,
      searchCurrentPage: 1,
      detailList: [{
          ID: 'note_001',
          level: 'LV1. 烟雨游友',
          rank: '楼主',
          portrait: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3293038046,4198898802&fm=21&gp=0.jpg',
          collection: false,
          title: '[游戏攻略] 游戏攻略-奶妈培养推荐-蝴蝶精分析-御魂攻略',
          time: '2016-10-10 17:56:16',
          author: '火谷测试',
          description: ''
        },
        {
          level: 'LV3. 妙语书生',
          rank: '沙发',
          portrait: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3293038046,4198898802&fm=21&gp=0.jpg',
          title: '',
          time: '2016-10-10 18:56:26',
          author: 'zsq',
          description: '谢谢楼主分享',
        },
        {
          level: 'LV2. 杏坛小葩',
          rank: '板凳',
          portrait: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3293038046,4198898802&fm=21&gp=0.jpg',
          title: '',
          time: '2016-10-10 19:36:46',
          author: 'llw',
          description: '抢沙发',
        },
        {
          level: 'LV1. 烟雨游友',
          rank: '4楼',
          portrait: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3293038046,4198898802&fm=21&gp=0.jpg',
          title: '',
          time: '2016-10-10 19:36:46',
          author: '火谷测试',
          description: '抢沙发',
        },
      ],
      displayList: [],
    }
  },

  methods: {
    loadNoteDetail(page) {
      this.$http({
          method: 'post',
          url: '/detail?id=' + this.postId + 'page=' + page,
          params: {

          }
        })
        .then(response => {
          //this.noteList = response.json()
        })
        .then(result => {
          if (result.success) {
            this.setSearchCurrentPage(page);
          } else {

          }
        })
    },

    replyNote() {
      this.$router.push({
        name: 'replyNote',
        params: {
          id: this.postId,
          title: this.detailList[0].title
        }
      })
    },

    onBackTop() {
      this.$refs.scrollBox.scrollTop = 0;
    },

    onScroll(e) {
      this.scrollPosition = e.target.scrollTop
    },

    toggleFloorHost(author) {
      if (this.displayList && this.displayList.length && this.displayList.length != this.detailList
        .length) {
        this.displayList = this.detailList.slice(0)
      } else {
        this.displayList = this.detailList.filter(function(item) {
          if (item.author == author) {
            return true
          }
        })
      }
    },

    freshListByPage(page = 1) {
      this.loadNoteDetail(page)
    },
  }
}
</script>
