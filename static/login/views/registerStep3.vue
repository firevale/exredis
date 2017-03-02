<template>
<div class="login-box">
  <form @submit.prevent="handleSubmit">
    <div class="row-login">
      <p class="title">{{ bindUserId? $t('account.loginPage.titleBind') : $t('account.loginPage.titleRegister') }}</p>
    </div>
    <p class="code-tip"> {{ $t('account.registerPage.pleaseInputPassword') }}: </p>
    <div class="row-login">
      <input type="password" minlength="6" maxlength="20" :placeholder="$t('account.loginPage.userPasswordPlaceHolder')"
          v-model.trim="password" autocomplete="off" name="password" @input="handleInput" />
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
import nativeApi from 'common/nativeApi'
import msg from '../components/message'

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
    password: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(20),
    },
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

    errorHint: function() {
      if (this.$v.$error) {
        if (!this.$v.password.required) {
          return this.$t('account.error.requirePassword')
        } else if (!this.$v.password.minLength) {
          return this.$t('account.error.invalidPasswordLength')
        } else if (!this.$v.password.maxLength) {
          return this.$t('account.error.invalidPasswordLength')
        }
      } else {
        return this.errorMessage
      }
    },
  },

  methods: {
    ...mapActions([
      'setLoginAccountId', 'setRegisterAccountId', 'addLoginnedAccount'
    ]),

    handleInput: function() {
      this.$v.$touch()
      this.errorMessage = ''
    },

    handleSubmit: async function() {
      if (!this.$v.$error && this.accountId && this.verifyCode && !this.processing) {
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
            this.errorMessage = this.$t(result.message)
          }
        } catch (_) {
          this.errorMessage = this.$t('account.error.networkError')
        }
        this.processing = false
      }
    },

    togglePasswordVisibility: function() {
      if (this.passwordIcon === 'eye') {
        this.passwordIcon = 'eye-slash'
        this.$refs.password.$el.type = 'password'
      } else {
        this.passwordIcon = 'eye'
        this.$refs.password.$el.type = 'text'
      }
    },
  },
}
</script>
