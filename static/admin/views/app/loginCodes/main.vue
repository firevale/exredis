<template>
  <div class="login_codes">
    <tabs type="boxed" layout="top" alignment="left" size="normal" :only-fade="false">
      <tab-pane icon="fa fa-registered" :label="$t('admin.app.loginCodeds')">
        <codes v-if="app"></codes>
      </tab-pane>
      <tab-pane icon="fa fa-wechat" :label="$t('admin.app.wechatPub')">
        <wechat-pub v-if="app"></wechat-pub>
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

<style lang="scss">
  .login_codes {
    .vue-bulma-tabs {
      .tab-content {
        margin: 0;
        padding: 2px
      }
    }

    .box:not(:last-child) {
      margin-bottom: 0;
    }
  }
</style>
