<template>
  <div class="login-box">
    <form @submit.prevent="handleSubmit">
      <div class="row-login">
        <p class="title">{{ bindUserId? $t('account.loginPage.titleBind') : $t('account.loginPage.titleRegister') }}</p>
      </div>
      <p v-if="!isMobileAccount" class="code-tip"> {{ $t('account.registerPage.pleaseInputCaptchaVerifyCode') }}: </p>
      <p v-if="isMobileAccount" class="code-tip"> {{ $t('account.registerPage.pleaseInputMobileVerifyCode') }}: </p>
      <div class="row-login">
        <input type="text" :placeholder="$t('account.loginPage.verifyCodePlaceholder')" v-model.trim="verifyCode" autocomplete="off"
          maxlength="10" class="outsideText" name="verifyCode" @input="handleValidation" />
        <div v-if="!isMobileAccount" class="captchaBox">
          <img class="captcha" :src="captchaUrl" @click.prevent="updateCaptcha"></img>
        </div>
        <input v-if="isMobileAccount" type="button" :class="{'inputDisabled': cooldownCounter > 0}" class="inside-input" :value="sendCodeTitle"
          @click.prevent="sendMobileVerifyCode">
        </input>
        <span class="icon addon-icon icon-check"></span>
      </div>
      <p class="errors">
        <span v-if="errorHint" class="icon error-sign"></span>
        <span>{{ errorHint }}</span>
      </p>
      <div class="row-login">
        <input type="submit" :class="{'is-disabled': processing}" :value="$t('account.registerPage.nextStep')" :disabled="processing"
        />
        <span v-show="processing" class="icon progress-icon rotating"></span>
      </div>
      <div class="row-login" style="-webkit-justify-content: flex-end; justify-content: flex-end;">
        <a class="pull-right" v-show="!bindUserId" @click.prevent="$router.back()">{{ $t('account.registerPage.goLoginPage') }} </a>
      </div>
    </form>
  </div>
</template>
<script>
import * as utils from 'common/js/utils'

import {
  mapGetters,
  mapActions
} from 'vuex'

import loginFormMixin from './loginFormMixin'
import {
  verifyCode
} from './loginValidation'

export default {
  mixins: [loginFormMixin],

  validations: {
    verifyCode,
  },

  data: function() {
    return {
      isMobileAccount: false,
      hasSentCode: false,
      isMobileAccountSupported: window.acsConfig.isMobileAccountSupported,
      cooldownCounter: 0,
      accountId: '',
      verifyCode: '',
      errorMessage: '',
      processing: false,
      bindUserId: ''
    }
  },

  created: function() {
    this.bindUserId = this.$route.query.bindUserId
    this.accountId = atob(this.$route.query.accountId)

    if (utils.isValidEmail(this.accountId)) {
      this.updateCaptcha()
      this.isMobileAccount = false
    } else {
      this.isMobileAccount = true
      this.hasSentCode = true
      this.cooldownCounter = 60
      setTimeout(this.cooldownTimer, 1000)
    }
  },

  computed: {
    ...mapGetters([
      'registerAccount', 'captchaUrl'
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
    ...mapActions(['setCaptchaUrl']),

    updateCaptcha: async function() {
      let result = await this.$acs.updateCaptcha()
      if (result.success) {
        this.setCaptchaUrl(result.image_url)
      }
    },

    cooldownTimer: function() {
      if (this.cooldownCounter > 0) {
        this.cooldownCounter--;
        setTimeout(this.cooldownTimer, 1000);
      }
    },

    sendMobileVerifyCode: async function() {
      if (window.acsConfig.isMobileAccountSupported && utils.isValidMobileNumber(this.accountId)) {
        try {
          let result = await this.$acs.sendMobileVerifyCode(this.accountId)
          if (result.success) {
            this.hasSentCode = true
            this.cooldownCounter = 60
            setTimeout(this.cooldownTimer, 1000)
          } else {
            this.setErrorMessage(this.$t(result.i18n_message))
          }
          return result
        } catch (_) {
          this.setErrorMessage(this.$t('account.error.networkError'))
          return {
            success: false
          }
        }
      }
    },

    handleSubmit: async function() {
      if (!this.$v.$invalid && this.accountId && !this.processing) {
        this.processing = true
        try {
          let result = await this.$acs.checkRegisterVerifyCode(this.verifyCode)
          if (result.success) {
            if (result.match) {
              this.$router.replace({
                name: 'registerStep3',
                query: {
                  accountId: btoa(this.accountId),
                  verifyCode: btoa(this.verifyCode),
                  bindUserId: this.$route.query.bindUserId,
                }
              })
            } else {
              this.setErrorMessage(this.$t('account.error.invalidVerifyCode'))
            }
          } else {
            this.setErrorMessage(this.$t(result.i18n_message))
          }
        } catch (_) {
          this.setErrorMessage(this.$t('account.error.networkError'))
        }
        this.processing = false
      }
    },
  },
}
</script>