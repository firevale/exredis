<template>
<div class="login-box">
  <form @submit.prevent="handleSubmit">
    <div class="row-login">
      <p class="title">{{ bindUserId? $t('account.loginPage.titleBind') : $t('account.loginPage.titleRegister') }}</p>
    </div>
    <p class="code-tip"> {{ $t('account.registerPage.pleaseInputPassword') }}: </p>
    <div class="row-login">
      <input type="password" minlength="6" maxlength="20" :placeholder="$t('account.loginPage.userPasswordPlaceHolder')"
          v-model.trim="password" autocomplete="off" name="password" @input="handleValidation" />
      <span class="icon addon-icon icon-lock"></span>
      <span class="icon addon-icon pull-right" :class="'icon-'+passwordIcon" @click="togglePasswordVisibility"></span>
    </div>
    <p class="errors">
      <span v-if="errorHint" class="icon error-sign"></span>
      <span>{{ errorHint }}</span>
    </p>
    <div class="row-login">
      <input type="submit" :class="{'is-disabled': processing}" :value="bindUserId ? $t('account.registerPage.btnBind') : $t('account.registerPage.btnRegister')"
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
      bindUserId: '',
    }
  },

  created: function() {
    this.accountId = atob(this.$route.query.accountId)
    this.verifyCode = atob(this.$route.query.verifyCode)
    this.bindUserId = this.$route.query.bindUserId
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
          let result = await this.$acs.createUser(this.accountId, this.password, this.verifyCode,
            this.bindUserId)

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
