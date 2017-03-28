<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <article class="tile is-child">
        <div class="table-responsive">
          <table class="table is-bordered is-striped is-narrow goods-table">
            <thead v-show="settings && settings.length > 0">
              <tr>
                <th>{{ $t('admin.setting.configName') }}</th>
                <th>{{ $t('admin.setting.configValue')}}</th>
                <th>{{ $t('admin.setting.memo')}}</th>
                <th>{{ $t('admin.setting.active')}}</th>
                <th>{{ $t('admin.setting.edit')}}</th>
                <th>{{ $t('admin.setting.delete')}}</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th :colspan="6" style="text-align: center; vertical-align: bottom; height: 60px; border: none">
                  <a class="button is-primary" style="min-width: 100px" @click="addNewSetting">
                    <i class="fa fa-plus" style="margin-right: 5px"></i> {{ $t('admin.setting.add') }}
                  </a>
                </th>
              </tr>
            </tfoot>
            <tbody v-show="settings && settings.length > 0">
              <tr v-for="(setting, index) in settings">
                <td> {{ setting.name }} </td>
                <td> {{ setting.value }} </td>
                <td> {{ setting.memo }} </td>
                <td v-if="setting.active">正常</td><td v-else>禁用</td>
                <td class="is-icon">
                  <a @click.prevent="editSettingInfo(setting, index)">
                    <i class="fa fa-pencil"></i>
                  </a>
                </td>
                <td class="is-icon">
                  <a @click.prevent="delSetting(setting.name, index)">
                    <i class="fa fa-trash-o"></i>
                  </a>
                </td>                
              </tr>
            </tbody>
          </table>
        </div>
      </article>
    </div>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import Vue from 'admin/vue-i18n'

import {
  showMessageBox
} from '../dialog/messageBox'

import {
  openNotification,
  processAjaxError,
} from 'admin/miscellaneous'

import settingInfoDialog from 'admin/components/dialog/setting/settingInfo'
const settingInfoDialogComponent = Vue.extend(settingInfoDialog)

const openSettingInfoDialog = (propsData = {
  visible: true
}) => {
  return new settingInfoDialogComponent({
    el: document.createElement('div'),
    propsData
  })
}

export default {

  mounted: function() {
    this.getBasicSettings()
  },

  data() {
    return {
      settings: Object,
      processing: false
    }
  },

  methods: {

    getBasicSettings: function() {
      this.processing = true
      this.$http.post('/admin_actions/get_settings_by_group', {
          group: "basicInfo",
        })
        .then(response => response.json())
        .then(result => {
          this.processing = false
          if (result.success) {
            this.settings = result.settings
          } else {
            return Promise.reject(result)
          }
        })
        .catch(e => {
          this.processing = false
          processAjaxError(e)
        })
    },

    editSettingInfo: function(setting, index) {
      openSettingInfoDialog({
        setting: setting,
        visible: true,
        callback: new_setting => {
          this.settings[index] = new_setting
        },
      })
    },

    delSetting: function(setting_name, index) {
      showMessageBox({
        visible: true,
        title: this.$t('admin.titles.warning'),
        message: this.$t('admin.messages.confirmDeleteSetting'),
        type: 'danger',
        onOK: _ => {
          this.processing = true
          this.$http.post('/admin_actions/delete_setting', {
              setting_name: setting_name,
            })
            .then(response => response.json())
            .then(result => {
              this.processing = false
              if (result.success) {
                this.settings.splice(index, 1)
                openNotification({
                  title: this.$t('admin.titles.deleteSuccess'),
                  message: this.$t('admin.setting.deleteOk'),
                  type: 'success',
                  duration: 4500,
                  container: '.notifications',
                })
              } else {
                return Promise.reject(result)
              }
            })
            .catch(e => {
              this.processing = false
              processAjaxError(e)
            })
        },
      })
    },

    addNewSetting: function() {
      openSettingInfoDialog({
        setting: {
          id: '',
          name: '',
          value: '',
          group: '',
          memo: '',
          active: true,
        },
        visible: true,
        callback: setting => {
          this.settings.push(setting)
        },
      })
    },
  },

}
</script>