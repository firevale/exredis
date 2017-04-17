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

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
      if (this.showPassword) {
        this.$refs.password.type = 'text'
      } else {
        this.$refs.password.type = 'password'
      }
    }
  },

  computed: {
    errorHint: function() {
      if (typeof this.$v == 'object' && this.$v.$error) {
        if (typeof this.$v.mobile == 'object' && !this.$v.mobile.required) {
          return this.$t('error.validation.requireMobile')
        } else if (typeof this.$v.mobile == 'object' && !this.$v.mobile.valid) {
          return this.$t('error.validation.invalidMobileNumber')
        } else if (typeof this.$v.mobile == 'object' && !this.$v.mobile.changed) {
          return this.$t('error.validation.mobileNotChanged')
        } else if (typeof this.$v.verifyCode == 'object' && !this.$v.verifyCode.required) {
          return this.$t('error.validation.requireVerifyCode')
        } else if (typeof this.$v.verifyCode == 'object' && !this.$v.verifyCode.minLength) {
          return this.$t('error.validation.invalidVerifyCodeLength')
        } else if (typeof this.$v.verifyCode == 'object' && !this.$v.verifyCode.maxLength) {
          return this.$t('error.validation.invalidVerifyCodeLength')
        } else if (typeof this.$v.password == 'object' && !this.$v.password.required) {
          return this.$t('error.validation.requirePassword')
        } else if (typeof this.$v.password == 'object' && !this.$v.password.minLength) {
          return this.$t('error.validation.invalidPasswordLength')
        } else if (typeof this.$v.password == 'object' && !this.$v.password.maxLength) {
          return this.$t('error.validation.invalidPasswordLength')
        }
      } else {
        return this.errorMessage
      }
    },
  },
}