<template>
  <div class="login-box">
    <div class="row-login">
      <p class="title">{{ $t('account.loginPage.title') }}</p>
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="row-login">
        <input type="text" maxlength="50" v-model.trim="accountId" name="user" :placeholder="accountIdPlaceholder" autocomplete="off" @input="handleValidation" />
        <span class="icon addon-icon icon-user"></span>
      </div>
      <div class="row-login">
        <input ref="password" class="sibling" maxlength="20" type="password" v-model.trim="password" autocomplete="off" name="password" :placeholder="$t('account.loginPage.userPasswordPlaceHolder')" @input="handleValidation" />
        <span class="icon addon-icon icon-lock"></span>
        <span class="icon addon-icon pull-right" :class="'icon-'+passwordIcon" @click="togglePasswordVisibility"></span>
      </div>
      <p class="errors">
        <span class="icon error-sign" v-if="errorHint"></span>
        <span>{{ errorHint }}</span>
      </p>
      <div class="row-login">
        <input type="submit" :class="{'is-disabled': processing}" :value="$t('account.loginPage.btnSubmit')" :disabled="processing" />
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
  import nativeApi from 'common/js/nativeApi'

  import {
    mapGetters,
    mapActions
  } from 'vuex'

  import loginFormMixin from './loginFormMixin'
  import {
    accountId,
    password
  } from './loginValidation'

  export default {
    mixins: [loginFormMixin],

    validations: {
      accountId,
      password
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
        'loginAccount', 'invalidAccountIdErrorMessage', 'redirectUri'
      ]),
    },

    methods: {
      ...mapActions([
        'setLoginAccountId', 'addLoginnedAccount',
      ]),

      handleSubmit: async function() {
        if (!this.$v.$invalid && !this.processing) {
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
              this.setErrorMessage(this.$t(result.message))
            }
          } catch (error) {
            this.setErrorMessage(this.$t('account.error.networkError'))
          }
          this.processing = false
        }
      },
    },
  }
</script>