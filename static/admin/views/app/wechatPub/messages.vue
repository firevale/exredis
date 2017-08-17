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
      <div class="tile is-child box">
        <el-table ref="tbl" stripe :data="messages" style="width: 100%" border :row-key="getRowKey" :expand-row-keys="expandKeys"
          @row-dblclick="rowClick">
          <el-table-column prop="id" :label="$t('admin.wcp.msgId')" sortable="custom" width="100">
          </el-table-column>
          <el-table-column :label="$t('admin.wcp.msgFrom')" width="180">
            <template scope="scope">
              {{ getMsgUser(scope.row.from, scope.row.fromname) }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('admin.wcp.msgTo')" width="180">
            <template scope="scope">
              {{ getMsgUser(scope.row.to, scope.row.toname) }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('admin.wcp.msgContent')" width="400">
            <template scope="scope">
              <div style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"> {{ scope.row.content }} </div>
            </template>
          </el-table-column>
          <el-table-column prop="total_mem_size" :label="$t('admin.wcp.msgType')" width="120">
            <template scope="scope">
              {{ scope.row.msg_type }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('admin.wcp.msgTime')" sortable="custom" width="180">
            <template scope="scope">
              {{ scope.row.inserted_at | formatServerDateTime }}
            </template>
          </el-table-column>
        </el-table>
        <div v-if="messages && messages.length > 0" class="ele-pagination">
          <el-pagination layout="prev, pager, next" :page-count="total" @current-change="onPageChange">
          </el-pagination>
        </div>
      </div>
    </div>
    <talk ref="talk" @close="showTalkModal = false"></talk>
  </div>
</template>
<script>
import {
  openNotification,
  processAjaxError
} from 'admin/miscellaneous'

import talk from './talk'
import {
  showMessageBox
} from 'admin/components/dialog/messageBox'

import Pagination from 'admin/components/Pagination'

export default {
  components: {
    Pagination,
    talk
  },
  data() {
    return {
      keyword: "",
      messages: [],
      page: 1,
      total: 1,
      recordsPerPage: 20,
      loading: false,
      expandKeys: [],
      showTalkModal: false,
    }
  },

  mounted: function() {
    this.getMessageList(this.page, this.recordsPerPage)
  },

  methods: {
    getRowKey: function(row) {
      return row.id
    },
    rowClick: function(row, event) {
      this.$refs.talk.open(row)
    },
    getMessageList: async function(page, recordsPerPage) {
      this.loading = true
      let result = await this.$acs.getMessageList(this.$route.params.appId, this.keyword, page,
        recordsPerPage)

      if (result.success) {
        this.total = result.total
        this.messages = result.message
        this.page = page
      }
      this.loading = false
    },

    getMsgUser: function(openid, name) {
      if (openid.indexOf('gh_') >= 0)
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



}
</script>