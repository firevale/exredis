<template>
  <modal :visible="visible" class="user-detail">
    <div class="box" v-if="user">
      <article class="media" style="margin-bottom: 1rem">
        <div class="media-left">
          <figure class="image is-48x48">
            <img :src="(user.avatar_url || '/images/default_avatar.png') | imageStaticUrl" alt="user avatar">
          </figure>
        </div>
        <div class="media-content">
          <nav class="level is-mobile" style="margin-bottom: 0.25rem">
            <div class="level-left">
              <span class="level-item">
                <strong>{{user.id}}</strong>
              </span>
            </div>
          </nav>
          <div class="content">
            <span>昵称:&nbsp<small>{{user.nickname}}</small></span>
            <span v-show="user.email">email:&nbsp<small>{{user.email}}</small></span>
            <span v-show="user.mobile">手机:&nbsp<small>{{user.mobile}}</small></span>
          </div>
        </div>
      </article>          
      <div v-if="appUsers">
        <el-card class="box-card" v-for="(app, index) in appUsers" :key="app.id">
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
              <h3 class="title is-5 is-marginless">合计：</h3>
              <h5 class="subtitle is-6 is-marginless">充值金额：<strong>{{ sumAmount | formatPrice }} 元</strong> </h5>
              <h5 class="subtitle is-6 is-marginless">活跃时长：<strong>{{ sumSeconds| secondFormatHour }}小时</strong>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="box">
      <div class="hero-body has-text-centered">
        <div>
          <span class="icon is-large">
            <i class="fa fa-3x fa-spinner fa-spin"></i>
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
      sumSeconds: 0,
      sumAmount: 0
    }
  },
  methods: {
    showAppUsers: function(user) {
      let users = []
      users.push(user)
      return users
    },
    getUser: async function() {
      let result = await this.$acs.getUserInfo(this.id)
      if (result.success) {
        this.user = result.user
        this.appUsers = this.user.app_users
        for (var appUser of this.appUsers) {
          this.sumAmount += parseInt(appUser.pay_amount)
          this.sumSeconds += parseInt(appUser.active_seconds)
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