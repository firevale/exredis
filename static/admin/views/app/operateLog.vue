<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent is-vertical">
      <article class="tile is-child is-12">
        <div class="table-responsive">
          <table class="table is-bordered is-striped is-narrow goods-table">
            <thead v-show="logs && logs.length > 0">
              <tr>
                <th>{{ $t('admin.operateLog.id') }}</th>
                <th>{{ $t('admin.operateLog.user') }}</th>
                <th>{{ $t('admin.operateLog.type')}}</th>
                <th>{{ $t('admin.operateLog.log')}}</th>
                <th>{{ $t('admin.operateLog.adddate')}}</th>
              </tr>
            </thead>
            <tbody v-show="logs && logs.length > 0">
              <tr v-for="(log, index) in logs">
                <td> {{ log.id }} </td>
                <td> {{ log.user.email }} </td>
                <td> {{ log.operate_type }} </td>
                <td style="max-width:400px;"> {{ log.log }} </td>
                <td> {{ log.inserted_at | formatServerDateTime }} </td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>
      <article class="tile is-child is-12">
        <pagination :page-count="total" :current-page="page" :on-page-change="onPageChange"></pagination>
      </article>
    </div>
  </div>
</template>
<script>
import {
  processAjaxError,
  openNotification,
} from 'admin/miscellaneous'

import Pagination from 'admin/components/Pagination'
import Tooltip from 'vue-bulma-tooltip'

export default {
  data() {
    return {
      logs: [],
      page: 1,
      total: 1,
      recordsPerPage: 20,
      loading: false,
      userId: ""
    }
  },

  mounted: function() {
    this.listAdminOperateLog(this.userId, this.page, this.recordsPerPage)
  },

  methods: {
    listAdminOperateLog: async function(userId, page, recordsPerPage) {
      this.loading = true
      let result = await this.$acs.listAdminOperateLog({
        app_id: this.$route.params.appId, 
        user_id: userId, 
        page: page, 
        records_per_page: recordsPerPage
      })
      this.loading = false

      if (result.success) {
        this.total = result.total
        this.logs = result.logs
        this.page = page
      }
    },

    onPageChange: function(page) {
      this.listAdminOperateLog(this.userId, page, this.recordsPerPage)
    },

  },

  components: {
    Pagination,
    Tooltip,
  }

}
</script>