<template>
  <form name="params" @submit.prevent="handleSubmit">
    <div class="columns is-multiline">
      <div class="column is-10">
        <label class="label"> {{ $t('admin.wcp.download_disabled_template')}}: </label>
        <p class="control">
          <textarea class="textarea" rows="4" v-model.trim="wcpParams.download_disabled_template" ></textarea>
        </p>
      </div>
      <div class="column is-10">
        <label class="label"> {{ $t('admin.wcp.android_download_template')}}: </label>
        <p class="control">
          <textarea class="textarea" rows="4" v-model.trim="wcpParams.android_download_template" ></textarea>
        </p>
      </div>
      <div class="column is-10">
        <label class="label"> {{ $t('admin.wcp.tf_download_template')}}: </label>
        <p class="control">
          <textarea class="textarea" rows="4" v-model.trim="wcpParams.tf_download_template" ></textarea>
        </p>
      </div>
      <div class="column is-10">
        <label class="label"> {{ $t('admin.wcp.tf_download_no_login_code_template')}}: </label>
        <p class="control">
          <textarea class="textarea" rows="4" v-model.trim="wcpParams.tf_download_no_login_code_template" ></textarea>
        </p>
      </div>
      <div class="column is-10">
        <label class="label"> {{ $t('admin.wcp.tf_download_email_received_template')}}: </label>
        <p class="control">
          <textarea class="textarea" rows="4" v-model.trim="wcpParams.tf_download_email_received_template" ></textarea>
        </p>
      </div>
      <div class="column is-10">
        <label class="label"> {{ $t('admin.wcp.tf_invalid_email_template')}}: </label>
        <p class="control">
          <textarea class="textarea" rows="4" v-model.trim="wcpParams.tf_invalid_email_template" ></textarea>
        </p>
      </div>
      <div class="column is-10">
        <label class="label"> {{ $t('admin.wcp.tf_email_used_template')}}: </label>
        <p class="control">
          <textarea class="textarea" rows="4" v-model.trim="wcpParams.tf_email_used_template" ></textarea>
        </p>
      </div>
      <div class="column is-10">
        <label class="label"> {{ $t('admin.wcp.tf_already_invited_template')}}: </label>
        <p class="control">
          <textarea class="textarea" rows="4" v-model.trim="wcpParams.tf_already_invited_template" ></textarea>
        </p>
      </div>
      <div class="column is-10">
        <label class="label"> {{ $t('admin.wcp.new_tf_email_template')}}: </label>
        <p class="control">
          <textarea class="textarea" rows="4" v-model.trim="wcpParams.new_tf_email_template" ></textarea>
        </p>
      </div>
      <div class="column is-10">
        <label class="label"> {{ $t('admin.wcp.tf_invite_failed_template')}}: </label>
        <p class="control">
          <textarea class="textarea" rows="4" v-model.trim="wcpParams.tf_invite_failed_template" ></textarea>
        </p>
      </div>
      <div class="column is-10">
        <label class="label"> {{ $t('admin.wcp.update_tf_email_template')}}: </label>
        <p class="control">
          <textarea class="textarea" rows="4" v-model.trim="wcpParams.update_tf_email_template" ></textarea>
        </p>
      </div>
      <div class="column is-10">
        <label class="label"> {{ $t('admin.wcp.tf_tester_full_template')}}: </label>
        <p class="control">
          <textarea class="textarea" rows="4" v-model.trim="wcpParams.tf_tester_full_template" ></textarea>
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
      'updateAppWcpConfig',
    ]),

    handleSubmit: async function() {
      this.processing = true
      let result = await this.$acs.updateAppWcpConfig(this.wcpParams, this.$t(
        'admin.notification.message.wcpParamsUpdated'))
      if (result.success) {
        this.updateAppWcpConfig(result.wcpconfig)
      }
      this.processing = false
    },
  },

}
</script>