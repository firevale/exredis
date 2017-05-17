<template>
  <div class="card" v-if="users">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          <strong>{{ $t('admin.label.appManager')}}</strong>
        </p>
        <p class="card-header-icon">
          <a @click="addManager(2)" class="button is-info">{{$t('common.add')}}</a>
        </p>
      </header>
      <div class="card-content">
        <nav class="level">
          <div class="level-left">
            <a v-for="item in users" class="level-item" v-if="item.admin_level==2">
              <span class="tag is-info is-medium">
                {{item.user.nickname}}
                <button class="delete is-small"></button>
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
          <a @click="addManager(3)" class="button is-info">{{$t('common.add')}}</a>
        </p>
      </header>
      <div class="card-content">
        <nav class="level">
          <div class="level-left">
            <a v-for="item in users" class="level-item" v-if="item.admin_level==3">
              <span class="tag is-info is-medium">
                {{item.user.nickname}}
                <button class="delete is-small"></button>
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
    await this.getUsers()
  },
  data() {
    return {
      users: undefined
    }
  },

  methods: {
    getUsers: async function() {
      let par = new Object()
      par.app_id = "53A993ABE3A1CB110E1DC59AE557F5C9"
      let result = await this.$acs.getUsersByApp(par)
      if (result.success) {
        this.users = result.users
      }
    },
    addManager: function(level) {
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
    }
  }
}
</script>