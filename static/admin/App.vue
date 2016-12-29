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
  }, 

  computed: mapGetters({
    sidebar: 'sidebar'
  }),

  methods: mapActions([
    'toggleDevice',
    'toggleSidebar',
    'fetchPlatformApps'
  ])
}
</script>
<style lang="scss">
  @import '~animate.css';
  .animated {
    animation-duration: .377s;
  }
  
  @import '~bulma';
  @import '~wysiwyg.css/wysiwyg.sass';
  $fa-font-path: '~font-awesome/fonts/';
  @import '~font-awesome/scss/font-awesome';
  .nprogress-container {
    position: fixed !important;
    width: 100%;
    height: 50px;
    z-index: 2048;
    pointer-events: none;
    #nprogress {
      $color: #48e79a;
      .bar {
        background: $color;
      }
      .peg {
        box-shadow: 0 0 10px $color, 0 0 5px $color;
      }
      .spinner-icon {
        border-top-color: $color;
        border-left-color: $color;
      }
    }
  }
</style>