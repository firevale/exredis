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
        <div class="box" v-for="message in messages" :key="message.id" >
          <article class="media">
            <div class="media-left">
              <figure class="image is-64x64">
                <img :src="message.from.avatar_url" alt="Image">
              </figure>
            </div>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>{{message.from.nickname}}</strong> <small>@{{message.inserted_at | formatServerDateTime }}</small> 
                  <br>
                  {{message.content}}
                </p>
              </div>
              <nav class="level is-mobile">
                <div class="level-left">
                  <a class="level-item">
                    <span class="icon is-small" @click="$refs.talk.open(message)"><i class="fa fa-reply"></i></span>
                  </a>
                </div>
              </nav>
            </div>
          </article>
        </div>
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
    this.listWcpUserMessages()
  },

  methods: {
    getRowKey: function(row) {
      return row.id
    },
    rowClick: function(row, event) {
      this.$refs.talk.open(row)
    },
    listWcpUserMessages: async function() {
      this.loading = true
      var data = {
        app_id: this.$route.params.appId,
        keyword: this.keyword,
        page: this.page,
        records_per_page: this.recordsPerPage,
        sorts: this.sorts
      }

      let result = await this.$acs.listWcpUserMessages(data)
      if (result.success) {
        this.total = result.total
        this.messages = result.messages
      }
      this.loading = false
    },

    onPageChange: function() {
      this.listWcpUserMessages(this.page, this.recordsPerPage)
    },

    onSearchBoxSubmit: async function() {
      this.messages = []
      this.page = 1
      await this.listWcpUserMessages()
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
      this.listWcpUserMessages()
    },

  },

}
</script>