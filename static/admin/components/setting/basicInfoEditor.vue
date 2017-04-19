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
                <td v-if="setting.active">正常</td>
                <td v-else>禁用</td>
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

import Vue from 'vue'
import i18n from 'admin/vue-i18n'

import {
  showMessageBox
} from '../dialog/messageBox'

import settingInfoDialog from 'admin/components/dialog/setting/settingInfo'
const settingInfoDialogComponent = Vue.extend(settingInfoDialog)

const openSettingInfoDialog = (propsData = {
  visible: true
}) => {
  return new settingInfoDialogComponent({
    i18n,
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
    getBasicSettings: async function() {
      this.processing = true
      let result = await this.$acs.getSettingsByGroup({
        group: "basicInfo",
      })
      if (result.success) {
        this.settings = result.settings
      }
      this.processing = false
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
        onOK: async _ => {
          this.processing = true
          let result = await this.$acs.deleteSettingByName({
            setting_name: setting_name,
          }, this.$t('admin.notification.message.configDeleted', {
            configName: setting_name
          }))
          if (result.success) {
            this.settings.splice(index, 1)
          }
          this.processing = false
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