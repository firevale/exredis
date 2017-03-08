<template>
<div class="is-ancestor is-parent is-vertical">
  <div class="is-child fixed-top row-line" style="border-bottom: none;">
    <div class="arrow-back">
      <i class="fa fa-angle-left title is-2 dark" aria-hidden="true" @click="goBack"></i>
    </div>
    <div class="row-line top-title">
      {{ $t('forum.customService.title') }}
    </div>
  </div>
  <div class="scroll-box">
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
    <common-issue ref="commonIssue" v-show="type=='issue'"></common-issue>
    <contact-service v-show="type=='contact'"></contact-service>
    <service-record v-show="type=='record'"></service-record>
  </div>
</div>
</template>
<script>
import commonIssue from '../components/commonIssues'
import contactService from '../components/contactService'
import serviceRecord from '../components/serviceRecord'

export default {
  components: {
    commonIssue,
    contactService,
    serviceRecord
  },

  data() {
    return {
      type: 'issue',
    }
  },

  methods: {
    goBack() {
      if (this.type == 'issue' && this.$refs.commonIssue.issueDetail != null) {
        this.$refs.commonIssue.issueDetail = null
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>
