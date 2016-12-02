<template>
  <div class="login-box">
    <validation name="register" @submit.prevent="handleSubmit">
      <div class="row-login">
        <p class="title">{{ $t('account.loginPage.titleRegister') }}</p>
      </div>
      <div class="row-login">
        <validity ref="accountId" field="accountId" :validators="{
                required: {rule: true, message: $t('account.error.requireUserName')}, 
                validAccountId: {rule: true, message: invalidAccountIdErrorMessage},
                }">
          <input type="text" maxlength="50" :placeholder="accountIdPlaceholder" v-model.trim="accountId" autocomplete="off" name="user"
            @focusout="handleValidate" />
        </validity>
        <div class="header-icon">
          <icon name="user-o" :fill-color="colors.white"></icon>
        </div>
      </div>
      <div class="row-login">
        <validity ref="password" field="password" :validators="{
                required: {rule: true, message: $t('account.error.requirePassword')}, 
                minlength: {rule: 6, message: $t('account.error.passwordWrong')},
                }">
          <input type="password" class="sibling" minlength="6" maxlength="20" :placeholder="$t('account.loginPage.userPasswordPlaceHolder')"
            v-model.trim="password" autocomplete="off" name="password" @focusout="handleValidate" />
        </validity>
        <div class="header-icon">
          <icon name="lock" :fill-color="colors.white"></icon>
        </div>
        <div class="tail-icon" @click="togglePasswordVisibility">
          <icon :name="passwordIcon" :fill-color="colors.white"></icon>
        </div>
      </div>
      <div class="row-login">
        <validity ref="verifyCode" field="verifyCode" :validators="{
                required: {rule: true, message: $t('account.loginPage.verifyCodePlaceholder')}, 
                minlength: {rule: 4, message: $t('account.error.verifyCodeTooShort')},
                }">
          <input type="text" :placeholder="$t('account.loginPage.verifyCodePlaceholder')" v-model.trim="verifyCode" autocomplete="off"
            maxlength="10" class="outsideText sibling" name="verifyCode" @focusout="handleValidate" />
        </validity>
        <div v-if="shouldShowCaptcha" class="captchaBox">
          <img class="captcha" :src="captchaUrl"></img>
          <input type="button" class="changeCode" :value="$t('account.loginPage.changeCode')" @click="updateCaptcha">
          </input>
        </div>
        <input v-if="shouldShowSendVerifyCodeButton" type="button" :class="{'inputDisabled': cooldownCounter > 0}" class="insideInput"
          :value="sendCodeTex" @click.prevent="sendMobileVerifyCode">
        </input>
        <div class="header-icon">
          <icon name="check-circle-o" :stroke-color="colors.dark" :fill-color="colors.white"></icon>
        </div>
      </div>
      <p class="errors">
        <icon v-if="errorMessage" name="info-circle" scale=".8" :fill-color="colors.danger"></icon>&nbsp{{ errorMessage }}
      </p>
      <div class="row-login">
        <input type="submit" :value="$t('account.loginPage.btnRegister')" />
      </div>
      <div class="row-login" style="justify-content: flex-end;">
        <router-link :to="{name: 'login'}">{{ $t('account.registerPage.goLoginPage') }}</router-link>
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
  import msg from '../components/message'
  import Vue from 'vue'
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
        hasSentCode: false,
        isMobileAccountSupported: window.acsConfig.isMobileAccountSupported,
        cooldownCounter: 0,
        accountId: '',
        password: '',
        passwordIcon: 'eye',
        verifyCode: '',
        errorMessage: '',
      }
    },

    created: function() {
      this.accountId = this.registerAccount
      this.updateCaptcha()
    },

    computed: {
      ...mapGetters([
        'registerAccount', 'captchaUrl', 'invalidAccountIdErrorMessage', 'accountIdPlaceholder', 'colors'
      ]),

      shouldShowCaptcha: function() {
        return utils.isValidEmail(this.accountId)
      },

      shouldShowSendVerifyCodeButton: function() {
        return utils.isValidMobileNumber(this.accountId)
      },

      sendCodeTex: function() {
        
        if(this.cooldownCounter > 0){
          return this.$t('account.registerPage.cooldownText',{timer: this.cooldownCounter})
        }else{
          if(this.hasSentCode){
            return this.$t('account.registerPage.sendAgain')
          }else{
            return this.$t('account.loginPage.btnSendverificationCode')
          }
        }
      },
    },

    methods: {
      ...mapActions([
        'addAccountExistence', 'setLoginAccount', 'setRegisterAccount', 'updateCaptcha',
        'validateAccountId'
      ]),

      handleValidate: function(e) {
        this.errorMessage = ''
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
          } else if (this.$refs.verifyCode &&
            this.$refs.verifyCode.invalid &&
            this.$refs.verifyCode.result.errors &&
            this.$refs.verifyCode.result.errors.length > 0) {
            this.errorMessage = this.$refs.verifyCode.result.errors[0].message
          } else {
            this.errorMessage = ''
          }
        })
      },

      cooldownTimer: function() {
        if (this.cooldownCounter > 0) {
          this.cooldownCounter--;
          setTimeout(this.cooldownTimer, 1000);
        }
      },

      sendMobileVerifyCode: function() {
        if (window.acsConfig.isMobileAccountSupported &&
          utils.isValidMobileNumber(this.accountId) &&
          this.$validation.register.accountId.valid) {
          this.$http({
            method: 'post',
            url: "/send_mobile_register_verify_code",
            params: {
              mobile: this.accountId
            }
          }).then(response => {
            return response.json()
          }).then(result => {
            if (result.success) {
              msg.showMsg({msg:this.$t('account.registerPage.messageTip'), target: this.$parent.$refs.msg})
              this.hasSentCode = true
              this.cooldownCounter = 60
              setTimeout(this.cooldownTimer, 1000)
            } else {
              this.errorMessage = this.$t(result.message)
            }
          })
        }
      },

      handleSubmit: function() {
        if (this.$validation.register.valid &&
          this.accountId &&
          this.password &&
          this.verifyCode) {
          this.$http({
            method: 'post',
            url: '/user/create_user',
            params: {
              account_id: this.accountId,
              password: this.password,
              verify_code: this.verifyCode
            }
          }).then(response => {
            return response.json()
          }).then(result => {
            if (result.success) {
              this.addAccountExistence({
                account: this.accountId,
                exists: true
              })
              this.setLoginAccount(this.accountId)
              this.setRegisterAccount(undefined)
            } else {
              this.errorMessage = this.$t(result.message)
            }
          }).catch(e => {
            if(e.status == '404'){
              
            }
          })
        }
      },

      togglePasswordVisibility: function() {
        if (this.passwordIcon === 'eye') {
          this.passwordIcon = 'eye-slash'
          this.$refs.password.$el.type = 'text'
        } else {
          this.passwordIcon = 'eye'
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