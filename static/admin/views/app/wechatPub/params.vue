<template>
  <div>
    <tabs type="boxed" layout="top" alignment="left" size="normal" :only-fade="false">
      <tab-pane icon="fa fa-clone" :label="$t('admin.wcp.basicInfo')">
        <params-editor></params-editor>
      </tab-pane>
      <tab-pane icon="fa fa-support" :label="$t('admin.wcp.replyInfo')">
        <reply-editor></reply-editor>
      </tab-pane>
      <tab-pane icon="fa fa-support" :label="$t('admin.wcp.replyModel')">
        <reply-model-editor></reply-model-editor>
      </tab-pane>
      <tab-pane icon="fa fa-support" :label="$t('admin.wcp.downloadReply')">
        <download-reply-editor></download-reply-editor>
      </tab-pane>
    </tabs>
  </div>
</template>
<script>
import {
  mapActions
} from 'vuex'

import {
  Tabs,
  TabPane
} from 'vue-bulma-tabs'

import paramsEditor from 'admin/components/wcp/paramsEditor'
import replyEditor from 'admin/components/wcp/replyEditor'
import replyModelEditor from 'admin/components/wcp/replyModelEditor'
import downloadReplyEditor from 'admin/components/wcp/downloadReplyEditor'

export default {
  mounted: async function() {
    this.createAppWcpConfig()
  },

  components: {
    Tabs,
    TabPane,
    paramsEditor,
    replyEditor,
    replyModelEditor,
    downloadReplyEditor,
  },

  methods: {
    ...mapActions([
      'updateAppWcpConfig',
    ]),

    showPopup: function(e) {
      var rect = e.target.getBoundingClientRect()
      this.popup.x = rect.left
      this.popup.y = rect.top
    },

    createAppWcpConfig: async function() {
      this.loading = true
      let app_id = this.$route.params.appId
      let result = await this.$acs.createAppWcpConfig({
        app_id: app_id,
      })

      if (result.success) {
        this.updateAppWcpConfig(result.wcpconfig)
      }

      this.loading = false
    },

  },
}
</script>