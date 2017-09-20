<template>
  <modal :visible="visible">
    <div class="box">
      <div class="has-text-centered" style="width: 100%; margin-bottom: 10px">
        <h5 class="title is-5">{{ $t('admin.titles.editTaskBar') }}</h5>
      </div>
      <form name="section" @submit.prevent="handleSubmit">
        <label class="label"> {{ $t('admin.point.task.name') }}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="taskBar.name">
        </p>
        <label class="label"> {{ $t('admin.point.task.sub_name') }}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="taskBar.sub_name">
        </p>
        <label class="label"> {{ $t('admin.point.task.point') }}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="taskBar.point">
        </p>        
        <label class="label"> {{ $t('admin.point.task.path') }}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="taskBar.path">
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
    taskBar: Object,
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

      let result = await this.$acs.updateTask(this.taskBar, this.$t('admin.point.task.configUpdated'))
      if (result.success) {
        if (this.callback) {
          this.callback(result.task)
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