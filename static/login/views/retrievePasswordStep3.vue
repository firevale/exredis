<template>
<div class="login-box">
  <form @submit.prevent="handleSubmit">
    <div class="row-login">
      <p class="title">{{ $t('account.loginPage.retrievePasswordTitle') }}</p>
    </div>
    <p class="code-tip">
      {{ $t('account.retrievePasswordPage.setNewPassword') }}:
    </p>
    <div class="row-login">
      <input type="password" minlength="6" maxlength="20" :placeholder="$t('account.loginPage.userPasswordPlaceHolder')"
          v-model.trim="password" autocomplete="off" name="password" @input="handleInput" />
      <span class="icon addon-icon icon-lock"></span>
      <span class="icon addon-icon pull-right" :class="'icon-'+passwordIcon" @click="togglePasswordVisibility"></span>
    </div>
    <p class="errors">
      <span v-if="errorHint" class="icon error-sign"></span>
      <span>{{ errorHint }}</span>
    </p>
    <div class="row-login">
      <input type="submit" :class="{'is-disabled': processing}" :value="$t('account.retrievePasswordPage.complete')"
          :disabled="processing" />
      <span v-show="processing" class="icon progress-icon rotating"></span>
    </div>
  </form>
</div>
</template>

<script>
import {
  required,
  minLength,
  maxLength
} from 'vuelidate/lib/validators'

import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  validations: {
    password: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(20),
    },
  },

  data: function() {
    return {
      passwordIcon: '',
      password: '',
      errorMessage: '',
      accountId: '',
      verifyCode: '',
      passwordIcon: 'eye-slash',
      processing: false,
    }
  },

  computed: {
    errorHint: function() {
      if (this.$v.$error) {
        if (!this.$v.password.required) {
          return this.$t('account.error.requirePassword')
        } else if (!this.$v.password.minLength) {
          return this.$t('account.error.invalidPasswordLength')
        } else if (!this.$v.password.maxLength) {
          return this.$t('account.error.invalidPasswordLength')
        }
      } else {
        return this.errorMessage
      }
    },
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

    handleInput: function() {
      this.$v.$touch()
      this.errorMessage = ''
    },

    handleSubmit: async function() {
      if (!this.$v.$error && this.accountId && !this.processing) {
        this.processing = true
        try {
          let result = await this.$acs.updatePassword(this.accountId, this.password, this.verifyCode)
          if (result.success) {
            this.setLoginAccountId(this.accountId)
            this.$router.back()
          } else {
            this.errorMessage = this.$t(result.message)
          }
        } catch (_) {
          this.errorMessage = this.$t('account.error.networkError')
          setTimeout(_ => {
            this.errorMessage = ''
          }, 3000)
        }
        this.processing = false
      }
    },
  },
}
</script>
