export default {
  data: function() {
    return {
      touchMap: new WeakMap()
    }
  },

  methods: {
    setErrorMessage: function(val) {
      this.errorMessage = val
      setTimeout(_ => {
        this.errorMessage = ''
      }, 5000)
    },

    handleValidation: function($v) {
      $v.$reset()

      let timer = setTimeout(_ => {
        $v.$touch()
        setTimeout(_ => {
          this.updateErrorMessage()
        }, 50)
      }, 500)

      if (this.touchMap.has($v)) {
        clearTimeout(this.touchMap.get($v))
      }
      this.touchMap.set($v, timer)
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

    updateErrorMessage() {
      if (this.$v.$invalid) {
        if (typeof this.$v.accountId === 'object' && this.$v.accountId.$invalid) {
          let $v = this.$v.accountId
          if (!$v.required) {
            if (window.acsConfig.isMobileAccountSupported) {
              if (this.$route.name == 'registerStep1') {
                this.errorMessage = this.$t('error.validation.requireMobile')
              } else {
                this.errorMessage = this.$t('error.validation.requireAccountId')
              }
            } else {
              this.errorMessage = this.$t('error.validation.requireEmail')
            }
          } else if (!$v.valid) {
            this.errorMessage = this.invalidAccountIdErrorMessage
          }
        }
        else if (typeof this.$v.password === 'object' && this.$v.password.$invalid) {
          let $v = this.$v.password
          if (!$v.required) {
            this.errorMessage = this.$t('error.validation.requirePassword')
          } else if (!$v.minLength) {
            this.errorMessage = this.$t('error.validation.minPasswordLength')
          } else if (!$v.maxLength) {
            this.errorMessage = this.$t('error.validation.maxPasswordLength')
          }
        }
        else if (typeof this.$v.verifyCode === 'object' && this.$v.verifyCode.$invalid) {
          let $v = this.$v.verifyCode
          if (!$v.required) {
            this.errorMessage = this.$t('error.validation.requireVerifyCode')
          } else if (!$v.minLength) {
            this.errorMessage = this.$t('error.validation.invalidVerifyCodeLength')
          } else if (!$v.maxLength) {
            this.errorMessage = this.$t('error.validation.invalidVerifyCodeLength')
          }
        }
        else if (typeof this.$v.loginCode === 'object' && this.$v.loginCode.$invalid) {
          let $v = this.$v.loginCode
          if (!$v.required) {
            this.errorMessage = this.$t('error.validation.requireLoginCode')
          } else if (!$v.minLength) {
            this.errorMessage = this.$t('error.validation.invalidLoginCodeLength')
          } else if (!$v.maxLength) {
            this.errorMessage = this.$t('error.validation.invalidLoginCodeLength')
          }
        }
      }
      else {
        this.errorMessage = ''
      }
    }
  },

  computed: {
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