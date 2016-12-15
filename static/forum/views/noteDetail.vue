<template>
  <div class="is-ancestor is-parent is-vertical ">
    <div class="is-child content-item" style="display: flex; flex-direction: row;">
      <div style="flex: 1;text-align: right;">
        <i class="fa fa-angle-left title is-2" style="color: #ccc;" aria-hidden="true" @click="$router.push({name:'forum'})"></i>
      </div>
      <div  style="flex: 9;text-align: center;">
        <span class="title is-3">{{ $t('forum.detail.title') }}</span>
      </div>
      <div style="flex: 1;">
        <input type="button" class="search-btn" style="width: 100%;" :value="$t('forum.detail.replyBtn')" @click="replyNote"></input>
      </div>
    </div>
    <hr class="horizontal-line" style="margin-top: .3rem;"></hr>
    <div  class="is-chid content-item">
      <note-item-detail ></note-item-detail>
    </div>
    <div v-if="detailList&&detailList.length" class="column is-full" v-show="searchPageCount > 1" style="">
      <pagination ref="pag" :page-count="searchPageCount" :current-page="searchCurrentPage"></pagination>
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
    noteItemDetail,
  },

  data() {
    return {
      detailList:[],
    }
  },

  methods: {
    replyNote(){

    },

  }
}
</script>
<style lang="scss">
  @import "../scss/forum";
</style>