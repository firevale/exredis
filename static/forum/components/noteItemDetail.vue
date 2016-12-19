<template>
  <div class="note-detail">
    <div class="columns">
      <div class="column">
        <figure class="image is-64x64" style="margin: auto;border-radius:50%;border: 1px solid;overflow: hidden;">
          <img src="http://placehold.it/64x64"></img>
        </figure>
        <div class="title is-6 txt-center" style="margin-top: 1rem; margin-bottom: 1rem;">{{itemData.level}}</div>
        <div class="title is-6 txt-center">{{itemData.rank}}</div>
      </div>
      <div class="column is-10">
        <div v-if="itemData.title" class="columns" style="margin: 0;">
          <div class="column is-10 title is-5 detail-title">
            {{itemData.title}}
          </div>
          <div class="column is-2" style="text-align: right;">
            <span v-if="itemData.rank == $t('forum.detail.author')" class="follow-btn">{{$t('forum.detail.follow')}}</span>
          </div>
        </div>
        <div class="column detail-info">
          <span class="note-time">{{ itemData.time }}</span>
          <span class="note-author">{{ itemData.author }}</span>
          <span v-if="itemData.rank != $t('forum.detail.author')" class="note-delete" @click="deleteFollowNote">{{ $t('forum.detail.delete') }}</span>
        </div>
        <div v-if="itemData.img&&itemData.img.length" class="column detail-imgs">
          <figure v-for="item in itemData.img" class="image is-128x128">
            <img src="item.src"></img>
          </figure>
        </div>
        <div class="column" v-html="itemData.description">
        </div>
        <div v-if="itemData.rank == $t('forum.detail.author')" class="column pointer">
          <i class="fa fa-heart" :class="{'red': itemData.collection }" style="vertical-align: middle;"></i>
          <span>{{ itemData.collection? $t('forum.detail.cancelCollection'): $t('forum.detail.collection') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import AlertDialog from './alertDialog'
  export default {
    props:{
      itemData:{
        type: Object,
        default: null,
      },
    },
    computed: {
      
    },
    methods: {
      deleteFollowNote(){
        AlertDialog.showModal({message: this.$t('forum.detail.deleteTip'),onOk: this.onOK,onCancel: this.onCancel})
      },

      onOK(){

      },
      onCancel(){

      }

    }
  }
</script>
<style lang="scss">
  @import "../scss/color";
  .follow-btn {
    padding: .2rem;
    cursor: pointer;
    color: $white;
    background-color: $link;
  }
  
  .detail-title {
    margin: 0 !important;
    font-weight: bold;
  }
  
  .detail-info {
    padding-top: 0;
  }
  
  .detail-imgs {}
  
  .is-256x256 {
    width: 256px;
    height: 256px;
  }
  
  .note-author {
    color: $link;
  }
  
  .note-delete {
    color: $red;
    margin-left: 2rem;
    cursor: pointer;
  }
  
  .red {
    color: $red;
  }
</style>