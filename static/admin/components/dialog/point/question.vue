<template>
  <modal :visible="visible">
    <div class="box">
      <div class="has-text-centered" style="width: 100%; margin-bottom: 10px">
        <h5 class="title is-5">{{ $t('admin.titles.editQuestion') }}</h5>
      </div>
      <form name="section" @submit.prevent="handleSubmit">
        <label class="label"> {{ $t('admin.point.question.question') }}: </label>
        <p class="control">
          <textarea class="textarea" style="height:120px" v-model.trim="question.question"></textarea>
        </p>
        <div class="field">
          <p class="control">
            <label class="label"> A: </label>
            <label class="radio">
              <input type="radio" :value="question.a1" v-model.trim="question.correct">
            </label>
            <label class="radio">
              <input class="input" style="width:400px" type="text" v-model.trim="question.a1">
            </label>
          </p>
        </div>
        <div class="field">
          <p class="control">
            <label class="label"> B: </label>
            <label class="radio">
              <input type="radio" :value="question.a2" v-model.trim="question.correct">
            </label>
            <label class="radio">
              <input class="input" style="width:400px" type="text" v-model.trim="question.a2">
            </label>
          </p>
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
    question: Object,
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

      let result = await this.$acs.updatePmallQuestion(this.question, this.$t(
        'admin.point.question.updated'))
      if (result.success) {
        if (this.callback) {
          this.callback(result.question)
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