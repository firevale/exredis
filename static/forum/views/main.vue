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
      <a class="button create-note" @click="$router.push({name:'newNote'})">{{ $t('forum.main.newNote') }}</a>
    </div>
  </div>
  <div class="scroll-box">
    <div class="tile content-item">
      <div class="tile control" style="margin-bottom: 0;" v-for="section in forumInfo.sections">
        <a class="button" :class="{'is-active': noteLoadType==section.id}" @click="setNoteLoadType(section.id)">{{section.title}}</a>
      </div>
      <div class="pointer" @click="orderChoose">
        <span>{{ noteOrderTypeStr }}</span>
        <i class="fa fa-caret-down title is-3" aria-hidden="true" style="vertical-align: middle;"></i>
      </div>
    </div>
    <div class="box is-chid is-parent content-item" style="padding: 0;">
      <note-item v-for="item in noteList" :key="item.id" :item-data="item"></note-item>
    </div>
    <div class="column is-full" v-show="notePageCount > 1">
      <pagination ref="pag" :page-count="notePageCount" :current-page="noteCurrentPage"></pagination>
    </div>
  </div>
</div>
</template>
<script>
import 'forum/scss/forum.scss'
import {
  mapGetters,
  mapActions
} from 'vuex'
import noteItem from '../components/noteItem.vue'
import menuModal from '../components/menuModal'
import pagination from '../components/pagination.vue'
export default {
  components: {
    noteItem,
    pagination,
  },

  mounted: function() {
    this.$refs.pag.$on('switch-page', this.refreshPage)
    this.getForumInfo()
    this.refreshPage()
  },

  watch: {
    'noteLoadType' (newVal, oldVal) {
     this.refreshPage()
    }
  },

  computed: {
    ...mapGetters([
      'noteLoadType',
      'noteLoadUrl',
      'noteOrderType',
      'noteOrderTypeStr',
      'notePageCount',
      'noteCurrentPage',
      'forumInfo'
    ]),
  },

  data() {
    return {
      noteList: [{
          id: '',
          headerTag: [{
            name: '置顶',
            bgColor: '#f00',
            color: '#fff'
          }, ],
          title: '【游戏攻略】新手练级指南',
          hasPicture: true,
          tailTag: [{
              name: '精',
              bgColor: '#ff0',
              color: '#fff',
              isTag: true
            },
            {
              name: 'HOT',
              bgColor: '#f00',
              color: '#fff'
            },
          ],
          author: '火谷测试',
          time: '2分钟前',
          noteCount: '2/11',
        },
        {
          id: '',
          headerTag: [

          ],
          title: '【问题求助】游戏一只闪退肿么破？？',
          hasPicture: false,
          tailTag: [

          ],
          author: '游客',
          time: '1小时前',
          noteCount: '0/0',
        },
        {
          id: '',
          headerTag: [

          ],
          title: '【BUG反馈】副本闪退',
          hasPicture: true,
          tailTag: [{
            name: 'HOT',
            bgColor: '#f00',
            color: '#fff'
          }, ],
          author: '火谷测试',
          time: '一天前',
          noteCount: '2/11',
        },
        {
          id: '',
          headerTag: [{
            name: '置顶',
            bgColor: '#f00',
            color: '#fff'
          }, ],
          title: '【玩家原创】新手练级指南',
          hasPicture: true,
          tailTag: [{
            name: '精',
            bgColor: '#ff0',
            color: '#fff',
            isTag: true
          }, ],
          author: '火谷测试',
          time: '2016-11-1 21:06',
          noteCount: '22/133',
        },
        {
          id: '',
          headerTag: [

          ],
          title: '【玩家原创】新手练级指南',
          hasPicture: true,
          tailTag: [{
            name: '精',
            bgColor: '#ff0',
            color: '#fff',
            isTag: true
          }, ],
          author: '火谷测试',
          time: '2016-10-11 14:06',
          noteCount: '22/433',
        },
      ]
    }
  },

  methods: {
    ...mapActions([
      'setNoteLoadType',
      'setNoteOrderType',
      'setNotePageCount',
      'setNoteCurrentPage',
      'updateForum'
    ]),

    orderChoose() {
      menuModal.showModal(null, this.onOrderTypeChoose, this.noteOrderTypeStr)
    },

    onOrderTypeChoose(type) {
      this.setNoteOrderType(type)
      this.refreshPage()
    },

    getForumInfo: async function(forum_id=1){
        try {
          let result = await this.$acs.getForumInfo(forum_id)
          if (result.success) {
            this.updateForum(result.forum)
          } else {
            this.setErrorMessage(this.$t(result.message))
          }
        } catch (e) {
          this.setErrorMessage(this.$t('forum.error.networkError'))
        }
    },

    refreshPage: async function(page=1,records_per_page=10,order="id") {
      if (!this.processing) {
        this.processing = true
        try {
          let result = await this.$acs.getPagedPost(page,records_per_page,order)
          if (result.success) {
            alert(result.posts)
          } else {
            this.setErrorMessage(this.$t(result.message))
          }
        } catch (e) {
          this.setErrorMessage(this.$t('forum.error.networkError'))
        }
        this.processing = false
      }
    }

  },
}
</script>
