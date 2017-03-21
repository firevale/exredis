<template>
  <div>
    <tabs type="boxed" layout="top" alignment="left" size="normal" :only-fade="false">
      <tab-pane icon="fa fa-clone" :label="$t('admin.setting.basicInfo')">
        <basic-info-editor></basic-info-editor>
      </tab-pane>
      <tab-pane icon="fa fa-support" :label="$t('admin.setting.keywordInfo')">
        <keyword-info-editor></keyword-info-editor>
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
  import keywordInfoEditor from 'admin/components/setting/keywordInfoEditor'

  export default {
    components: {
      Tabs,
      TabPane,
      basicInfoEditor,
      keywordInfoEditor,
    }
  }
</script>
