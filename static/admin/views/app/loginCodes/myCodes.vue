<template>
  <div class="box">
    <div class="columns" v-for="code in myLoginCodes" :key="code.id">
      <span class="column is-3">{{ code.code}} </span>
      <span class="column is-3">{{ code.user_id}} </span>
      <span class="column is-3">{{ code.assigned_at }} </span>


    </div>
  </div>
</template>
<script>
import {
  mapActions,
  mapGetters
} from 'vuex'

import Toast from 'common/components/toast'

export default {

  computed: {
    ...mapGetters([
      'myLoginCodes'
    ]),
  },

  methods: {
    ...mapActions([
      'updateMyLoginCodes'
    ]),
  },

  created: async function() {
    let result = await this.$acs.fetchMyLoginCodes({
      app_id: this.$route.params.appId,
    })

    if (result.success) {
      this.updateMyLoginCodes(result.codes)
    } 
  },

  components: {
  }
}
</script>