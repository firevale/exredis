<template>
  <div class="login-box">
    <validation name="register" @submit.prevent="handleSubmit">
      <div class="row-login">
        <p class="title">{{ bindUserId? $t('account.loginPage.titleBind') : $t('account.loginPage.titleRegister') }}</p>
      </div>
      <p class="code-tip"> {{ $t('account.registerPage.pleaseInputPassword') }}: </p>
      <div class="row-login">
        <validity ref="password" field="password" :validators="{
                required: {rule: true, message: $t('account.error.requirePassword')}, 
                minlength: {rule: 6, message: $t('account.error.passwordWrong')},
                }">
          <input type="password" minlength="6" maxlength="20" :placeholder="$t('account.loginPage.userPasswordPlaceHolder')"
            v-model.trim="password" autocomplete="off" name="password" @focusout="handleValidate" />
        </validity>
        <span class="icon addon-icon icon-lock"></span>
        <span class="icon addon-icon pull-right" :class="'icon-'+passwordIcon" @click="togglePasswordVisibility"></span>
      </div>
      <p class="errors">
        <span v-if="errorMessage" class="icon error-sign"></span>
        <span>{{ errorMessage }}</span>
      </p>
      <div class="row-login">
        <input type="submit" :class="{'is-disabled': processing}" :value="bindUserId ? $t('account.registerPage.btnBind') : $t('account.registerPage.btnRegister')" :disabled="processing"/>
        <span v-show="processing" class="icon progress-icon rotating"></span>
      </div>
      <div class="row-login" style="-webkit-justify-content: flex-end; justify-content: flex-end;">
        <a class="pull-right" v-show="!bindUserId" @click.prevent="$router.back()">{{ $t('account.registerPage.goLoginPage') }} </a>
      </div>
    </validation>
  </div>
</template>
<script>
  import utils from '../common/utils'
  import nativeApi from '../common/nativeApi'
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
        passwordIcon: 'eye-slash',
        errorMessage: '',
        processing: false,
        shouldBindAnonymous: false,
        bindUserId: '',
      }
    },

    created: function() {
      this.accountId = atob(this.$route.query.accountId)
      this.verifyCode = atob(this.$route.query.verifyCode)
      this.bindUserId = this.$route.query.bindUserId
    },

    computed: {
      ...mapGetters([
        'redirectUri'
      ]),
    },

    methods: {
      ...mapActions([
        'addAccountExistence', 'setLoginAccountId', 'setRegisterAccountId', 'addLoginnedAccount'
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
        if (this.$validation.register.valid && this.accountId && this.password && this.verifyCode) {
          this.processing = true
          this.$http({
            method: 'post',
            url: '/user/create_user',
            params: {
              account_id: this.accountId,
              password: this.password,
              verify_code: this.verifyCode,
              bind_user_id: this.bindUserId,
            }
          }).then(response => {
            this.processing = false
            return response.json()
          }).then(result => {
            if (result.success) {
              this.addAccountExistence({
                account: this.accountId,
                exists: true
              })
              this.setLoginAccountId(this.accountId)
              this.setRegisterAccountId('')
              this.addLoginnedAccount(result)
              if (window.acsConfig.inApp) {
                nativeApi.closeWebviewWithResult(result)
              } else {
                if (this.redirectUri) {
                  window.location = this.redirectUri
                }
              }
            } else {
              this.errorMessage = this.$t(result.message)
            }
          }).catch(e => {
            console.log(e)
            this.processing = false
            this.errorMessage = this.$t('account.error.networkError')
          })
        }
      },

      togglePasswordVisibility: function() {
        if (this.passwordIcon === 'eye') {
          this.passwordIcon = 'eye-slash'
          this.$refs.password.$el.type = 'password'
        } else {
          this.passwordIcon = 'eye'
          this.$refs.password.$el.type = 'text'
        }
      },
    },
  }
</script>
<style lang="scss">

</style>