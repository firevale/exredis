export default {
  methods : {
    setErrorMessage: function(val) {
      this.errorMessage = val
      setTimeout(_ => {
        this.errorMessage = ''
      }, 5000)
    },

    handleValidation: function() {
      this.$v.$touch()
      this.errorMessage = ''
    },

    togglePasswordVisibility: function() {
      if (this.passwordIcon == 'eye') {
        this.passwordIcon = 'eye-slash'
        this.$refs.password.type = 'password'
      } else {
        this.passwordIcon = 'eye'
        this.$refs.password.type = 'text'
      }
    }
  },

  computed : {
    errorHint: function() {
      if (typeof this.$v == 'object' && this.$v.$error) {
        if (typeof this.$v.accountId == 'object' && !this.$v.accountId.required) {
          return this.$t('account.error.requireUserName')
        } else if (typeof this.$v.accountId == 'object' && !this.$v.accountId.valid) {
          return this.invalidAccountIdErrorMessage
        } else if (typeof this.$v.password == 'object' && !this.$v.password.required) {
          return this.$t('account.error.requirePassword')
        } else if (typeof this.$v.password == 'object' && !this.$v.password.minLength) {
          return this.$t('account.error.invalidPasswordLength')
        } else if (typeof this.$v.password == 'object' && !this.$v.password.maxLength) {
          return this.$t('account.error.invalidPasswordLength')
        } else if (typeof this.$v.verifyCode == 'object' && !this.$v.verifyCode.required) {
          return this.$t('account.error.requireUserName')
        } else if (typeof this.$v.verifyCode == 'object' && !this.$v.verifyCode.minLength) {
          return this.$t('account.error.invalidVerifyCodeLength')
        } else if (typeof this.$v.verifyCode == 'object' && !this.$v.verifyCode.maxLength) {
          return this.$t('account.error.invalidVerifyCodeLength')
        }
      } else {
        return this.errorMessage
      }
    }
  },
}
