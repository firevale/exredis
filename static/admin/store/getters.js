const main = state => state.main
const app = state => state.apps.app
const latestOnlineData = state => state.apps.latestOnlineData
const realtimeMetrics = state => state.apps.realtimeMetrics
const myLoginCodes = state => state.apps.myLoginCodes
const sdks = state => state.apps.sdks
const goods = state => state.apps.goods
const device = state => state.main.device
const sidebar = state => state.main.sidebar
const effect = state => state.main.effect
const indexMenuitems = state => state.menu.indexItems
const mallList = state => state.mall.list
const mallHash = state => state.mall.hash
const adminLevel = state => state.main.adminLevel
const wcpParams = state => state.wcp.wcpParams

const menuitems = state => {
  let has_mall = state.apps.app && state.apps.app.has_mall
  let has_pmall = state.apps.app && state.apps.app.has_pmall
  let has_forum = state.apps.app && state.apps.app.has_forum
  let restrict_login = state.apps.app && state.apps.app.restrict_login

  let result = []

  state.menu.items.forEach(element => {
    switch(element.meta.must) {
      case 'has_forum':
        if (has_forum) result.push(element);
        break;

      case 'has_mall':
        if (has_mall) result.push(element);
        break;

      case 'has_pmall':
        if (has_pmall) result.push(element);
        break;

      // case 'restrict_login':
      //   if (restrict_login) {
      //     element.meta.expanded = false
      //     result.push(element);
      //   }
      //   break;

      default:
        result.push(element)
        break;
    }
  })

  return result
}

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
  mallList,
  mallHash,
  adminLevel,
  myLoginCodes,
  wcpParams,
  latestOnlineData,
  realtimeMetrics,
}
