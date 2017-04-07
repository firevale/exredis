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
        <label class="label"> {{ $t('admin.setting.configValue') }}: </label>
        <p class="control">
          <textarea class="textarea" style="height:120px" v-model.trim="setting.value"></textarea>
        </p>
        <label class="label"> {{ $t('admin.setting.memo') }}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="setting.memo">
        </p>
        <label class="label"> {{ $t('admin.setting.configGroup') }}: </label>
        <p class="control">
          <span class="select">
            <select v-model.trim="setting.group">
              <option v-for="group in groups" :value="group">{{$t('admin.setting.groups.' + group)}}</option>
            </select>
          </span>
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
    handleSubmit: async function() {
      this.processing = true

      let result = await this.$acs.updateSettingByName({
        setting_name: this.setting.name,
        setting_value: this.setting.value,
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