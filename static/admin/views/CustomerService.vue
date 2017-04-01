<template>
  <div>
    <tabs type="boxed" layout="top" alignment="left" size="normal" :only-fade="false">
      <tab-pane icon="fa fa-clone" :label="$t('admin.customerService.tabTitle')">
        <question-editor></question-editor>
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

  import questionEditor from 'admin/components/customerService/questionEditor'

  export default {
    components: {
      Tabs,
      TabPane,
      questionEditor,
    }
  }
</script>
