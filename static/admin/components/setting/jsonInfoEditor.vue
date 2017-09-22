<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent is-vertical">
      <article class="tile is-child is-12">
        <div class="column">
          <a class="button is-primary" style="min-width: 100px" @click="addNewSetting">
            <i class="fa fa-plus" style="margin-right: 5px"></i> {{ $t('admin.setting.add') }}
          </a>
        </div>
      </article>
      <article class="tile is-child is-12">
        <div class="table-responsive">
          <div class="columns is-gapless has-text-centered" style="border-bottom: 1px solid #ccc; padding:5px; color:#aaa;">
            <div class="column">
              <p>{{ $t('admin.setting.configName') }}</p>
            </div>
            <div class="column">
              <p>{{ $t('admin.setting.configValue') }}</p>
            </div>
            <div class="column">
              <p>{{ $t('admin.setting.memo')}}</p>
            </div>
            <div class="column">
              <p>{{ $t('admin.setting.edit')}}</p>
            </div>
            <div class="column">
              <p>{{ $t('admin.setting.delete')}}</p>
            </div>
          </div>
          <div v-if="settings">
            <div class="columns has-text-centered" style="border-bottom: 1px solid #ccc;" v-show="settings && settings.length > 0"
              v-for="(setting, index) in settings" :key="setting.id">
              <div class="column">
                <p>{{ setting.name }}</p>
              </div>
              <div class="column">
                <p>{{ setting.value }}</p>
              </div>
              <div class="column">
                <p>{{ setting.memo }}</p>
              </div>
              <div class="column">
                <a @click.prevent="editSettingInfo(setting, index)">
                  <i class="fa fa-pencil"></i>
                </a>
              </div>
              <div class="column">
                <a @click.prevent="delSetting(setting.name, index)">
                  <i class="fa fa-trash-o"></i>
                </a>
              </div>
            </div>
          </div>
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
import {
  i18n
} from 'admin/vue-i18n'

import {
  showMessageBox
} from '../dialog/messageBox'

import settingJsonInfoDialog from 'admin/components/dialog/setting/settingJsonInfo'
const settingInfoDialogComponent = Vue.extend(settingJsonInfoDialog)

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
  props: {
    group: {
      type: String,
      default: ''
    },
    hasPic: {
      type: Boolean,
      default: false
    },
    columns: {
      type: String,
      default: ''
    }
  },

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
        group: this.group,
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
        columns: this.columns,
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
          group: this.group,
          memo: '',
          active: true,
        },
        visible: true,
        columns: this.columns,
        callback: setting => {
          this.settings.push(setting)
        },
      })
    },
  },

}
</script>