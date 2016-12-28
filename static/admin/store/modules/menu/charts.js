import { lazyLoading } from './lazyLoading'

export default {
  name: 'Charts',
  path: '/charts',
  meta: {
    icon: 'fa-bar-chart-o',
    expanded: false
  },
  component: require('../../../views/charts'),//lazyLoading('charts', true),
  children: [
    {
      name: 'Chartist',
      path: 'chartist',
      component: require('../../../views/charts/Chartist.vue')//lazyLoading('charts/Chartist')
    },
    {
      name: 'Chartjs',
      path: 'chartjs',
      component: require('../../../views/charts/Chartjs.vue')//lazyLoading('charts/Chartjs')
    },
    {
      name: 'Peity',
      path: 'peity',
      component: require('../../../views/charts/Peity.vue')//lazyLoading('charts/Peity')
    },
    {
      name: 'Plotly',
      path: 'plotly',
      component: require('../../../views/charts/Plotly.vue')//lazyLoading('charts/Plotly')
    }
  ]
}
