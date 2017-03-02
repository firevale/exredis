<template>
<div class="login-box">
  <form @submit.prevent="handleSubmit">
    <div class="row-login">
      <p class="title">{{ $t('account.loginPage.retrievePasswordTitle') }}</p>
    </div>
    <p class="code-tip">
      {{ $t('account.retrievePasswordPage.pleaseInputAccountName') }}:
    </p>
    <div class="row-login">
      <input type="text" class="outsideText" :placeholder="accountIdPlaceholder" v-model.trim="accountId" autocomplete="off"
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
  </form>
</div>
</template>

<script>
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
    accountId: {
      required,
      valid: function(val) {
        return this.validateAccountId(val)
      },
    },
  },

  beforeMount: function() {
    this.accountId = this.loginAccount
  },

  data: function() {
    return {
      accountId: '',
      errorMessage: '',
      processing: false,
    }
  },

  computed: {
    ...mapGetters([
      'loginAccount', 'invalidAccountIdErrorMessage', 'accountIdPlaceholder'
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
      'validateAccountId'
    ]),

    handleInput: function() {
      this.$v.$touch()
      this.errorMessage = ''
    },

    handleSubmit: async function(e) {
      if (!this.$v.$error && !this.processing) {
        this.processing = true
        try {
          let result = await this.$acs.sendRetrievePasswordVerifyCode(this.accountId)
          if (result.success) {
            this.$router.replace({
              name: 'retrievePasswordStep2',
              query: {
                accountId: btoa(this.accountId)
              }
            })
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
