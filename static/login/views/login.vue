<template>
  <div class="login-box">
    <validation name="login" @submit.prevent="handleSubmit">
      <div class="row-login">
        <p class="title">{{ $t('account.loginPage.title') }}</p>
      </div>
      <div class="row-login">
        <validity ref="accountId" field="accountId" :validators="{
            required: {rule: true, message: $t('account.error.requireUserName')}, 
            validAccountId: {rule: true, message: invalidAccountIdErrorMessage},
          }">
          <input type="text" maxlength="50" v-model.trim="accountId" autocomplete="off" name="user" @focusout="handleValidate" :placeholder="accountIdPlaceholder"
          />
        </validity>
        <span class="icon addon-icon icon-user"></span>
      </div>
      <div class="row-login">
        <validity ref="password" field="password" :validators="{
              required: {rule: true, message: $t('account.error.requirePassword')}, 
          }">
          <input ref="password" class="sibling" maxlength="20" type="password" v-model.trim="password" autocomplete="off" name="password"
            @focusout="handleValidate" :placeholder="$t('account.loginPage.userPasswordPlaceHolder')" />
        </validity>
        <span class="icon addon-icon icon-lock"></span>
        <span class="icon addon-icon pull-right" :class="'icon-'+passwordIcon" @click="togglePasswordVisibility"></span>
      </div>
      <p class="errors">
        <span v-if="errorMessage" class="icon error-sign"></span>
        <span>{{ errorMessage }}</span>
      </p>
      <div class="row-login">
        <input type="submit" :value="$t('account.loginPage.btnSubmit')" />
      </div>
      <div class="row-login">
        <router-link :to="{ name: 'registerStep1' }">{{ $t('account.loginPage.registration') }}</router-link>
        <router-link :to="{ name: 'retrievePasswordStep1' }">{{ $t('account.loginPage.forgetPassword') }}</router-link>
      </div>
    </validation>
  </div>
</template>
<script>
  import utils from '../common/utils'
  import nativeApi from '../common/nativeApi'
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

    beforeMount: function() {
      this.accountId = this.loginAccount
    },

    data: function() {
      return {
        accountId: '',
        password: '',
        passwordIcon: 'eye-slash',
        errorMessage: '',
      }
    },

    computed: {
      ...mapGetters([
        'loginAccount', 'invalidAccountIdErrorMessage', 'accountIdPlaceholder' 
      ]),
    },

    methods: {
      ...mapActions([
        'addAccountExistence', 'setLoginAccount', 'validateAccountId', 'addLoginnedAccount'
      ]),

      handleValidate: function(e) {
        e.target.$validity.validate(_ => {
          if (this.$refs.accountId &&
            this.$refs.accountId.invalid &&
            this.$refs.accountId.result.errors &&
            this.$refs.accountId.result.errors.length > 0) {
            this.errorMessage = this.$refs.accountId.result.errors[0].message
          } else if (this.$refs.password &&
            this.$refs.password.invalid &&
            this.$refs.password.result.errors &&
            this.$refs.password.result.errors.length > 0) {
            this.errorMessage = this.$refs.password.result.errors[0].message
          } else {
            this.errorMessage = ''
          }
        })
      },

      handleSubmit: function() {
        if (this.$validation.login.valid && this.accountId && this.password) {
          this.$http({
            method: 'post',
            url: '/user/create_token',
            params: {
              account_id: this.accountId,
              password: this.password
            }
          }).then(response => {
            return response.json()
          }).then(result => {
            if (result.success) {
              this.addLoginnedAccount(result)
              this.setLoginAccount(this.accountId)
              if (window.acsConfig.inApp) {
                nativeApi.closeLoginDialog(result)
              }
            } else {
              this.errorMessage = this.$t(result.message)
            }
          })
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