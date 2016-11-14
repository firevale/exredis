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
                maxLength: {rule: 50,message: $t('account.error.userNameTooLong')},
                }">
						<input type="text" :placeholder="$t('account.login_page.userPlaceHolder')" v-model.lazy.trim="userName" autocomplete="off"
								name="user"/>
					</validity>
				</div>
				<span v-if="">{{  }}</span>
				<div class="row-login">
					<validity ref="password" field="password" :validators="{
                required: {rule: true, message: $t('account.error.requirePassword')}, 
                maxLength: {rule: 50,message: $t('account.error.passwordTooLong')},
                }">
						<input type="password" :placeholder="$t('account.login_page.userPasswordPlaceHolder')" v-model.lazy.trim="passWord" autocomplete="off"
								name="password"/>
					</validity>
				</div>
				<span v-if="">{{ }}</span>
				<div class="row-login">
					<validity ref="confirm" field="confirm" :validators="{
                required: {rule: true, message: $t('account.error.requirePassword')}, 
                maxLength: {rule: 50,message: $t('account.error.passwordTooLong')},
                }">
						<input type="password" :placeholder="$t('account.login_page.userPasswordConfirmPlaceHolder')" v-model.lazy.trim="confirmPassword" autocomplete="off"
								name="confirmPassword"/>
					</validity>
				</div>
				<span v-if="" class="help is-danger">{{ }}</span>
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
  import VueValidator from 'vue-validator'

  export default {
    data: function(){
      return {
        userName: '',
        passWord: '',
				confirmPassword: '',
      }
    },
    route: {
      
    },

    computed: VueValidator.mapValidation({
      valid: '$validation.validationRegister.valid',
      usernameInvalid: '$validation.validationRegister.username.invalid',
      passwordInvalid: '$validation.validationRegister.password.invalid',
      confirmInvalid: '$validation.validationRegister.confirm.invalid'
    }),

    methods: { 
      gotest(){
        this.$router.replace({
          name: 'login',
          replace: true
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