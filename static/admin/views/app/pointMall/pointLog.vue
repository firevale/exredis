<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent is-vertical">
      <article class="tile is-child is-12">
        <div class="column">
          <a class="button is-primary" style="min-width: 100px" @click="addPoint">
            <i class="fa fa-plus" style="margin-right: 5px"></i> {{ $t('admin.point.add') }}
          </a>
        </div>
      </article>
      <div class="control has-icon has-icon-left">
        <input type="text" class="input" @keyup.enter="onSearchBoxSubmit" :placeholder="$t('admin.pointLog.searchTip')"
          v-model="keyword">
        <span class="icon is-small">
          <i v-if="loading" class="fa fa-spinner fa-spin"></i>
          <i v-else class="fa fa-search"></i>
        </span>
      </div>
      <div class="box" style="padding: 0.75rem" v-for="log in logs" :key="log.id" >
        <article class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img :src="log.wcs_user.avatar_url" alt="wechat avatar">
            </figure>
          </div>
          <div class="media-content">
            <nav class="level is-mobile" style="margin-bottom: 0.25rem">
              <div class="level-left">
                <span class="level-item">
                  <small>{{log.wcs_user.nickname}}</small>
                </span>
              </div>
              <div class="level-right">
                <p class="level-item">
                  <small><timeago :since="log.inserted_at | convertServerDateTime" :auto-update="60"></timeago></small>
                </p>
              </div>
            </nav>
            <p class="content">
              <span> {{log.memo}} </span>
              <br/>
              <span> {{log.inserted_at | formatServerDateTime}} </span>
              <span class="title is-5 pull-right" :class="log.point > 0 ? 'is-primary' : 'is-danger'">
                {{log.point > 0 ? `+${log.point}` : log.point}}&nbsp;分
              </span>
            </p>
          </div>
        </article>
      </div>
      <article class="tile is-child is-12">
        <pagination :page-count="total" :current-page="page" :on-page-change="onPageChange"></pagination>
      </article>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import {
  i18n
} from 'admin/vue-i18n'
import {
  openNotification,
  processAjaxError
} from 'admin/miscellaneous'

import {
  showMessageBox
} from 'admin/components/dialog/messageBox'

import Pagination from 'admin/components/Pagination'
import pointDialog from 'admin/components/dialog/app/addPoint'

const pointDialogComponent = Vue.extend(pointDialog)
const openPointDialog = (propsData = {
  visible: true
}) => {
  return new pointDialogComponent({
    i18n,
    el: document.createElement('div'),
 propsData
  })
}

export default {
  data() {
    return {
      logs: [],
      page: 1,
      total: 1,
      recordsPerPage: 20,
      loading: false,
      userId: '',
      keyword: '',
    }
  },

  created: async function() {
    this.getLogs(this.page, this.recordsPerPage)
  },

  methods: {
    getLogs: async function(page) {
      this.loading = true
      let result = await this.$acs.listPMallPointLogs({
        keyword: this.keyword,
        user_id: this.userId,
        page: page,
        records_per_page: this.recordsPerPage
      })
      this.loading = false
      if (result.success) {
        this.total = result.total
        this.logs = result.logs
        this.page = page
      }
    },

    onPageChange: function(page) {
      this.getLogs(page)
    },

    addPoint: function() {
      openPointDialog({
        pointLog: {
          id: 0,
          log_type: 'admin_op',
          memo: '',
          point: 0,
          wcp_user_id: '',
          openid: '',
        },
        visible: true,
        callback: log => {
          this.page = 1
          this.keyword = ''
          this.getLogs(this.page)
        },
      })
    },

    onSearchBoxSubmit: async function() {
      this.logs = []
      await this.getLogs(1)
    },
  },

  components: {
    Pagination,
  }

}
</script>