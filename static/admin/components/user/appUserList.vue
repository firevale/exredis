<template>
  <el-table :data="appUsers">
    <el-table-column prop="app_user_name" label="游戏ID" width="200">
    </el-table-column>
    <el-table-column prop="app_user_level" label="等级">
    </el-table-column>
    <el-table-column label="最后活跃时间" width="180">
      <template scope="scope">
        {{ scope.row.last_active_at | formatServerDateTime }}
      </template>
    </el-table-column>
    <el-table-column label="充值金额" width="150">
      <template scope="scope">
        <el-icon name="information"></el-icon>
        <span>{{ scope.row.pay_amount | formatPrice }} 元</span>
      </template>
    </el-table-column>
    <el-table-column label="活跃时长" width="150">
      <template scope="scope">
        <el-icon name="time"></el-icon>
        <span>{{ scope.row.active_seconds | secondFormatHour }} 小时</span>
      </template>
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
  }
}
</script>