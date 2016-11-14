<template>
  <div class="g-con">
    <div class="login-box">
      <validation name="validationRegister">
        <div class="row-login">
          <p>{{ $t('account.login_page.titleRegister') }}</p>
        </div>
        <div class="row-login">
          <validity ref="username" field="username" :validators="{
                required: {rule: true, message: $t('account.error.requireUserName')}, 
                maxLength: {rule: 50, message: $t('account.error.userNameTooLong')},
                }">
            <input type="text" :placeholder="supportPhone? $t('account.login_page.userPlaceHolder'): $t('account.login_page.userOnlyEmailPlaceHolder')"
              v-model.trim="userName" autocomplete="off" name="user" @focusout="handleValidate" />
          </validity>
        </div>
        <p v-if="usernameInvalid" class="errors">{{ usernameTip }}</p>
        <div class="row-login">
          <validity ref="password" field="password" :validators="{
                required: {rule: true, message: $t('account.error.requirePassword')}, 
                maxLength: {rule: 50, message: $t('account.error.passwordTooLong')},
                passwordReady: {rule: true, message: $t('account.error.passwordDifferent')},
                }">
            <input type="password" :placeholder="$t('account.login_page.userPasswordPlaceHolder')" v-model.trim="passWord" autocomplete="off"
              name="password" @focusout="handleValidate" />
          </validity>
        </div>
        <p v-if="passwordInvalid" class="errors">{{ passwordTip }}</p>
        <div class="row-login">
          <validity ref="confirmPassword" field="confirmPassword" :validators="{
                required: {rule: true, message: $t('account.error.requirePassword')}, 
                maxLength: {rule: 50, message: $t('account.error.passwordTooLong')},
                passwordReady: {rule: true, message: $t('account.error.passwordDifferent')},
                }">
            <input type="password" :placeholder="$t('account.login_page.userPasswordConfirmPlaceHolder')" v-model.trim="confirmPassword"
              autocomplete="off" name="confirmPassword" @focusout="handleValidate" />
          </validity>
        </div>
        <p v-if="confirmPasswordInvalid" class="errors">{{ confirmPasswordTip }}</p>
        <div class="row-login">
          <router-link :to="{ name: 'login' }">{{ $t('account.login_page.btnSubmit') }}</router-link>
        </div>
        <div class="row-login">
          <input type="button" :value="$t('account.login_page.btnRegister')" />
        </div>
      </validation>
    </div>
  </div>
</template>
<script>

  export default {
	  created(){
     this.supportphone = document.querySelector('meta[name="phone-register-support"]').getAttribute('content')
    },

    validators: {
      passwordReady: function (val) {
        return this.passWord == this.confirmPassword //&& this.$refs.password.validate() && this.$refs.confirmPassword.validate()
      },
    },

    data: function(){
      return {
        supportPhone: false,
        userName: '',
        passWord: '',
        confirmPassword: '',
      }
    },

    route: {
      
    },

		computed: {
		  usernameInvalid: function() {
        return this.$validation.validationRegister 
               && this.$validation.validationRegister.username
               && this.$validation.validationRegister.username.invalid
      },

			passwordInvalid: function() {
        return this.$validation.validationRegister 
               && this.$validation.validationRegister.password
               && this.$validation.validationRegister.password.invalid
      },

			confirmPasswordInvalid: function() {
        return this.$validation.validationRegister 
               && this.$validation.validationRegister.confirmPassword
               && this.$validation.validationRegister.confirmPassword.invalid
      },

			usernameTip: function() {
        let res=''
        if(this.$refs.username.result.invalid){
          res = this.$refs.username.result.errors && this.$refs.username.result.errors[0].message
        }
        return res
      },

			passwordTip: function() {
        let res=''
        if(this.$refs.password.result.invalid){
          res = this.$refs.password.result.errors && this.$refs.password.result.errors[0].message
        }
        return res
      },

			confirmPasswordTip: function() {
        let res=''
        if(this.$refs.confirmPassword.result.invalid){
          res = this.$refs.confirmPassword.result.errors && this.$refs.confirmPassword.result.errors[0].message
        }
        return res
      }
		},

    methods: { 
      handleValidate: function (e) {
        e.target.$validity.validate(function () {
          
        })
      },
    },

  }
</script>
<style lang="scss">
  @import '../scss/common';
</style>