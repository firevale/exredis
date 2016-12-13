<template>
  <div class="note-item">
    <div class="columns">
      <div class="column is-10" :class="{'clear-left': !itemData.headerTag.length}">
        <a v-for="item in itemData.headerTag" class="headerTag" >{{item.name}}</a>
        <span class="note-title">{{itemData.title}}</span>
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
      }
    },
  }
</script>
<style lang="scss">
  @import "../scss/color";

  .note-picture{
    font-size: 1.4rem;
    vertical-align: middle;
    color: green;
  }

  .note-title{
    vertical-align: middle;
    font-size: 1.4rem;
    cocor: $black;
  }

  .note-title:hover{
    cursor: pointer;
  }

  .headerTag{
    font-weight: bold;
    border-radius: .3rem;
    vertical-align: middle;
    padding: .3rem;
    color: $white;
    margin-right: .5rem;
    font-size: .6rem;
    background-color: $red !important;
  }

  .tailTag{
    border-radius: .3rem;
    vertical-align: middle;
    padding: .3rem;
    color: $white;
    margin-right: .5rem;
    font-size: .6rem;
    background-color: $red !important;
  }

  .author-name{
    color: $link;
    font-size: 1rem;
  }

  .note-info{
    color: $dark;
    font-size: 1rem;
  }
  
  .excellent{
    background-color: $olive !important;
  }
</style>