<template>
  <div>
    <tabs type="boxed" layout="top" alignment="left" size="normal" :only-fade="false">
      <tab-pane icon="fa fa-clone" :label="$t('admin.point.draw.setting')">
        <lucky-draw></lucky-draw>
      </tab-pane>
      <tab-pane icon="fa fa-support" :label="$t('admin.point.draw.log')">
        <lucky-draw-log></lucky-draw-log>
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

import luckyDraw from 'admin/components/pmall/luckyDraw'
import luckyDrawLog from 'admin/components/pmall/luckyDrawLog'

export default {
  components: {
    Tabs,
    TabPane,
    luckyDraw,
    luckyDrawLog,
  },
}
</script>