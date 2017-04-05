import forumsRoutes from './forum'
import customerServiceRoutes from './customerService'
import gamesRoutes from './games'

export default function(VueRouter) {
  return new VueRouter({
    mode: 'history',
    routes: [
      ...forumsRoutes,
      ...customerServiceRoutes,
      ...gamesRoutes,
    ],
  });
}