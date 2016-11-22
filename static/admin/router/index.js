import Vue from 'vue'
import Router from 'vue-router'
import menuModule from '../store/modules/menu'
Vue.use(Router)

export default new Router({
  mode: 'hash', // Demo is living in GitHub.io, so required!
  linkActiveClass: 'is-active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: require('../views/Home.vue')
    },
    {
      name: 'Dashboard',
      path: '/dashboard',
      meta: {
        icon: 'fa-tachometer'
      },
      component: require('../views/dashboard/index.vue')
    },
    {
      name: 'Charts',
      path: '/charts',
      meta: {
        icon: 'fa-bar-chart-o',
        expanded: false
      },
      component: require('../views/charts/index.vue'),

      children: [
        {
          name: 'Chartist',
          path: 'chartist',
          component: require('../views/charts/Chartist.vue')
        },
        {
          name: 'Chartjs',
          path: 'chartjs',
          component: require('../views/charts/Chartjs.vue')
        },
        {
          name: 'Peity',
          path: 'peity',
          component: require('../views/charts/Peity.vue')
        },
        // {
        //   name: 'Plotly',
        //   path: 'plotly',
        //   component: require('../views/charts/Plotly.vue')
        // }
      ]
    },
    // {
    //   name: 'Components',
    //   path: '/components',
    //   meta: {
    //     icon: 'fa-building-o',
    //     expanded: false
    //   },
    //   component: require('../views/components/index.vue'),

    //   children: [
    //     {
    //       path: '',
    //       component: require('../views/components/Default.vue')
    //     },
    //     // {
    //     //   name: 'BackToTop',
    //     //   path: 'backToTop',
    //     //   meta: {
    //     //     description: 'Jump component is based on jump.js',
    //     //     repository: 'https://github.com/vue-bulma/jump'
    //     //   },
    //     //   component: require('../views/components/BackToTop.vue')
    //     // },
    //     {
    //       name: 'Collapse',
    //       path: 'collapse',
    //       meta: {
    //         description: 'Collapse component',
    //         repository: 'https://github.com/vue-bulma/collapse'
    //       },
    //       component: require('../views/components/Collapse.vue')
    //     },
    //     {
    //       name: 'Datepicker',
    //       path: 'datepicker',
    //       meta: {
    //         description: 'Datepicker component is based on flatpickr',
    //         repository: 'https://github.com/vue-bulma/datepicker'
    //       },
    //       component: require('../views/components/Datepicker.vue')
    //     },
    //     // {
    //     //   name: 'Emoji',
    //     //   path: 'emoji',
    //     //   meta: {
    //     //     description: 'Emoji Component is based on emojione.com',
    //     //     repository: 'https://github.com/vue-bulma/emoji'
    //     //   },
    //     //   component: require('../views/components/Emoji.vue')
    //     // },
    //     {
    //       name: 'Message',
    //       path: 'message',
    //       meta: {
    //         description: 'Message component',
    //         repository: 'https://github.com/vue-bulma/message'
    //       },
    //       component: require('../views/components/Message.vue')
    //     },
    //     {
    //       name: 'Modal',
    //       path: 'modal',
    //       meta: {
    //         description: 'Modal component',
    //         repository: 'https://github.com/vue-bulma/modal'
    //       },
    //       component: require('../views/components/Modal.vue')
    //     },
    //     {
    //       name: 'Notification',
    //       path: 'notification',
    //       meta: {
    //         description: 'Notification component',
    //         repository: 'https://github.com/vue-bulma/notification'
    //       },
    //       component: require('../views/components/Notification.vue')
    //     },
    //     {
    //       name: 'ProgressBar',
    //       path: 'progress-bar',
    //       meta: {
    //         description: 'ProgressBar component',
    //         repository: 'https://github.com/vue-bulma/progress-bar'
    //       },
    //       component: require('../views/components/ProgressBar.vue')
    //     },
    //     {
    //       name: 'ProgressTracker',
    //       path: 'progress-tracker',
    //       meta: {
    //         description: 'ProgressTracker component is based on progress-tracker',
    //         repository: 'https://github.com/vue-bulma/progress-tracker'
    //       },
    //       component: require('../views/components/ProgressTracker.vue')
    //     },
    //     {
    //       name: 'Quill',
    //       path: 'quill',
    //       meta: {
    //         description: 'Your powerful, rich text editor',
    //         repository: 'https://github.com/vue-bulma/quill'
    //       },
    //       component: require('../views/components/Quill.vue')
    //     },
    //     {
    //       name: 'Rating',
    //       path: 'rating',
    //       meta: {
    //         description: 'Rating component is based on starability.css',
    //         repository: 'https://github.com/vue-bulma/rating'
    //       },
    //       component: require('../views/components/Rating.vue')
    //     },
    //     {
    //       name: 'Slider',
    //       path: 'slider',
    //       meta: {
    //         description: 'Slider component',
    //         repository: 'https://github.com/vue-bulma/slider'
    //       },
    //       component: require('../views/components/Slider.vue')
    //     },
    //     {
    //       name: 'Switch',
    //       path: 'switch',
    //       meta: {
    //         description: 'Switch component',
    //         repository: 'https://github.com/vue-bulma/switch'
    //       },
    //       component: require('../views/components/Switch.vue')
    //     },
    //     {
    //       name: 'Tabs',
    //       path: 'tabs',
    //       meta: {
    //         description: 'Tabs component',
    //         repository: 'https://github.com/vue-bulma/tabs'
    //       },
    //       component: require('../views/components/Tabs.vue')
    //     },
    //     {
    //       name: 'Tooltip',
    //       path: 'tooltip',
    //       meta: {
    //         description: 'Tooltip component is based on hint.css',
    //         repository: 'https://github.com/vue-bulma/tooltip'
    //       },
    //       component: require('../views/components/Tooltip.vue')
    //     },
    //     // {
    //     //   name: 'Lory',
    //     //   path: 'lory',
    //     //   meta: {
    //     //     description: 'Slider component is based on lory, lory: ☀ Touch enabled minimalistic slider',
    //     //     repository: 'https://github.com/vue-bulma/lory'
    //     //   },
    //     //   component: require('../views/components/Lory.vue')
    //     // }
    //   ]
    // },
    //...generateRoutesFromMenu(menuModule.state.items),
    {
      path: '*',
      redirect: '/'
    }
  ]
})

// Menu should have 2 levels.
function generateRoutesFromMenu (menu = [], routes = []) {
  for (let i = 0, l = menu.length; i < l; i++) {
    let item = menu[i]
    if (item.path) {
      routes.push(item)
    }
    if (!item.component) {
      generateRoutesFromMenu(item.children, routes)
    }
  }
  return routes
}
