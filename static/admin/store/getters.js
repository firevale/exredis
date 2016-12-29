const app = state => state.app
const apps = state => state.apps
const device = state => state.app.device
const sidebar = state => state.app.sidebar
const effect = state => state.app.effect
const menuitems = state => state.menu.items

export {
  app,
  apps,
  device,
  sidebar,
  effect,
  menuitems,
}
