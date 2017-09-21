<template>
  <modal :visible="visible">
    <div class="box">
      <div class="has-text-centered" style="width: 100%; margin-bottom: 10px">
        <h5 class="title is-5">{{ $t('admin.point.add') }}</h5>
      </div>
      <form name="pointLog" @submit.prevent="handleSubmit">
        <label class="label"> {{ $t('admin.point.wcpUserName') }}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="pointLog.nickame">
        </p>
        <label class="label"> {{ $t('admin.point.point') }}(扣分请输入负数): </label>
        <p class="control">
          <input class="input" type="number" v-model.trim="pointLog.point">
        </p>
        <label class="label"> {{ $t('admin.point.memo') }}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="pointLog.memo">
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
    pointLog: Object,
    callback: Function,
  },

  data() {
    return {
      processing: false,
    }
  },

  methods: {
    handleSubmit: async function() {
      if(!this.pointLog.nickame || !this.pointLog.point || !this.pointLog.memo){
        alert('请填写微信用户昵称, 积分和备注!')
        return
      }

      this.processing = true
      let result = await this.$acs.adminAddPMallPoint(this.pointLog,
        this.$t('admin.notification.message.pointUpdated'))

      if (this.callback) {
        this.callback(result.log)
      }

      this.visible = false
      this.processing = false
    }
  },

  components: {
    Modal,
  },
}
</script>