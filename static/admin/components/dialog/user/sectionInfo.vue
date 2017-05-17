<template>
  <modal :visible="visible">
    <div class="box">
      <div class="has-text-centered" style="width: 100%; margin-bottom: 10px">
        <h5 class="title is-5">{{ section.level==2? $t('admin.titles.addAppManager'):$t('admin.titles.addAppCustomerService') }}</h5>
      </div>
      <form name="section" @submit.prevent="handleSubmit">
        <label class="label"> {{ $t('admin.user.fields.nickname') }}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="section.nickname">
        </p>
        <label class="label"> {{ $t('admin.user.fields.email') }}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="section.email">
        </p>
        <label class="label"> {{ $t('admin.user.fields.password') }}: </label>
        <p class="control">
          <input class="input" type="number" v-model.trim="section.password">
        </p>
        <label class="label"> {{ $t('admin.user.fields.mobile') }}: </label>
        <p class="control">
          <input class="input" type="number" v-model.trim="section.mobile">
        </p>
        <label class="label"> {{ $t('admin.user.fields.age') }}: </label>
        <p class="control">
          <input class="input" type="number" v-model.trim="section.age">
        </p>
        <p class="control">
          <label class="checkbox">
            <input class="checkbox" type="checkbox" v-model.trim="section.active"> {{ $t('admin.user.fields.active') }}
          </label>
        </p>
        <div class="has-text-centered" style="margin-top: 15px">
          <a class="button is-primary is-fullwidth" :class="{'is-loading': processing}" @click.prevent="handleSubmit">{{ $t('common.add') }}</a>
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

      let result = await this.$acs.addUser({
        nickname: this.section.nickname,
        email: this.section.email,
        device_id: this.section.device_id,
        password: this.section.password,
        mobile: this.section.mobile,
        age: this.section.age,
        app_id: this.section.app_id,
        active: this.section.active,
        level: this.section.level,
        account_id: this.section.email
      })

      this.processing = false
      if (result.success) {
        if (this.callback) {
          this.callback(result)
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