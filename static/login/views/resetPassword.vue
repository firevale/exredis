<template>
  <div class="login-box">
    <validation name="validationReset">
      <div class="row-login">
        <p class="title">{{ $t('account.loginPage.retrievePasswordTitle') }}</p>
      </div>
      <div class="row-login">
        <input type="text" readonly :placeholder="$t('account.loginPage.userPlaceHolder')" v-model.trim="userName" autocomplete="off"
          name="user" />
        <div class="headerIcon">
          <icon name="user-o"></icon>
        </div>
      </div>
      <div class="row-login">
        <validity ref="password" field="password" :validators="{
                required: {rule: true, message: $t('account.error.requirePassword')}, 
                maxlength: {rule: 50, message: $t('account.error.passwordTooLong')},
                }">
          <input type="password" :placeholder="$t('account.loginPage.userPasswordPlaceHolder')" v-model.trim="password" autocomplete="off"
            name="password" @focusout="handleValidate" />
        </validity>
        <div class="headerIcon">
          <icon name="lock"></icon>
        </div>
        <div class="tailIcon" @click="togglePasswordVisibility">
          <icon :name="passwordIcon" fill-color="#fff"></icon>
        </div>
      </div>
      <p v-if="passwordInvalid" class="errors">
        <icon name="info-circle" scale=".8" fill-color="#ff3860"></icon>&nbsp{{ passwordTip }}</p>
      <p v-if="!passwordInvalid " class="errors">&nbsp</p>
      <div class="row-login">
        <input type="submit" :value="$t('account.loginPage.btnReset')" @click.prevent="onResetPassword" />
      </div>
      <div class="row-login">
        <router-link :to="{ name: 'login' }">{{ $t('account.loginPage.btnSubmit') }}</router-link>
      </div>
    </validation>
  </div>
</template>
<script>
  import Icon from '../components/fvIcon/Icon.vue'
  import '../components/fvIcon/icons/times'
  import '../components/fvIcon/icons/info-circle'
  import '../components/fvIcon/icons/user-o'
  import '../components/fvIcon/icons/lock'
  import '../components/fvIcon/icons/eye-slash'
  import '../components/fvIcon/icons/eye'
  export default {
	  created(){
      this.userName = this.$route.params.username
    },

    validators: {
      
    },

    data: function() {
      return {
        userName: '',
        password: '',
        passwordIcon: 'eye',
      }
    },

		computed: {
			passwordInvalid: function() {
        return this.$validation.validationReset 
               && this.$validation.validationReset.password
               && this.$validation.validationReset.password.invalid
      },

			passwordTip: function() {
        let res = ''
        if(this.$refs.password.result.invalid){
          res = this.$refs.password.result.errors && this.$refs.password.result.errors[0].message
        }
        return res
      },
		},

    methods: { 
      handleValidate: function (e) {
        e.target.$validity.validate(function () {
          
        })
      },

      onResetPassword: function () {
        if(this.$validation.validationReset.valid && this.userName && this.password){
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

      togglePasswordVisibility: function(){
        if( this.passwordIcon === 'eye') {
          this.passwordIcon = 'eye-slash'
          this.$refs.password.$el.type = 'text'
        }else{
          this.passwordIcon = 'eye'
          this.$refs.password.$el.type = 'password'
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