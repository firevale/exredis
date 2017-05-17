<template>
  <div class="card" v-if="users">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          <strong>{{ $t('admin.label.appManager')}}</strong>
        </p>
        <p class="card-header-icon">
          <a @click="addUsers(2)" class="button is-info">{{$t('common.add')}}</a>
        </p>
      </header>
      <div class="card-content">
        <nav class="level">
          <div class="level-left">
            <a v-for="item in users" class="level-item" v-if="item.admin_level==2">
              <span class="tag is-info is-medium">
                {{item.user.nickname}}
                <button @click="deleteUsers(item)" class="delete is-small"></button>
              </span>
            </a>
          </div>
        </nav>
      </div>
    </div>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          <strong>{{ $t('admin.label.appCustomerService')}}</strong>
        </p>
        <p class="card-header-icon">
          <a @click="addUsers(3)" class="button is-info">{{$t('common.add')}}</a>
        </p>
      </header>
      <div class="card-content">
        <nav class="level">
          <div class="level-left">
            <a v-for="item in users" class="level-item" v-if="item.admin_level==3">
              <span class="tag is-info is-medium">
                {{item.user.nickname}}
                <button @click="deleteUsers(item)" class="delete is-small"></button>
              </span>
            </a>
          </div>
        </nav>
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

import sectionInfoDialog from 'admin/components/dialog/user/sectionInfo'
const sectionInfoDialogComponent = Vue.extend(sectionInfoDialog)

const openSectionInfoDialog = (propsData = {
  visible: true
}) => {
  return new sectionInfoDialogComponent({
    i18n,
    el: document.createElement('div'),
    propsData
  })
}
export default {
  mounted: async function() {
    await this.getAdminUser()
  },
  data() {
    return {
      users: undefined
    }
  },

  methods: {
    getAdminUser: async function() {
      let par = new Object()
      par.app_id = "53A993ABE3A1CB110E1DC59AE557F5C9"
      let result = await this.$acs.getAdminUserByApp(par)
      if (result.success) {
        this.users = result.users
      }
    },
    addUsers: function(level) {
      openSectionInfoDialog({
        section: {
          age: 0,
          email: '',
          mobile: '',
          password: '',
          nickname: '',
          level: level,
          active: false,
          device_id: '',
          app_id: '53A993ABE3A1CB110E1DC59AE557F5C9'
        },
        visible: true,
        callback: section => {},
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
          if (result.success) {}
        },
      })
    }
  }
}
</script>