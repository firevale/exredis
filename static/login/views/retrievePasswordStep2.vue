<template>
  <div class="login-box">
    <validation name="retrieve" @submit.prevent="handleSubmit">
      <div class="row-login">
        <p class="title">{{ $t('account.loginPage.retrievePasswordTitle') }}</p>
      </div>
      <p class="code-tip" v-html="verifyCodeSentHint"> </p>
      <div class="row-login">
        <validity ref="verifyCode" field="verifyCode" :validators="{
                required: {rule: true, message: $t('account.loginPage.verifyCodePlaceholder')}, 
                minlength: {rule: 4, message: $t('account.error.verifyCodeTooShort')},
                }">
          <input type="text" :placeholder="$t('account.loginPage.verifyCodePlaceholder')" v-model.trim="verifyCode"
            autocomplete="off" class="outsideText" name="verifyCode" @focusout="handleValidate" />
        </validity>
        <input type="button" :class="{'inputDisabled': cooldownCounter > 0}" 
              class="inside-input" :value="sendCodeTex"
          @click.prevent="sendVerifyCode">
        </input>
        <span class="icon addon-icon icon-check"></span>
      </div>
      <p class="errors">
        <span v-if="errorMessage" class="icon error-sign"></span>
        <span>{{ errorMessage }}</span>
      </p>
      <div class="row-login">
        <input type="submit" :value="$t('account.retrievePasswordPage.nextStep')" />
      </div>
    </validation>
  </div>
</template>

<script>
  import utils from '../common/utils'
  import {
    mapGetters,
    mapActions
  } from 'vuex'

  export default {
    data: function() {
      return {
        hasSentCode: false,
        cooldownCounter: 60,
        verifyCode: '',
        errorMessage: '',
        accountId: '',
      }
    },

    created: function() {
      this.accountId = atob(this.$route.query.accountId)
      this.hasSentCode = true
      setTimeout(this.cooldownTimer, 1000)
    },

    computed: {
      verifyCodeSentHint: function() {
        if (utils.isValidEmail(this.accountId)) {
          return this.$t('account.retrievePasswordPage.verifyCodeSentToEmail', {
            email: utils.emailMask(this.accountId)
          })
        } else {
          return this.$t('account.retrievePasswordPage.verifyCodeSentToSms', {
            mobile: utils.mobileMask(this.accountId)
          })
        }
      },

      sendCodeTex: function() {
        if(this.cooldownCounter > 0){
          return this.$t('account.registerPage.cooldownText',{timer: this.cooldownCounter})
        }else{
          if(this.hasSentCode){
            return this.$t('account.registerPage.sendAgain')
          }else{
            return this.$t('account.loginPage.sendVerifyCode')
          }
        }
      },
    },

    methods: {
      handleValidate: function(e) {
        e.target.$validity.validate(_ => {
          if (this.$refs.verifyCode &&
            this.$refs.verifyCode.invalid &&
            this.$refs.verifyCode.result.errors.length > 0) {
            this.errorMessage = this.$refs.verifyCode.result.errors[0].message
          } else {
            this.errorMessage = ''
          }
        })
      },

      cooldownTimer: function() {
        if (this.cooldownCounter > 0) {
          this.cooldownCounter--;
          setTimeout(this.cooldownTimer, 1000);
        }
      },

      sendVerifyCode: function(e) {
        if (this.cooldownCounter <= 0) {
          this.$http({
            method: 'post',
            url: '/send_retrieve_password_verify_code',
            params: {
              account_id: this.accountId,
            }
          }).then(response => {
            return response.json()
          }).then(result => {
            if (result.success) {
              // TODO: hint verify code sent successfully
              this.cooldownCounter = 60
            } else {
              this.errorMessage = this.$t(result.message)
            }
          })
        } else {
          this.errorMessage = this.$t('account.error.sendSmsCooldown')
        }
      },

      handleSubmit: function(e) {
        if (this.$validation.retrieve.valid && this.verifyCode) {
          this.$http({
            method: 'post',
            url: '/check_retrieve_password_verify_code',
            params: {
              verify_code: this.verifyCode
            }
          }).then(response => {
            return response.json()
          }).then(result => {
            if (result.success && result.match) {
              this.$router.replace({
                name: 'retrievePasswordStep3',
                query: {
                  accountId: btoa(this.accountId),
                  verifyCode: btoa(this.verifyCode),
                }
              })
            } else {
              this.errorMessage = this.$t('account.error.invalidVerifyCode')
            }
          })
        }
      },
    },
  }
</script>