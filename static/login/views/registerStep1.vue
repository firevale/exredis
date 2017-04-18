<template>
  <div class="login-box">
    <form @submit.prevent="handleSubmit">
      <div class="row-login">
        <p class="title">{{ $t('account.loginPage.titleRegister') }}</p>
      </div>
      <p class="code-tip"> {{ registerAccountIdPlaceholder }}: </p>
      <div class="row-login">
        <input type="text" maxlength="50" :placeholder="registerAccountIdPlaceholder" v-model.trim="accountId" autocomplete="off"
          name="user" @input="handleValidation" />
        <span class="icon addon-icon icon-user"></span>
      </div>
      <p class="errors">
        <span v-if="errorHint" class="icon error-sign"></span>
        <span>{{ errorHint }}</span>
      </p>
      <div class="row-login">
        <button type="submit" class="button" :class="{'is-loading': processing}">
          {{ $t('account.registerPage.nextStep') }}
        </button>
      </div>
      <div class="row-login" style="-webkit-justify-content: flex-end; justify-content: flex-end;">
        <a class="pull-right" @click.prevent="$router.back()">{{ $t('account.registerPage.goLoginPage') }} </a>
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
  registerAccountId
} from './loginValidation'

export default {
  mixins: [loginFormMixin],

  validations: {
    accountId: registerAccountId,
  },

  data: function() {
    return {
      accountId: '',
      errorMessage: '',
      processing: false,
    }
  },

  created: function() {
    this.accountId = this.registerAccount
  },

  computed: {
    ...mapGetters([
      'registerAccount'
    ]),
  },

  methods: {
    ...mapActions([
      'setRegisterAccountId',
    ]),

    handleSubmit: async function() {
      if (!this.$v.$invalid && !this.processing) {
        this.processing = true
        try {
          let result = await this.$acs.isAccountExists(this.accountId)
          if (result.success) {
            if (result.exists) {
              this.setErrorMessage(this.$t('error.server.accountInUse'))
            } else {
              this.setRegisterAccountId(this.accountId)
              if (window.acsConfig.isMobileAccountSupported && utils.isValidMobileNumber(this.accountId)) {
                try {
                  let result = await this.$acs.sendMobileVerifyCode(this.accountId)
                  if (result.success) {
                    this.$router.replace({
                      name: 'registerStep2',
                      query: {
                        accountId: btoa(this.accountId),
                      }
                    })
                  } else {
                    this.setErrorMessage(this.$t(result.i18n_message))
                  }
                } catch (e) {
                  this.setErrorMessage(this.$t('error.server.networkError'), e)
                }
              } else {
                this.$router.replace({
                  name: 'registerStep2',
                  query: {
                    accountId: btoa(this.accountId),
                  }
                })
              }
            }
          } else {
            this.setErrorMessage(this.$t(result.i18n_message))
          }
        } catch (e) {
          this.setErrorMessage(this.$t('error.server.networkError'), e)
        }
        this.processing = false
      }
    },
  },
}
</script>