<template>
  <form name="params" @submit.prevent="handleSubmit">
    <div class="columns is-multiline">
      <div class="column is-8">
        <label class="label"> {{ $t('admin.wcp.verifyFile')}}:
          <tooltip label="" placement="top"><span class="icon is-sign" @click.prevent="showTip(0)">?</span></tooltip>
        </label>
        <p class="control">
          <a @click.prevent="updateFile(wcpParams)"> {{ wcpParams.verify_File ? wcpParams.verify_File : "点击上传" }} </a>
        </p>
      </div>
      <div class="column is-8">
        <label class="label"> {{ $t('admin.wcp.appId')}}: <span class="icon is-sign" @click.prevent="showTip(1)">?</span></label>
        <p class="control">
          <input class="input" type="text" v-model.trim="wcpParams.wcp_app_id">
        </p>
      </div>
      <div class="column is-8">
        <label class="label"> {{ $t('admin.wcp.appKey')}}: <span class="icon is-sign" @click.prevent="showTip(1)">?</span></label>
        <p class="control">
          <input class="input" type="text" v-model.trim="wcpParams.wcp_app_key">
        </p>
      </div>
      <div class="column is-8">
        <label class="label"> {{ $t('admin.wcp.serverHost')}}: <span class="icon is-sign" @click.prevent="showTip(2)">?</span></label>
        <div class="field has-addons">
          <p class="control flex-take-rest">
            <input class="input disabled" disabled type="text" v-model.trim="serverHost">
          </p>
          <p class="control flex-fixed-size">
            <a class="button" style="margin: 2px" v-clipboard:copy="serverHost" v-clipboard:success="toastClipboardSuccess">
              <span class="icon is-small"> <i class="fa fa-clipboard"></i> </span>
              <span> {{$t('admin.copy')}} </span>
            </a>
          </p>
        </div>
      </div>
      <div class="column is-8">
        <label class="label"> {{ $t('admin.wcp.token')}}: <span class="icon is-sign" @click.prevent="showTip(2)">?</span></label>
        <p class="control">
          <input class="input" type="text" v-model.trim="wcpParams.token">
        </p>
      </div>
      <div class="column is-8">
        <label class="label"> {{ $t('admin.wcp.aesKey')}}: <span class="icon is-sign" @click.prevent="showTip(2)">?</span></label>
        <p class="control">
          <input class="input" type="text" v-model.trim="wcpParams.aes_key">
        </p>
      </div>
      <div class="column is-8 has-text-centered">
        <a class="button is-primary" :class="{'is-loading': processing}" @click.prevent="handleSubmit">{{ $t('admin.submit') }}</a>
      </div>
    </div>
  </form>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import {
  processAjaxError
} from 'admin/miscellaneous'

import {
  showFileUploadDialog
} from 'common/components/fileUpload'

import Toast from 'common/components/toast'
import Tooltip from 'vue-bulma-tooltip'

import {
  showTipBox
} from 'admin/components/dialog/tipBox'

export default {
  mounted: function() {
    this.serverHost = location.origin + "/api/wcp/" + this.$route.params.appId
  },

  data() {
    return {
      show: false,
      serverHost: '',
      processing: false,
      tips: ['<p><img src="/images/wcp_tip1.png"></p><p><img src="/images/wcp_tip2.png"></p>',
        '<p><img src="/images/wcp_tip3.png"></p>',
        '<p><img src="/images/wcp_tip4.png"></p>',
      ],
    }
  },

  computed: {
    ...mapGetters([
      'wcpParams'
    ]),
  },

  components: {
    Tooltip
  },

  methods: {
    ...mapActions([
      'updateWcpParams',
    ]),

    toastClipboardSuccess: function() {
      Toast.show(this.$t('admin.messages.copyClipboardSuccess'))
    },

    showTip: function(idx) {
      showTipBox({
        visible: true,
        message: this.tips[idx],
      })
    },

    updateFile: function(wcpParams) {
      showFileUploadDialog(this.$i18n, {
        postAction: '/admin_actions/wcp/upload_wcp_file',
        accept: 'text/plain',
        data: {
          app_id: wcpParams.app_id
        },
        headers: {
          'x-csrf-token': window.acsConfig.csrfToken
        },
        extensions: ['txt'],
        title: this.$t('admin.titles.uploadWcpFile'),
        callback: response => {
          if (response.success) {
            wcpParams.verify_File = response.filename
            this.updateWcpParams(wcpParams)
          } else {
            processAjaxError(response)
          }
        },
      })
    },

    handleSubmit: async function() {
      this.processing = true
      let result = await this.$acs.updateWcpParams(this.wcpParams, this.$t(
        'admin.notification.message.wcpParamsUpdated'))
      if (result.success) {
        this.updateWcpParams(result.wcpconfig)
      }
      this.processing = false
    },
  },

}
</script>