<template>
  <nav class="level app-levelbar">
    <div class="level-left">
      <div class="level-item">
        <h3 class="subtitle is-5">
          <strong>{{ $t('admin.routes.' + name) }}</strong>
        </h3>
      </div>
    </div>

    <!--<div class="level-right is-hidden-mobile">
      <router-link v-for="item in list" :to="item.path">/{{ $t('admin.routes.' + item.name) }}</router-link>
    </div>-->
  </nav>
</template>

<script>
export default {
  components: {

  },

  data () {
    return {
      list: null
    }
  },

  created () {
    // this.getList()
  },

  computed: {
    name () {
      return this.$route.name
    }
  },

  methods: {
    getList () {
      let matched = this.$route.matched
      let first = matched[0]
      if (first && (first.name !== 'Home' || first.path !== '/admin')) {
        matched = [{ name: this.$t('admin.routes.Home'), path: '/admin' }].concat(matched)
      }
      this.list = matched
    }
  },

  watch: {
    $route () {
      this.getList()
    }
  }
}
</script>
