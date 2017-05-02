<template>
  <div class="login-box">
    <form @submit.prevent="handleSubmit">
      <div class="row-login">
        <p class="title">{{ $t('account.loginPage.titleRegister') }}</p>
      </div>
      <p class="code-tip"> {{ $t('account.registerPage.pleaseInputPassword') }}: </p>
      <div class="row-login">
        <input type="password" minlength="6" maxlength="20" :placeholder="$t('account.loginPage.userPasswordPlaceHolder')" v-model.trim="password"
          autocomplete="off" name="password" @input="handleValidation($v.password)" />
        <span class="icon addon-icon icon-lock"></span>
        <span class="icon addon-icon pull-right" :class="'icon-' + passwordIcon" @click="togglePasswordVisibility"></span>
      </div>
      <p class="errors">
        <span v-if="errorMessage" class="icon error-sign"></span>
        <span>{{ errorMessage }}</span>
      </p>
      <div class="row-login">
        <button type="submit" class="button" :class="{'is-loading': processing}">
          {{ $t('account.registerPage.btnRegister') }}
        </button>
      </div>
      <div class="row-login" style="-webkit-justify-content: flex-end; justify-content: flex-end;">
        <a class="pull-right" @click.prevent="$router.back()">{{ $t('account.registerPage.goLoginPage') }} </a>
      </div>
    </form>
  </div>
</template>
<script>
import nativeApi from 'common/js/nativeApi'

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
      accountId: '',
      verifyCode: '',
      password: '',
      passwordIcon: 'eye-slash',
      errorMessage: '',
      processing: false,
      shouldBindAnonymous: false,
    }
  },

  created: function() {
    this.accountId = atob(this.$route.query.accountId)
    this.verifyCode = atob(this.$route.query.verifyCode)
  },

  computed: {
    ...mapGetters([
      'redirectUri'
    ]),
  },

  methods: {
    ...mapActions([
      'setLoginAccountId', 'setRegisterAccountId', 'addLoginnedAccount'
    ]),

    handleSubmit: async function() {
      if (!this.$v.$invalid && this.accountId && this.verifyCode && !this.processing) {
        this.processing = true
        try {
          let result = await this.$acs.createUser(this.accountId, this.password, this.verifyCode)

          if (result.success) {
            this.setLoginAccountId(this.accountId)
            this.setRegisterAccountId('')
            this.addLoginnedAccount(result)
            if (window.acsConfig.inApp) {
              nativeApi.closeWebviewWithResult(result)
            } else {
              if (this.redirectUri) {
                window.location = this.redirectUri
              }
              else {
                this.$router.back()
              }
            }
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