import {required, minLength, maxLength} from 'vuelidate/lib/validators'
import * as utils from 'common/js/utils'

export const password = {
  required,
  minLength: minLength(6),
  maxLength: maxLength(20),
}

export const accountId = {
  required,
  valid: function(val) {
    if (window.acsConfig.isMobileAccountSupported) {
      return utils.isValidMobileNumber(val)
    } else {
      return utils.isValidEmail(val)
    }
  }
}

export const verifyCode = {
  required,
  minLength: minLength(4),
  maxLength: maxLength(6),
}
