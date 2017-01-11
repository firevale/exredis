const app = state => state.app
const sdks = state => state.apps.sdks
const appList = state => state.apps.list
const appHash = state => state.apps.hash
const device = state => state.app.device
const sidebar = state => state.app.sidebar
const effect = state => state.app.effect
const menuitems = state => state.menu.items

export {
  app,
  sdks,
  appList,
  appHash,
  device,
  sidebar,
  effect,
  menuitems,
}
