<template>
<div class="login-box">
  <form @submit.prevent="handleSubmit">
    <div class="row-login">
      <p class="title">{{ bindUserId? $t('account.loginPage.titleBind') : $t('account.loginPage.titleRegister') }}</p>
    </div>
    <p class="code-tip"> {{ $t('account.registerPage.pleaseInputAccountName') }}: </p>
    <div class="row-login">
      <input type="text" maxlength="50" :placeholder="accountIdPlaceholder" v-model.trim="accountId" autocomplete="off"
          name="user" @input="handleInput" />
      <span class="icon addon-icon icon-user"></span>
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
    <div class="row-login" style="-webkit-justify-content: flex-end; justify-content: flex-end;">
      <a class="pull-right" v-show="!bindUserId" @click.prevent="$router.back()">{{ $t('account.registerPage.goLoginPage') }} </a>
    </div>
  </form>
</div>
</template>
<script>
import msg from '../components/message'

import {
  mapGetters,
  mapActions
} from 'vuex'

import {
  required,
  minLength,
  maxLength
} from 'vuelidate/lib/validators'
export default {

  validations: {
    accountId: {
      required,
      valid: function(val) {
        return this.validateAccountId(val)
      },
    },
  },

  data: function() {
    return {
      isMobileAccountSupported: window.acsConfig.isMobileAccountSupported,
      accountId: '',
      errorMessage: '',
      processing: false,
      bindUserId: '',
    }
  },

  created: function() {
    this.bindUserId = this.$route.query.bindUserId
    this.accountId = this.registerAccount
  },

  computed: {
    ...mapGetters([
      'registerAccount', 'invalidAccountIdErrorMessage', 'accountIdPlaceholder'
    ]),

    errorHint: function() {
      if (this.$v.$error) {
        if (!this.$v.accountId.required) {
          return this.$t('account.error.requireUserName')
        } else if (!this.$v.accountId.valid) {
          return this.invalidAccountIdErrorMessage
        }
      } else {
        return this.errorMessage
      }
    },
  },

  methods: {
    ...mapActions([
      'setRegisterAccountId', 'validateAccountId'
    ]),

    handleInput: function() {
      this.$v.$touch()
      this.errorMessage = ''
    },

    handleSubmit: async function() {
      if (!this.$v.$error && !this.processing) {
        this.processing = true
        try {
          let result = await this.$acs.isAccountExists(this.accountId)

          if (result.success) {
            if (result.exists) {
              this.errorMessage = this.$t('account.error.accountInUse')
            } else {
              this.setRegisterAccountId(this.accountId)
              this.$router.replace({
                name: 'registerStep2',
                query: {
                  accountId: btoa(this.accountId),
                  bindUserId: this.$route.query.bindUserId
                }
              })
            }
          } else {
            this.errorMessage = this.$t(result.message)
          }
        } catch (e) {
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
