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
                validateUserName: {rule: true, message: this.supportPhone? $t('account.error.userNameWrong'):$t('account.error.userNameEmailWrong') },
                }">
						<input type="text" :placeholder="this.supportPhone? $t('account.login_page.userPlaceHolder'): $t('account.login_page.userOnlyEmailPlaceHolder')"
								v-model.trim="userName" autocomplete="off" name="user" @focusout="handleValidate" />
					</validity>
					<div class="clearTimes" @click="userName=''">
						<icon name="times"></icon>
					</div>
				</div>
				<p v-if="usernameInvalid" class="errors">{{ usernameTip }}</p>
				<div class="row-login">
					<validity ref="password" field="password" :validators="{
                required: {rule: true, message: $t('account.error.requirePassword')}, 
                maxlength: {rule: 50, message: $t('account.error.passwordTooLong')},
                }">
						<input type="password" :placeholder="$t('account.login_page.userPasswordPlaceHolder')" v-model.trim="passWord" autocomplete="off"
								name="password" @focusout="handleValidate" @keyup.enter="goLogin" />
					</validity>
					<div class="clearTimes" @click="passWord=''">
						<icon name="times"></icon>
					</div>
				</div>
				<p v-if="passwordInvalid" class="errors">{{ passwordTip }}</p>
				<div class="row-login">
					<router-link :to="{ name: 'register' }">{{ $t('account.login_page.registration') }}</router-link>
					<router-link :to="{ name: 'retrive' }">{{ $t('account.login_page.forgetPassword') }}</router-link>
				</div>
				<div class="row-login">
					<input type="button" :value="$t('account.login_page.btnSubmit')" @click.prevent="onLogin" />
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
			
      onLogin: function () {
        if(this.$validation.validationLogin.valid){
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