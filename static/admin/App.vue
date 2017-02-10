<template>
  <div id='app'>
    <nprogress-container></nprogress-container>
    <navbar :show="true"></navbar>
    <sidebar :show="sidebar.opened && !sidebar.hidden"></sidebar>
    <app-main></app-main>
  </div>
</template>
<script>
import NprogressContainer from 'vue-nprogress/src/NprogressContainer.vue'
import { Navbar, Sidebar, AppMain, FooterBar} from './components/layout'
import { mapGetters, mapActions } from 'vuex'

import 'admin/scss/admin.scss'

export default {
  components: {
    'navbar': Navbar,
    'sidebar': Sidebar,
    'appMain': AppMain,
    'footerBar': FooterBar,
    'nprogressContainer': NprogressContainer
  },

  beforeMount: function() {
    const { body } = document
    const WIDTH = 768
    const RATIO = 3

    const handler = () => {
      if (!document.hidden) {
        let rect = body.getBoundingClientRect()
        let isMobile = rect.width - RATIO < WIDTH
        this.toggleDevice(isMobile ? 'mobile' : 'other')
        this.toggleSidebar(!isMobile)
      }
    }

    document.addEventListener('visibilitychange', handler)
    window.addEventListener('DOMContentLoaded', handler)
    window.addEventListener('resize', handler)
  },

  mounted: function() {
    this.fetchPlatformApps()
    this.fetchSupportedSdks()
  }, 

  computed: mapGetters({
    sidebar: 'sidebar'
  }),

  methods: mapActions([
    'toggleDevice',
    'toggleSidebar',
    'fetchPlatformApps',
    'fetchSupportedSdks',
  ])
}
</script>