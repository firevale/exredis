<template>
  <div class="is-ancestor is-parent is-vertical ">
    <div class="is-child fixed-top  row-line">
      <div class="arrow-back" style="left: 1rem;">
        <i class="fa fa-angle-left title is-2 dark" aria-hidden="true" @click="$router.go(-1)"></i>
      </div>
      <div class="row-line top-title">
        <span class="title is-4">{{ $t('forum.newNote.title') }}</span>
      </div>
    </div>
    <div class="scroll-box">
      <div class="column is-full">
        <div class="pointer">
          <span class="dark" @click="orderChoose">{{ noteOrderTypeStr }}</span>
          <i class="fa fa-caret-down dark" style="font-size: 1.5rem;" aria-hidden="true"></i>
          <i class="fa fa-search-plus dark" aria-hidden="true" style="margin: .3rem 0 0 2rem;"></i>
          <span class="pointer dark" @click="preview()">{{ $t('forum.newNote.preView') }}</span>
        </div>
        <div v-show="!messageTip" class="column is-full red pointer">
          <span @click="onPreView">{{ pageView? $t('forum.newNote.editView'): $t('forum.newNote.preView') }}</span>
        </div>
      </div>
      <div v-show="!pageView">
        <div class="column is-full" style="padding-bottom: 0;padding-top: 0;">
          <input class="note-new" maxlength="50" v-model="title" :placeholder="$t('forum.newNote.titlePlaceholder')"></input>
        </div>
        <div class="column is-full" style="position: relative; padding-bottom: 0;">
          <textarea class="note-content" maxlength="500" v-model="content" :placeholder="$t('forum.newNote.textAreaPlaceHolder')"></textarea>
          <div class="upload-img">
            <i class="fa fa-file-image-o " aria-hidden="true" @click="uploadImg"></i>
            <span v-show="imgs.length" class="img-count" @click="preview">{{ imgs.length }}</span>
          </div>
        </div>
        <div v-show="messageTip" class="column is-full red" style="padding: 0 1rem;">
          <i class="fa fa-exclamation-circle " style="vertical-align: middle;" aria-hidden="true" @click="uploadImg"></i>
          <span>{{messageTip}}</span>
        </div>
      </div>
      <div class="column is-full" style="text-align: center;">
        <a class="button new-note">{{ $t('forum.newNote.btnTxt') }}</a>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import noteItemDetail from '../components/noteItemDetail.vue'
  import menuModal from '../components/menuModal'
  import pagination from '../components/pagination.vue'
  import upload from '../components/fileUpload'
  import {
    preViewNote
  } from '../components/preView'
  import utils from '../common/utils'

  var marked = require('marked');
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
  });

  export default {
    mounted() {

    },

    components: {

    },
    computed: {
      ...mapGetters(['userInfo']),

      messageTip() {
        if (!this.title) {
          return this.$t('forum.newNote.requireTitle')
        } else if (!this.content) {
          return this.$t('forum.newNote.requireContent')
        } else {
          return ""
        }
      },

      markdownToHtml() {
        let imgstr = '';
        this.imgs.map(
          function (e) {
            imgstr += '![no img](' + e.url + ') '
          }
        )
        return marked('# 【' + this.noteOrderTypeStr + '】' + this.title + ' \n ' + imgstr + ' \n# ' + this.content)
      }
    },

    data() {
      return {
        title: '',
        content: '',
        imgs: [{
            id: '001',
            url: 'http://img4.imgtn.bdimg.com/it/u=2189848546,1084553826&fm=23&gp=0.jpg'
          },
          {
            id: '002',
            url: 'http://img2.imgtn.bdimg.com/it/u=2047126277,2804394883&fm=23&gp=0.jpg'
          }
        ],
        pageView: false,
        noteOrderTypeStr: this.$t('forum.main.discussion'),
      }
    },

    methods: {
      uploadImg() {
        upload.showModal({
          action: 'http://zhangshiqing.firevale.com:3000/uploadImage',
          headers: this.requestHeaders,
          accept: 'image/*',
          extensions: 'png,jpg,gif',
          title: '上传图片',
          callback: response => {
            if (typeof response == 'object') {
              if (response.code == 0) {
                this.imgs.push(response.data)
              } else {
                //error
              }
            } else {
              //error
            }
          },
        })
      },

      deleteUploadImg(imgId) {
        //this.$http();
        for (var i = 0; i < this.imgs.length; i++) {
          if (this.imgs[i].id == imgId) {
            this.imgs.splice(i, 1);
            break;
          }
        }
      },

      onPreView() {
        this.pageView = !this.pageView
      },

      orderChoose() {
        menuModal.showModal([{
            name: '综合讨论',
            code: 'discussion'
          },
          {
            name: '攻略心得',
            code: 'experience'
          },
          {
            name: '转帖分享',
            code: 'ras'
          },
          {
            name: '玩家原创',
            code: 'original'
          },
          {
            name: '问题求助',
            code: 'appeal'
          }
        ], this.onOrderTypeChoose, this.noteOrderTypeStr)
      },

      onOrderTypeChoose(type) {
        this.noteOrderTypeStr = type.name
      },

      preview() {
        preViewNote({
          visible: true,
          deleteImgFunc: this.deleteUploadImg,
          item: {
            level: this.userInfo.level,
            rank: '',
            portrait: this.userInfo.portrait,
            title: this.replyTitle,
            time: utils.getNowFormatDate(),
            author: this.userInfo.userName,
            img: this.imgs,
            description: this.content,
          },
        })
      },

    }
  }
</script>