import forumsRoutes from './forum'
import customerServiceRoutes from './customerService'

export default function(VueRouter) {
  return new VueRouter({
    mode: 'history',
    routes: [
      ...forumsRoutes,
      ...customerServiceRoutes,
    ],
  });
}