<template>
  <div class="login-box">
    <validation name="register" @submit.prevent="handleSubmit">
      <div class="row-login">
        <p class="title">{{ bindUserId? $t('account.loginPage.titleBind') : $t('account.loginPage.titleRegister') }}</p>
      </div>
      <p class="code-tip"> {{ $t('account.registerPage.pleaseInputAccountName') }}: </p>
      <div class="row-login">
        <validity ref="accountId" field="accountId" :validators="{
                required: {rule: true, message: $t('account.error.requireUserName')}, 
                validAccountId: {rule: true, message: invalidAccountIdErrorMessage},
                }">
          <input type="email" maxlength="50" :placeholder="accountIdPlaceholder" v-model.trim="accountId" autocomplete="off" name="user"
            @focusout="handleValidate" />
        </validity>
        <span class="icon addon-icon icon-user"></span>
      </div>
      <p class="errors">
        <span v-if="errorMessage" class="icon error-sign"></span>
        <span>{{ errorMessage }}</span>
      </p>
      <div class="row-login">
        <input type="submit" :class="{'is-disabled': processing}" :value="$t('account.registerPage.nextStep')" :disabled="processing"/>
        <span v-show="processing" class="icon progress-icon rotating"></span>
      </div>
      <div class="row-login" style="-webkit-justify-content: flex-end; justify-content: flex-end;">
        <a class="pull-right" v-show="!bindUserId" @click.prevent="$router.back()">{{ $t('account.registerPage.goLoginPage') }} </a>
      </div>
    </validation>
  </div>
</template>
<script>
  import utils from '../common/utils'
  import msg from '../components/message'
  import {
    mapGetters,
    mapActions
  } from 'vuex'

  export default {
    validators: {
      validAccountId: function(val) {
        return this.validateAccountId(val).then(result => {
          return result ? Promise.resolve() : Promise.reject()
        })
      },
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
        'setRegisterAccountId', 'validateAccountId'
      ]),

      handleValidate: function(e) {
        this.errorMessage = ''
        e.target.$validity.validate(_ => {
          if (this.$refs.accountId &&
            this.$refs.accountId.invalid &&
            this.$refs.accountId.result.errors &&
            this.$refs.accountId.result.errors.length > 0) {
            this.errorMessage = this.$refs.accountId.result.errors[0].message
          } else {
            this.errorMessage = ''
          }
        })
      },

      handleSubmit: function() {
        if (this.$validation.register.valid && this.accountId) {
          this.processing = true
          this.$http({
            method: 'post',
            url: '/user/is_account_exists',
            params: {
              account_id: this.accountId,
            }
          }).then(response => {
            this.processing = false
            return response.json()
          }).then(result => {
            if (result.exists) {
              this.errorMessage = this.$t('account.error.accountInUse')
            } else {
              // remember registerAccount 
              this.setRegisterAccountId(this.accountId)
              this.$router.replace({
                name: 'registerStep2',
                query: {
                  accountId: btoa(this.accountId),
                  bindUserId: this.$route.query.bindUserId
                }
              })
            }
          }).catch(error => {
            this.processing = false
            this.errorMessage = this.$t('account.error.networkError')
          })
        }
      },
    },
  }
</script>