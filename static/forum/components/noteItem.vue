<template>
  <div class="note-item">
    <div class="columns">
      <div class="column is-10" :class="{'clear-left': !itemData.headerTag.length}" @click="showDetail">
        <a v-for="item in itemData.headerTag" class="headerTag">{{item.name}}</a>
        <span class="note-title" v-html="filterKey"></span>
        <i v-if="itemData.hasPicture" class="fa fa-picture-o note-picture"></i>
        <a v-for="item in itemData.tailTag" class="tailTag" :class="{'excellent': item.isTag}">{{item.name}}</a>
      </div>
      <div class="column is-2 txt-right note-info">{{itemData.time}}</div>
    </div>
    <div class="columns">
      <div class="column is-10">
        <span class="author-name">{{itemData.author}}</span>
      </div>
      <div class="column is-2 txt-right note-info">{{itemData.noteCount}}</div>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    props:{
      tagBgColor:{
        type: String,
        default: '#f00',
      },
      tagColor:{
        type: String,
        default: '#fff',
      },
      itemData:{
        type: Object,
        default: null,
      },
    },
    computed: {
      ...mapGetters(['searchKey']),

      filterKey(){
        return this.itemData.title.replace(new RegExp(this.searchKey, 'g'), '<span class="red">'+this.searchKey+'</span>')
      }
    },

    methods: {
      showDetail(){
        this.$router.push(
          {
            name: 'detail',
            params: {id: this.itemData.noteId},
          }
        )
      }
    },
  }
</script>
<style lang="scss">
  @import "../scss/color";
  .note-picture {
    font-size: 1.3rem;
    vertical-align: middle !important;
    color: green;
  }
  
  .note-title {
    vertical-align: middle;
    font-size: 1rem;
    cocor: $black;
  }
  
  .note-title:hover {
    cursor: pointer;
  }
  
  .headerTag {
    font-weight: bold;
    border-radius: .3rem;
    vertical-align: middle !important;
    padding: .1rem;
    color: $white;
    margin-right: .5rem;
    font-size: .5rem;
    background-color: $red !important;
  }
  
  .tailTag {
    border-radius: .3rem;
    vertical-align: middle !important;
    padding: .1rem;
    color: $white;
    margin-right: .5rem;
    font-size: .5rem;
    background-color: $red !important;
  }
  
  .author-name {
    color: $link;
    font-size: .7rem;
  }
  
  .note-info {
    color: $dark;
    font-size: .7rem;
  }
  
  .excellent {
    background-color: $olive !important;
  }
  
  .red {
    color: #f00;
  }
  
  .note-item .column {
    padding-top: 0;
    padding-bottom: .2rem;
  }
</style>