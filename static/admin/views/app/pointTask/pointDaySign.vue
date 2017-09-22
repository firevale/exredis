<template>
  <div>
    <tabs type="boxed" layout="top" alignment="left" size="normal" :only-fade="false">
      <tab-pane icon="fa fa-clone" :label="$t('admin.point.sign.topPic')">
        <json-info-editor group="signPic"></json-info-editor>
      </tab-pane>
      <tab-pane icon="fa fa-support" :label="$t('admin.point.sign.lunar')">
        <json-info-editor group="signLunar"></json-info-editor>
      </tab-pane>
      <tab-pane icon="fa fa-support" :label="$t('admin.point.sign.signAward')">
        <json-info-editor group="signAward"></json-info-editor>
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

import jsonInfoEditor from 'admin/components/setting/jsonInfoEditor'

export default {
  components: {
    Tabs,
    TabPane,
    jsonInfoEditor,
  },
}
</script>