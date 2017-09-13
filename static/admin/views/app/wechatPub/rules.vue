<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent is-vertical">
      <article class="tile is-child is-12">
        <div class="column">
          <router-link class="button is-primary pull-left" :to="{name: 'WcpEditRule', params: {
          rule: {
          id: '',
          keywords: '',
          response: '',
          app_id: this.$route.params.appId,
        }}}">
            <span class="icon is-small" style="margin-right: 5px;"><i class="fa fa-plus"></i></span> {{ $t('admin.wcp.addRule')
            }}
          </router-link>
        </div>
      </article>
      <article class="tile is-child is-12">
        <div class="table-responsive">
          <table class="table is-bordered is-striped is-narrow goods-table">
            <thead v-show="rules && rules.length > 0">
              <tr>
                <th>{{ $t('admin.wcp.id') }}</th>
                <th>{{ $t('admin.wcp.keywords') }}</th>
                <th>{{ $t('admin.wcp.response') }}</th>
                <th>{{ $t('admin.wcp.createdAt')}}</th>
                <th>{{ $t('admin.wcp.edit')}}</th>
                <th>{{ $t('admin.wcp.operate')}}</th>
              </tr>
            </thead>
            <tbody v-show="rules && rules.length > 0">
              <tr v-for="(rule, index) in rules" :key="rule.id">
                <td> {{ rule.id }} </td>
                <td> {{ rule.keywords }} </td>
                <td style="max-width:400px;"> {{ rule.response }} </td>
                <td> {{ rule.inserted_at | formatServerDateTime }} </td>
                <td class="is-icon">
                  <a @click.prevent="editRule(rule, index)">
                    <i class="fa fa-pencil"></i>
                  </a>
                </td>
                <td class="is-icon">
                  <a @click.prevent="deleteWcpMessageRule(rule, index)">
                    <i class="fa fa-trash-o"></i>
                  </a>
                </td>
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
  mapGetters,
  mapActions
} from 'vuex'

import {
  openNotification,
  processAjaxError
} from 'admin/miscellaneous'

import {
  showMessageBox
} from 'admin/components/dialog/messageBox'

import Pagination from 'admin/components/Pagination'
import Tooltip from 'vue-bulma-tooltip'

export default {
  data() {
    return {
      rules: [],
      page: 1,
      total: 1,
      recordsPerPage: 10,
      loading: true
    }
  },

  mounted: function() {
    this.listWcpMessageRules(this.page, this.recordsPerPage)
    this.loading = true
  },

  methods: {
    listWcpMessageRules: async function(page, recordsPerPage) {
      let result = await this.$acs.listWcpMessageRules(this.$route.params.appId, page, recordsPerPage)

      if (result.success) {
        this.total = result.total
        this.rules = result.rules
        this.page = page
      }
    },

    onPageChange: function(page) {
      this.listWcpMessageRules(page, this.recordsPerPage)
    },

    editRule: function(rule, index) {
      this.$router.push({
        name: 'WcpEditRule',
        params: {
          rule: rule
        },
      })
    },

    deleteWcpMessageRule: function(rule, index) {
      showMessageBox({
        visible: true,
        title: this.$t('admin.titles.warning'),
        message: this.$t('admin.messages.confirmDeleteRule'),
        type: 'danger',
        onOK: _ => {
          this._deleteRule(rule, index)
        },
      })
    },

    _deleteRule: async function(rule, index) {
      let result = await this.$acs.deleteWcpMessageRule(rule.id, this.$t('admin.operateSuccess'))

      if (result.success) {
        this.rules.splice(index, 1)
      }
    },

  },

  components: {
    Pagination,
    Tooltip,
  }

}
</script>