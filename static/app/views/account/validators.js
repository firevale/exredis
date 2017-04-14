import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import * as utils from 'common/js/utils'

export const password = {
  required,
  minLength: minLength(6),
  maxLength: maxLength(20),
}

export const mobile = {
  required,
  valid: function(val) {
    return utils.isValidMobileNumber(val)
  }
}

export const email = {
  required,
  valid: function(val) {
    return utils.isValidEmail(val)
  }
}

export const verifyCode = {
  required,
  minLength: minLength(4),
  maxLength: maxLength(6),
}