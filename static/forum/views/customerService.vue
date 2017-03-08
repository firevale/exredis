<template>
<div class="scroll-box">
  <div class="horizontal-seperator"></div>
  <div class="is-chid  row-menu">
    <div class="service-menu" :class="{'menu-selected': type=='issue'}" @click="type='issue'">{{ $t('forum.customerService.commonIssues') }}</div>
    <div class="service-menu" :class="{'menu-selected': type=='contact'}" @click="type='contact'">{{ $t('forum.customerService.contactService') }}</div>
    <div class="service-menu" :class="{'menu-selected': type=='record'}" @click="type='record'">{{ $t('forum.customerService.serviceRecord') }}</div>
  </div>
  <div class="horizontal-seperator">
    <div :class="{'move-box-left': type=='issue','move-box-center': type=='contact','move-box-right': type=='record'}">
      <div class="arrow-down"></div>
    </div>
  </div>
  <common-issue ref="commonIssue" v-show="type=='issue'"></common-issue>
  <contact-service v-show="type=='contact'"></contact-service>
  <service-record v-show="type=='record'"></service-record>
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
