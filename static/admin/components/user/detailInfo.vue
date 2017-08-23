<template>
  <modal :visible="visible" class="user-detail">
    <div class="box">
      <el-table :data="user">
        <el-table-column prop="email" label="账号" width="180">
        </el-table-column>
        <el-table-column prop="nickname" label="昵称" width="120">
        </el-table-column>
        <el-table-column prop="mobile" label="移动电话" width="130">
        </el-table-column>
        <el-table-column prop="age" label="年龄">
        </el-table-column>
        <el-table-column prop="sex" label="性别">
        </el-table-column>
        <el-table-column prop="inserted_at" label="注册时间" width="180">
        </el-table-column>
      </el-table>
      <div v-for="(user,index) in appUsers">
        <br/>
        <el-button :type="buttonType[index]" class="width-200">{{user.app_id}}</el-button>
        <br/>
        <el-card class="box-card" v-for="app in user.app_info">
          <br/>
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">
              <el-tag :type="tagType[index]">{{app.app_name}}</el-tag>
            </span>
          </div>
          <div class="text item">
            <div class="el-row has-text-centered">
              <div class="el-col el-col-6">
                <div>昵称
                  <div>{{app.game_user_name}}</div>
                </div>
              </div>
              <div class="el-col el-col-6">
                <div>等级
                  <div>{{app.app_user_level}}</div>
                </div>
              </div>
              <div class="el-col el-col-6">
                <div>充值金额(人民币)
                  <div>{{app.pay_amount | formatPrice}}</div>
                </div>
              </div>
              <div class="el-col el-col-6">
                <div>活跃时间(小时)
                  <div>{{ app.active_seconds | secondFormatHour}}</div>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </modal>
</template>
<script>
import {
  Modal
} from 'vue-bulma-modal'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    user: {
      type: Array,
      default: undefined
    },
    appUsers: {
      type: Array,
      default: []
    },
  },
  data() {
    return {
      tagType: ["success", "danger", "primary", "warning", "gray"],
      buttonType: ["success", "danger", "info", "text", "warning", "primary"],
    }
  },
  components: {
    Modal,
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