export default {
  install : function(Vue, options) {
    Vue.prototype.$acs = {
      async isAccountExists(val) {
        let response = await Vue.http.post('/user/is_account_exists', {account_id: val})
        return await response.json()
      },

      async createToken(account_id, password) {
        let response = await Vue.http.post('/user/create_token', {account_id, password})
        return await response.json()
      },

      async updateToken(access_token) {
        let response = await Vue.http.post('/user/update_token', {access_token})
        return await response.json()
      },

      async createAnonymousToken() {
        let response = await Vue.http.post('/user/create_anonymous_token', {})
        return await response.json()
      },

      async createUser(account_id, password, verify_code, bind_user_id) {
        let response = await Vue.http.post("/user/create_user", {account_id, password, verify_code, bind_user_id})
        return await response.json()
      },

      async updatePassword(account_id, password, verify_code) {
        let response = await Vue.http.post("/user/update_password", {account_id, password, verify_code,})
        return await response.json()
      },

      async sendMobileVerifyCode(mobile) {
        let response = await Vue.http.post("/send_mobile_register_verify_code", {mobile})
        return await response.json()
      },

      async sendRetrievePasswordVerifyCode(account_id) {
        let response = await Vue.http.post("/send_retrieve_password_verify_code", {account_id})
        return await response.json()
      },

      async checkRegisterVerifyCode(verify_code) {
        let response = await Vue.http.post("/check_register_verify_code", {verify_code})
        return await response.json()
      },

      async checkRetrievePasswordVerifyCode(verify_code) {
        let response = await Vue.http.post("/check_retrieve_password_verify_code", {verify_code})
        return await response.json()
      },
    }
  }
}
