<template>
  <div class="login-box">
    <validation name="retrieve" @submit.prevent="handleSubmit">
      <div class="row-login">
        <p class="title">{{ $t('account.loginPage.retrievePasswordTitle') }}</p>
      </div>
      <p class="code-tip">
        {{ $t('account.retrievePasswordPage.setNewPassword') }}:
      </p>
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
        <input type="submit" :value="$t('account.retrievePasswordPage.complete')" />
      </div>
    </validation>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'

  export default {

    data: function() {
      return {
        passwordIcon: '',
        password: '',
        errorMessage: '',
        accountId: '',
        verifyCode: '',
        passwordIcon: 'eye-slash',
      }
    },

    created: function() {
      if (this.$route.query.accountId)
        this.accountId = atob(this.$route.query.accountId)
      if (this.$route.query.verifyCode)
        this.verifyCode = atob(this.$route.query.verifyCode)
    },

    methods: {
      ...mapActions(['setLoginAccountId']),

      togglePasswordVisibility: function() {
        if (this.passwordIcon === 'eye') {
          this.passwordIcon = 'eye-slash'
          this.$refs.password.$el.type = 'password'
        } else {
          this.passwordIcon = 'eye'
          this.$refs.password.$el.type = 'text'
        }
      },

      handleValidate: function(e) {
        e.target.$validity.validate(_ => {
          if (this.$refs.password &&
            this.$refs.password.invalid &&
            this.$refs.password.result.errors.length > 0) {
            this.errorMessage = this.$refs.password.result.errors[0].message
          } else {
            this.errorMessage = ''
          }
        })
      },

      handleSubmit: function(e) {
        if (this.$validation.retrieve.valid && this.password) {
          this.$http({
            method: 'post',
            url: '/user/update_password',
            params: {
              account_id: this.accountId,
              verify_code: this.verifyCode,
              password: this.password
            }
          }).then(response => {
            return response.json()
          }).then(result => {
            if (result.success) {
              this.setLoginAccountId(this.accountId)
              this.$router.back()
            } else {
              this.errorMessage = this.$t(result.message)
            }
          })
        }
      },
    },
  }
</script>