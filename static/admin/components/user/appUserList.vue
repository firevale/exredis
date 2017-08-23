<template>
  <el-table :data="appUsers" show-summary :summary-method="getSummaries">
    <el-table-column prop="game_user_name" label="游戏ID" width="200">
    </el-table-column>
    <el-table-column prop="game_user_name" label="昵称" width="200">
    </el-table-column>
    <el-table-column prop="app_user_level" label="等级">
    </el-table-column>
    <el-table-column prop="pay_amount" label="充值金额" :formatter="formatPrice" width="150">
    </el-table-column>
    <el-table-column prop="active_seconds" label="活跃时间" :formatter="secondFormatHour" width="150">
    </el-table-column>
  </el-table>
</template>
<script>
import * as filters from 'common/js/filters'

export default {
  props: {
    appUsers: {
      type: Array,
      default: []
    },
  },
  methods: {
    formatPrice(row, column) {
      return filters.formatPrice(row.pay_amount)
    },
    secondFormatHour(row, column) {
      return filters.secondFormatHour(row.active_seconds)
    },
    getSummaries(param) {
      const {
        columns,
        data
      } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        const values = data.map(item => Number(item[column.property]));

        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);

          if (column.property == "pay_amount") {
            sums[index] = filters.formatPrice(sums[index])
            sums[index] += ' 元';
          } else if (column.property == "active_seconds") {
            sums[index] = filters.secondFormatHour(sums[index])
            sums[index] += ' 小时';
          } else {
            sums[index] = '';
          }
        } else {
          sums[index] = '';
        }
      });

      return sums;
    }
  }
}
</script>