<template>
  <modal :visible="visible">
    <div class="box">
      <div class="has-text-centered" style="width: 100%; margin-bottom: 10px">
        <h5 class="title is-5">{{ $t('admin.point.draw.editDraw') }}</h5>
      </div>
      <form name="section" @submit.prevent="handleSubmit">
        <label class="label"> {{ $t('admin.point.draw.name') }}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="draw.name">
        </p>
        <label class="label"> {{ $t('admin.point.draw.num') }}: </label>
        <p class="control">
          <input class="input" type="number" v-model.trim="draw.num">
        </p>
        <label class="label"> {{ $t('admin.point.draw.rate') }}(所有概率总和为100): </label>
        <p class="control">
          <input class="input" type="number" v-model.trim="draw.rate">
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
    draw: Object,
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

      let result = await this.$acs.updatePmallDraw(this.draw, this.$t(
        'admin.point.draw.updated'))
      if (result.success) {
        if (this.callback) {
          this.callback(result.draw)
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