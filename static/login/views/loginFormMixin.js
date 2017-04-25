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

    togglePasswordVisibility: function() {
      if (this.passwordIcon == 'eye') {
        this.passwordIcon = 'eye-slash'
        this.$refs.password.type = 'password'
      } else {
        this.passwordIcon = 'eye'
        this.$refs.password.type = 'text'
      }
    },
  },

  computed: {
    errorHint: function() {
      if (typeof this.$v == 'object' && this.$v.$error) {
        if (typeof this.$v.accountId == 'object' && !this.$v.accountId.required) {
          if (window.acsConfig.isMobileAccountSupported) {
            if (this.$route.name == 'registerStep1') {
              console.log('require mobile number')
              return this.$t('error.validation.requireMobile')
            } else {
              console.log('require account id')
              return this.$t('error.validation.requireAccountId')
            }
          } else {
            return this.$t('error.validation.requireEmail')
          }
        } else if (typeof this.$v.accountId == 'object' && !this.$v.accountId.valid) {
          return this.invalidAccountIdErrorMessage
        } else if (typeof this.$v.password == 'object' && !this.$v.password.required) {
          return this.$t('error.validation.requirePassword')
        } else if (typeof this.$v.password == 'object' && !this.$v.password.minLength) {
          return this.$t('error.validation.minPasswordLength')
        } else if (typeof this.$v.password == 'object' && !this.$v.password.maxLength) {
          return this.$t('error.validation.maxPasswordLength')
        } else if (typeof this.$v.verifyCode == 'object' && !this.$v.verifyCode.required) {
          return this.$t('error.validation.requireVerifyCode')
        } else if (typeof this.$v.verifyCode == 'object' && !this.$v.verifyCode.minLength) {
          return this.$t('error.validation.invalidVerifyCodeLength')
        } else if (typeof this.$v.verifyCode == 'object' && !this.$v.verifyCode.maxLength) {
          return this.$t('error.validation.invalidVerifyCodeLength')
        }
      } else {
        return this.errorMessage
      }
    },

    registerAccountIdLabel: function() {
      if (window.acsConfig.isMobileAccountSupported) {
        return this.$t('account.loginPage.userMobileLabel')
      } else {
        return this.$t('account.loginPage.userEmailLabel')
      }
    },

    registerAccountIdPlaceholder: function() {
      if (window.acsConfig.isMobileAccountSupported) {
        return this.$t('account.loginPage.userMobilePlaceholder')
      } else {
        return this.$t('account.loginPage.userEmailPlaceholder')
      }
    },

    accountIdPlaceholder: function() {
      if (window.acsConfig.isMobileAccountSupported) {
        return this.$t('account.loginPage.accountIdPlaceholder')
      } else {
        return this.$t('account.loginPage.userEmailPlaceholder')
      }
    },

    invalidAccountIdErrorMessage: function() {
      if (window.acsConfig.isMobileAccountSupported) {
        if (this.$route.name == 'registerStep1') {
          return this.$t('error.validation.invalidMobileNumber')
        } else {
          return this.$t('error.validation.invalidAccountId')
        }
      } else {
        return this.$t('error.validation.invalidEmailAddress')
      }
    }

  },
}