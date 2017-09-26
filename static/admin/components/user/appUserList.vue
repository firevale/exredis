<template>
  <el-table :data="appUsers">
    <el-table-column prop="app_user_id" label="游戏id" width="130">
    </el-table-column>
    <el-table-column prop="app_user_name" label="昵称" width="160">
    </el-table-column>
    <el-table-column prop="app_user_level" label="等级" width="80">
    </el-table-column>
    <el-table-column label="最后活跃时间" width="190">
      <template scope="scope">
        {{ scope.row.last_active_at | formatServerDateTime }}
      </template>
    </el-table-column>
    <el-table-column label="充值金额" width="120">
      <template scope="scope">
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