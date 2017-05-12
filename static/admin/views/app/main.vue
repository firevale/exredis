<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  beforeRouteEnter: function(to, from, next) {
    axios.all([
      axios.post('/admin_actions/fetch_app', {
        app_id: to.params.appId
      }),
      axios.post('/admin_actions/fetch_supported_sdks')
    ]).then(axios.spread((app, sdks) => {
      console.log(app, sdks)
      next()
    }))
  }
}
</script>