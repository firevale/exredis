<template>
  <div class="login-box">
    <div class="row-login">
      <p class="title">{{ $t('account.loginPage.title') }}</p>
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="row-login">
        <input type="text" maxlength="50" 
        v-model.trim="accountId" name="user" :placeholder="accountIdPlaceholder" autocomplete="off" @keyup="handleValidation($v.accountId)" />
        <span class="icon addon-icon icon-user"></span>
      </div>
      <div class="row-login">
        <input ref="password" class="sibling" maxlength="20" type="password" v-model.trim="password" autocomplete="off" name="password" :placeholder="$t('account.loginPage.userPasswordPlaceHolder')" @keyup="handleValidation($v.password)" />
        <span class="icon addon-icon icon-lock"></span>
        <span class="icon addon-icon pull-right" :class="'icon-'+passwordIcon" @click="togglePasswordVisibility"></span>
      </div>
      <p class="errors">
        <span class="icon error-sign" v-if="errorMessage"></span>
        <span>{{ errorMessage }}</span>
      </p>
      <div class="row-login">
        <button type="submit" class="button" :class="{'is-loading': processing, 'is-disabled': $v.$invalid}">
          {{ $t('account.loginPage.btnSubmit') }}
        </button>
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
        'loginAccount', 'redirectUri'
      ]),
    },

    methods: {
      ...mapActions([
        'setLoginAccountId', 'addLoginnedAccount',
      ]),

      handleSubmit: async function() {
        console.log('handle submit, validation: ', this.$v.$invalid, 'processing: ', this.processing)
        if (!this.$v.$invalid && !this.processing) {
          this.processing = true
          try {
            let result = await this.$acs.createToken(this.accountId, this.password)
            this.processing = false
            console.info('create token result: ', result)

            if (result.success) {
              this.addLoginnedAccount(result)
              this.setLoginAccountId(this.accountId)

              if (window.acsConfig.inApp) {
                console.log('close webview with result: ', result)
                nativeApi.closeWebviewWithResult(result)
              } else {
                if (this.redirectUri) {
                  window.location = this.redirectUri
                }
              }
            } else {
              console.error('create token failed with error: ', this.$t(result.i18n_message, result.i18n_object))
              this.setErrorMessage(this.$t(result.i18n_message, result.i18n_object))
            }
          } catch (e) {
            console.error('create token failed with exception: ', e)
            this.processing = false
            this.setErrorMessage(this.$t('error.server.networkError'))
          }
          this.processing = false
        }
      },
    },
  }
</script>