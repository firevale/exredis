<template>
  <modal :visible="visible">
    <div class="box">
      <div class="has-text-centered" style="width: 100%; margin-bottom: 10px">
        <h5 class="title is-5">{{ $t('admin.point.cdkey.add') }}</h5>
      </div>
      <form name="section" @submit.prevent="handleSubmit">
        <label class="label"> {{ $t('admin.point.cdkey.code_type') }}: </label>
        <div class="select">
          <select v-model.trim="codeType">
            <option value="">请选择</option>
            <option v-for="tp in codeTypes" :value="tp.value">{{ tp.name }}</option>
          </select>
        </div>
        <div class="column">
          <label class="label"> {{ $t('admin.point.cdkey.codeInfo') }}: </label>
          <textarea class="textarea" style="height:400px" v-model.trim="codes"></textarea>
        </div>
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
    codeTypes: Array,
    callback: Function,
  },

  data() {
    return {
      codeType: '',
      codes: '',
      processing: false,
      groups: ['basicInfo']
    }
  },

  methods: {
    handleSubmit: async function() {
      this.processing = true

      let result = await this.$acs.importPmallCdkeys({
        code_type: this.codeType,
        codes: this.codes
      }, this.$t(
        'admin.point.cdkey.addSuccess'))
      if (result.success) {
        if (this.callback) {
          this.callback(result)
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