<template>
  <div class="g-con">
    <div class="login-box">
      <validation name="validationRetrive">
        <div class="row-login">
          <p>{{ $t('account.login_page.titleRetrive') }}</p>
        </div>
        <div class="row-login">
          <validity ref="username" field="username" :validators="{
                required: {rule: true, message: $t('account.error.requireUserName')}, 
                maxLength: {rule: 50, message: $t('account.error.userNameTooLong')},
                }">
            <input type="text" :placeholder="supportPhone? $t('account.login_page.userPlaceHolder'): $t('account.login_page.userOnlyEmailPlaceHolder')" v-model.trim="userName" autocomplete="off"
              name="user" @focusout="handleValidate"/>
          </validity>
        </div>
        <p v-if="usernameInvalid" class="errors">{{ usernameTip }}</p>
        <div class="row-login">
          <router-link :to="{ name: 'login' }">{{ $t('account.login_page.btnSubmit') }}</router-link>
        </div>
        <div class="row-login">
          <input type="button" :value="$t('account.login_page.btnSendverificationCode')"/>
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

    computed: {
      usernameInvalid: function() {
        return this.$validation.validationRetrive 
               && this.$validation.validationRetrive.username
               && this.$validation.validationRetrive.username.invalid
      },

      usernameTip: function() {
        let res=''
        if(this.$refs.username.result.invalid){
          res = this.$refs.username.result.errors && this.$refs.username.result.errors[0].message
        }
        return res
      },
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