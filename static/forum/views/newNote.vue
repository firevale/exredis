<template>
  <div class="is-ancestor is-parent is-vertical ">
    <div class="is-child content-item rowLine">
      <div style="flex: 1;text-align: left;">
        <i class="fa fa-angle-left title is-3 dark" aria-hidden="true" @click="$router.push({name:'forum'})"></i>
      </div>
      <div class="rowLine top-title">
        <span class="title is-5">{{ $t('forum.newNote.title') }}</span>
      </div>
      <div style="flex: 1;">
      </div>
    </div>
    <hr class="horizontal-line"></hr>
    <div class="column is-full" style="flex-direction: row; display: flex;">
      <div class="pointer" @click="orderChoose">
        <span class="dark">{{ noteOrderTypeStr }}</span>
        <i class="fa fa-caret-down title is-4 dark" aria-hidden="true" style="vertical-align: middle;"></i>
      </div>
      <div v-show="!messageTip" class="column is-full red pointer" style="padding: 0 1rem;float:right; flex:1;text-align: right;">
        <span @click="onPreView">{{ pageView? $t('forum.newNote.editView'): $t('forum.newNote.preView') }}</span>
      </div>
    </div>
    <div v-show="!pageView">
      <div class="column is-full">
        <input class="note-new" v-model="title" :placeholder="$t('forum.newNote.titlePlaceholder')"></input>
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
    <div v-show="pageView" class="column pre-view" v-html="markdownToHtml"></div>
    <div class="column is-full" style="text-align: center;">
      <a class="button new-note">{{ $t('forum.newNote.btnTxt') }}</a>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import noteItemDetail from '../components/noteItemDetail.vue'
import menuModal from '../components/menuModal'
import pagination from '../components/pagination.vue'
import upload from '../components/fileUpload'

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
  mounted(){
    
  },

  components: {
    
  },
  computed:{
    messageTip(){
      if(!this.title){
        return this.$t('forum.newNote.requireTitle')
      }else if(!this.content){
        return this.$t('forum.newNote.requireContent')
      }else {
        return ""
      }
    },

    markdownToHtml(){
      let imgstr = '';
      this.imgs.map(
        function(e){ 
          imgstr+='![no img]('+e.url+') '
        }
      )
      return marked('# 【'+this.noteOrderTypeStr+'】'+this.title+' \n '+imgstr+' \n# '+this.content)
    }
  },

  data() {
    return{
      title: '',
      content: '',
      imgs: [],
      pageView: false,
      noteOrderTypeStr: this.$t('forum.main.discussion'),
    }
  },

  methods: {
    uploadImg(){
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

    deleteUploadImg(imgId){
      //this.$http();
      for(var i=0;i<this.imgs.length;i++){
        if(this.imgs[i].id==imgId){
          this.imgs.splice(i,1);
          break;
        }
      }
    },

    onPreView(){
      this.pageView = !this.pageView
    },

    orderChoose(){
      menuModal.showModal([
          {name: '综合讨论', code: 'discussion'},
          {name: '攻略心得', code: 'experience'},
          {name: '转帖分享', code: 'ras'},
          {name: '玩家原创', code: 'original'},
          {name: '问题求助', code: 'appeal'}], this.onOrderTypeChoose, this.noteOrderTypeStr)
    },

    onOrderTypeChoose(type){
      this.noteOrderTypeStr= type.name
    },

  }
}
</script>
