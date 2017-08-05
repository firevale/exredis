<template>
  <div>
    <tabs v-show="tbs" type="boxed" layout="top" alignment="left" size="normal" :only-fade="false">
      <tab-pane icon="fa fa-plus" :label="$t('admin.stats.addTab')">
        <el-date-picker v-model="date" :editable="false" type="date" @change="changeDate" :placeholder="$t('admin.stats.selectDate')">
        </el-date-picker>
      </tab-pane>
      <tab-pane :key="tb" v-for="(tb, index) in tbs" icon="fa fa-clone" :label="getTabName(tb)">
        <by-day :days="tb"></by-day>
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

import 'common/js/date'
import byDay from 'admin/components/stats/byDay'

export default {
  data() {
    return {
      date: '',
      tbs: [-2, -1, 0],
    }
  },

  components: {
    Tabs,
    TabPane,
    byDay,
  },

  methods: {
    changeDate: function(dt) {
      var diff = new Date().DateDiff('d', dt)
      if(diff>=0) diff += 1
      this.tbs.push(diff)
    },
    getTabName: function(days) {
      return new Date().DateAdd('d', days).Format("yyyy-MM-dd")
    }
  },
}
</script>