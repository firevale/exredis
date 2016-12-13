<template>
  <div class="is-ancestor is-parent is-vertical ">
    <div class="control is-child columns content-item">
      <span class="column is-3 ">
        <i class="fa fa-angle-left title is-2" style="color: #A6A6A6;" aria-hidden="true"></i>
      </span>
      <span class="column is-6" style="margin-bottom: 0; text-align: center;">
        <span class="title is-3">游戏论坛</span>
      </span>
      <span class="column is-3 txt-right clear-right">
        <i class="fa fa-search title is-3" style="margin-right: 2rem;" aria-hidden="true"></i>
        <i class="fa fa-user title is-3" style="margin-right: 2rem;" aria-hidden="true"></i>
        <a class="button txt-right" style="color: black;">发帖</a>
      </span>
      
    </div>
    <hr class="horizontal-line"></hr>
    <div class="tile is-chid content-item">
      <div class="tile control">
        <a class="button is-active">全部</a>
        <a class="button">综合讨论</a>
        <a class="button">攻略心得</a>
        <a class="button">转帖分享</a>
        <a class="button">玩家原创</a>
        <a class="button">问题求助</a>
      </div>
      <div class="control">
        <span>发帖时间排序</span>
        <i class="fa fa-caret-down title is-2" aria-hidden="true" style="vertical-align: middle;"></i>
      </div>
    </div>
    <div class="box is-chid is-parent content-item" style="padding-left: 0;padding-right: 0;">
      <note-item v-for="item in notList" :item-data="item"></note-item>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import noteItem from '../components/noteItem.vue'

export default {
  components: {
    noteItem,    
  },

  computed: {
    ...mapGetters(['colors']),
  },

  data(){
    return {
      notList:[
        {
            headerTag:[
              {name: '置顶', bgColor: '#f00', color: '#fff'},
              {name: '推荐', bgColor: '#0f0', color: '#fff'},
              ],
            title: '【游戏攻略】新手练级指南',
            hasPicture: true,
            tailTag:[
              {name: '精', bgColor: '#ff0', color: '#fff', isTag: true},
              {name: 'HOT', bgColor: '#f00', color: '#fff'},
            ],
            author: '火谷测试',
            time: '2分钟前',
            noteCount: '2/11',
        },
        {
            headerTag:[
              
            ],
            title: '【问题求助】游戏一只闪退肿么破？？',
            hasPicture: false,
            tailTag:[
            
            ],
            author: '游客',
            time: '1小时前',
            noteCount: '0/0',
        },
        {
            headerTag:[
              
            ],
            title: '【BUG反馈】副本闪退',
            hasPicture: true,
            tailTag:[
              {name: 'HOT', bgColor: '#f00', color: '#fff'},
            ],
            author: '火谷测试',
            time: '一天前',
            noteCount: '2/11',
        },
        {
            headerTag:[
              {name: '置顶', bgColor: '#f00', color: '#fff'},
              ],
            title: '【玩家原创】新手练级指南',
            hasPicture: true,
            tailTag:[
              {name: '精', bgColor: '#ff0', color: '#fff', isTag: true},
            ],
            author: '火谷测试',
            time: '2016-11-1 21:06',
            noteCount: '22/133',
        },
        {
            headerTag:[
              
              ],
            title: '【玩家原创】新手练级指南',
            hasPicture: true,
            tailTag:[
              {name: '精', bgColor: '#ff0', color: '#fff', isTag: true},
            ],
            author: '火谷测试',
            time: '2016-10-11 14:06',
            noteCount: '22/433',
        },
      ]
    }
  }
}
</script>
<style lang="scss">
  @import "../scss/forum";
</style>