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
        <option value="discussion">{{ $t('forum.main.discussion') }}</option>
        <option value="experience">{{ $t('forum.main.experience') }}</option>
        <option value="ras">{{ $t('forum.main.ras') }}</option>
        <option value="original">{{ $t('forum.main.original') }}</option>
        <option value="appeal">{{ $t('forum.main.appeal') }}</option>
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
import markdown from 'markdown'

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