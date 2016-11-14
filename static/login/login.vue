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
                minlength: {rule: 50,message: $t('account.error.userNameTooLong')},
                }">
            <input type="text" :placeholder="$t('account.login_page.userPlaceHolder')" v-model.lazy.trim="userName" autocomplete="off"
              name="user" @focusout="handleValidate" />
          </validity>
        </div>
        <p v-if="usernameInvalid">{{ }}</p>
        <div class="row-login">
          <validity ref="password" field="password" :validators="{
                required: {rule: true, message: $t('account.error.requirePassword')}, 
                maxLength: {rule: 50,message: $t('account.error.passwordTooLong')},
                }">
            <input type="password" :placeholder="$t('account.login_page.userPasswordPlaceHolder')" v-model.lazy.trim="passWord" autocomplete="off"
              name="password" @focusout="handleValidate" />
          </validity>
        </div>
        <p v-if="passwordInvalid">{{ }}</p>
        <div class="row-login">
          <router-link :to="{ name: 'register' }">{{ $t('account.login_page.registration') }}</router-link>
          <router-link :to="{ name: 'retrive' }">{{ $t('account.login_page.forgetPassword') }}</router-link>
        </div>
        <div class="row-login">
          <input type="button" :value="$t('account.login_page.btnSubmit')" />
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

    mounted: function() {
      console.log(this.$validation)
    },

    computed: {
      usernameInvalid: function() {
        return this.$validation.validationLogin 
               && this.$validation.validationLogin.username
               && this.$validation.validationLogin.username.invalid
      },

      passwordInvalid: function() {
        return this.$validation.validationLogin 
               && this.$validation.validationLogin.password
               && this.$validation.validationLogin.password.invalid
      }
    },

    methods: { 
      handleValidate: function (e) {
        console.log('handleValidate', e)
        e.target.$validity.validate(function () {
          if(e.target.$validity.result.invalid){
            let field = e.target.$validity.result.errors[0].field
            this[field] = e.target.$validity.result.errors[0]
          }
        })
      }
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