<template>
  <div class="login-box">
    <form @submit.prevent="handleSubmit">
      <div class="row-login">
        <p class="title">{{ $t('account.loginPage.retrievePasswordTitle') }}</p>
      </div>
      <p class="code-tip"> </p>
      <div class="row-login">
        <input type="text" class="outsideText" :placeholder="accountIdPlaceholder" v-model.trim="accountId" autocomplete="off" name="user"
          @input="handleValidation($v.accountId)" />
        <span class="icon addon-icon icon-user"></span>
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
import {
  mapGetters,
  mapActions
} from 'vuex'

import loginFormMixin from './loginFormMixin'
import {
  accountId
} from './loginValidation'

export default {
  mixins: [loginFormMixin],

  validations: {
    accountId,
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
      'loginAccount', 'invalidAccountIdErrorMessage'
    ]),
  },

  methods: {
    handleSubmit: async function(e) {
      if (!this.$v.$invalid && !this.processing) {
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
            this.setErrorMessage(this.$t(result.i18n_message))
          }
        } catch (e) {
          this.setErrorMessage(this.$t('error.server.networkError'))
        }
        this.processing = false
      }
    },
  },
}
</script>