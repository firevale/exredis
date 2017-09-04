import forumsMobileRoutes from './forum_mobile'

export default function(VueRouter) {
  return new VueRouter({
    mode: 'history',
    routes: [
      ...forumsMobileRoutes,
    ],
  });
}