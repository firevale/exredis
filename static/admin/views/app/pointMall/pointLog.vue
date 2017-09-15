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
      <article class="tile is-child is-12">
        <div class="table-responsive">
          <div class="columns is-gapless has-text-centered" style="border-bottom: 1px solid #ccc; padding:5px; color:#aaa;">
            <div class="column">
              <p>{{ $t('admin.point.id') }}</p>
            </div>
            <div class="column">
              <p>{{ $t('admin.point.user') }}</p>
            </div>
            <div class="column">
              <p>{{ $t('admin.point.log_type') }}</p>
            </div>
            <div class="column">
              <p>{{ $t('admin.point.point')}}</p>
            </div>
            <div class="column">
              <p>{{ $t('admin.point.memo')}}</p>
            </div>
            <div class="column">
              <p>{{ $t('admin.point.inserted_at')}}</p>
            </div>
          </div>
          <div v-if="logs">
            <div class="columns has-text-centered" style="border-bottom: 1px solid #ccc;" v-show="logs && logs.length > 0"
              v-for="(log, index) in logs" :key="log.id">
              <div class="column">
                <p>{{ log.id }}</p>
              </div>
              <div class="column">
                <p>{{ log.user_id }}</p>
              </div>              
              <div class="column">
                <p>{{ log.log_type }}</p>
              </div>
              <div class="column">
                <p>{{ log.point }}</p>
              </div>
              <div class="column">
                <p>{{ log.memo }}</p>
              </div>
              <div class="column">
                <p>{{ log.inserted_at | formatServerDateTime }}</p>
              </div>
            </div>
          </div>
        </div>
      </article>
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
      userId: ''
    }
  },

  created: async function() {
    this.getLogs(this.page, this.recordsPerPage)
  },

  methods: {
    getLogs: async function(page, recordsPerPage) {
      this.loading = true
      let result = await this.$acs.listPMallPointLogs({
        user_id: this.userId,
        page: page,
        records_per_page: recordsPerPage
      })
      this.loading = false
      if (result.success) {
        this.total = result.total_page
        this.logs = result.logs
        this.page = page
      }
    },

    onPageChange: function(page) {
      this.getLogs(page, this.recordsPerPage)
    },

    addPoint: function() {
      openPointDialog({
        pointLog: {
          id: 0,
          log_type: 'admin_op',
          memo: '',
          point: 0,
          user_id: ''
        },
        visible: true,
        callback: log => {
          this.logs.unshift(log)
        },
      })
    },
  },

  components: {
    Pagination,
  }

}
</script>