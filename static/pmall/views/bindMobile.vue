<template>
  <div class="bind-mobile bg-full bg-bind-mobile is-flex flex-center flex-vcentered">
    <a class="button btn-official-website"></a>
    <i class="icon icon-logo"></i>
    <div class="items is-flex flex-center flex-vcentered">
      <div class="item">
        <input class="input is-mobile" type="number" v-model.trim="mobile" placeholder="请输入手机号">
      </div>
      <div class="item">
        <input class="input is-code" type="text" v-model.trim="verify_code" placeholder="请输入验证码">
        <input class="btn-valid-code size-normal" type="button" :disabled="cooldownCounter > 0" :value="btnFetchVerifyCodeTitle"
          @click="sendMobileVerifyCode">
      </div>
      <div class="control is-flex flex-center">
        <a class="button btn-bind-mobile" @click="onSubmit"></a>
      </div>
    </div>
  </div>
</template>
<script>
import * as utils from 'common/js/utils'
import Toast from 'common/components/toast'


export default {
  mounted() {},

  computed: {
    btnFetchVerifyCodeTitle() {
      if (this.cooldownCounter > 0) {
        return '重新发送(' + this.cooldownCounter + 's)'
      } else {
        return '发送验证码'
      }
    },
  },
  data() {
    return {
      mobile: '',
      verify_code: '',
      cooldownCounter: 0,
      sendingVerifyCode: false
    }
  },

  methods: {
    cooldownTimer: function() {
      if (this.cooldownCounter > 0) {
        this.cooldownCounter--;
        setTimeout(this.cooldownTimer, 1000);
      }
    },

    sendMobileVerifyCode: async function() {
      try {
        if (utils.isValidMobileNumber(this.mobile)) {
          this.sendingVerifyCode = true
          let result = await this.$acs.sendBindMobileVerifyCode(this.mobile)
          if (result.success) {
            this.cooldownCounter = 60
            setTimeout(this.cooldownTimer, 1000)
          } else {
            Toast.show('验证码发送失败，请稍后再试')
          }
          this.sendingVerifyCode = false
        } else {
          this.cooldownCounter = 60
          setTimeout(this.cooldownTimer, 1000)
          Toast.show('请输入正确的手机号码')
        }
      } catch (_) {
        this.sendingVerifyCode = false
        Toast.show('验证码发送失败，请稍后再试')
      }
    },
    onSubmit: async function() {
      if (!this.processing) {
        this.processing = true
        let result = await this.$acs.bindMobile(this.mobile, this.verify_code)
        if (result.success) {
          Toast.show("绑定成功")
        } else {
          Toast.show("绑定失败")
        }
        this.processing = false
      }
    },
  }
}
</script>