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
        <el-radio-button label="week">最近一周</el-radio-button>
        <el-radio-button label="month">最近一月</el-radio-button>
        <el-radio-button label="custom">自定义</el-radio-button>
      </el-radio-group>
      <span style="margin-right:15px;"></span>
      <el-date-picker ref="datePicker" v-show="dateType == 'custom'" v-model="dateRange" type="daterange" placeholder="选择日期范围"
        :picker-options="pickerOptions" @change="changeDateRange">
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
        <tr v-for="report in reports">
          <td>{{report.date}}</td>
          <td>{{report.danu}}</td>
          <retention-row :value="calcRate(report,1)"> </retention-row>
          <retention-row :value="calcRate(report,2)"> </retention-row>
          <retention-row :value="calcRate(report,3)"> </retention-row>
          <retention-row :value="calcRate(report,4)"> </retention-row>
          <retention-row :value="calcRate(report,5)"> </retention-row>
          <retention-row :value="calcRate(report,6)"> </retention-row>
          <retention-row :value="calcRate(report,7)"> </retention-row>
          <retention-row :value="calcRate(report,14)"> </retention-row>
          <retention-row :value="calcRate(report,30)"> </retention-row>
        </tr>
      </tbody>
    </table>
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

export default {
  mounted() {
    this.fetchData()
  },

  data() {
    return {
      platform: 'all',
      dateType: 'week',
      dateRange: [],
      pickerOptions: {
        disabledDate: function(date) {
          var limitDate = new Date();
          limitDate.setTime(limitDate.getTime() - 3600 * 1000 * 24)
          return date > limitDate
        }
      },
      reports: []
    }
  },

  watch: {
    app: function(newVal) {

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
      else
        this.$refs.datePicker.handleFocus()
    },
    changeDateRange: function(val) {
      this.fetchData()
    },
    calcRate: function(report, nday) {
      var now = new Date()
      var start = new Date().setTime(Date.parse(report.date) + 3600 * 1000 * 24 * nday)
      if (start > now)
        return -1

      let record = report.user_retentions.find(rpt => rpt.nday == nday)
      if (record && report.danu > 0) {
        return ((record.retention / report.danu) * 100).toFixed(2)
      } else {
        return 0
      }
    },
    fetchData: async function() {
      switch (this.dateType) {
        case 'week':
          var end = new Date();
          var start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          end.setTime(end.getTime() - 3600 * 1000 * 24)
          this.dateRange = [start, end]
          break
        case 'month':
          var end = new Date();
          var start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 31);
          end.setTime(end.getTime() - 3600 * 1000 * 24)
          this.dateRange = [start, end]
          break
      }

      let data = {
        platform: this.platform,
        start_date: this.dateRange[0].Format("yyyy-MM-dd"),
        end_date: this.dateRange[1].Format("yyyy-MM-dd")
      }

      let result = await this.$acs.getRetentionStats(data)
      if (result.success) {
        this.reports = result.reports
      }
    }
  },

  components: {
    Tabs,
    TabPane,
    'RetentionRow': {
      template: ' <td :class="colorGrad">{{value >=0 ? value + "%" : undefined}}</td>',
      props: {
        value: {
          type: null,
          default: 0
        }
      },
      computed: {
        colorGrad() {
          if (this.value >= 70)
            return 'colorGrad1'
          else if (this.value >= 50)
            return 'colorGrad2'
          else if (this.value >= 30)
            return 'colorGrad3'
          else if (this.value >= 10)
            return 'colorGrad4'
        }
      }
    }
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