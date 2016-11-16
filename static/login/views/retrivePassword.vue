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
                validateUserName: {rule: true, message: this.supportPhone? $t('account.error.userNameWrong'):$t('account.error.userNameEmailWrong') },
                }">
            <input type="text" :placeholder="supportPhone? $t('account.login_page.userPlaceHolder'): $t('account.login_page.userOnlyEmailPlaceHolder')"
              v-model.trim="userName" autocomplete="off" name="user" @focusout="handleValidate" />
          </validity>
          <div class="clearTimes" @click="userName=''">
            <icon name="times"></icon>
          </div>
        </div>
        <p v-if="usernameInvalid" class="errors">{{ usernameTip }}</p>
        <div class="row-login">
          <router-link :to="{ name: 'login' }">{{ $t('account.login_page.btnSubmit') }}</router-link>
        </div>
        <div class="row-login">
          <input type="button" :value="$t('account.login_page.btnSendverificationCode')" @click.prevent="onReport" />
        </div>
      </validation>
    </div>
  </div>
</template>
<script>
  import Icon from 'vue-awesome/components/Icon.vue'
  import 'vue-awesome/icons/times'
  export default {
    created(){
      let res = document.querySelector('meta[name="phone-register-support"]').getAttribute('content')
      if(res == "true"){
			  this.supportPhone = true; 
      }else{
        this.supportPhone = false; 
      }
    },

    validators: {
      validateUserName: function(val){
        if(this.supportPhone){
          return this.validateEmail || this.validatePhoneNumber
        }else{
          return this.validateEmail
        }
      }
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

      validateEmail: function() {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(this.userName);
      },

      validatePhoneNumber: function() {
        return /^1[34578]\d{9}$/.test(this.userName); 
      },

    },

    methods: { 
      handleValidate: function (e) {
        e.target.$validity.validate(function () {
          
        })
      },

      onReport: function(e){
        if(this.$validation.validationRetrive.valid){
          this.$http({
              method: 'POST',
              url: '',
              params: {}
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
  @import '../scss/common';
</style>