<template>
  <form name="params" @submit.prevent="handleSubmit">
    <div class="columns is-multiline">
      <div class="column is-10">
        <label class="label"> {{ $t('admin.wcp.newCodeTemplate')}}: </label>
        <p class="control">
          <textarea class="textarea" rows="4" v-model.trim="wcpParams.new_code_template" ></textarea>
        </p>
      </div>
      <div class="column is-10">
        <label class="label"> {{ $t('admin.wcp.ownedCodeTemplate')}}: </label>
        <p class="control">
          <textarea class="textarea" rows="4" v-model.trim="wcpParams.owned_code_template" ></textarea>
        </p>
      </div>
      <div class="column is-10">
        <label class="label"> {{ $t('admin.wcp.noCodeTemplate')}}: </label>
        <p class="control">
          <textarea class="textarea" rows="4" v-model.trim="wcpParams.no_code_template" ></textarea>
        </p>
      </div>
      <div class="column is-10 has-text-centered">
        <a class="button is-primary" :class="{'is-loading': processing}" @click.prevent="handleSubmit">{{ $t('admin.submit') }}</a>
      </div>
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