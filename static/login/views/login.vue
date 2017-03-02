<template>
<div class="login-box">
  <div class="row-login">
    <p class="title">{{ $t('account.loginPage.title') }}</p>
  </div>
  <form @submit.prevent="handleSubmit">
    <div class="row-login">
      <input type="text" maxlength="50" v-model.trim="accountId" name="user" :placeholder="accountIdPlaceholder"
          autocomplete="off" @input="handleInput" />
      <span class="icon addon-icon icon-user"></span>
    </div>
    <div class="row-login">
      <input ref="password" class="sibling" maxlength="20" type="password" v-model.trim="password" autocomplete="off"
          name="password" :placeholder="$t('account.loginPage.userPasswordPlaceHolder')" @input="handleInput"
      />
      <span class="icon addon-icon icon-lock"></span>
      <span class="icon addon-icon pull-right" :class="'icon-'+passwordIcon" @click="togglePasswordVisibility"></span>
    </div>
    <p class="errors">
      <span class="icon error-sign" v-if="errorHint"></span>
      <span>{{ errorHint }}</span>
    </p>
    <div class="row-login">
      <input type="submit" :class="{'is-disabled': processing}" :value="$t('account.loginPage.btnSubmit')"
          :disabled="processing" />
      <span v-show="processing" class="icon progress-icon rotating"></span>
    </div>
    <div class="row-login">
      <router-link class="pull-left" :to="{ name: 'registerStep1' }">{{ $t('account.loginPage.registration') }}</router-link>
      <router-link class="pull-right" :to="{ name: 'retrievePasswordStep1' }">{{ $t('account.loginPage.forgetPassword') }}</router-link>
    </div>
  </form>
</div>
</template>

<script>
import nativeApi from 'common/nativeApi'

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
    password: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(20),
    },
  },

  beforeMount: function() {
    this.accountId = this.loginAccount
  },

  data: function() {
    return {
      accountId: '',
      password: '',
      passwordIcon: 'eye-slash',
      errorMessage: '',
      processing: false,
    }
  },

  computed: {
    ...mapGetters([
      'loginAccount', 'invalidAccountIdErrorMessage', 'accountIdPlaceholder', 'redirectUri'
    ]),

    errorHint: function() {
      if (this.$v.$error) {
        if (!this.$v.accountId.required) {
          return this.$t('account.error.requireUserName')
        } else if (!this.$v.accountId.valid) {
          return this.invalidAccountIdErrorMessage
        } else if (!this.$v.password.required) {
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
      'setLoginAccountId', 'validateAccountId', 'addLoginnedAccount',
    ]),

    handleInput: function() {
      this.$v.$touch()
      this.errorMessage = ''
    },

    handleSubmit: async function() {
      if (!this.$v.$error && !this.processing) {
        this.processing = true
        try {
          let result = await this.$acs.createToken(this.accountId, this.password)

          if (result.success) {
            this.addLoginnedAccount(result)
            this.setLoginAccountId(this.accountId)

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
        } catch (error) {
          this.errorMessage = this.$t('account.error.networkError')
          setTimeout(_ => {
            this.errorMessage = ''
          }, 3000)
        }
        this.processing = false
      }
    },

    togglePasswordVisibility: function() {
      if (this.passwordIcon == 'eye') {
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
