<template>
  <div class="login-box">
    <validation name="register" @submit.prevent="handleSubmit">
      <div class="row-login">
        <p class="title">{{ $t('account.loginPage.titleRegister') }}</p>
      </div>
      <p class="code-tip"> {{ $t('account.registerPage.pleaseInputAccountName') }}: </p>
      <div class="row-login">
        <validity ref="accountId" field="accountId" :validators="{
                required: {rule: true, message: $t('account.error.requireUserName')}, 
                validAccountId: {rule: true, message: invalidAccountIdErrorMessage},
                }">
          <input type="text" maxlength="50" :placeholder="accountIdPlaceholder" v-model.trim="accountId" autocomplete="off" name="user"
            @focusout="handleValidate" />
        </validity>
        <div class="header-icon">
          <icon name="user-o" :fill-color="colors.white"></icon>
        </div>
      </div>
      <p class="errors">
        <icon v-if="errorMessage" name="info-circle" scale=".8" :fill-color="colors.danger"></icon>&nbsp{{ errorMessage }}
      </p>
      <div class="row-login">
        <input type="submit" :value="$t('account.registerPage.nextStep')" />
      </div>
      <div class="row-login" style="justify-content: flex-end;">
        <a @click.prevent="$router.back()">{{ $t('account.registerPage.goLoginPage') }} </a>
      </div>
    </validation>
  </div>
</template>
<script>
  import utils from '../common/utils'
  import Icon from '../components/fvIcon/Icon.vue'
  import '../components/fvIcon/icons/info-circle'
  import '../components/fvIcon/icons/user-o'
  import msg from '../components/message'
  import {
    mapGetters,
    mapActions
  } from 'vuex'

  export default {
    validators: {
      validAccountId: function(val) {
        return this.validateAccountId(val).then(result => {
          return result ? Promise.resolve() : Promise.reject()
        })
      },
    },

    data: function() {
      return {
        isMobileAccountSupported: window.acsConfig.isMobileAccountSupported,
        accountId: '',
        errorMessage: '',
      }
    },

    created: function() {
      this.accountId = this.registerAccount
    },

    computed: {
      ...mapGetters([
        'registerAccount', 'invalidAccountIdErrorMessage', 'accountIdPlaceholder', 'colors'
      ]),
    },

    methods: {
      ...mapActions([
        'setRegisterAccount', 'validateAccountId'
      ]),

      handleValidate: function(e) {
        this.errorMessage = ''
        e.target.$validity.validate(_ => {
          if (this.$refs.accountId &&
            this.$refs.accountId.invalid &&
            this.$refs.accountId.result.errors &&
            this.$refs.accountId.result.errors.length > 0) {
            this.errorMessage = this.$refs.accountId.result.errors[0].message
          } else {
            this.errorMessage = ''
          }
        })
      },

      handleSubmit: function() {
        if (this.$validation.register.valid && this.accountId) {
          this.$http({
            method: 'post',
            url: '/user/is_account_exists',
            params: {
              account_id: this.accountId,
            }
          }).then(response => {
            return response.json()
          }).then(result => {
            if (result.exists) {
              this.errorMessage = this.$t('account.error.accountInUse')
            } else {
              // remember registerAccount 
              this.setRegisterAccount(this.accountId)
              this.$router.replace({
                name: 'registerStep2',
                params: {
                  accountId: this.accountId
                }
              })
            }
          }).catch(error => {
            this.errorMessage = this.$t('account.error.networkError')
          })
        }
      },

      handleSubmit: function() {
        if (this.$validation.register.valid &&
          this.accountId) {
          this.$router.replace({name: 'registerStep2', params: {accountId: this.accountId}})
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