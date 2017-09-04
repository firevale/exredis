import bbsRoutes from './bbs'
import payment from './payment'
import customerServiceRoutes from './customerService'
import account from './account'
import gamesRoutes from './games'
import mallRoutes from './mall'

export default function(VueRouter) {
  return new VueRouter({
    mode: 'history',
    routes: [
      ...bbsRoutes,
      ...customerServiceRoutes,
      ...gamesRoutes,
      ...account,
      ...payment,
      ...mallRoutes,
    ],
  });
}