<template>
  <modal :visible="visible">
    <div class="box">
      <div class="has-text-centered" style="width: 100%; margin-bottom: 10px">
        <h5 class="title is-5">{{ $t('admin.customerService.replyForm.name') }}</h5>
      </div>
      <validation name="question" @submit.prevent="handleSubmit">
        <label class="label"> {{ $t('admin.customerService.questionField.title') }}: </label>
        <p class="control">
          <article class="content">{{question.title}}</article>
        </p>
        <label class="label"> {{ $t('admin.customerService.questionField.answer') }}: </label>
        <p class="control">
          <textarea class="textarea" rows="10" v-model.trim="question.answer" :placeholder="$t('admin.customerService.replyForm.replyPlaceholder')"></textarea>
        </p>
        <p class="control">
          <label class="checkbox">
            <input class="checkbox" type="checkbox" v-model="question.active" :true-value="true"> {{ $t('admin.customerService.questionField.active') }}
          </label>
        </p>
        <p class="control">
          <label class="checkbox">
            <input class="checkbox" type="checkbox" v-model="question.is_hot" :true-value="true"> {{ $t('admin.customerService.questionField.isHot') }}
          </label>
        </p>
        <div class="has-text-centered" style="margin-top: 15px">
          <a class="button is-primary" :class="{'is-loading': processing}" @click.prevent="handleSubmit">{{ $t('admin.submit') }}</a>
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
    }
  },

  methods: {
    handleSubmit: async function() {
      this.processing = true
      let result = await this.$acs.updateQuestion({
          id: this.question.id,
          answer: this.question.answer,
          active: this.question.active,
          is_hot: this.question.is_hot
        },
        this.$t('admin.messages.questionInfoUpdated', {
          questionTitle: result.question.title
        }))
      if (result.success) {
        if (this.callback) {
          this.callback(result.question)
        }
        this.visible = false
      }
      this.processing = false
    },
  },

  components: {
    Modal,
  },
}
</script>