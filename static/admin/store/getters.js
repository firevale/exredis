const main = state => state.main
const sdks = state => state.apps.sdks
const appList = state => state.apps.list
const appHash = state => state.apps.hash
const device = state => state.main.device
const sidebar = state => state.main.sidebar
const effect = state => state.main.effect
const menuitems = state => state.menu.items

export {
  main,
  sdks,
  appList,
  appHash,
  device,
  sidebar,
  effect,
  menuitems,
}
