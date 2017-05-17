<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
import axios from 'axios'
import {
  mapActions
} from 'vuex'

export default {
  beforeRouteEnter: function(to, from, next) {
    axios.post('/admin_actions/fetch_supported_sdks')
      .then(response => response.data)
      .then(result => {
        if (result.success) {
          next(vm => {
            vm.updateSdks(result.sdks)
            vm.updateAdminLevel(result.admin_level)
          })
        } else {
          next({
            path: '/admin/error'
          })
        }
      }).catch(e => {
        next({
          path: '/admin/error'
        })
      })
  },

  methods: {
    ...mapActions([
      'updateSdks',
      'updateAdminLevel'
    ])
  }
}
</script>