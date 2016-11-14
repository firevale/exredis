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
            <input type="text" :placeholder="$t('account.login_page.userPlaceHolder')" v-model.lazy.trim="userName" autocomplete="off"
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
    data: function(){
      return {
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
  input.invalid {
    border-color: red;
  }
  
  .errors {
    color: red;
  }
  
  .g-con {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .login-box {
      width: 50%;
      height: 30%;
      margin: auto;
      .row-login {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 10px;
        p {
          flex: 1;
          font-size: .5rem;
          text-align: center;
        }
        input {
          padding: 5px;
          font-size: .4rem;
          flex: 1;
          height: 100%;
          border-bottom: solid 1px #cccccc;
        }
        a {
          font-size: .3rem;
        }
      }
    }
  }
</style>