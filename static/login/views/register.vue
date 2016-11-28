<template>
  <div class="login-box">
    <validation name="register" @submit.prevent="handleSubmit">
      <div class="row-login">
        <p class="title">{{ $t('account.login_page.titleRegister') }}</p>
      </div>
      <div class="row-login">
        <validity ref="username" field="username" :validators="{
                required: {rule: true, message: $t('account.error.requireUserName')}, 
                maxlength: {rule: 50, message: $t('account.error.userNameTooLong')},
                validAccountName: {rule: true, message: isMobileRegisterSupported? $t('account.error.invalidAccountName'):$t('account.error.invalidEmailAddress') },
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
        <div class="tailIcon" @click="togglePasswordVisibility">
          <icon :name="tailIcon" fill-color="#fff"></icon>
        </div>
      </div>
      <div class="row-login">
        <validity ref="verifyCode" field="verifyCode" :validators="{
                required: {rule: true, message: $t('account.login_page.userPasswordConfirmPlaceHolder')}, 
                minlength: {rule: 4, message: $t('account.error.verifyCodeTooShort')},
                validVerifyCode: {rule: true, message: $t('account.error.verifyCodeNotMatch')}
                }">
          <input type="text" :placeholder="$t('account.login_page.userPasswordConfirmPlaceHolder')" v-model.trim="verifyCode"
            autocomplete="off" class="outsideText" name="verifyCode" @focusout="handleValidate" />
        </validity>
        <div v-if="shouldShowCaptcha" class="captchaBox">
          <img class="captcha" :src="captchaUrl"></img>
          <input type="button" class="changeCode" :value="$t('account.login_page.changeCode')" @click="updateCaptcha">
          </input>
        </div>
        <input v-if="shouldShowSendVerifyCodeButton" type="button" :class="{'inputDisabled': hasSentCode}" 
              class="insideInput" :value="hasSentCode? cooldownCounter :$t('account.login_page.btnSendverificationCode')"
          @click.prevent="sendMobileVerifyCode">
        </input>
        <div class="headerIcon">
          <icon name="check-circle-o" stroke-color="#fff" fill-color="#aaa"></icon>
        </div>
      </div>
      <p v-if="isUsernameInvalid" class="errors">
        <icon name="info-circle" scale=".8" fill-color="#ff3860"></icon>&nbsp{{ usernameErrorMessage }}</p>
      <p v-if="!isUsernameInvalid && isPasswordInvalid" class="errors">
        <icon name="info-circle" scale=".8" fill-color="#ff3860"></icon>&nbsp{{ passwordErrorMessage }}</p>
      <p v-if="!isUsernameInvalid && !isPasswordInvalid && isVerifyCodeInvalid" class="errors">
        <icon name="info-circle" scale=".8" fill-color="#ff3860"></icon>&nbsp{{ verifyCodeErrorMessage }}</p>
      <p v-if="!isUsernameInvalid && !isPasswordInvalid && !isVerifyCodeInvalid" class="errors">&nbsp</p>

      <div class="row-login">
        <input type="submit" :value="$t('account.login_page.btnRegister')"/>
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
  import '../components/fvIcon/icons/eye-slash'
  import '../components/fvIcon/icons/eye'
  import Vue from 'vue'
  import {
    mapGetters,
    mapActions
  } from 'vuex'

  export default {
    validators: {
      validAccountName: function(val) {
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
            }).then(result => {
              this.addAccountExistence({
                account: val,
                exists: result.exists
              })
              return result.exists ? Promise.reject('') : Promise.resolve(true)
            })
          }
        }
      },

      validVerifyCode: function(val) {
        return Vue.http.post('/check_register_code', {
          verify_code: val
        }).then(res => {
          return res.json()
        }).then(result => {
          return (result.success && result.match) ? Promise.resolve(true) : Promise.reject('')
        })
      }
    },

    data: function() {
      return {
        hasSentCode: false,
        cooldownCounter: 60,
        isMobileRegisterSupported: window.acsConfig.isMobileRegisterSupported,
        username: '',
        password: '',
        tailIcon: 'eye',
        verifyCode: '',
      }
    },

    created: function() {
      this.updateCaptcha()
    },

    computed: {
      ...mapGetters([
        'accountExistences', 'registerAccount', 'captchaUrl'
      ]),

      isUsernameInvalid: function() {
        return this.$validation.register &&
          this.$validation.register.username &&
          this.$validation.register.username.invalid
      },

      isPasswordInvalid: function() {
        return this.$validation.register &&
          this.$validation.register.password &&
          this.$validation.register.password.invalid
      },

      isVerifyCodeInvalid: function() {
        return this.$validation.register &&
          this.$validation.register.verifyCode &&
          this.$validation.register.verifyCode.invalid
      },

      usernameErrorMessage: function() {
        let res = ''
        if (this.$refs.username.result.invalid) {
          res = this.$refs.username.result.errors && this.$refs.username.result.errors[0].message
        }
        return res
      },

      passwordErrorMessage: function() {
        let res = ''
        if (this.$refs.password.result.invalid) {
          res = this.$refs.password.result.errors && this.$refs.password.result.errors[0].message
        }
        return res
      },

      verifyCodeErrorMessage: function() {
        let res = ''
        if (this.$refs.verifyCode.result.invalid) {
          res = this.$refs.verifyCode.result.errors && this.$refs.verifyCode.result.errors[0].message
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
        if (this.hasSentCode && this.cooldownCounter > 0) {
          this.cooldownCounter--
            setTimeout(this.timerCount, 1000)
        } else {
          this.hasSentCode = false
          this.cooldownCounter = 60
        }
      },

      sendMobileVerifyCode: function() {
        if (this.isMobileRegisterSupported && utils.isValidMobileNumber(this.username) && this.$validation.register.username.valid) {
          this.$http({
            method: 'post',
            url: "/send_mobile_register_verify_code",
            params: {
              mobile: this.username
            }
          }).then(response => {
            return response.json()
          }).then(result => {
            console.log(result)
            if (result.success) {
              this.hasSentCode = true
              setTimeout(this.timerCount, 1000)
            } else {
              return Promise.reject('error')
            }
          })
        }
      },

      handleSubmit: function() {
        if (this.$validation.register.valid && this.username && this.password && this.verifyCode) {
          this.$http({
            method: 'post',
            url: '/user/create_user',
            params: {
              account_id: this.username,
              password: this.password,
              verify_code: this.verifyCode
            }
          }).then(response => {
            return response.json()
          }).then(result => {
            if (result.success) {
              this.addAccountExistence({account: this.username, exists: true})
              this.setLoginAccount(this.username)
            } else {
              return Promise.reject(result.message)
            }
          })
        }
      },

      togglePasswordVisibility: function() {
        if (this.tailIcon === 'eye') {
          this.tailIcon = 'eye-slash'
          this.$refs.password.$el.type = 'text'
        } else {
          this.tailIcon = 'eye'
          this.$refs.password.$el.type = 'password'
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