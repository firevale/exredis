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
          <app-user-list :appUsers="appUsers">
          </app-user-list>
        </el-card>
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
      appUsers: undefined
    }
  },
  methods: {
    showAppUser: function(user) {
      return user
    },
    getUser: async function() {
      let result = await this.$acs.getUserById(this.id)
      if (result.success) {
        this.user = result.user
        this.appUsers = this.user[0].app_users
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