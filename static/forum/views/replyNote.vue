<template>
  <div class="is-ancestor is-parent is-vertical ">
    <div class="is-child content-item rowLine">
      <div style="flex: 1;text-align: left;">
        <i class="fa fa-angle-left title is-3 dark" aria-hidden="true" @click="goBack"></i>
      </div>
      <div class="rowLine top-title">
        <span class="title is-5">{{ $t('forum.replyNote.title') }}</span>
      </div>
      <div style="flex: 1;">
      </div>
    </div>
    <hr class="horizontal-line" style="margin-top: .3rem;"></hr>
    <div v-show="!pageView">
      <div class="column is-full">
        {{ replyTitle }}
        <i v-show="!messageTip" class="fa fa-search-plus red" aria-hidden="true" style="margin: .3rem 0 0 2rem;"></i>
        <span class="red pointer" v-show="!messageTip" @click="preview()">{{ $t('forum.newNote.preView') }}</span>
      </div>
      <div class="column is-full" style="position: relative; padding-bottom: 0;">
        <textarea class="note-content" maxlength="500" v-model="content" :placeholder="$t('forum.newNote.textAreaPlaceHolder')"></textarea>
        <div class="upload-img">
          <i class="fa fa-file-image-o " aria-hidden="true" @click="uploadImg"></i>
          <div class="img-item" v-for="item in imgs">
            <span>{{item.id}}</span>
            <img class="shot-img" :src="item.url"></img>
            <i class="fa fa-times red" style="vertical-align: middle;" aria-hidden="true" @click="deleteUploadImg(item.id)"></i>
          </div>
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
      replyTitle() {
        return this.$t('forum.replyNote.title') + ':' + this.$router.currentRoute.params.title
      },

      messageTip() {
        if (!this.content) {
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
        return marked('# ' + this.replyTitle + ' \n ' + imgstr + ' \n# ' + this.content)
      }
    },

    data() {
      return {
        title: '',
        content: '',
        imgs: [
          {id: '001', url:'http://img4.imgtn.bdimg.com/it/u=2189848546,1084553826&fm=23&gp=0.jpg'},
          {id: '002', url:'http://img2.imgtn.bdimg.com/it/u=2047126277,2804394883&fm=23&gp=0.jpg'}
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

      goBack() {
        this.$router.push({
          name: 'forum'
        })
      },

      preview() {
        preViewNote({
          visible: true,
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