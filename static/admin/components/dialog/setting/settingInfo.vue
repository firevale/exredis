<template>
  <modal :visible="visible">
    <div class="box">
      <div class="has-text-centered" style="width: 100%; margin-bottom: 10px">
        <h5 class="title is-5">{{ $t('admin.titles.editSettingInfo') }}</h5>
      </div>
      <validation name="section" @submit.prevent="handleSubmit">
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
      handleSubmit() {
        this.processing = true
        this.$http.post('/admin_actions/update_setting_by_name', {
            setting_name: this.setting.name,
            setting_value: this.setting.value,
            group: this.setting.group,
            memo: this.setting.memo,
            active: true
          })
          .then(response => response.json())
          .then(result => {
            this.processing = false
            if (result.success) {
              openNotification({
                title: this.$t('admin.notification.title.success'),
                message: this.$t('admin.setting.addOk'),
                type: 'success',
                duration: 4500,
                container: '.notifications',
              })

              if (this.callback) {
                this.callback(result.setting)
              }
              this.visible = false
            } else {
              return Promise.reject(result)
            }
          })
          .catch(e => {
            this.processing = false
            this.visible = false

            processAjaxError(e)
          })
      }
    },

    components: {
      Modal,
    },
  }
</script>
