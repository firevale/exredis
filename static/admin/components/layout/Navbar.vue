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
          <a class="nav-item hero-brand" @click="goIndex">
            <img src="/images/logo.png">
            <div class="is-hidden-mobile">
              <span class="vue">{{ $t('admin.firevalePlatform') }}</span><strong class="admin">{{ $t('admin.admin') }}{{appShowName}}</strong>
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
  computed: {
    ...mapGetters({
      sidebar: 'sidebar',
      app: 'app',
    }),
    appShowName: function() {
      if (this.$route.params.appId && this.app) {
        return "  - " + this.app.name
      } else {
        return ""
      }


    }
  },
  created: function() {
    this.fetchMalls(this.$router.appId)
    this.fetchForums(this.$router.appId)
  },
  methods: {
    ...mapActions([
      'toggleSidebar',
      'fetchMalls',
      'fetchForums'
    ]),
    goIndex: function() {
      this.$router.push({
        name: 'Index'
      })
    }
  }
}
</script>