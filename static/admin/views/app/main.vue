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
    axios.post('/admin_actions/fetch_app', {
        app_id: to.params.appId
      })
      .then(response => response.data)
      .then(result => {
        if (result.success) {
          next(vm => {
            vm.setApp(result.app)
            vm.joinAppChannel({
              appId: result.app.id,
              accessToken: window.acsConfig.accessToken
            })
          })
        } else {
          next({
            path: '/admin/error'
          })
        }
      })
      .catch(e => {
        next({
          path: '/admin/error'
        })
      })
  },

  methods: {
    ...mapActions([
      'setApp', 'joinAppChannel'
    ])
  }
}
</script>