<template>
  <div class="is-ancestor is-parent is-vertical ">
    <div class="is-child content-item" style="display: flex; flex-direction: row;">
      <div style="flex: 1;text-align: left;">
        <i class="fa fa-angle-left title is-2" style="color: #ccc;" aria-hidden="true" @click="$router.push({name:'forum'})"></i>
      </div>
      <div style="flex: 9;text-align: center;">
        <span class="title is-3">{{ $t('forum.newNote.title') }}</span>
      </div>
      <div style="flex: 1;">
      </div>
    </div>
    <hr class="horizontal-line" style="margin-top: .3rem;"></hr>
    <div class="column is-full" style="flex-direction: row; display: flex;">
      <select v-model="noteType">
        <option :value="$t('forum.main.discussion')">{{ $t('forum.main.discussion') }}</option>
        <option :value="$t('forum.main.experience')">{{ $t('forum.main.experience') }}</option>
        <option :value="$t('forum.main.ras')">{{ $t('forum.main.ras') }}</option>
        <option :value="$t('forum.main.original')">{{ $t('forum.main.original') }}</option>
        <option :value="$t('forum.main.appeal')">{{ $t('forum.main.appeal') }}</option>
      </select>
      <div v-show="!messageTip" class="column is-full red pointer" style="padding: 0 1rem;float:right; flex:1;text-align: right;">
        <span @click="onPreView">{{ pageView? $t('forum.newNote.editView'): $t('forum.newNote.preView') }}</span>
      </div>
    </div>
    <div v-show="!pageView">
      <div class="column is-full">
        <input class="note-new" v-model="title" :placeholder="$t('forum.newNote.titlePlaceholder')"></input>
      </div>
      <div class="column is-full" style="position: relative; padding-bottom: 0;">
        <textarea class="note-content" v-model="content" :placeholder="$t('forum.newNote.textAreaPlaceHolder')"></textarea>
        <i class="fa fa-file-image-o upload-img" aria-hidden="true" @click="uploadImg"></i>
      </div>
      <div v-show="messageTip" class="column is-full red" style="padding: 0 1rem;">
        <i class="fa fa-exclamation-circle " style="vertical-align: middle;" aria-hidden="true"></i>
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
      let imgstr = this.imgs.map(
        function(){

        }
      )
      return marked('# 【'+this.noteType+'】'+this.title+' \n ![no img](http://img0.imgtn.bdimg.com/it/u=3156638004,2702203078&fm=23&gp=0.jpg) \n# '+this.content)
    }
  },

  data() {
    return{
      noteType: this.$t('forum.main.discussion'),
      title: '',
      content: '',
      imgs: [],
      pageView: false,
    }
  },

  methods: {
    uploadImg(){

    },
 
    onPreView(){
      this.pageView = !this.pageView
    }
  }
}
</script>
<style lang="scss">
  @import "../scss/forum";
  .note-new {
    padding: .3rem .5rem;
    width: 100%;
  }
  
  .note-content {
    padding-left: .5rem;
    width: 100%;
    height: 50vh;
    resize: vertical;
  }
  
  .new-note {
    color: $white !important;
    background: $primary !important;
    width: 15rem;
  }
  
  .upload-img {
    cursor: pointer;
    font-size: 1.5rem !important;
    position: absolute;
    bottom: 1rem;
    left: 1.5rem;
  }
  .pre-view{
    border: 1px solid $dark;
    margin: auto 1rem;
  }
</style>