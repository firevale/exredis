<template>
  <div class="login-box">
    <form @submit.prevent="handleSubmit">
      <div class="row-login">
        <p class="title">{{ $t('account.loginPage.retrievePasswordTitle') }}</p>
      </div>
      <p class="code-tip" v-html="verifyCodeSentHint"> </p>
      <div class="row-login">
        <input type="text" :placeholder="$t('account.loginPage.verifyCodePlaceholder')" v-model.trim="verifyCode" autocomplete="off"
          class="outsideText" name="verifyCode" @keyup="handleValidation($v.verifyCode)" ></input>
        <input type="button" :class="{'inputDisabled': cooldownCounter > 0}" class="inside-input" :value="sendCodeTex" @click.prevent="sendVerifyCode">
        </input>
        <span class="icon addon-icon icon-check"></span>
      </div>
      <p class="errors">
        <span v-if="errorMessage" class="icon error-sign"></span>
        <span>{{ errorMessage }}</span>
      </p>
      <div class="row-login">
        <button type="submit" class="button" :class="{'is-loading': processing}">
          {{ $t('account.registerPage.nextStep') }}
        </button>
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
  },

  methods: {
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
            this.setErrorMessage(this.$t(result.i18n_message))
          }
        } catch (_) {
          this.setErrorMessage(this.$t('error.server.networkError'))
        }
        this.sendingVerifyCode = false
      } else {
        this.setErrorMessage(this.$t('error.server.sendSmsCooldown'))
      }
    },

    handleSubmit: async function() {
      if (!this.$v.$invalid && !this.processing) {
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
            this.setErrorMessage(this.$t('error.server.invalidVerifyCode'))
          }
        } catch (_) {
          this.setErrorMessage(this.$t('error.server.networkError'))
        }
        this.processing = false
      }
    },
  },
}
</script>