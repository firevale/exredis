<template>
  <div>
  </div>
</template>
<script>
import {
  mapActions
} from 'vuex'
export default {
  data: function() {
    return {
      stats: {
        total: 0,
        available: 0,
        assigned: 0,
        used: 0,
      }
    }
  },

  created: async function() {
    this.updateStats()
  },

  methods: {
    updateStats: async function() {
      let result = await this.$acs.fetchLoginCodesStats({app_id: this.$route.params.appId})
      this.stats = result.stats
    }
  }
}
</script>