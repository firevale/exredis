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
        } else if (typeof this.$v.email == 'object' && !this.$v.email.required) {
          return this.$t('error.validation.requireEmail')
        } else if (typeof this.$v.email == 'object' && !this.$v.email.valid) {
          return this.$t('error.validation.invalidEmailAddress')
        } else if (typeof this.$v.email == 'object' && !this.$v.email.changed) {
          return this.$t('error.validation.emailNotChanged')
        } else if (typeof this.$v.verifyCode == 'object' && !this.$v.verifyCode.required) {
          return this.$t('error.validation.requireVerifyCode')
        } else if (typeof this.$v.verifyCode == 'object' && !this.$v.verifyCode.minLength) {
          return this.$t('error.validation.invalidVerifyCodeLength')
        } else if (typeof this.$v.verifyCode == 'object' && !this.$v.verifyCode.maxLength) {
          return this.$t('error.validation.invalidVerifyCodeLength')
        } else if (typeof this.$v.password == 'object' && !this.$v.password.required) {
          return this.$t('error.validation.requirePassword')
        } else if (typeof this.$v.password == 'object' && !this.$v.password.minLength) {
          return this.$t('error.validation.minPasswordLength')
        } else if (typeof this.$v.password == 'object' && !this.$v.password.maxLength) {
          return this.$t('error.validation.maxPasswordLength')
        } else if (typeof this.$v.nickname == 'object' && !this.$v.nickname.required) {
          return this.$t('error.validation.requireNickname')
        } else if (typeof this.$v.nickname == 'object' && !this.$v.nickname.minLength) {
          return this.$t('error.validation.minNicknameLength')
        } else if (typeof this.$v.nickname == 'object' && !this.$v.nickname.maxLength) {
          return this.$t('error.validation.maxNicknameLength')
        } else if (typeof this.$v.nickname == 'object' && !this.$v.nickname.valid) {
          return this.$t('error.validation.invalidNickname')
        } else if (typeof this.$v.nickname == 'object' && !this.$v.nickname.emoji) {
          return this.$t('error.validation.emojiNickname')
        } else if (typeof this.$v.residentName == 'object' && !this.$v.residentName.required) {
          return this.$t('error.validation.requireResidentName')
        } else if (typeof this.$v.residentName == 'object' && !this.$v.residentName.minLength) {
          return this.$t('error.validation.minResidentNameLength')
        } else if (typeof this.$v.residentName == 'object' && !this.$v.residentName.maxLength) {
          return this.$t('error.validation.maxResidentNameLength')
        } else if (typeof this.$v.residentId == 'object' && !this.$v.residentId.required) {
          return this.$t('error.validation.requireResidentId')
        } else if (typeof this.$v.residentId == 'object' && !this.$v.residentId.minLength) {
          return this.$t('error.validation.minResidentIdLength')
        } else if (typeof this.$v.residentId == 'object' && !this.$v.residentId.maxLength) {
          return this.$t('error.validation.maxResidentIdLength')
        } else if (typeof this.$v.residentId == 'object' && !this.$v.residentId.valid) {
          return this.$t('error.validation.invalidResidentId')
        }
      } else {
        return this.errorMessage
      }
    },
  },
}