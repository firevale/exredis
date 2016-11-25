<template>
  <div class="login-box">
    <validation name="register">
      <div class="row-login">
        <p class="title">{{ $t('account.login_page.titleRegister') }}</p>
      </div>
      <div class="row-login">
        <validity ref="username" field="username" :validators="{
                required: {rule: true, message: $t('account.error.requireUserName')}, 
                maxlength: {rule: 50, message: $t('account.error.userNameTooLong')},
                isValidAccountName: {rule: true, message: isMobileRegisterSupported? $t('account.error.invalidAccountName'):$t('account.error.invalidEmailAddress') },
                accountNotExists: {rule: true, message: $t('account.error.accountInUse')}
                }">
          <input type="text" :placeholder="isMobileRegisterSupported? $t('account.login_page.userPlaceHolder'): $t('account.login_page.userOnlyEmailPlaceHolder')"
            v-model.trim="username" autocomplete="off" name="user" @focusout="handleValidate" />
        </validity>
        <div class="headerIcon">
          <icon name="user-o"></icon>
        </div>
      </div>
      <div class="row-login">
        <validity ref="password" field="password" :validators="{
                required: {rule: true, message: $t('account.error.requirePassword')}, 
                maxlength: {rule: 50, message: $t('account.error.passwordTooLong')},
                }">
          <input type="password" :placeholder="$t('account.login_page.userPasswordPlaceHolder')" v-model.trim="password" autocomplete="off"
            name="password" @focusout="handleValidate" />
        </validity>
        <div class="headerIcon">
          <icon name="lock"></icon>
        </div>
      </div>
      <div class="row-login">
        <validity ref="confirmPassword" field="confirmPassword" :validators="{
                required: {rule: true, message: $t('account.login_page.userPasswordConfirmPlaceHolder')}, 
                minlength: {rule: 6, message: $t('account.error.confirmWordDifferent')},
                maxlength: {rule: 6, message: $t('account.error.confirmWordDifferent')},
                isValidVerifyCode: {rule: true, message: $t('account.error.confirmWordDifferent')}
                }">
          <input type="text" :placeholder="$t('account.login_page.userPasswordConfirmPlaceHolder')" v-model.trim="confirmPassword"
            autocomplete="off" class="outsideText" name="confirmPassword" @focusout="handleValidate" />
        </validity>
        <!--<div v-if="shouldShowCaptcha">-->
        <div>
          <img class="captcha" :src="captchaUrl"></img>
        <input type="button" :value="captcha" readonly="readonly"
          class="insideInput">
          </input>
        </div>
        <input v-if="shouldShowSendVerifyCodeButton" type="button" :class="{'inputDisabled': hasSentCode}"
          class="insideInput" :value="hasSentCode? timerNum :$t('account.login_page.btnSendverificationCode')" @click="sendCode">
        </input>
        <div class="headerIcon">
          <icon name="check-circle-o" stroke-color="#fff" fill-color="#aaa"></icon>
        </div>
      </div>
      <p v-if="usernameInvalid" class="errors">
        <icon name="info-circle" scale=".8" fill-color="#ff3860"></icon>&nbsp{{ usernameTip }}</p>
      <p v-if="!usernameInvalid && passwordInvalid" class="errors">
        <icon name="info-circle" scale=".8" fill-color="#ff3860"></icon>&nbsp{{ passwordTip }}</p>
      <p v-if="!usernameInvalid && !passwordInvalid && confirmPasswordInvalid" class="errors">
        <icon name="info-circle" scale=".8" fill-color="#ff3860"></icon>&nbsp{{ confirmTip }}</p>
      <p v-if="!usernameInvalid && !passwordInvalid && !confirmPasswordInvalid" class="errors">&nbsp</p>
      <div class="row-login">
        <input type="submit" :value="$t('account.login_page.btnRegister')" @click.prevent="onRegister" />
      </div>
      <div class="row-login">
        <router-link :to="{ name: 'login' }">{{ $t('account.login_page.btnSubmit') }}</router-link>
      </div>
    </validation>
  </div>
</template>
<script>
  import utils from '../common/utils'
  import Icon from '../components/fvIcon/Icon.vue'
  import '../components/fvIcon/icons/times'
  import '../components/fvIcon/icons/info-circle'
  import '../components/fvIcon/icons/user-o'
  import '../components/fvIcon/icons/lock'
  import '../components/fvIcon/icons/check-circle-o'

  import Vue from 'vue'
  import {
    mapGetters,
    mapActions
  } from 'vuex'

  export default {
    validators: {
      isValidAccountName: function(val) {
        if (this.isMobileRegisterSupported) {
          return utils.isValidEmail(val) || utils.isValidMobileNumber(val)
        } else {
          return utils.isValidEmail(val)
        }
      },

      accountNotExists: function(val) {
        this.setRegisterAccount(val)

        if (!val) {
          return Promise.reject('')
        } else {
          if (typeof this.accountExistences[val] === 'boolean') {
            return this.accountExistences[val] ? Promise.reject('') : Promise.resolve()
          } else {
            return Vue.http.post('/user/is_account_exists', {
              account_id: val
            }).then(res => {
              return res.json()
            }).then(json => {
              this.addAccountExistence({
                account: val,
                exists: json.exists
              })
              return json.exists ? Promise.reject('') : Promise.resolve()
            })
          }
        }
      },

      isValidVerifyCode: function(val) {
        return this.isValidMobileNumber ? this.confirmPassword == this.phoneCodeSent :
          this.isValidEmail ? this.confirmPassword == this.captcha : false
      }
    },

    data: function() {
      return {
        hasSentCode: false,
        timerNum: 60,
        isMobileRegisterSupported: window.acsConfig.isMobileRegisterSupported,
        username: '',
        password: '',
        phoneCodeSent: 'frffw3',
        captcha: 'y2394j',
        confirmPassword: '',
      }
    },

    created: function() {
      this.updateCaptcha()
    },

    computed: {
      ...mapGetters([
        'accountExistences', 'registerAccount', 'captchaUrl'
      ]),

      usernameInvalid: function() {
        return this.$validation.register &&
          this.$validation.register.username &&
          this.$validation.register.username.invalid
      },

      passwordInvalid: function() {
        return this.$validation.register &&
          this.$validation.register.password &&
          this.$validation.register.password.invalid
      },

      confirmPasswordInvalid: function() {
        return this.$validation.register &&
          this.$validation.register.confirmPassword &&
          this.$validation.register.confirmPassword.invalid
      },

      usernameTip: function() {
        let res = ''
        if (this.$refs.username.result.invalid) {
          res = this.$refs.username.result.errors && this.$refs.username.result.errors[0].message
        }
        return res
      },

      passwordTip: function() {
        let res = ''
        if (this.$refs.password.result.invalid) {
          res = this.$refs.password.result.errors && this.$refs.password.result.errors[0].message
        }
        return res
      },

      confirmTip: function() {
        let res = ''
        if (this.$refs.confirmPassword.result.invalid) {
          res = this.$refs.confirmPassword.result.errors && this.$refs.confirmPassword.result.errors[0].message
        }
        return res
      },

      shouldShowCaptcha: function() {
        return utils.isValidEmail(this.username)
      },

      shouldShowSendVerifyCodeButton: function() {
        return utils.isValidMobileNumber(this.username)
      }
    },

    methods: {
      ...mapActions([
        'addAccountExistence', 'setRegisterAccount', 'setLoginAccount', 'updateCaptcha'
      ]),

      handleValidate: function(e) {
        e.target.$validity.validate(function() {

        })
      },

      timerCount: function() {
        if (this.hasSentCode && this.timerNum > 0) {
          this.timerNum--
            setTimeout(this.timerCount, 1000)
        } else {
          this.hasSentCode = false
          this.timerNum = 60
        }
      },

      sendCode: function() {
        if (this.$validation.register.username.valid && this.username.length && !this.hasSentCode) {
          this.hasSentCode = true
          setTimeout(this.timerCount, 1000)
        }

        return false

        if (this.$validation.register.username.valid && this.username.length && !this.hasSentCode) {
          let urlApi = ''
          if (this.isMobileRegisterSupported && this.isValidMobileNumber) {
            urlApi = 'sendCodeToPhone'
          } else if (this.isValidEmail) {
            urlApi = 'sendCodeToEmail'
          }
          this.$http({
            method: 'POST',
            url: urlApi,
            params: {
              username: this.username
            }
          }).then(response => {
            let result = response.json()
            if (result.success) {
              if (!this.hasSentCode) {
                this.hasSentCode = true
                setTimeout(this.timerCount, 1000)
              }
            } else {
              return Promise.reject('error')
            }
          })
        }
      },

      onRegister: function() {
        if (this.$validation.register.valid && this.username.length && this.password.length && this.confirmPassword) {
          this.$http({
            method: 'POST',
            url: '',
            params: {
              username: '',
              password: '',
              confirmWord: '',
            }
          }).then(response => {
            let result = response.json()
            if (result.success) {

            } else {
              return Promise.reject('account.error.invalidPassword')
            }
          })
        }
      },
    },

    components: {
      'icon': Icon,
    }

  }
</script>
<style lang="scss">

</style>