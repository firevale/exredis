<template>
  <div class=" mod-body">
    <div class="toolbar" style="margin-bottom:1rem;">
      <el-radio-group v-model="platform" @change="changePlatform">
        <el-radio-button label="all">全部</el-radio-button>
        <el-radio-button label="ios">iOS</el-radio-button>
        <el-radio-button label="android">Android</el-radio-button>
      </el-radio-group>
      <span style="margin-right:15px;margin-right:15px;"></span>
      <el-radio-group v-model="dateType" @change="changeDateType">
        <el-radio-button label="week">周</el-radio-button>
        <el-radio-button label="month">月</el-radio-button>
        <el-radio-button label="custom">自定义</el-radio-button>
      </el-radio-group>
      <span style="margin-right:15px;"></span>
      <el-date-picker v-show="dateType == 'custom'" v-model="dateRange" type="daterange" placeholder="选择日期范围"
        @change="changeDateRange">
      </el-date-picker>
    </div>
    <table id="retention-table" class="box data-load" width="100%" border="0" cellspacing="0">
      <thead>
        <tr>
          <th style="width:150px">首次使用时间</th>
          <th style="width:100px">新增用户</th>
          <th colspan="9">留存率</th>
        </tr>
        <tr id="daily_after_period" class="after_period_indicator" style="display: table-row;">
          <th colspan="2"></th>
          <th> 1日留存 </th>
          <th> 2日留存 </th>
          <th> 3日留存 </th>
          <th> 4日留存 </th>
          <th> 5日留存 </th>
          <th> 6日留存</th>
          <th> 7日留存</th>
          <th> 14日留存 </th>
          <th> 30日留存 </th>
        </tr>
      </thead>
      <tbody id="data-list">
        <tr>
          <td>2017-07-26</td>
          <td>83</td>
          <td class="colorGrad3">30.1 %</td>
          <td class="colorGrad4">18.1 %</td>
          <td class="colorGrad4">13.3 %</td>
          <td class="colorGrad4">19.3 %</td>
          <td class="colorGrad4">16.9 %</td>
          <td class="colorGrad"> </td>
          <td class="colorGrad"> </td>
          <td class="colorGrad"> </td>
          <td class="colorGrad"> </td>
        </tr>
        <tr>
          <td>2017-07-27</td>
          <td>104</td>
          <td class="colorGrad3">20.2 %</td>
          <td class="colorGrad4">13.5 %</td>
          <td class="colorGrad4">6.7 %</td>
          <td class="colorGrad4">5.8 %</td>
          <td class="colorGrad"> </td>
          <td class="colorGrad"> </td>
          <td class="colorGrad"> </td>
          <td class="colorGrad"> </td>
          <td class="colorGrad"> </td>
        </tr>
        <tr>
          <td>2017-07-28</td>
          <td>79</td>
          <td class="colorGrad4">19 %</td>
          <td class="colorGrad4">16.5 %</td>
          <td class="colorGrad4">19 %</td>
          <td class="colorGrad"> </td>
          <td class="colorGrad"> </td>
          <td class="colorGrad"> </td>
          <td class="colorGrad"> </td>
          <td class="colorGrad"> </td>
          <td class="colorGrad"> </td>
        </tr>
        <tr>
          <td>2017-07-29</td>
          <td>73</td>
          <td class="colorGrad3">27.4 %</td>
          <td class="colorGrad4">19.2 %</td>
          <td class="colorGrad"> </td>
          <td class="colorGrad"> </td>
          <td class="colorGrad"> </td>
          <td class="colorGrad"> </td>
          <td class="colorGrad"> </td>
          <td class="colorGrad"> </td>
          <td class="colorGrad"> </td>
        </tr>
        <tr>
          <td>2017-07-30</td>
          <td>75</td>
          <td class="colorGrad3">21.3 %</td>
          <td class="colorGrad"> </td>
          <td class="colorGrad"> </td>
          <td class="colorGrad"> </td>
          <td class="colorGrad"> </td>
          <td class="colorGrad"> </td>
          <td class="colorGrad"> </td>
          <td class="colorGrad"> </td>
          <td class="colorGrad"> </td>
        </tr>
      </tbody>
    </table>
    <div class="wait-load" style="display: none;"><img src="/images/pic/ajax-loader.gif"></div>
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

import 'common/js/date'
import Datepicker from 'vue-bulma-datepicker'
import basicInfoEditor from 'admin/components/forum/basicInfoEditor'
import sectionInfoEditor from 'admin/components/forum/sectionInfoEditor'

export default {
  mounted() {
    this.fetchData()
  },

  data() {
    return {
      forum: {},
      platform: 'all',
      dateType: 'week',
      dateRange: [],
      reports: []
    }
  },

  watch: {
    app: function(newVal) {
      if (typeof newVal === 'object' && newVal.has_forum) {
        this.fetchForum()
      }
    }
  },

  computed: {
    ...mapGetters([
      'app'
    ]),
  },

  methods: {
    changePlatform: function(val) {
      this.fetchData()
    },
    changeDateType: function(val) {
      if (val != 'custom')
        this.fetchData()
    },
    changeDateRange: function(val) {
      this.fetchData()
    },
    fetchData: async function() {
      switch (this.dateType) {
        case 'week':
          var end = new Date();
          var start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          this.dateRange = [start, end]
          break
        case 'month':
          var end = new Date();
          var start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          this.dateRange = [start, end]
          break
      }

      let data = {
        platform: this.platform,
        start_date: this.dateRange[0].Format("yyyy-MM-dd"),
        end_date: this.dateRange[1].Format("yyyy-MM-dd")
      }

      console.info(data)
      let result = await this.$acs.getRetentionStats(data)
      if (result.success) {
        this.reports = result.reports
        console.info(this.reports)
      }
    }
  },

  components: {
    Tabs,
    TabPane,
    basicInfoEditor,
    sectionInfoEditor,
    Datepicker,
  }
}
</script>
<style lang="scss">
.box {
  padding: 0!important;
}

.columns:not(:last-child) {
  margin-bottom: 0 !important;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}


table.data-load {
  min-height: 70px;
  min-height: 0px\9;
}

table.data-load td:first-child {
  border-left: 0;
}

table.data-load td {
  border: none;
}

table.data-load .colorGrad1 {
  background: #49afb4;
}

table.data-load .colorGrad2 {
  background: #5dcacf;
}

table.data-load .colorGrad3 {
  background: #8ee6ea;
}

table.data-load .colorGrad4 {
  background: #b6f2f3;
}

table.data-load th,
dl.data-load dt {
  font-size: 14px;
  color: #333333;
  overflow: hidden;
  background-color: #f5f5f5;
  height: 36px;
  line-height: 36px;
  text-indent: 22px;
  border-right: 1px solid #e8e8e8;
  border-left: 1px solid #fff;
  border-bottom: 1px solid #e8e8e8;
}

.small-table table.data-load th {
  font-size: 12px;
  text-indent: 0;
  text-align: center;
}

table.data-load th:first-child {
  border-left: 0;
}

table.data-load th:last-child {
  border-right: 0;
}

table.data-load td,
{
  font-size: 12px;
  color: #333333;
  height: 34px;
  line-height: 34px;
  padding: 0 0 0 22px;
  /* border-right: 1px solid #e8e8e8; border-left: 1px solid #fff; border-bottom: 1px solid #e8e8e8; */
  word-break: break-all;
}

table.data-load .limit-height {
  height: 34px;
  line-height: 34px;
  overflow: hidden;
}

table.data-load td .mod-select {
  text-indent: 0px;
}

table.data-load td:first-child {
  border-left: 0;
}

table.data-load td:last-child {
  border-right: 0;
}

table.data-load>tbody>tr:hover {
  background-color: #d3f0f1;
}

table.data-load td.td-head-nopadding {
  padding-left: 0;
}

table.data-load td .circle {
  display: inline-block;
  position: relative;
  cursor: pointer;
  margin: 0 5px 0 10px;
  vertical-align: middle;
  background: #ef662f;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  line-height: 8px;
}

table.data-load td.td-head-nopadding .hidden {
  visibility: hidden;
}

.table-success,
.table-warning,
.table-info {
  margin-bottom: 1px;
  font-size: 14px;
  padding: 7px 20px;
  line-height: 20px;
  border: 1px solid #73d3d6;
  background: #c7edef;
  color: #333;
}

.table-warning {
  border: 1px solid #E5674A;
  background: #F5C2B7;
  color: #802626;
}

.table-info {
  border: 1px solid #73d3d6;
  background: #c7edef;
  color: #333333;
}
</style>