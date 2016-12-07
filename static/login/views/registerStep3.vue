<template>
  <div class="login-box">
    <validation name="register" @submit.prevent="handleSubmit">
      <div class="row-login">
        <p class="title">{{ $t('account.loginPage.titleRegister') }}</p>
      </div>
      <div class="row-login">
        <validity ref="password" field="password" :validators="{
                required: {rule: true, message: $t('account.error.requirePassword')}, 
                minlength: {rule: 6, message: $t('account.error.passwordWrong')},
                }">
          <input type="password" minlength="6" maxlength="20" :placeholder="$t('account.loginPage.userPasswordPlaceHolder')"
            v-model.trim="password" autocomplete="off" name="password" @focusout="handleValidate" />
        </validity>
        <div class="header-icon">
          <icon name="lock" scale="1.3" :fill-color="colors.white"></icon>
        </div>
        <div class="tail-icon" @click="togglePasswordVisibility">
          <icon :name="passwordIcon" scale="1.2" :fill-color="colors.white"></icon>
        </div>
      </div>
      <p class="errors">
        <icon v-if="errorMessage" name="info-circle" scale=".8" :fill-color="colors.danger"></icon>&nbsp{{ errorMessage }}
      </p>
      <div class="row-login">
        <input type="submit" :value="$t('account.loginPage.btnRegister')" />
      </div>
      <div class="row-login" style="justify-content: flex-end;">
        <router-link :to="{name: 'login'}">{{ $t('account.registerPage.goLoginPage') }}</router-link>
      </div>
    </validation>
  </div>
</template>
<script>
  import utils from '../common/utils'
  import Icon from '../components/fvIcon/Icon.vue'
  import '../components/fvIcon/icons/info-circle'
  import '../components/fvIcon/icons/lock'
  import '../components/fvIcon/icons/eye-slash'
  import '../components/fvIcon/icons/eye'
  import msg from '../components/message'
  import {
    mapGetters,
    mapActions
  } from 'vuex'

  export default {
    data: function() {
      return {
        accountId: '',
        verifyCode: '',
        password: '',
        passwordIcon: 'eye',
        errorMessage: '',
      }
    },

    created: function() {
      this.accountId = atob(this.$route.query.accountId)
      this.verifyCode = atob(this.$route.query.verifyCode)
      console.log(this)
    },

    computed: {
      ...mapGetters(['colors']),
    },

    methods: {
      ...mapActions([
        'addAccountExistence', 'setLoginAccount', 'setRegisterAccount'
      ]),

      handleValidate: function(e) {
        this.errorMessage = ''
        e.target.$validity.validate(_ => {
          if (this.$refs.password &&
            this.$refs.password.invalid &&
            this.$refs.password.result.errors &&
            this.$refs.password.result.errors.length > 0) {
            this.errorMessage = this.$refs.password.result.errors[0].message
          } else {
            this.errorMessage = ''
          }
        })
      },

      handleSubmit: function() {
        if (this.$validation.register.valid &&
          this.accountId &&
          this.password &&
          this.verifyCode) {
          this.$http({
            method: 'post',
            url: '/user/create_user',
            params: {
              account_id: this.accountId,
              password: this.password,
              verify_code: this.verifyCode
            }
          }).then(response => {
            return response.json()
          }).then(result => {
            if (result.success) {
              this.addAccountExistence({
                account: this.accountId,
                exists: true
              })
              this.setLoginAccount(this.accountId)
              this.setRegisterAccount(undefined)

              // TODO: register success
            } else {
              this.errorMessage = this.$t(result.message)
            }
          }).catch(e => {
            this.errorMessage = this.$t('account.error.networkError')
          })
        }
      },

      togglePasswordVisibility: function() {
        if (this.passwordIcon === 'eye') {
          this.passwordIcon = 'eye-slash'
          this.$refs.password.$el.type = 'text'
        } else {
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