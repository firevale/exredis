import forumsRoutes from './forum'
import payment from './payment'
import customerServiceRoutes from './customerService'
import account from './account'
import gamesRoutes from './games'

export default function(VueRouter) {
  return new VueRouter({
    mode: 'history',
    routes: [
      ...forumsRoutes,
      ...customerServiceRoutes,
      ...gamesRoutes,
      ...account,
      ...payment,
    ],
  });
}