import { required } from 'vuelidate/lib/validators'
import * as utils from 'common/js/utils'

export const password = {
  required,
  minLength: utils.minLength(6),
  maxLength: utils.maxLength(20),
}

export const email = {
  required,
  valid: function(val) {
    return utils.isValidEmail(val)
  }
}

export const verifyCode = {
  required,
  minLength: utils.minLength(4),
  maxLength: utils.maxLength(6),
}