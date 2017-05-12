<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
import axios from 'axios'
import {
  mapGetters,
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
          })
        } else {
          next({
            path: 'error'
          })
        }
      }).catch(e => {
        next({
          path: 'error'
        })
      })
  },

  methods: {
    ...mapActions([
      'updateSdks'
    ])
  }
}
</script>