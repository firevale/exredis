<template>
  <div class="box mod-body">
    <div class="columns">
      <div class="column is-3 ">
        <div class="field has-addons">
          <p class="control">
            <a class="button is-primary">全部</a>
          </p>
          <p class="control">
            <a class="button">iOS</a>
          </p>
          <p class="control">
            <a class="button">
      Android
    </a>
          </p>
        </div>
      </div>
      <div class="column is-2">
        <div class="field has-addons ">
          <p class="control">
            <a class="button is-primary">周</a>
          </p>
          <p class="control">
            <a class="button">月</a>
          </p>
          <p class="control">
            <a class="button">
      自定义
    </a>
          </p>
        </div>
      </div>
      <div class="column">
        <div class="field has-addons ">
          <p class="control">
            <datepicker :placeholder="开始时间" :config="{ dateFormat: 'Y-m-d', static: true }" :value="this.today"></datepicker>
          </p>
          <p class="control"> ~ </p>
          <p class="control">
            <datepicker :placeholder="结束时间" :config="{ dateFormat: 'Y-m-d', static: true }" :value="this.today"></datepicker>
          </p>
        </div>
      </div>
    </div>
    <table id="retention-table" class="data-load" width="100%" border="0" cellspacing="0">
      <thead>
        <tr>
          <th style="width:150px">首次使用时间</th>
          <th style="width:100px">新增用户</th>
          <th colspan="9">留存率</th>
        </tr>
        <tr id="daily_after_period" class="after_period_indicator" style="display: table-row;">
          <th colspan="2"></th>
          <th> 1天后 </th>
          <th> 2天后 </th>
          <th> 3天后 </th>
          <th> 4天后 </th>
          <th> 5天后 </th>
          <th> 6天后 </th>
          <th> 7天后 </th>
          <th> 14天后 </th>
          <th> 30天后 </th>
        </tr>
        <tr id="weekly_after_period" class="after_period_indicator hidden" style="display: none;">
          <th colspan="2"></th>
          <th> 1周后 </th>
          <th> 2周后 </th>
          <th> 3周后 </th>
          <th> 4周后 </th>
          <th> 5周后 </th>
          <th> 6周后 </th>
          <th> 7周后 </th>
          <th> 8周后 </th>
          <th> 9周后 </th>
        </tr>
        <tr id="monthly_after_period" class="after_period_indicator hidden" style="display: none;">
          <th colspan="2"></th>
          <th> 1月后 </th>
          <th> 2月后 </th>
          <th> 3月后 </th>
          <th> 4月后 </th>
          <th> 5月后 </th>
          <th> 6月后 </th>
          <th> 7月后 </th>
          <th> 8月后 </th>
          <th> 9月后 </th>
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

import Datepicker from 'vue-bulma-datepicker'
import basicInfoEditor from 'admin/components/forum/basicInfoEditor'
import sectionInfoEditor from 'admin/components/forum/sectionInfoEditor'

export default {
  mounted() {
    this.fetchForum()
  },

  data() {
    return {
      forum: {},
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
    fetchForum: async function() {
      if (this.app && this.app.has_forum) {
        let result = await this.$acs.fetchForum({
          app_id: this.app.id
        })

        if (result.success) {
          this.forum = result.forum
        }
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