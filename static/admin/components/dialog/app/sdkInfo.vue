<template>
  <modal :visible="visible">
    <div class="box">
      <div class="has-text-centered" style="width: 100%; margin-bottom: 10px">
        <h5 class="title is-5">{{ `${app.name} - ` + $t('admin.titles.editSdkInfo', {sdk: $t(`admin.sdks.${sdk}`)})}}</h5>
      </div>
      <form @submit.prevent="handleSubmit">
        <template v-for="key in Object.keys(binding).reverse()">
          <label class="label"> {{ $t(`admin.sdks.${sdk}`) + $t('admin.sdks.assigned') + $t(`admin.sdks.keys.${key}`)}}: </label>
          <p class="control">
            <input class="input" type="text" v-model.trim="binding[key]">
          </p>
        </template>
        <div class="has-text-centered" style="margin-top: 15px">
          <a class="button is-primary" :class="{'is-loading': processing}" @click.prevent="handleSubmit">{{ $t('admin.submit') }}</a>
        </div>
      </form>
    </div>
  </modal>
</template>
<script>
import {
  Modal
} from 'vue-bulma-modal'

export default {
  props: {
    visible: Boolean,
    sdk: String,
    app: Object,
    binding: Object,
  },

  data() {
    return {
      processing: false
    }
  },

  methods: {
    handleSubmit: async function() {
      this.processing = true
      let result = await this.$acs.updateAppSdkInfo({
          app_id: this.app.id,
          sdk: this.sdk,
          binding: this.binding
        },
        this.$t('admin.notification.message.sdkInfoUpdated', {
          sdk: this.$t(`admin.sdks.${this.sdk}`)
        }))
      if (result.success) {
        let filtered = this.app.sdk_bindings.filter(x => x.sdk == this.sdk)
        if (filtered.length <= 0) {
          this.app.sdk_bindings.push(result.binding)
        }
        this.visible = false
      }
      this.processing = false
    }
  },

  components: {
    Modal,
  },
}
</script>