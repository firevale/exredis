import VueI18n from 'vue-i18n'

export default {
  install : function(Vue, options) {
    Vue.prototype.$acs = {
      isAccountExists(val) {
        return Vue.axios.post('/user/is_account_exists', {account_id: val}).then(response => {
          return response.data
        })
      },

      createToken(account_id, password) {
        return Vue.axios.post('/user/create_token', {account_id, password}).then(response => {
          return response.data
        })
      },

      updateToken(access_token) {
        return Vue.axios.post('/user/update_token', {access_token}).then(response => {
          return response.data
        })
      },

      createAnonymousToken() {
        return Vue.axios.post('/user/create_anonymous_token', {}).then(response => {
          return response.data
        })
      },

      createUser(account_id, password, verify_code) {
        return Vue.axios.post("/user/create_user", {account_id, password, verify_code}).then(response => {
          return response.data
        })
      },

      updatePassword(account_id, password, verify_code) {
        return Vue.axios.post("/user/update_password", {account_id, password, verify_code,}).then(response => {
          return response.data
        })
      },

      sendMobileVerifyCode(mobile) {
        return Vue.axios.post("/send_mobile_register_verify_code", {mobile}).then(response => {
          return response.data
        })
      },

      sendRetrievePasswordVerifyCode(account_id) {
        return Vue.axios.post("/send_retrieve_password_verify_code", {account_id}).then(response => {
          return response.data
        })
      },

      checkRegisterVerifyCode(verify_code) {
        return Vue.axios.post("/check_register_verify_code", {verify_code}).then(response => {
          return response.data
        })
      },

      checkRetrievePasswordVerifyCode(verify_code) {
        return Vue.axios.post("/check_retrieve_password_verify_code", {verify_code}).then(response => {
          return response.data
        })
      },

      updateCaptcha(params) {
        return Vue.axios.post("/reset_register_captcha", params).then(response => {
          return response.data
        })
      }
    }
  }
}
