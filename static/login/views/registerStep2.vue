<template>
  <div class="login-box">
    <validation name="register" @submit.prevent="handleSubmit">
      <div class="row-login">
        <p class="title">{{ $t('account.loginPage.titleRegister') }}</p>
      </div>
      <p v-if="!isMobileAccount" class="code-tip"> {{ $t('account.registerPage.pleaseInputCaptchaVerifyCode') }}: </p>
      <p v-if="isMobileAccount" class="code-tip"> {{ $t('account.registerPage.pleaseInputMobileVerifyCode') }}: </p>
      <div class="row-login">
        <validity ref="verifyCode" field="verifyCode" :validators="{
                required: {rule: true, message: $t('account.loginPage.verifyCodePlaceholder')}, 
                minlength: {rule: 4, message: $t('account.error.verifyCodeTooShort')},
                }">
          <input type="text" :placeholder="$t('account.loginPage.verifyCodePlaceholder')" v-model.trim="verifyCode" autocomplete="off"
            maxlength="10" class="outsideText" name="verifyCode" @focusout="handleValidate" />
        </validity>
        <div v-if="!isMobileAccount" class="captchaBox">
          <img class="captcha" :src="captchaUrl" @click.prevent="updateCaptcha"></img>
        </div>
        <input v-if="isMobileAccount" type="button" :class="{'inputDisabled': cooldownCounter > 0}" class="insideInput"
          :value="sendCodeTitle" @click.prevent="sendMobileVerifyCode">
        </input>
        <div class="header-icon">
          <icon name="check-circle-o" :stroke-color="colors.dark" :fill-color="colors.white"></icon>
        </div>
      </div>
      <p class="errors">
        <icon v-if="errorMessage" name="info-circle" scale=".8" :fill-color="colors.danger"></icon>&nbsp{{ errorMessage }}
      </p>
      <div class="row-login">
        <input type="submit" :value="$t('account.registerPage.nextStep')" />
      </div>
      <div class="row-login" style="justify-content: flex-end;">
        <router-link :to="{name: 'login'}">{{ $t('account.registerPage.goLoginPage') }}</router-link>
      </div>
    </validation>
  </div>
</template>
<script>
  import utils from '../common/utils'
  import Icon from '../components/fvIcon/Icon.vue'
  import '../components/fvIcon/icons/info-circle'
  import '../components/fvIcon/icons/check-circle-o'
  import msg from '../components/message'
  import Vue from 'vue'
  import {
    mapGetters,
    mapActions
  } from 'vuex'

  export default {
    data: function() {
      return {
        isMobileAccount: false,
        hasSentCode: false,
        isMobileAccountSupported: window.acsConfig.isMobileAccountSupported,
        cooldownCounter: 0,
        accountId: '',
        verifyCode: '',
        errorMessage: '',
      }
    },

    created: function() {
      this.accountId = this.$route.params.accountId
      if (utils.isValidEmail(this.accountId)) {
        this.updateCaptcha()
        this.isMobileAccount = false
      } else {
        this.isMobileAccount = true
        this.sendMobileVerifyCode()
      }
    },

    computed: {
      ...mapGetters([
        'registerAccount', 'captchaUrl', 'invalidAccountIdErrorMessage', 'accountIdPlaceholder', 'colors'
      ]),

      sendCodeTitle: function() {
        if (this.cooldownCounter > 0) {
          return this.$t('account.registerPage.cooldownText', {
            timer: this.cooldownCounter
          })
        } else {
          if (this.hasSentCode) {
            return this.$t('account.registerPage.sendAgain')
          } else {
            return this.$t('account.loginPage.sendVerifyCode')
          }
        }
      },
    },

    methods: {
      ...mapActions(['updateCaptcha']),

      handleValidate: function(e) {
        this.errorMessage = ''
        e.target.$validity.validate(_ => {
          if (this.$refs.verifyCode &&
            this.$refs.verifyCode.invalid &&
            this.$refs.verifyCode.result.errors &&
            this.$refs.verifyCode.result.errors.length > 0) {
            this.errorMessage = this.$refs.verifyCode.result.errors[0].message
          } else {
            this.errorMessage = ''
          }
        })
      },

      cooldownTimer: function() {
        if (this.cooldownCounter > 0) {
          this.cooldownCounter--;
          setTimeout(this.cooldownTimer, 1000);
        }
      },

      sendMobileVerifyCode: function() {
        if (window.acsConfig.isMobileAccountSupported &&
          utils.isValidMobileNumber(this.accountId)) {
          this.$http({
            method: 'post',
            url: "/send_mobile_register_verify_code",
            params: {
              mobile: this.accountId
            }
          }).then(response => {
            return response.json()
          }).then(result => {
            if (result.success) {
              msg.showMsg({
                msg: this.$t('account.registerPage.messageTip'),
                target: this.$parent.$refs.msg
              })
              this.hasSentCode = true
              this.cooldownCounter = 60
              setTimeout(this.cooldownTimer, 1000)
            } else {
              this.errorMessage = this.$t(result.message)
            }
          })
        }
      },

      handleSubmit: function() {
        if (this.$validation.register.valid && this.verifyCode) {
          this.$http({
            method: 'post',
            url: '/check_register_verify_code',
            params: {
              verify_code: this.verifyCode,
            }
          }).then(response => {
            return response.json()
          }).then(result => {
            if (result.exists) {
              this.errorMessage = this.$t('account.error.accountInUse')
            } else {
              this.$router.replace({
                name: 'registerStep3',
                params: {
                  accountId: this.accountId,
                  verifyCode: this.verifyCode
                }
              })
            }
          }).catch(error => {
            this.errorMessage = this.$t('account.error.networkError')
          })
        }
      },
    },

    components: {
      'icon': Icon,
    }
  }
</script>

<style lang="scss">

</style>