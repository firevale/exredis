<template>
  <div>
    <!-- <tabs v-show="tbs" type="boxed" layout="top" alignment="left" size="normal" :only-fade="false">
      <tab-pane icon="fa fa-plus" :label="$t('admin.stats.addTab')">
        <el-date-picker v-model="date" :editable="false" type="date" @change="changeDate" :placeholder="$t('admin.stats.selectDate')">
        </el-date-picker>
      </tab-pane>
      <tab-pane :key="tb" v-for="(tb, index) in tbs" icon="fa fa-clone" :label="getTabName(tb)">
        <by-day :days="tb"></by-day>
      </tab-pane>
    </tabs> -->
    <el-tabs type="border-card" editable v-model="activeName" @tab-remove="removeTab">
      <el-tab-pane :key="tb" v-for="(tb, index) in tbs" :label="getTabName(tb)" :name="getTabName(tb)">
        <by-day :days="tb"></by-day>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"></i> {{$t('admin.stats.addTab')}}</span>
        <el-date-picker v-model="date" :editable="false" type="date" @change="changeDate" :placeholder="$t('admin.stats.selectDate')">
        </el-date-picker>
      </el-tab-pane>
    </el-tabs>
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
      activeName: ''
    }
  },
  mounted: function() {
    this.activeName = this.getTabName(0)
  },
  components: {
    Tabs,
    TabPane,
    byDay,
  },

  methods: {
    changeDate: function(dt) {
      if (typeof(dt) != "undefined" && dt != "") {
        var date = new Date()
        var dateFormat = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
        var diff = new Date(dateFormat).DateDiff('d', dt)
        if (diff < 0) diff += -1

        let arrs = this.tbs
        arrs.push(diff)
        this.tbs = this.sort(arrs)
        this.activeName = this.getTabName(diff)
      }
    },
    getTabName: function(days) {
      return new Date().DateAdd('d', days).Format("yyyy-MM-dd")
    },
    sort: function(arr) {
      let arrs = Array.from(new Set(arr))

      for (var i = 0; i < arrs.length; i++) {
        for (var j = 0; j < arrs.length - 1; j++) {
          if (arrs[j] > arrs[j + 1]) {
            [arrs[j], arrs[j + 1]] = [arrs[j + 1], arrs[j]];
          }
        }
      }
      return arrs;
    },
    removeTab: function(tabName) {
      if (typeof(tabName) != "undefined" && tabName != "") {
        var date = new Date()
        var dateFormat = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
        var diff = new Date(dateFormat).DateDiff('d', tabName)

        let zero = diff == 0 && 1 / diff < 0
        if (diff.toString().indexOf('-') >= 0 || zero) diff += -1

        let newArr = this.tbs.filter(item => item !== diff);
        this.tbs.length = 0;
        this.tbs.push.apply(this.tbs, newArr);

        this.activeName = this.getTabName(this.tbs[0])
      }
    }
  },
}
</script>