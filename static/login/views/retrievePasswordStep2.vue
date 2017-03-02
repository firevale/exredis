<template>
<div class="login-box">
  <form @submit.prevent="handleSubmit">
    <div class="row-login">
      <p class="title">{{ $t('account.loginPage.retrievePasswordTitle') }}</p>
    </div>
    <p class="code-tip" v-html="verifyCodeSentHint"> </p>
    <div class="row-login">
      <input type="text" :placeholder="$t('account.loginPage.verifyCodePlaceholder')" v-model.trim="verifyCode"
          autocomplete="off" class="outsideText" name="verifyCode" @input="handleInput" />
      <input type="button" :class="{'inputDisabled': cooldownCounter > 0}" class="inside-input" :value="sendCodeTex"
          @click.prevent="sendVerifyCode">
      </input>
      <span class="icon addon-icon icon-check"></span>
    </div>
    <p class="errors">
      <span v-if="errorHint" class="icon error-sign"></span>
      <span>{{ errorHint }}</span>
    </p>
    <div class="row-login">
      <input type="submit" :class="{'is-disabled': processing}" :value="$t('account.registerPage.nextStep')"
          :disabled="processing" />
      <span v-show="processing" class="icon progress-icon rotating"></span>
    </div>
  </form>
</div>
</template>

<script>
import * as utils from 'common/utils'

import {
  required,
  minLength,
  maxLength
} from 'vuelidate/lib/validators'

import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  validations: {
    verifyCode: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(6),
    },
  },

  data: function() {
    return {
      hasSentCode: false,
      cooldownCounter: 60,
      verifyCode: '',
      errorMessage: '',
      accountId: '',
      processing: false,
      sendingVerifyCode: false,
    }
  },

  created: function() {
    this.accountId = atob(this.$route.query.accountId)
    this.hasSentCode = true
    setTimeout(this.cooldownTimer, 1000)
  },

  computed: {
    verifyCodeSentHint: function() {
      if (utils.isValidEmail(this.accountId)) {
        return this.$t('account.retrievePasswordPage.verifyCodeSentToEmail', {
          email: utils.emailMask(this.accountId)
        })
      } else {
        return this.$t('account.retrievePasswordPage.verifyCodeSentToSms', {
          mobile: utils.mobileMask(this.accountId)
        })
      }
    },

    sendCodeTex: function() {
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

    errorHint: function() {
      if (this.$v.$error) {
        if (!this.$v.verifyCode.required) {
          return this.$t('account.error.requireUserName')
        } else if (!this.$v.verifyCode.minLength) {
          return this.$t('account.error.invalidVerifyCodeLength')
        } else if (!this.$v.verifyCode.maxLength) {
          return this.$t('account.error.invalidVerifyCodeLength')
        }
      } else {
        return this.errorMessage
      }
    },
  },

  methods: {
    handleInput: function() {
      this.$v.$touch()
      this.errorMessage = ''
    },

    cooldownTimer: function() {
      if (this.cooldownCounter > 0) {
        this.cooldownCounter--;
        setTimeout(this.cooldownTimer, 1000);
      }
    },

    sendVerifyCode: async function(e) {
      if (this.cooldownCounter <= 0 && !this.sendingVerifyCode) {
        this.sendingVerifyCode = true
        try {
          let result = await this.$acs.sendRetrievePasswordVerifyCode(this.accountId)
          if (result.success) {
            this.cooldownCounter = 60
          } else {
            this.errorMessage = this.$t(result.message)
          }
        } catch (_) {
          this.errorMessage = this.$t('account.error.networkError')
          setTimeout(_ => {
            this.errorMessage = ''
          }, 3000)
        }
        this.sendingVerifyCode = false
      } else {
        this.errorMessage = this.$t('account.error.sendSmsCooldown')
      }
    },

    handleSubmit: async function() {
      if (!this.$v.$error && !this.processing) {
        this.processing = true
        try {
          let result = await this.$acs.checkRetrievePasswordVerifyCode(this.verifyCode)
          if (result.success && result.match) {
            this.$router.replace({
              name: 'retrievePasswordStep3',
              query: {
                accountId: btoa(this.accountId),
                verifyCode: btoa(this.verifyCode),
              }
            })
          } else {
            this.errorMessage = this.$t('account.error.invalidVerifyCode')
          }
        } catch (_) {
          this.errorMessage = this.$t('account.error.networkError')
          setTimeout(_ => {
            this.errorMessage = ''
          }, 3000)
        }
        this.processing = false
      }
    },
  },
}
</script>
