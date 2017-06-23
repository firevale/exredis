<template>
  <div>
    <tabs type="boxed" layout="top" alignment="left" size="normal" :only-fade="false">
      <tab-pane icon="fa fa-registered" :label="$t('admin.app.loginCodeds')">
        <codes v-if="app" :app="app"></codes>
      </tab-pane>
      <tab-pane icon="fa fa-wechat" :label="$t('admin.app.wechatPub')">
        <wechat-pub v-if="app" :app="app"></wechat-pub>
      </tab-pane>
    </tabs>
  </div>
</template>

<script>

import {
  mapGetters
} from 'vuex'

import {
  Tabs,
  TabPane
} from 'vue-bulma-tabs'

import codes from './codes'
import wechatPub from './wechatPub'

export default {
  computed: {
    ...mapGetters([
      'app'
    ]),
  },

  components: {
    Tabs,
    TabPane,
    codes,
    wechatPub,
  }

}
</script>