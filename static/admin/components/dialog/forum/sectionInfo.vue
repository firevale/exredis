<template>
  <modal :visible="visible">
    <div class="box">
      <div class="has-text-centered" style="width: 100%; margin-bottom: 10px">
        <h5 class="title is-5">{{ $t('admin.titles.editSectionInfo') }}</h5>
      </div>
      <form name="section" @submit.prevent="handleSubmit">
        <label class="label"> {{ $t('admin.forum.section.title') }}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="section.title">
        </p>
        <label class="label"> {{ $t('admin.forum.section.sort') }}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="section.sort">
        </p>
        <p class="control">
          <label class="checkbox">
            <input class="checkbox" type="checkbox" v-model.trim="section.active"> {{ $t('admin.forum.active') }}
          </label>
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

export default {
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    section: Object,
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

      if (!this.section.id) {
        this.section.id = 0
      }
      let result = await this.$acs.updateForumSectionInfo({
        section: this.section,
      }, this.$t('admin.notification.message.sectionInfoUpdated', {
        sectionTitle: result.section.title
      }))

      if (result.success) {
        if (this.callback) {
          this.callback(result.section)
        }
        this.visible = false
      }
    }
  },

  components: {
    Modal,
  },
}
</script>