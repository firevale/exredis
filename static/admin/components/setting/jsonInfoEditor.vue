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
            <div class="column" v-if="this.hasPic">
              <p>{{ $t('admin.setting.pic') }}</p>
            </div>
            <div class="column">
              <p>{{ $t('admin.setting.configName') }}</p>
            </div>
            <div class="column" style="width:500px;">
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
              <div class="column" v-if="hasPic">
                <center>
                  <figure class="image news-pic" @click="updateSettingPic(setting)">
                    <img :src="getSettingPic(setting) | imageStaticUrl" style="max-height:60px; width:auto; "></img>
                  </figure>
                </center>
              </div>
              <div class="column">
                <p>{{ setting.name }}</p>
              </div>
              <div class="column" style="width:500px; word-break:break-all;">
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

import {
  showImageUploadDialog
} from 'common/components/imageUpload'

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
    },
    picWidth: {
      type: Number,
      default: 400
    },
    picHeight: {
      type: Number,
      default: 200
    },
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
    getSize: function(width, height) {
      let resize = width + 'x' + height
      if (width > height) {
        if (width > 200) resize = '200x' + Math.round(height / (width / 200))
      } else {
        if (height > 100) resize = Math.round(width / (height / 100)) + 'x100'
      }
      return resize + '?text=' + width + 'X' + height
    },

    updateSettingPic: function(setting) {
      showImageUploadDialog(this.$i18n, {
        postAction: '/admin_actions/setting/upload_setting_pic',
        width: this.picWidth,
        height: this.picHeight,
        data: {
          setting_id: setting.id
        },
        headers: {
          'x-csrf-token': window.acsConfig.csrfToken
        },
        extensions: ['png', 'jpg', 'jpeg'],
        title: this.$t('admin.titles.uploadSettingPic', {
          picWidth: this.picWidth,
          picHeight: this.picHeight
        }),
        callback: response => this.setSettingPic(setting, response.pic),
      })
    },

    getSettingPic(setting) {
      if (setting.value.length > 0) {
        let jobj = JSON.parse(setting.value)
        if (jobj["pic"]) return jobj["pic"]
      }
      return 'https://placehold.it/' + this.getSize(this.picWidth, this.picHeight)
    },

    setSettingPic: async function(setting, pic) {
      if (setting.value.length > 0) {
        let jobj = JSON.parse(setting.value)
        jobj["pic"] = pic
        setting.value = JSON.stringify(jobj)
      } else {
        setting.value = '{"pic":"' + pic + '"}'
      }
      this.processing = true
      let result = await this.$acs.updateSetting({
        setting_id: setting.id,
        setting_value: setting.value,
        active: setting.active
      })
      this.processing = false
    },

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
          this.settings.unshift(setting)
        },
      })
    },
  },

}
</script>