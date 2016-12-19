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
    <div class="is-chid content-item">
      <select>
        <option value="volvo">综合讨论</option>
        <option value="saab">攻略心得</option>
        <option value="mercedes">转帖分享</option>
        <option value="audi">玩家原创</option>
        <option value="audi">问题求助</option>
      </select>
    </div>
    <div class="column is-full">
     
    </div>
    <div class="column is-full">
      
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
  .reply-btn {
    width: 100%;
    color: $white;
    font-size: 1rem;
    padding: .4rem;
    background: $primary;
  }
</style>