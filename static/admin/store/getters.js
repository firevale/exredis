const main = state => state.main
const app = state => state.apps.app
const sdks = state => state.apps.sdks
const goods = state => state.apps.goods
const device = state => state.main.device
const sidebar = state => state.main.sidebar
const effect = state => state.main.effect
const menuitems = state => state.menu.items
const indexMenuitems = state => state.menu.indexItems
const sections = state => state.forums.sections
const mallList = state => state.mall.list
const mallHash = state => state.mall.hash

export {
  main,
  app,
  sdks,
  goods,
  device,
  sidebar,
  effect,
  menuitems,
  indexMenuitems,
  sections,
  mallList,
  mallHash,
}
