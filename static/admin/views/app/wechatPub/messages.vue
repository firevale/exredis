<template>
  <div>
    <div class="control has-icon has-icon-left">
      <input type="text" class="input" @keyup.enter="onSearchBoxSubmit" :placeholder="$t('admin.wcp.searchTip')"
        v-model="keyword">
      <span class="icon is-small">
        <i v-if="loading" class="fa fa-spinner fa-spin"></i>
        <i v-else class="fa fa-search"></i>
      </span>
    </div>
    <div class="tile is-parent is-vertical">
      <article class="tile is-child is-12">
        <div class="table-responsive">
          <table class="table is-bordered is-striped is-narrow goods-table">
            <thead v-show="messages && messages.length > 0">
              <tr>
                <th>{{ $t('admin.wcp.msgId') }}</th>
                <th>{{ $t('admin.wcp.msgFrom') }}</th>
                <th>{{ $t('admin.wcp.msgTo')}}</th>
                <th>{{ $t('admin.wcp.msgContent')}}</th>
                <th>{{ $t('admin.wcp.msgType')}}</th>
                <th>{{ $t('admin.wcp.msgTime')}}</th>
              </tr>
            </thead>
            <tbody v-show="messages && messages.length > 0">
              <tr v-for="(message, index) in messages">
                <td> {{ message.id }} </td>
                <td> {{ getMsgUser(message.from, message.fromname) }} </td>
                <td> {{ getMsgUser(message.to, message.toname) }} </td>
                <td style="max-width:400px;"> {{ message.content }} </td>
                <td> {{ message.msg_type }} </td>
                <td> {{ message.inserted_at | formatServerDateTime }} </td>
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
  openNotification,
  processAjaxError
} from 'admin/miscellaneous'

import {
  showMessageBox
} from 'admin/components/dialog/messageBox'

import Pagination from 'admin/components/Pagination'

export default {
  data() {
    return {
      keyword: "",
      messages: [],
      page: 1,
      total: 1,
      recordsPerPage: 20,
      loading: false
    }
  },

  mounted: function() {
    this.getMessageList(this.page, this.recordsPerPage)
  },

  methods: {
    getMessageList: async function(page, recordsPerPage) {
      this.loading = true
      let result = await this.$acs.getMessageList(this.$route.params.appId, this.keyword, page, recordsPerPage)

      if (result.success) {
        this.total = result.total
        this.messages = result.message
        this.page = page
      }
      this.loading = false
    },

    getMsgUser: function(openid, name) {
      if(openid.indexOf('gh_') >= 0)
        return '系统'
      else
        return name ? name : openid
    },

    onPageChange: function(page) {
      this.getMessageList(page, this.recordsPerPage)
    },

    onSearchBoxSubmit: async function() {
      this.page = 0
      await this.getMessageList(this.page, this.recordsPerPage)
    },

    viewDetail: function(message) {
      this.$router.push({
        name: 'WcpViewMsg',
        params: {
          message: message
        },
      })
    },

    deleteMsg: function(message, index) {
      showMessageBox({
        visible: true,
        title: this.$t('admin.titles.warning'),
        message: this.$t('admin.messages.confirmDeleteMessage'),
        type: 'danger',
        onOK: _ => {
          this._deleteMsg(message, index)
        },
      })
    },

    _deleteMsg: async function(message, index) {
      let result = await this.$acs.deleteMessage(message.id, this.$t('admin.operateSuccess'))

      if (result.success) {
        this.messages.splice(index, 1)
      }
    },

  },

  components: {
    Pagination,
  }

}
</script>