<template>
  <section class="hero is-bold app-navbar animated" :class="{ slideInDown: show, slideOutDown: !show }">
    <div class="hero-head">
      <nav class="nav">
        <div class="nav-left">
          <a class="nav-item is-hidden-tablet" @click="toggleSidebar(!sidebar.opened)">
            <i class="fa fa-bars" aria-hidden="true"></i>
          </a>
        </div>
        <div class="nav-center">
          <a class="nav-item hero-brand">
            <img src="/images/logo.png">
            <div class="is-hidden-mobile">
              <span class="vue">{{ $t('admin.firevalePlatform') }}</span><strong class="admin">{{ $t('admin.admin') }}</strong>
            </div>
          </a>
        </div>
        <div class="nav-right is-flex"></div>
      </nav>
    </div>
  </section>
</template>
<script>
import Tooltip from 'vue-bulma-tooltip'
import {
  mapGetters,
  mapActions
} from 'vuex'
export default {
  components: {
    Tooltip
  },
  props: {
    show: Boolean
  },
  computed: mapGetters({
    sidebar: 'sidebar'
  }),
  created: function() {
    this.fetchMalls()
    this.fetchForums()
  },
  methods: {
    ...mapActions([
      'toggleSidebar',
      'fetchMalls',
      'fetchForums'
    ])
  }
}
</script>