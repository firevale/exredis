import Vue from 'vue'


export const addAccountExistence = ({
  commit
}, payload) => {
  commit('ADD_ACCOUNT_EXISTENCE', payload)
}

export const setLoginAccount = ({
  commit
}, account) => {
  commit('SET_LOGIN_ACCOUNT', account)
}

export const setRegisterAccount = ({
  commit
}, account) => {
  commit('SET_REGISTER_ACCOUNT', account)
}

export const updateCaptcha = ({
  commit
}) => {
  Vue.http.post('/reset_register_captcha', {}).then(res => res.json()).then(json => {
    if (json.success) {
      commit('SET_CAPTCHA_URL', json.image_url)
    }
  })
}