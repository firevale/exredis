<template>
  <form name="params" @submit.prevent="handleSubmit">
    <div class="columns is-multiline">
      <div class="column is-8">
        <label class="label"> {{ $t('admin.wcp.verifyFile')}}: <span @mouseenter="show=true" @mouseleave="show=false" class="icon is-sign">?</span></label>
        <p class="control">
          <input class="input" disabled type="text" v-model.trim="wcpParams.verify_File">
        </p>
      </div>
      <div class="column is-8">
        <label class="label"> {{ $t('admin.wcp.appId')}}: <span class="icon is-sign">?</span></label>
        <p class="control">
          <input class="input" type="text" v-model.trim="wcpParams.wcp_app_id">
        </p>
      </div>
      <div class="column is-8">
        <label class="label"> {{ $t('admin.wcp.appKey')}}: <span class="icon is-sign">?</span></label>
        <p class="control">
          <input class="input" type="text" v-model.trim="wcpParams.wcp_app_key">
        </p>
      </div>
      <div class="column is-8">
        <label class="label"> {{ $t('admin.wcp.token')}}: <span class="icon is-sign">?</span></label>
        <p class="control">
          <input class="input" type="text" v-model.trim="wcpParams.token">
        </p>
      </div>
      <div class="column is-8">
        <label class="label"> {{ $t('admin.wcp.aesKey')}}: <span class="icon is-sign">?</span></label>
        <p class="control">
          <input class="input" type="text" v-model.trim="wcpParams.aes_key">
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
      show: false,
      processing: false,
      tips: ['',
        '',
        '',
        '',
      ],
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