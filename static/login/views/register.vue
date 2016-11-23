<template>
  <div class="g-con">
    <div class="login-box">
      <validation name="validationRegister">
        <div class="row-login">
          <p>{{ $t('account.login_page.titleRegister') }}</p>
          <icon name="times" scale="1" fill-color="#666" style="position: absolute; right: -0.6rem;"></icon>
        </div>
        <div class="row-login">
          <validity ref="username" field="username" :validators="{
                required: {rule: true, message: $t('account.error.requireUserName')}, 
                maxlength: {rule: 50, message: $t('account.error.userNameTooLong')},
                validateUserName: {rule: true, message: this.isMobileRegisterSupported? $t('account.error.userNameWrong'):$t('account.error.userNameEmailWrong') },
                }">
            <input type="text" :placeholder="isMobileRegisterSupported? $t('account.login_page.userPlaceHolder'): $t('account.login_page.userOnlyEmailPlaceHolder')"
              v-model.trim="userName" autocomplete="off" name="user" @focusout="handleValidate" />
          </validity>
          <div class="headerIcon">
            <icon name="user-o"></icon>
          </div>
          <div class="clearTimes" @click="clearUserName">
            <icon name="times" fill-color="#aaa"></icon>
          </div>
        </div>
        <div class="row-login">
          <validity ref="password" field="password" :validators="{
                required: {rule: true, message: $t('account.error.requirePassword')}, 
                maxlength: {rule: 50, message: $t('account.error.passwordTooLong')},
                }">
            <input type="password" :placeholder="$t('account.login_page.userPasswordPlaceHolder')" v-model.trim="password" autocomplete="off"
              name="password" @focusout="handleValidate" />
          </validity>
          <div class="headerIcon">
            <icon name="lock"></icon>
          </div>
          <div class="clearTimes" @click="clearPassword">
            <icon name="times" fill-color="#aaa"></icon>
          </div>
        </div>
        <div class="row-login" v-if="validateEmail || validatePhoneNumber && isMobileRegisterSupported">
          <validity ref="confirmPassword" field="confirmPassword" :validators="{
                required: {rule: true, message: $t('account.login_page.userPasswordConfirmPlaceHolder')}, 
                minlength: {rule: 6, message: $t('account.error.confirmWordDifferent')},
                maxlength: {rule: 6, message: $t('account.error.confirmWordDifferent')},
                validateSendCode: {rule: true, message: $t('account.error.confirmWordDifferent')}
                }">
            <input type="text" :placeholder="$t('account.login_page.userPasswordConfirmPlaceHolder')" v-model.trim="confirmPassword"
              autocomplete="off" name="confirmPassword" @focusout="handleValidate" />
          </validity>
          <input v-if="validateEmail &&! validatePhoneNumber || !isMobileRegisterSupported" type="button" :value="confirmWorld" readonly="readonly" style="flex: 0.5;"></input>
          <input v-if="!validateEmail && validatePhoneNumber && isMobileRegisterSupported" type="button" :class="{'inputDisabled': hasSentCode}" style="flex: 0.5;"
            :value="hasSentCode? timerNum :$t('account.login_page.btnSendverificationCode')" @click="sendCode"></input>
          <div class="headerIcon">
            <icon name="check-circle-o" stroke-color="#fff" fill-color="#aaa"></icon>
          </div>
          <div class="clearTimes" @click="clearConfirmWord" style="right: 36%;">
            <icon name="times" fill-color="#aaa"></icon>
          </div>
        </div>
        <p v-if="usernameInvalid" class="errors">
          <icon name="info-circle" fill-color="#ff3860"></icon>{{ usernameTip }}</p>
        <p v-if="!usernameInvalid && passwordInvalid" class="errors">
          <icon name="info-circle" fill-color="#ff3860"></icon>{{ passwordTip }}</p>
        <p v-if="!usernameInvalid && !passwordInvalid && confirmPasswordInvalid" class="errors">
          <icon name="info-circle" fill-color="#ff3860"></icon>{{ confirmTip }}</p>
        <div class="row-login">
          <input type="button" :value="$t('account.login_page.btnRegister')" @click.prevent="onRegister" />
        </div>
        <div class="row-login">
          <router-link :to="{ name: 'login' }">{{ $t('account.login_page.btnSubmit') }}</router-link>
        </div>
      </validation>
    </div>
  </div>
</template>
<script>
  import Icon from '../components/fvIcon/Icon.vue'
  import '../components/fvIcon/icons/times'
  import '../components/fvIcon/icons/info-circle'
  import '../components/fvIcon/icons/user-o'
  import '../components/fvIcon/icons/lock'
  import '../components/fvIcon/icons/check-circle-o'
  export default {
	  created(){
     
    },

    validators: {
      validateUserName: function(val){
        if(this.isMobileRegisterSupported){
          return this.validateEmail || this.validatePhoneNumber
        }else{
          return this.validateEmail
        }
      },
      
      validateSendCode: function(val){
        return this.validatePhoneNumber?this.confirmPassword == this.phoneCodeSent:
          this.validateEmail?this.confirmPassword == this.confirmWorld: false
      }
    },

    data: function(){
      return {
        hasSentCode: false,
        timerNum: 60,
        isMobileRegisterSupported: window.acsConfig.isMobileRegisterSupported,
        userName: '',
        password: '',
        phoneCodeSent: 'frffw3',
        confirmWorld: 'y2394j',
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
        let res = ''
        if(this.$refs.username.result.invalid){
          res = this.$refs.username.result.errors && this.$refs.username.result.errors[0].message
        }
        return res
      },

			passwordTip: function() {
        let res = ''
        if(this.$refs.password.result.invalid){
          res = this.$refs.password.result.errors && this.$refs.password.result.errors[0].message
        }
        return res
      },

			confirmTip: function() {
        let res = ''
        if(this.$refs.confirmPassword.result.invalid){
          res = this.$refs.confirmPassword.result.errors && this.$refs.confirmPassword.result.errors[0].message
        }
        return res
      },

      validateEmail: function() {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(this.userName);
      },

      validatePhoneNumber: function() {
        if(!/^1[34578]\d{9}$/.test(this.userName)){
          this.hasSentCode=false;
        } 
        return /^1[34578]\d{9}$/.test(this.userName)
      },
		},

    methods: { 
      handleValidate: function (e) {
        e.target.$validity.validate(function () {
          
        })
      },

      clearUserName: function(){
        this.userName = ''
        this.$refs.username.$el.focus()
      },

			clearPassword: function(){
        this.password = ''
        this.$refs.password.$el.focus()
      },

      clearConfirmWord: function(){
        this.confirmPassword = ''
        this.$refs.confirmPassword.$el.focus()
      },

      timerCount: function(){
        if(this.hasSentCode && this.timerNum > 0){
          this.timerNum--
          setTimeout(this.timerCount,1000)
        }else{
          this.hasSentCode = false
          this.timerNum = 60
        }
      },

      sendCode: function(){
        if(this.$validation.validationRegister.username.valid && this.userName.length && !this.hasSentCode){
          this.hasSentCode = true
          setTimeout(this.timerCount,1000)
        }

        return false


        if(this.$validation.validationRegister.username.valid && this.userName.length && !this.hasSentCode){
          let urlApi = ''
          if(this.isMobileRegisterSupported && this.validatePhoneNumber){
            urlApi='sendCodeToPhone'
          }else if(this.validateEmail){
            urlApi='sendCodeToEmail'
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
							if(!this.hasSentCode){
                this.hasSentCode = true
                setTimeout(this.timerCount,1000)
              }
						} else {
							return Promise.reject('error')
						}
					})
        }
      },

      onRegister: function () {
        if(this.$validation.validationRegister.valid && this.userName.length && this.password.length && this.confirmPassword){
          this.$http({
              method: 'POST',
              url: '',
              params: {
                userName: '',
                password: '',
                confirmWord: '',
              }
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
  @import '../scss/login';
</style>