<template>
  <modal :visible="visible">
    <div class="box">
      <div class="has-text-centered" style="width: 100%; margin-bottom: 10px">
        <h5 class="title is-5">{{ `${app.name} - ` + $t('admin.titles.editSdkInfo', {sdk: $t(`admin.sdks.${sdk}`)})}}</h5>
      </div>
      <validation name="sdkInfo" @submit.prevent="handleSubmitSdkInfo">
        <template v-for="key in Object.keys(binding).reverse()">
          <label class="label"> {{ $t(`admin.sdks.${sdk}`) + $t('admin.sdks.assigned') + $t(`admin.sdks.keys.${key}`)}}: </label>
          <p class="control">
            <input class="input" type="text" v-model.trim="binding[key]">
          </p>
        </template>
<div class="container has-text-centered" style="margin-top: 15px">
  <a class="button is-primary" :class="{'is-loading': processing}" @click.prevent="handleSubmitSdkInfo">{{ $t('admin.submit') }}</a>
</div>
</validation>
</div>
</modal>
</template>

<script>
  import {
    Modal
  } from 'vue-bulma-modal'

  import {
    openNotification
  } from 'admin/common/notification'

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
      handleSubmitSdkInfo() {
        this.processing = true
        this.$http.post('/admin_actions/update_app_sdk_info', {
            app_id: this.app.id,
            sdk: this.sdk,
            binding: this.binding,
          })
          .then(response => response.json())
          .then(result => {
            this.processing = false
            if (result.success) {
              openNotification({
                title: this.$t('admin.titles.updateSuccess'),
                message: this.$t('admin.messages.sdkInfoUpdated', {sdk: this.$t(`admin.sdks.${this.sdk}`)}),
                type: 'success',
                duration: 4500,
                container: '.notifications',
              })
              let filtered = this.app.sdk_bindings.filter(x => x.sdk == this.sdk)
              if (filtered.length <= 0) {
                this.app.sdk_bindings.push(result.binding)
              }
              this.visible = false
            } else {
              return Promise.reject(this.$t(result.message))
            }
          })
          .catch(e => {
            this.processing = false
            this.visible = false

            openNotification({
              title: this.$t('admin.titles.updateFailed'),
              message: e,
              type: 'danger',
              duration: 4500,
              container: '.notifications',
            })
          })
      }
    },

    components: {
      Modal,
    },
  }
</script>