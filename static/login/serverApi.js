import VueI18n from 'vue-i18n'

export default {
  install : function(Vue, options) {
    Vue.prototype.$acs = {
      isAccountExists(val) {
        return Vue.http.post('/user/is_account_exists', {account_id: val}).then(response => {
          return response.json()
        })
      },

      createToken(account_id, password) {
        return Vue.http.post('/user/create_token', {account_id, password}).then(response => {
          return response.json()
        })
      },

      updateToken(access_token) {
        return Vue.http.post('/user/update_token', {access_token}).then(response => {
          return response.json()
        })
      },

      createAnonymousToken() {
        return Vue.http.post('/user/create_anonymous_token', {}).then(response => {
          return response.json()
        })
      },

      createUser(account_id, password, verify_code) {
        return Vue.http.post("/user/create_user", {account_id, password, verify_code}).then(response => {
          return response.json()
        })
      },

      updatePassword(account_id, password, verify_code) {
        return Vue.http.post("/user/update_password", {account_id, password, verify_code,}).then(response => {
          return response.json()
        })
      },

      sendMobileVerifyCode(mobile) {
        return Vue.http.post("/send_mobile_register_verify_code", {mobile}).then(response => {
          return response.json()
        })
      },

      sendRetrievePasswordVerifyCode(account_id) {
        return Vue.http.post("/send_retrieve_password_verify_code", {account_id}).then(response => {
          return response.json()
        })
      },

      checkRegisterVerifyCode(verify_code) {
        return Vue.http.post("/check_register_verify_code", {verify_code}).then(response => {
          return response.json()
        })
      },

      checkRetrievePasswordVerifyCode(verify_code) {
        return Vue.http.post("/check_retrieve_password_verify_code", {verify_code}).then(response => {
          return reponse.json()
        })
      },

      updateCaptcha(params) {
        return Vue.http.post("/reset_register_captcha", params).then(response => {
          return response.json()
        })
      }
    }
  }
}
