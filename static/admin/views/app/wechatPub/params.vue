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

export default {
  mounted: async function() {
    this.addWcpEmptyParams()
  },

  components: {
    Tabs,
    TabPane,
    paramsEditor,
    replyEditor,
    replyModelEditor,
  },

  methods: {
    ...mapActions([
      'updateWcpParams',
    ]),

    addWcpEmptyParams: async function() {
      this.loading = true
      let app_id = this.$route.params.appId
      let result = await this.$acs.addWcpEmptyParams({
        app_id: app_id
      })

      if (result.success) {
        this.updateWcpParams(result.wcpconfig)
      }

      this.loading = false
    },

  },
}
</script>