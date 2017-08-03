<template>
  <div>
    <tabs type="boxed" layout="top" alignment="left" size="normal" :only-fade="false">
      <tab-pane icon="fa fa-clone" :label="beforeYesterday">
        <by-day :date="beforeYesterday"></by-day>
      </tab-pane>
      <tab-pane icon="fa fa-clone" :label="yesterday">
        <by-day :date="yesterday"></by-day>
      </tab-pane> 
       <tab-pane icon="fa fa-clone" :label="today">
        <by-day :date="today"></by-day>
      </tab-pane> 
      <!-- <tab-pane icon="fa fa-clone" :label="today">
        <el-date-picker :editable="false" type="date" @change="changeDate" :placeholder="$t('admin.stats.selectDate')">
        </el-date-picker>
      </tab-pane> -->
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
      today: new Date().Format("yyyy-MM-dd"),
      yesterday: new Date().DateAdd('d', -1).Format("yyyy-MM-dd"),
      beforeYesterday: new Date().DateAdd('d', -2).Format("yyyy-MM-dd"),
    }
  },

  components: {
    Tabs,
    TabPane,
    byDay,
  },

  mounted: function() {
    var now = new Date();

  },

  methods: {
    changeDate: function() {
      // this.getStatsByDay()
      // this.getUserTimingByDay()
    },
  },
}
</script>