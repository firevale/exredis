<template>
  <div class="is-ancestor is-parent is-vertical ">
    <div class="is-child content-item" style="text-align: center;position: relative;padding-bottom: 1rem;">
      <div class="arrow-back">
        <i class="fa fa-angle-left title is-3 dark" aria-hidden="true"></i>
      </div>
      <div class="main-title">
        {{ $t('forum.customService.title') }}
      </div>
    </div>
    <div class="horizontal-seprate"></div>
    <div class="tile is-chid  row-menu">
      <div class="service-menu" :class="{'menu-selected': type=='issue'}" @click="type='issue'">{{ $t('forum.customService.commonIssues') }}</div>
      <div class="service-menu" :class="{'menu-selected': type=='contact'}" @click="type='contact'">{{ $t('forum.customService.contactService') }}</div>
      <div class="service-menu" :class="{'menu-selected': type=='record'}" @click="type='record'">{{ $t('forum.customService.serviceRecord') }}</div>
    </div>
    <div class="horizontal-seprate">
      <div :class="{'move-box-left': type=='issue','move-box-center': type=='contact','move-box-right': type=='record'}">
        <div class="arrow-down"></div>
      </div>
    </div>
    <common-issue v-show="type=='issue'"></common-issue>
  </div>
</template>
<script>
import commonIssue from './commonIssues'

export default{
  components: {
    commonIssue,
  },

  data () {
    return {
      type: 'issue',
    }
  },
}
</script>
<style lang="scss">
  @import "../scss/forum";
  .horizontal-seprate {
    height: .4rem;
    margin: 1rem 1rem;
    background-color: $text-grey;
    .move-box-left {
      height: 100%;
      background-color: $link;
      width: 16.66%;
      margin-left: 8.4%;
      transition: margin 1s ease;
    }
    .move-box-center {
      height: 100%;
      background-color: $link;
      width: 16.66%;
      margin-left: 41.6%;
      transition: margin 1s ease;
    }
    .move-box-right {
      height: 100%;
      background-color: $link;
      width: 16.66%;
      margin-left: 74.9%;
      transition: margin 1s ease;
    }
    .arrow-down {
      height: .4rem;
      width: .4rem;
      border: .5rem solid transparent;
      border-top: .7rem solid $link;
      margin: 0 auto;
    }
  }
  
  .row-menu {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    position: relative;
    justify-content: space-around;
    font-size: 1.3rem;
    margin: 1rem 1rem;
  }
</style>