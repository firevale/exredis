<template>
  <div>
    <tabs type="boxed" layout="top" alignment="left" size="normal" :only-fade="false">
      <tab-pane icon="fa fa-user-circle" :label="$t('admin.menu.adminUserManage')">
        <admin-users></admin-users>
      </tab-pane>
      <tab-pane icon="fa fa-calendar-check-o" :label="$t('admin.setting.operateLog')">
        <operate-log></operate-log>
      </tab-pane>
    </tabs>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import {
  Tabs,
  TabPane
} from 'vue-bulma-tabs'

import adminUsers from 'admin/views/app/adminUsers'
import operateLog from 'admin/views/app/operateLog'

export default {
  components: {
    Tabs,
    TabPane,
    adminUsers,
    operateLog,
  }
}
</script>