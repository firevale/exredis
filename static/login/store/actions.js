
export const addAccountExistence = ({commit}, payload) => {
  commit('ADD_ACCOUNT_EXISTENCE', payload)
}

export const setLoginAccount = ({commit}, account) => {
  commit('SET_LOGIN_ACCOUNT', account)
}

export const setRegisterAccount = ({commit}, account) => {
  commit('SET_REGISTER_ACCOUNT', account)
}