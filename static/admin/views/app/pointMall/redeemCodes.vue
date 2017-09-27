<template>
  <div>
    <tabs type="boxed" layout="top" alignment="left" size="normal" :only-fade="false">
      <tab-pane icon="fa fa-clone" :label="$t('admin.menu.redeemCodeType')">
        <basic-info-editor group="redeemCodeType"></basic-info-editor>
      </tab-pane>
      <tab-pane icon="fa fa-support" :label="$t('admin.menu.redeemCodeManage')">
        <redeem-codes></redeem-codes>
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
import redeemCodes from 'admin/components/pmall/redeemCodes'

export default {
  components: {
    Tabs,
    TabPane,
    basicInfoEditor,
    redeemCodes
  },
}
</script>