export default {
  methods: {
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
  },

  computed: {
    errorHint: function() {
      if (typeof this.$v == 'object' && this.$v.$invalid) {
        if (typeof this.$v.mobile == 'object' && !this.$v.mobile.required) {
          return this.$t('account.error.requireMobile')
        } else if (typeof this.$v.mobile == 'object' && !this.$v.mobile.valid) {
          return this.$t('account.error.invalidMobileNumber')
        } else if (typeof this.$v.mobile == 'object' && !this.$v.mobile.changed) {
          return this.$t('account.error.mobileNotChanged')
        } else if (typeof this.$v.password == 'object' && !this.$v.password.required) {
          return this.$t('account.error.requirePassword')
        } else if (typeof this.$v.password == 'object' && !this.$v.password.minLength) {
          return this.$t('account.error.invalidPasswordLength')
        } else if (typeof this.$v.password == 'object' && !this.$v.password.maxLength) {
          return this.$t('account.error.invalidPasswordLength')
        } else if (typeof this.$v.verifyCode == 'object' && !this.$v.verifyCode.required) {
          return this.$t('account.error.requireVerifyCode')
        } else if (typeof this.$v.verifyCode == 'object' && !this.$v.verifyCode.minLength) {
          return this.$t('account.error.invalidVerifyCodeLength')
        } else if (typeof this.$v.verifyCode == 'object' && !this.$v.verifyCode.maxLength) {
          return this.$t('account.error.invalidVerifyCodeLength')
        }
      } else {
        return this.errorMessage
      }
    },
  },
}