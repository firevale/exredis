<template>
  <div class="is-ancestor is-parent is-vertical ">
    <div class="is-child content-item" style="display: flex; flex-direction: row;text-align: center;position: relative;padding-bottom: 1rem;">
      <div class="arrow-back">
        <i class="fa fa-angle-left title is-2 dark" aria-hidden="true" @click="$router.go(-1)"></i>
      </div>
      <div class="search-title">
        {{ $t('forum.customService.title') }}
      </div>
    </div>
    <div class="horizontal-seprate"></div>
    <div class="is-chid  row-menu">
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
    <contact-service v-show="type=='contact'"></contact-service>
    <service-record v-show="type=='record'"></service-record>
  </div>
</template>
<script>
import commonIssue from '../components/commonIssues'
import contactService from '../components/contactService'
import serviceRecord from '../components/serviceRecord'

export default{
  components: {
    commonIssue,
    contactService,
    serviceRecord
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