const app = state => state.app
const deviceId = state => state.app.deviceId
const appId = state => state.app.appId
const accountExistences = state => state.app.accountExistences
const loginAccount = state => state.app.loginAccount
const registerAccount = state => state.app.registerAccount

export {
  app,
  deviceId,
  appId,
  accountExistences,
  loginAccount,
  registerAccount,
}