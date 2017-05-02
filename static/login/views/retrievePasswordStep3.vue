<template>
  <div class="login-box">
    <form @submit.prevent="handleSubmit">
      <div class="row-login">
        <p class="title">{{ $t('account.loginPage.retrievePasswordTitle') }}</p>
      </div>
      <p class="code-tip">
        {{ $t('account.retrievePasswordPage.setNewPassword') }}:
      </p>
      <div class="row-login">
        <input type="password" minlength="6" maxlength="20" :placeholder="$t('account.loginPage.userPasswordPlaceHolder')" v-model.trim="password"
          autocomplete="off" name="password" @keyup="handleValidation($v.password)" />
        <span class="icon addon-icon icon-lock"></span>
        <span class="icon addon-icon pull-right" :class="'icon-'+passwordIcon" @click="togglePasswordVisibility"></span>
      </div>
      <p class="errors">
        <span v-if="errorMessage" class="icon error-sign"></span>
        <span>{{ errorMessage }}</span>
      </p>
      <div class="row-login">
        <button type="submit" class="button" :class="{'is-loading': processing}">
          {{ $t('account.retrievePasswordPage.complete') }}
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
  password
} from './loginValidation'

export default {
  mixins: [loginFormMixin],

  validations: {
    password,
  },

  data: function() {
    return {
      passwordIcon: '',
      password: '',
      errorMessage: '',
      accountId: '',
      verifyCode: '',
      passwordIcon: 'eye-slash',
      processing: false,
    }
  },

  created: function() {
    if (this.$route.query.accountId)
      this.accountId = atob(this.$route.query.accountId)
    if (this.$route.query.verifyCode)
      this.verifyCode = atob(this.$route.query.verifyCode)
  },

  methods: {
    ...mapActions(['setLoginAccountId']),

    handleSubmit: async function() {
      if (!this.$v.$invalid && this.accountId && !this.processing) {
        this.processing = true
        try {
          let result = await this.$acs.updatePassword(this.accountId, this.password, this.verifyCode)
          if (result.success) {
            this.setLoginAccountId(this.accountId)
            this.$router.back()
          } else {
            this.setErrorMessage(this.$t(result.i18n_message))
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