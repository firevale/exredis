<template>
  <modal :visible="visible">
    <div class="box">
      <div class="has-text-centered" style="width: 100%; margin-bottom: 10px">
        <h5 class="title is-5">{{ $t('admin.titles.editSettingInfo') }}</h5>
      </div>
      <form name="section" @submit.prevent="handleSubmit">
        <label class="label"> {{ $t('admin.setting.configName') }}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="setting.name">
        </p>
        <div v-if="columns" v-for="column in columns.split('|')" :key="column">
          <label class="label"> {{ column.split("=")[0] }}: </label>
          <p class="control">
            <input class="input" :id="column.split('=')[1]" type="text" @input="updateMessage">
          </p>
        </div>
        <label class="label"> {{ $t('admin.setting.memo') }}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="setting.memo">
        </p>
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

import {
  openNotification,
  processAjaxError
} from 'admin/miscellaneous'

export default {
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    columns: {
      type: String,
      default: ''
    },
    setting: Object,
    callback: Function,
  },

  data() {
    return {
      processing: false,
      groups: ['basicInfo']
    }
  },

  methods: {
    updateMessage(e) {
      if (this.setting.value.length > 0) {
        let jobj = JSON.parse(this.setting.value)
        jobj[e.target.id] = e.target.value
        this.setting.value = JSON.stringify(jobj)
      } else {
        this.setting.value = '{"' + e.target.id + '":"' + e.target.value + '"}'
      }
    },
    handleSubmit: async function() {
      this.processing = true
      let result = await this.$acs.updateSettingByName({
        setting_name: this.setting.name,
        setting_value: this.setting.value ? this.setting.value : '{}',
        group: this.setting.group,
        memo: this.setting.memo,
        active: true
      }, this.$t('admin.notification.message.configUpdated', {
        configName: this.setting.name
      }))
      if (result.success) {
        if (this.callback) {
          this.callback(result.setting)
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