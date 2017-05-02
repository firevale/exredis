const touchMap = new WeakMap()

export default {
  methods: {
    setErrorMessage: function(val) {
      this.errorMessage = val
      setTimeout(_ => {
        this.errorMessage = ''
      }, 5000)
    },

    handleValidation: function($v) {
      $v.$reset()
      this.errorMessage = ''
      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v))
      }
      touchMap.set($v, setTimeout(_ => {
        console.log('touch validation after timeout', $v)
        $v.$touch()
      }), 1000)
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

  mounted() {
    this.$watch('$v.accountId', v => {
      console.log('validation $v.accountId is changed', v, this.errorMessage)
      this.$nextTick(_ => {
        if (!this.errorMessage && !v.$pending && v.$invalid) {
          if (!v.required) {
            if (window.acsConfig.isMobileAccountSupported) {
              if (this.$route.name == 'registerStep1') {
                this.errorMessage = this.$t('error.validation.requireMobile')
              } else {
                this.errorMessage = this.$t('error.validation.requireAccountId')
              }
            } else {
              this.errorMessage = this.$t('error.validation.requireEmail')
            }
          } else if (!v.valid) {
            this.errorMessage = this.invalidAccountIdErrorMessage
          }
        }
      })
    })

    this.$watch('$v.password', v => {
      console.log('validation $v.password is changed', v, this.errorMessage)
      this.$nextTick(_ => {
        if (!this.errorMessage && !v.$pending && v.$invalid) {
          if (!v.required) {
            this.errorMessage = this.$t('error.validation.requirePassword')
          } else if (!v.minLength) {
            this.errorMessage = this.$t('error.validation.minPasswordLength')
          } else if (!v.maxLength) {
            this.errorMessage = this.$t('error.validation.maxPasswordLength')
          }
        }
      })
    })

    this.$watch('$v.verifyCode', v => {
      console.log('validation $v.verifyCode is changed', v, this.errorMessage)
      this.$nextTick(_ => {
        if (!this.errorMessage && !v.$pending && v.$invalid) {
          if (!v.required) {
            this.errorMessage = this.$t('error.validation.requireVerifyCode')
          } else if (!v.minLength) {
            this.errorMessage = this.$t('error.validation.invalidVerifyCodeLength')
          } else if (!v.maxLength) {
            this.errorMessage = this.$t('error.validation.invalidVerifyCodeLength')
          }
        }
      })
    })
  },

  watch: {
    errorMessage: function(newMessage) {
      console.log('error messsage is set to: ', newMessage)
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