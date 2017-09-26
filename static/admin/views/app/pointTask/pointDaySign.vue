<template>
  <div>
    <tabs type="boxed" layout="top" alignment="left" size="normal" :only-fade="false">
      <tab-pane icon="fa fa-clone" :label="$t('admin.point.sign.topPic')">
        <json-info-editor group="signPic" :hasPic="true" :picWidth="1242" :picHeight="2346"></json-info-editor>
      </tab-pane>
      <tab-pane icon="fa fa-support" :label="$t('admin.point.sign.lunar')">
        <json-info-editor group="signLunar" columns="宜=should|忌=bogey"></json-info-editor>
      </tab-pane>
      <tab-pane icon="fa fa-support" :label="$t('admin.point.sign.signAward')">
        <json-info-editor group="signAward" columns="积分=point|天数=days" :hasPic="true" :picWidth="170" :picHeight="170"></json-info-editor>
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