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
            <img src="../../assets/logo.png" >
            <tooltip label="v 0.1.0" placement="right" type="success" size="small" :no-animate="true" :always="true" :rounded="true">
              <div class="is-hidden-mobile">
                <span class="vue">{{ $t('admin.firevalePlatform') }}</span><strong class="admin">{{ $t('admin.admin') }}</strong>
              </div>
            </tooltip>
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
    methods: mapActions([
      'toggleSidebar'
    ])
  }
</script>
