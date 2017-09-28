<template>
  <div>
    <tabs type="boxed" layout="top" alignment="left" size="normal" :only-fade="false">
      <tab-pane icon="fa fa-clone" :label="$t('admin.menu.cdkeyType')">
        <basic-info-editor group="cdkeyType"></basic-info-editor>
      </tab-pane>
      <tab-pane icon="fa fa-support" :label="$t('admin.menu.cdkeyManage')">
        <cdkeys></cdkeys>
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

import basicInfoEditor from 'admin/components/setting/basicInfoEditor'
import cdkeys from 'admin/components/pmall/cdkeys'

export default {
  components: {
    Tabs,
    TabPane,
    basicInfoEditor,
    cdkeys
  },
}
</script>