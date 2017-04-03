<template>
  <div class="content-item">
    <div class="row-menu" style="padding-top: 2rem; position: relative;">
      <i class="fa fa-pencil-square-o" style="display: none;" :class="{'pencil-icon': showIcon}" aria-hidden="true"></i>
      <textarea v-model="message" class="issue-content" :class="{'write-icon': showIcon}" :placeholder="$t('customerService.contactPlaceHolder')"
        @focus="showIcon=false" @blur="checkIcon">
        </textarea>
    </div>
    <div class="row-menu">
      <input class="submit-btn" type="button" :value="$t('customerService.submitBtn')"></input>
    </div>
    <div class="bottom-box row-menu">
      <div class="bottom-contact">
        <div>官方热线 : <span>010-23456789</span></div>
        <div>官方主页 : <span>firevale.qs.com</span></div>
        <div>微信公众号 : <span>firevale</span></div>
      </div>
      <div class="bottom-contact">
        <div>官方论坛 : <span>firevale.qs.it.com</span></div>
        <div>官方贴吧 : <span>枪神默示录</span></div>
        <div>官方微博 : <span>枪神默示录</span></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        showIcon: true,
        message: '',
      }
    },
    computed: {

    },
    methods: {
      checkIcon() {
        if (this.message) {
          this.showIcon = false
        } else {
          this.showIcon = true
        }
      },
    }
  }
</script>
