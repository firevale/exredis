<template>
  <modal :visible="visible">
    <div class="box">
      <div class="has-text-centered" style="width: 100%; margin-bottom: 10px">
        <h5 class="title is-5">{{ $t('admin.titles.editDrawOrder') }}</h5>
      </div>
      <form name="section" @submit.prevent="handleSubmit">
        <label class="label"> {{ $t('admin.point.drawLog.name') }}: {{ order.name }}</label>
        <label class="label"> {{ $t('admin.point.drawLog.user') }}: {{ order.wcp_user_id }}</label>
        <label class="label"> {{ $t('admin.point.drawLog.status') }}: {{ order.status }}</label>
        <label class="label"> {{ $t('admin.point.drawLog.paidAt') }}: {{ order.paid_at }}</label>
        <label class="label"> {{ $t('admin.point.drawLog.deliverAt') }}: {{ order.deliver_at }}</label>
        <label class="label"> {{ $t('admin.point.drawLog.address') }}: </label>
        <p class="control">
          <textarea class="textarea" style="height:120px" v-model.trim="order.address"></textarea>
        </p>
        <div class="has-text-centered" style="margin-top: 15px">
          <a class="button is-primary" @click.prevent="handleSubmit">{{ $t('admin.point.drawLog.save') }}</a>
          <a class="button is-primary" @click.prevent="handleSubmit">{{ $t('admin.point.drawLog.delivered') }}</a>
          <a class="button is-primary" @click.prevent="handleSubmit">{{ $t('admin.point.drawLog.close') }}</a>
          <a class="button is-primary" @click.prevent="handleSubmit">{{ $t('admin.point.drawLog.finish') }}</a>
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
    order: Object,
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

      let result = await this.$acs.updatePmallorder(this.order, this.$t(
        'admin.point.order.updated'))
      if (result.success) {
        if (this.callback) {
          this.callback(result.order)
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