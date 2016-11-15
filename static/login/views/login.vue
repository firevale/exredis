<template>
  <div class="g-con">
    <div class="login-box">
      <validation name="validationLogin">
        <div class="row-login">
          <p>{{ $t('account.login_page.title') }}</p>
        </div>
        <div class="row-login">
          <validity ref="username" field="username" :validators="{
                required: {rule: true, message: $t('account.error.requireUserName')}, 
                maxlength: {rule: 50, message: $t('account.error.userNameTooLong')},
                }">
            <input type="text" :placeholder="supportPhone? $t('account.login_page.userPlaceHolder'): $t('account.login_page.userOnlyEmailPlaceHolder')" v-model.trim="userName" autocomplete="off"
              name="user" @focusout="handleValidate" />
          </validity>
        </div>
        <p v-if="usernameInvalid" class="errors">{{ usernameTip }}</p>
        <div class="row-login">
          <validity ref="password" field="password" :validators="{
                required: {rule: true, message: $t('account.error.requirePassword')}, 
                maxlength: {rule: 50, message: $t('account.error.passwordTooLong')},
                }">
            <input type="password" :placeholder="$t('account.login_page.userPasswordPlaceHolder')" v-model.trim="passWord" autocomplete="off"
              name="password" @focusout="handleValidate" @keyup.enter="goLogin"/>
          </validity>
        </div>
        <p v-if="passwordInvalid" class="errors">{{ passwordTip }}</p>
        <div class="row-login">
          <router-link :to="{ name: 'register' }">{{ $t('account.login_page.registration') }}</router-link>
          <router-link :to="{ name: 'retrive' }">{{ $t('account.login_page.forgetPassword') }}</router-link>
        </div>
        <div class="row-login">
          <input type="button" :value="$t('account.login_page.btnSubmit')" @click.prevent="onLogin"/>
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

    data: function(){
      return {
        supportPhone: false,
        userName: '',
        passWord: '',
      }
    },

    route: {
      
    },

    mounted: function() {
      
    },

    computed: {
      usernameInvalid: function() {
        return this.$validation.validationLogin 
               && this.$validation.validationLogin.username
               && this.$validation.validationLogin.username.invalid
      },

      usernameTip: function() {
        let res=''
        if(this.$refs.username.result.invalid){
          res = this.$refs.username.result.errors && this.$refs.username.result.errors[0].message
        }
        return res
      },

      passwordInvalid: function() {
        return this.$validation.validationLogin 
               && this.$validation.validationLogin.password
               && this.$validation.validationLogin.password.invalid
      },

      passwordTip: function() {
        let res=''
        if(this.$refs.password.result.invalid){
          res = this.$refs.password.result.errors && this.$refs.password.result.errors[0].message
        }
        return res
      }

    },

    methods: { 
      handleValidate: function (e) {
        e.target.$validity.validate(function () {
          
        })
      },

      onLogin: function () {
        if(this.$validation.validationLogin.valid){

        }
      },


    },

  }
</script>
<style lang="scss">
  @import '../scss/common';
</style>