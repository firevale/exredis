<template>
  <div v-if="appList" class="card">
    <div class="card-content">
      <article class="media">
        <figure class="media-left">
          <nav class="panel" v-for="app in appList">
            <a @click="showUsers(app)" class="panel-block" :class="{'is-active': app.id == selectedId}">
              <div class="tile is-parent">
                <figure class="image is-64x64 app-icon">
                  <img :src="app.icon ? app.icon : 'https://placehold.it/64x64?text=128x128'"></img>
                </figure>
                <div class="tile is-vertical is-child" style="padding-left: 5px;">
                  <h3 style="font-weight: bold"> {{app.name}} </h3>
                  <div class="button is-small is-outlined" style="margin-top: 15px">
                    <span class="icon is-small"><i class="fa fa-search"></i></span>
                    <span> {{ $t('admin.showDetail') }} </span>
                  </div>
                </div>
              </div>
            </a>
          </nav>
        </figure>
        <div class="media-content">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                <strong>{{ $t('admin.label.appManager')}}</strong>
              </p>
              <p class="card-header-icon">
                <a @click="addAppManager" class="button is-info">{{$t('common.add')}}</a>
              </p>
            </header>
            <div class="card-content">
              <nav class="level">
                <div class="level-left">
                  <a class="level-item">
                    <span class="tag is-info is-medium">
                      张三
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
                <a class="button is-info">{{$t('common.add')}}</a>
              </p>
            </header>
            <div class="card-content">
              <nav class="level">
                <div class="level-left">
                  <a class="level-item">
                    <span class="tag is-info is-medium">
                      张三
                      <button class="delete is-small"></button>
                    </span>
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </article>
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
  data() {
    return {
      appList: undefined,
      selectedId: undefined
    }
  },

  created: async function() {
    let result = await this.$acs.fetchAppList()
    if (result.success) {
      this.appList = result.apps
    }
  },

  methods: {
    showUsers: function(app) {
      this.selectedId = app.id
    },
    addAppManager: function() {
      openSectionInfoDialog({
        section: {
          age: 0,
          email: '',
          mobile: '',
          password: '',
          nickname: '',
          level: 2,
          active: false,
          device_id: '',
          app_id: this.selectedId
        },
        visible: true,
        callback: section => {
        },
      })
    }
  }
}
</script>