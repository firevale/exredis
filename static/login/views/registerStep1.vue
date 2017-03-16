<template>
  <div class="login-box">
    <form @submit.prevent="handleSubmit">
      <div class="row-login">
        <p class="title">{{ bindUserId? $t('account.loginPage.titleBind') : $t('account.loginPage.titleRegister') }}</p>
      </div>
      <p class="code-tip"> {{ $t('account.registerPage.pleaseInputAccountName') }}: </p>
      <div class="row-login">
        <input type="text" maxlength="50" :placeholder="accountIdPlaceholder" v-model.trim="accountId" autocomplete="off" name="user" @input="handleValidation" />
        <span class="icon addon-icon icon-user"></span>
      </div>
      <p class="errors">
        <span v-if="errorHint" class="icon error-sign"></span>
        <span>{{ errorHint }}</span>
      </p>
      <div class="row-login">
        <input type="submit" :class="{'is-disabled': processing}" :value="$t('account.registerPage.nextStep')" :disabled="processing" />
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

  import loginFormMixin from './loginFormMixin'
  import {
    accountId
  } from './loginValidation'

  export default {
    mixins: [loginFormMixin],

    validations: {
      accountId,
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
    },

    methods: {
      ...mapActions([
        'setRegisterAccountId',
      ]),

      handleSubmit: async function() {
        if (!this.$v.$error && !this.processing) {
          this.processing = true
          try {
            let result = await this.$acs.isAccountExists(this.accountId)

            if (result.success) {
              if (result.exists) {
                this.setErrorMessage(this.$t('account.error.accountInUse'))
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
              this.setErrorMessage(this.$t(result.message))
            }
          } catch (e) {
            this.setErrorMessage(this.$t('account.error.networkError'))
          }
          this.processing = false
        }
      },
    },
  }
</script>