<template>
  <div class="g-con">
    <div class="login-box">
      <validation name="validationRetrive">
        <div class="row-login">
          <p>{{ $t('account.login_page.titleRetrive') }}</p>
        </div>
        <div class="row-login">
          <validity ref="validity" field="username" :validators="{
                required: {rule: true, message: $t('account.error.requireUserName')}, 
                maxLength: {rule: 50,message: $t('account.error.userNameTooLong')},
                }">
            <input type="text" :placeholder="supportPhone? $t('account.login_page.userPlaceHolder'): $t('account.login_page.userOnlyEmailPlaceHolder')" v-model.lazy.trim="userName" autocomplete="off"
              name="user"/>
          </validity>
        </div>
        <span v-if="" class="help is-danger">{{  }}</span>
        <div class="row-login">
          <router-link :to="{ name: 'login' }">{{ $t('account.login_page.btnSubmit') }}</router-link>
        </div>
        <div class="row-login">
          <input type="button" :value="$t('account.login_page.btnSendverificationCode')" />
        </div>
      </validation>
    </div>
  </div>
</template>
<script>
  import VueValidator from 'vue-validator'

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

    computed: VueValidator.mapValidation({
      valid: '$validation.validationRetrive.valid',
      usernameInvalid: '$validation.validationRetrive.username.invalid',
      passwordInvalid: '$validation.validationRetrive.password.invalid',
      confirmInvalid: '$validation.validationRetrive.confirm.invalid'
    }),

    methods: { 
      
    },

  }
</script>
<style lang="scss">
  @import './common';
</style>