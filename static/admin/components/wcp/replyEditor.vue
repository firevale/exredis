<template>
  <form name="params" @submit.prevent="handleSubmit">
    <div class="columns is-multiline">
      <div class="column is-10">
        <label class="label"> {{ $t('admin.wcp.subscribedResponse')}}: </label>
        <!--<toggle-button :value="app.restrict_login" color="#4e9ed8" :sync="true" 
          :labels="{checked: $t('admin.switchOn'), unchecked: $t('admin.switchOff')}" 
          @change="x => app.restrict_login = x.value"> </toggle-button>-->
        <p class="control">
          <textarea class="textarea" rows="4" v-model.trim="wcpParams.subscribed_response" />
        </p>
      </div>
      <div class="column is-10">
        <label class="label"> {{ $t('admin.wcp.scanResponse')}}: </label>
        <p class="control">
          <textarea class="textarea" rows="4" v-model.trim="wcpParams.scan_response" />
        </p>
      </div>
      <div class="column is-10">
        <label class="label"> {{ $t('admin.wcp.defaultResponse')}}: </label>
        <p class="control">
          <textarea class="textarea" rows="4" v-model.trim="wcpParams.default_response" />
        </p>
      </div>
    </div>
    <div class="container has-text-centered" style="margin-top: 15px">
      <a class="button is-primary" :class="{'is-loading': processing}" @click.prevent="handleSubmit">{{ $t('admin.submit') }}</a>
    </div>
  </form>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  data() {
    return {
      processing: false
    }
  },

  computed: {
    ...mapGetters([
      'wcpParams'
    ]),
  },

  methods: {
    ...mapActions([
      'updateWcpParams',
    ]),

    handleSubmit: async function() {
      this.processing = true
      let result = await this.$acs.updateWcpParams(this.wcpParams, this.$t(
        'admin.notification.message.wcpParamsUpdated'))
      if (result.success) {
        this.updateWcpParams(result.wcpconfig)
      }
      this.processing = false
    },
  },

}
</script>