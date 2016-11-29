<template>
  <div class="login-box">
    <validation name="validationRetrive">
      <div class="row-login">
        <p class="title">{{ $t('account.loginPage.titleRetrive') }}</p>
      </div>
      <p v-if="hasSentCode && receiverType == 'phone'" class="codeTip">
        {{ $t('account.retrivePasswordPage.sendPhoneCodeTipPre') }}
        <span class="errors" style="margin: 0; padding: 0;">{{ receiverName }}</span> {{ $t('account.retrivePasswordPage.sendPhoneCodeTipEnd')
        }}
      </p>
      <p v-if="hasSentCode && receiverType == 'email'" class="codeTip">
        {{ $t('account.retrivePasswordPage.sendEmailCodeTipPre') }}
        <span class="errors" style="margin: 0; padding: 0;">{{ receiverName }}</span> {{ $t('account.retrivePasswordPage.sendEmailCodeTipEnd')
        }}
      </p>
      <div class="row-login">
        <validity v-show="!hasSentCode" ref="username" field="username" :validators="{
                required: {rule: true, message: $t('account.error.requireUserName')}, 
                maxlength: {rule: 50, message: $t('account.error.userNameTooLong')},
                validateUserName: {rule: true, message: this.isMobileRegisterSupported? $t('account.error.invalidAccountName'):$t('account.error.invalidEmailAddress') },
                }">
          <input type="text" class="outsideText" :placeholder="isMobileRegisterSupported? $t('account.loginPage.userPlaceHolder'): $t('account.loginPage.userOnlyEmailPlaceHolder')"
            v-model.trim="userName" autocomplete="off" name="user" @focusout="handleValidate" />
        </validity>
        <validity v-show="hasSentCode" ref="confirmCode" field="confirmCode" :validators="{
                required: {rule: true, message: $t('account.loginPage.userPasswordConfirmPlaceHolder')}, 
                maxlength: {rule: 6, message: $t('account.error.verifyCodeNotMatch')},
                minlength: {rule: 6, message: $t('account.error.verifyCodeNotMatch')},
                isValidVerifyCode: {rule: true, message: $t('account.error.verifyCodeNotMatch')},
                }">
          <input type="text" class="outsideText" :placeholder="$t('account.loginPage.userPasswordConfirmPlaceHolder')" v-model.trim="confirmWorldInput"
            autocomplete="off" name="user" @focusout="handleValidate" />
        </validity>
        <input type="button" class="insideInput" :class="{'inputDisabled': hasSentCode}" :value="hasSentCode? timerNum :$t('account.loginPage.btnSendverificationCode')"
          @click.prevent="onReport" />
        <div class="headerIcon">
          <icon v-show="!hasSentCode" name="user-o"></icon>
          <icon v-show="hasSentCode" name="pencil-square-o" fill-color="#aaa"></icon>
        </div>
      </div>
      <p v-if="usernameInvalid" class="errors">
        <icon name="info-circle" scale=".8" fill-color="#ff3860"></icon>&nbsp{{ usernameTip }}</p>
      <p v-else v-if="confirmCodeInvalid" class="errors">
        <icon name="info-circle" scale=".8" fill-color="#ff3860"></icon>&nbsp{{ confirmCodeTip }}</p>
      <p v-if="!usernameInvalid && !confirmCodeInvalid" class="errors">&nbsp</p>

      <div class="row-login" v-show="hasSentCode">
        <input type="submit" :value="$t('account.retrivePasswordPage.nextStep')" @click.prevent="onNext" />
      </div>
      <div class="row-login">
        <router-link :to="{ name: 'login' }">{{ $t('account.loginPage.btnSubmit') }}</router-link>
      </div>
    </validation>
  </div>
</template>
<script>
  import Icon from '../components/fvIcon/Icon.vue'
  import '../components/fvIcon/icons/pencil-square-o'
  export default {
    created() {
      
    },

    validators: {
      validateUserName: function(val) {
        if (this.isMobileRegisterSupported) {
          return this.isValidEmail || this.isValidMobileNumber
        } else {
          return this.isValidEmail
        }
      },

      isValidVerifyCode: function(val) {
        return this.isValidMobileNumber ? this.confirmWorldInput == this.phoneCodeSent :
          this.isValidEmail ? this.confirmWorldInput == this.emailCodeSent : false
      },

    },

    data: function() {
      return {
        hasSentCode: false,
        timerNum: 60,
        isMobileRegisterSupported: window.acsConfig.isMobileRegisterSupported,
        userName: '',
        phoneCodeSent: 'iuy876',
        emailCodeSent: 'o2u8y5',
        confirmWorldInput: '',
        receiverName: '',
        receiverType: ''
      }
    },

    route: {

    },

    computed: {
      usernameInvalid: function() {
        return this.$validation.validationRetrive &&
          this.$validation.validationRetrive.username &&
          this.$validation.validationRetrive.username.invalid
      },

      confirmCodeInvalid: function() {
        return this.$validation.validationRetrive &&
          this.$validation.validationRetrive.confirmCode &&
          this.$validation.validationRetrive.confirmCode.invalid
      },

      usernameTip: function() {
        let res = ''
        if (this.$refs.username.result.invalid) {
          res = this.$refs.username.result.errors && this.$refs.username.result.errors[0].message
        }
        return res
      },

      confirmCodeTip: function() {
        let res = ''
        if (this.$refs.confirmCode.result.invalid) {
          res = this.$refs.confirmCode.result.errors && this.$refs.confirmCode.result.errors[0].message
        }
        return res
      },

      isValidEmail: function() {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(this.userName);
      },

      isValidMobileNumber: function() {
        return /^1[34578]\d{9}$/.test(this.userName);
      },

    },

    methods: {
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

      onReport: function(e) {
        if (this.$validation.validationRetrive.username.valid && this.userName.length && !this.hasSentCode) {
          this.hasSentCode = true
          this.receiverName = this.userName
          this.isValidMobileNumber ? this.receiverType = 'phone' : this.receiverType = 'email'
          setTimeout(this.timerCount, 1000)
        }
        return false

        if (this.$validation.validationRetrive.valid && this.userName.length) {
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
              userName: this.userName
            }
          }).then(response => {
            let result = response.json()
            if (result.success) {
              this.hasSentCode = true
              setTimeout(this.timerCount, 1000)
              this.receiverName = this.userName
              this.isValidMobileNumber ? this.receiverType = 'phone' : this.receiverType = 'email'
            } else {
              return Promise.reject('error')
            }
          })
        }
      },

      onNext: function(e) {

        this.$router.push({
          name: 'resetPassword',
          params: {
            username: this.userName,
          }
        })
        return false
        
        if (this.$validation.validationRetrive.valid && this.userName.length && this.confirmWorldInput) {
          this.$http({
            method: 'POST',
            url: '',
            params: {}
          }).then(response => {
            let result = response.json()
            if (result.success) {

            } else {
              return Promise.reject('error')
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