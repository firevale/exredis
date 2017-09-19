<template>
  <div class="box columns is-multiline">
    <div class="column is-1 has-text-centered" style="width: 10%" v-for="sdk in app.sdk_bindings">
      <div class="sdk-icon" :class="sdk.sdk" @click.prevent="editSdkInfo(sdk)">
      </div>
      <h6 class="subtitle is-6">{{$t(`admin.sdks.${sdk.sdk}`)}} </h6>
    </div>
    <div class="column is-1 has-text-centered">
      <div class="add-sdk" @click.prevent="selectSdkToAdd">
        <span class="icon is-small"><i class="fa fa-plus"></i></span>
      </div>
      <h6 class="subtitle is-6">{{$t('admin.sdks.add')}} </h6>
    </div>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import Vue from 'vue'
import {i18n} from 'admin/vue-i18n'

import sdkInfoDialog from 'admin/components/dialog/app/sdkInfo'
const sdkInfoDialogComponent = Vue.extend(sdkInfoDialog)

const openSdkInfoDialog = (propsData = {
  visible: true
}) => {
  return new sdkInfoDialogComponent({
    i18n,
    el: document.createElement('div'),
    propsData
  })
}

import sdkListDialog from 'admin/components/dialog/app/sdkList'
const sdkListDialogComponent = Vue.extend(sdkListDialog)

const openSdkListDialog = (propsData = {
  visible: true
}) => {
  return new sdkListDialogComponent({
    i18n,
    el: document.createElement('div'),
    propsData
  })
}

import {
  processAjaxError
} from 'admin/miscellaneous'

export default {
  props: {
    app: Object,
  },

  computed: {
    ...mapGetters([
      'sdks'
    ]),
  },

  methods: {
    editSdkInfo: function(sdkInfo) {
      openSdkInfoDialog({
        ...sdkInfo,
        app: this.app,
        visible: true,
      })
    },

    selectSdkToAdd: function() {
      let sdks = []
      let added = []

      this.app.sdk_bindings.forEach(x => {
        added.push(x.sdk)
      })

      added.push('alipay') // alipay and wechat are payment sdks
      added.push('applestore')
      added.push('appstore')
      added.push('firevale')
      added.push('qq')

      this.sdks.forEach(sdk => {
        if (added.indexOf(sdk) < 0) {
          sdks.push(sdk)
        }
      })

      openSdkListDialog({
        visible: true,
        appName: this.app.name,
        callback: async sdk => {
          let result = await this.$acs.generateDummySdkInfo({sdk})
          if (result.success) {
            openSdkInfoDialog({
              sdk,
              binding: result.binding,
              app: this.app,
              visible: true
            })
          }
        },
        sdks,
      })
    }
  },
}
</script>