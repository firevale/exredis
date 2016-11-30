<template>
  <div class="login-box">
    <validation name="retrieve" @submit.prevent="handleSubmit">
      <div class="row-login">
        <p class="title">{{ $t('account.loginPage.retrievePasswordTitle') }}</p>
      </div>
      <p class="code-tip">
        {{ $t('account.retrievePasswordPage.pleaseInputAccountName') }}:
      </p>
      <div class="row-login">
        <validity ref="accountId" field="accountId" :validators="{
                required: {rule: true, message: $t('account.error.requireUserName')}, 
                isValidAccountName: {rule: true, message: this.isMobileAccountSupported? $t('account.error.invalidAccountName'):$t('account.error.invalidEmailAddress') },
                }">
          <input type="text" maxlength="50" class="outsideText" :placeholder="isMobileAccountSupported? $t('account.loginPage.userPlaceHolder'): $t('account.loginPage.userOnlyEmailPlaceHolder')"
            v-model.trim="accountId" autocomplete="off" name="user" @focusout="handleValidate" />
        </validity>
        <div class="header-icon">
          <icon name="user-o"></icon>
        </div>
      </div>

      <p class="errors">
        <icon v-if="errorMessage" name="info-circle" scale=".8" fill-color="#ff3860"></icon>&nbsp{{ errorMessage }}
      </p>
      
      <div class="row-login">
        <input type="submit" :value="$t('account.retrievePasswordPage.nextStep')" />
      </div>
    </validation>
  </div>
</template>
<script>
  import Icon from '../components/fvIcon/Icon.vue'
  import '../components/fvIcon/icons/pencil-square-o'
  import {
    mapGetters,
    mapActions
  } from 'vuex'

  export default {
    validators: {
      isValidAccountName: function(val) {
        this.validateAccountId(val)
      },
    },

    beforeMount: function() {
      this.accountId = this.loginAccount
    },

    data: function() {
      return {
        hasSentCode: false,
        timerNum: 60,
        isMobileAccountSupported: window.acsConfig.isMobileAccountSupported,
        accountId: '',
        receiverType: '',
        serverError: '',
      }
    },

    computed: {
      ...mapGetters([
        'loginAccount'
      ]),

      isAccountIdInvalid: function() {
        return this.$validation.retrieve &&
          this.$validation.retrieve.accountId &&
          this.$validation.retrieve.accountId.invalid
      },

      errorMessage: function() {
        if (this.isAccountIdInvalid &&
          this.$refs.accountId &&
          this.$refs.accountId.result &&
          this.$refs.accountId.result.errors &&
          this.$refs.accountId.result.errors.length > 0) {
          return this.$refs.accountId.result.errors[0].message
        }
        return this.serverError
      },
    },

    methods: {
      ...mapActions([
        'validateAccountId'
      ]),

      handleValidate: function(e) {
        this.serverError = ''
        e.target.$validity.validate(_ => {})
      },

      onReport: function(e) {
        if (this.$validation.retrieve.accountId.valid && this.accountId.length && !this.hasSentCode) {
          this.hasSentCode = true
          setTimeout(this.timerCount, 1000)
        }
        return false

        if (this.$validation.retrieve.valid && this.accountId.length) {
          let urlApi = ''
          if (this.isMobileAccountSupported && this.isValidMobileNumber) {
            urlApi = 'sendCodeToPhone'
          } else if (this.isValidEmail) {
            urlApi = 'sendCodeToEmail'
          }
          this.$http({
            method: 'POST',
            url: urlApi,
            params: {
              accountId: this.accountId
            }
          }).then(response => {
            let result = response.json()
            if (result.success) {
              this.hasSentCode = true
              setTimeout(this.timerCount, 1000)
            } else {
              return Promise.reject('error')
            }
          })
        }
      },

      handleSubmit: function(e) {
        this.$router.push({
          name: 'resetPassword',
          params: {
            accountId: this.accountId,
          }
        })
      },
    },

    components: {
      'icon': Icon,
    }

  }
</script>
<style lang="scss">

</style>