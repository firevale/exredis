<template>
  <div>
    <tabs type="boxed" layout="top" alignment="left" size="normal" :only-fade="false">
      <tab-pane icon="fa fa-clone" :label="$t('admin.app.basicInfo')">
        <basic-info-editor v-if="app" :app="app"></basic-info-editor>
      </tab-pane>
      <tab-pane icon="fa fa-support" :label="$t('admin.app.sdkInfo')">
        <sdk-info-editor v-if="app" :app="app"></sdk-info-editor>
      </tab-pane>
      <tab-pane icon="fa fa-shopping-cart" :label="$t('admin.app.goodsInfo')">
        <goods-info-editor v-if="app" :app="app"></goods-info-editor>
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

import basicInfoEditor from 'admin/components/app/basicInfoEditor'
import sdkInfoEditor from './sdkInfoEditor'
import goodsInfoEditor from './goodsInfoEditor'

export default {
  computed: {
    ...mapGetters([
      'app', 'sdks'
    ]),
  },

  methods: {
    ...mapActions([
      'fetchPlatformApp'
    ]),
  },

  components: {
    Tabs,
    TabPane,
    basicInfoEditor,
    sdkInfoEditor,
    goodsInfoEditor,
  }
}
</script>