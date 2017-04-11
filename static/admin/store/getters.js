const main = state => state.main
const sdks = state => state.apps.sdks
const appList = state => state.apps.list
const appHash = state => state.apps.hash
const goods = state => state.apps.goods
const device = state => state.main.device
const sidebar = state => state.main.sidebar
const effect = state => state.main.effect
const menuitems = state => state.menu.items
const forumList = state => state.forums.list
const forumHash = state => state.forums.hash
const sections = state => state.forums.sections
const mallList = state => state.mall.list
const mallHash = state => state.mall.hash

export {
  main,
  sdks,
  appList,
  appHash,
  goods,
  device,
  sidebar,
  effect,
  menuitems,
  forumList,
  forumHash,
  sections,
  mallList,
  mallHash,
}
