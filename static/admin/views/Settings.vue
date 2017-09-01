<template>
  <div>
    <tabs type="boxed" layout="top" alignment="left" size="normal" :only-fade="false">
      <tab-pane icon="fa fa-clone" :label="$t('admin.setting.basicInfo')">
        <basic-info-editor group="basicInfo"></basic-info-editor>
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

  import basicInfoEditor from 'admin/components/setting/basicInfoEditor'

  export default {
    components: {
      Tabs,
      TabPane,
      basicInfoEditor,
    }
  }
</script>
