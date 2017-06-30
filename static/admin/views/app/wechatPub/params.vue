<template>
  <form name="params" @submit.prevent="handleSubmit">
    <div class="columns is-multiline">
      <div class="column is-5">
        <label class="label"> {{ $t('admin.wcp.appId')}}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="params.wcp_app_id">
        </p>
      </div>
      <div class="column is-5">
        <label class="label"> {{ $t('admin.wcp.appKey')}}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="params.wcp_app_key">
        </p>
      </div>
      <div class="column is-5">
        <label class="label"> {{ $t('admin.wcp.token')}}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="params.token">
        </p>
      </div>
      <div class="column is-5">
        <label class="label"> {{ $t('admin.wcp.aesKey')}}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="params.aes_key">
        </p>
      </div>
      <div class="column is-10">
        <label class="label"> {{ $t('admin.wcp.subscribedResponse')}}: </label>
        <p class="control">
          <textarea class="textarea" rows="4" v-model.trim="params.subscribed_response" />
        </p>
      </div>
      <div class="column is-10">
        <label class="label"> {{ $t('admin.wcp.scanResponse')}}: </label>
        <p class="control">
          <textarea class="textarea" rows="4" v-model.trim="params.scan_response" />
        </p>
      </div>
      <div class="column is-10">
        <label class="label"> {{ $t('admin.wcp.defaultResponse')}}: </label>
        <p class="control">
          <textarea class="textarea" rows="4" v-model.trim="params.default_response" />
        </p>
      </div>
      <div class="column is-10">
        <label class="label"> {{ $t('admin.wcp.newCodeTemplate')}}: </label>
        <p class="control">
          <textarea class="textarea" rows="4" v-model.trim="params.new_code_template" />
        </p>
      </div>
      <div class="column is-10">
        <label class="label"> {{ $t('admin.wcp.ownedCodeTemplate')}}: </label>
        <p class="control">
          <textarea class="textarea" rows="4" v-model.trim="params.owned_code_template" />
        </p>
      </div>
      <div class="column is-10">
        <label class="label"> {{ $t('admin.wcp.noCodeTemplate')}}: </label>
        <p class="control">
          <textarea class="textarea" rows="4" v-model.trim="params.no_code_template" />
        </p>
      </div>
    </div>
    <div class="container has-text-centered" style="margin-top: 15px">
      <a class="button is-primary" :class="{'is-loading': processing}" @click.prevent="handleSubmit">{{ $t('admin.submit') }}</a>
    </div>
  </form>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      params: Object,
      processing: false
    }
  },

  mounted: async function() {
    this.addWcpEmptyParams()
  },

  methods: {
    addWcpEmptyParams: async function() {
      this.loading = true
      let app_id = this.$route.params.appId
      let result = await this.$acs.addWcpEmptyParams({
        app_id: app_id
      })

      if (result.success) {
        this.params = result.wcpconfig
      }

      this.loading = false
    },

    handleSubmit: async function() {
      this.processing = true
      let result = await this.$acs.updateWcpParams(this.params, this.$t('admin.notification.message.wcpParamsUpdated'))
      if (result.success) {
        this.params = result.wcpconfig
      }
      this.processing = false
    },
  },

}
</script>