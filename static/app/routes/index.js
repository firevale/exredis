import forumsRoutes from './forum'
import payment from './payment'
import customerServiceRoutes from './customerService'
import account from './account'
import gamesRoutes from './games'
import mallsRoutes from './malls'

export default function(VueRouter) {
  return new VueRouter({
    mode: 'history',
    routes: [
      ...forumsRoutes,
      ...customerServiceRoutes,
      ...gamesRoutes,
      ...account,
      ...payment,
      ...mallsRoutes,
    ],
  });
}