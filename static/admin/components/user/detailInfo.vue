<template>
  <modal :visible="visible" class="user-detail">
    <div class="box" v-if="user">
      <el-table :data="user">
        <el-table-column prop="email" label="账号" width="180">
        </el-table-column>
        <el-table-column prop="nickname" label="昵称" width="120">
        </el-table-column>
        <el-table-column prop="mobile" label="移动电话" width="130">
        </el-table-column>
        <el-table-column prop="age" label="年龄">
        </el-table-column>
        <el-table-column prop="gender" label="性别">
        </el-table-column>
        <el-table-column prop="inserted_at" label="注册时间" width="180" :formatter="formatServerDateTime">
        </el-table-column>
      </el-table>
      <br/>
      <div v-if="appUsers">
        <el-card class="box-card" v-for="(app, index) in appUsers">
          <br/>
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">
              <el-button :type="buttonType[index]" class="width-200">{{app.zone_id}}区</el-button>
            </span>
          </div>
          <app-user-list :appUsers="showAppUsers(app)">
          </app-user-list>
        </el-card>
        <div class="columns is-multiline ">
          <div class="column is-8">
          </div>
          <div class="column has-text-right">
            <div class=" has-text-left">
              <h1 class="title is-marginless">合计：</h1>
              <h2 class="subtitle is-marginless">充值金额：<strong>{{ summaryAmount | formatPrice }} 元</strong>
              </h2>
              <h2 class="subtitle is-marginless">活跃时长：<strong>{{ summarySeconds| secondFormatHour }}小时</strong>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="box">
      <div class="hero-body has-text-centered">
        <div>
          <span class="icon is-large">
            <i class="fa fa-spinner fa-spin"></i>
          </span>
          <h2 class="subtitle" style="margin-top: 10px">
                 数据加载中
            </h2>
        </div>
      </div>
    </div>
  </modal>
</template>
<script>
import {
  Modal
} from 'vue-bulma-modal'
import * as filters from 'common/js/filters'

import AppUserList from 'admin/components/user/appUserList'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: 0
    },
  },
  mounted: async function() {
    this.getUser()
  },
  data() {
    return {
      buttonType: ["success", "danger", "info", "text", "warning", "primary"],
      user: undefined,
      appUsers: undefined,
      summarySeconds: 0,
      summaryAmount: 0
    }
  },
  methods: {
    showAppUsers: function(user) {
      let users = []
      users.push(user)
      return users
    },
    getUser: async function() {
      let result = await this.$acs.getUserById(this.id)
      if (result.success) {
        this.user = result.user
        this.appUsers = this.user[0].app_users
        for (var app of this.appUsers) {
          this.summaryAmount += parseInt(app.pay_amount)
          this.summarySeconds += parseInt(app.active_seconds)
        }
      }
    },
    formatServerDateTime: function(row, column) {
      return filters.formatServerDateTime(row.inserted_at)
    }
  },
  components: {
    Modal,
    AppUserList
  },
}
</script>
<style lang="scss">
.user-detail {
  .modal-card,
  .modal-content {
    width: 900px !important;
  }
  .el-card {
    margin-bottom: 10px !important;
  }
  .el-card__header {
    padding: 10px 10px!important;
  }
  .el-card__body {
    padding: 0px 10px 10px 10px!important;
  }
  .width-200 {
    width: 200px;
  }
}
</style>