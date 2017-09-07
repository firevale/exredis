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
    <div class="tile is-ancestor ">
      <div class="tile is-parent is-vertical">
        <el-table class="tile is-child box is-paddingless" ref="tbl" stripe :data="messages" style="width: 100%"
          border @row-dblclick="rowClick" @sort-change="sortChange" :default-sort="{prop: 'inserted_at', order: 'descending'}">
          <!-- <el-table-column prop="id" :label="$t('admin.wcp.msgId')" sortable="custom" width="100">
          </el-table-column> -->
          <el-table-column :label="$t('admin.wcp.msgFrom')" width="180">
            <template scope="scope">
              {{ scope.row.from && scope.row.from.nickname ? scope.row.from.nickname : "" }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('admin.wcp.msgTo')" width="180">
            <template scope="scope">
              {{ scope.row.to && scope.row.to.nickname ? scope.row.to.nickname : "" }}
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
          <el-table-column :label="$t('admin.wcp.msgTime')" prop="inserted_at" sortable="custom" width="180">
            <template scope="scope">
              {{ scope.row.inserted_at | formatServerDateTime }}
            </template>
          </el-table-column>
          <el-table-column>
          </el-table-column>
        </el-table>
        <div v-if="messages && messages.length > 0" class="tile is-child  ele-pagination">
          <el-pagination layout="prev, pager, next" :page-count="total" :current-page.sync="page" @current-change="onPageChange">
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
      sorts: {},
      showTalkModal: false,
    }
  },

  mounted: function() {
    this.getMessageList()
  },

  methods: {
    getRowKey: function(row) {
      return row.id
    },
    rowClick: function(row, event) {
      this.$refs.talk.open(row)
    },
    getMessageList: async function() {
      this.loading = true
      var data = {
        app_id: this.$route.params.appId,
        keyword: this.keyword,
        page: this.page,
        records_per_page: this.recordsPerPage,
        sorts: this.sorts
      }

      let result = await this.$acs.getMessageList(data)
      if (result.success) {
        this.total = result.total
        this.messages = result.messages
      }
      this.loading = false
    },

    onPageChange: function() {
      this.getMessageList(this.page, this.recordsPerPage)
    },

    onSearchBoxSubmit: async function() {
      this.messages = []
      this.page = 1
      await this.getMessageList()
    },
    sortChange: function(column) {
      var field = column.prop

      if (column.column == null) {
        this.sorts = {}
      } else if (column.order == "descending") {
        this.sorts[column.prop] = "desc"
      } else {
        this.sorts[column.prop] = "asc"
      }

      this.page = 1
      this.getMessageList()
    },

  },

}
</script>