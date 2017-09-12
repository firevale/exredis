<template>
  <div v-if="users">
    <div class="columns is-multiline">
      <div class="column is-6">
        <div class="card" style="min-height:15rem;">
          <header class="card-header">
            <p class="card-header-title">
              <strong>{{ $t('admin.label.appManager')}}</strong>
            </p>
            <p class="card-header-icon">
              <a v-if="level==1" @click="addAdminUser(2)" class="button is-info">{{$t('common.add')}}</a>
            </p>
          </header>
          <div class="card-content">
            <div class="admin-user">
              <div v-for="item in users" :key="item.user.id" v-if="item.admin_level==2">
                <span class="tag is-info is-medium">
                  {{item.user.nickname}}
                  <button v-if="level==1" @click="deleteUsers(item)" class="delete is-small"></button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-6">
        <div style="min-height:15rem" class="card">
          <header class="card-header">
            <p class="card-header-title">
              <strong>{{ $t('admin.label.appCustomerService')}}</strong>
            </p>
            <p class="card-header-icon">
              <a @click="addAdminUser(3)" class="button is-info">{{$t('common.add')}}</a>
            </p>
          </header>
          <div class="card-content">
            <div class="admin-user">
              <div v-for="item in users" :key="item.user.id" class="level-item" v-if="item.admin_level==3">
                <span class="tag is-info is-medium">
                  {{item.user.nickname}}
                  <button @click="deleteUsers(item)" class="delete is-small"></button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="box" v-else>
    <div class="hero-body has-text-centered">
      <div class="container">
        <span class="icon is-large">
          <i class="fa fa-spinner fa-spin"></i>
        </span>
        <h2 class="subtitle" style="margin-top: 20px">
            {{ $t('admin.titles.loading') }}
          </h2>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import {
  i18n
} from 'admin/vue-i18n'
import {
  showMessageBox
} from 'admin/components/dialog/messageBox'

import userInfoDialog from 'admin/components/dialog/adminUser/userInfo'
const userInfoDialogComponent = Vue.extend(userInfoDialog)

const openUserInfoDialog = (propsData = {
  visible: true
}) => {
  return new userInfoDialogComponent({
    i18n,
    el: document.createElement('div'),
    propsData
  })
}
export default {
  mounted: async function() {
    await this.getLevel()
    await this.getAdminUser()
  },
  data() {
    return {
      users: undefined,
      level: 0
    }
  },

  methods: {
    getLevel: async function() {
      let result = await this.$acs.getCurrentUserLevel()
      if (result.success) {
        this.level = result.level
      }
    },
    getAdminUser: async function() {
      let result = await this.$acs.listAppAdminUsers()
      if (result.success) {
        this.users = result.users
      }
    },
    addAdminUser: function(level) {
      openUserInfoDialog({
        section: {
          level: level
        },
        visible: true,
        callback: section => {
          this.getAdminUser()
        },
      })
    },
    showUser: async function(user) {
      let par = new Object()
      par.user_id = user.user.id
      let result = await this.$acs.getUserFromRedis(par)
      if (result.success) {

      }
    },
    deleteUsers: function(users) {
      let confirmMessage = users.admin_level == 2 ? this.$t(
        'admin.messages.confirmDeleteAppManager', {
          nickName: users.user.nickname
        }) : this.$t('admin.messages.confirmDeleteCustomerService', {
        nickName: users.user.nickname
      })
      let deletedMessage = users.admin_level == 2 ? this.$t(
        'admin.notification.message.appManagerDeleted', {
          nickName: users.user.nickname
        }) : this.$t('admin.notification.message.appCustomerServiceDeleted', {
        nickName: users.user.nickname
      })
      showMessageBox({
        visible: true,
        title: this.$t('admin.titles.warning'),
        message: confirmMessage,
        type: 'danger',
        onOK: async _ => {
          let result = await this.$acs.deleteAdminUser({
            admin_user_id: users.id
          }, deletedMessage)
          if (result.success) {
            this.getAdminUser()
          }
        },
      })
    }
  }
}
</script>