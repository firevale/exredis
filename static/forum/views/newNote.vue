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
    <div class="column is-full">
      <select>
        <option value="volvo">综合讨论</option>
        <option value="saab">攻略心得</option>
        <option value="mercedes">转帖分享</option>
        <option value="audi">玩家原创</option>
        <option value="audi">问题求助</option>
      </select>
    </div>
    <div class="column is-full">
        <input class="note-new" :placeholder="$t('forum.newNote.titlePlaceholder')"></input>
    </div>
    <div class="column is-full">
        <textarea class="note-content" :placeholder="$t('forum.newNote.textAreaPlaceHolder')"></textarea>
    </div>
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
export default {
  components: {
   
  },
  computed:{
    
  },
  data() {
    return{}
  },

  methods: {

  }
}
</script>
<style lang="scss">
  @import "../scss/forum";
  .note-new{
      width: 100%;
  }

  .note-content{
      width: 100%;
      height: 15rem;
      resize: vertical;
  }
  .new-note{
      color: $white !important;
      background: $primary !important;
      width: 15rem;
      
  }
</style>