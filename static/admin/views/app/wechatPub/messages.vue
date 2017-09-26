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
        <div class="box" style="padding: 0.75rem" v-for="message in messages" :key="message.id" >
          <article class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img :src="message.from.avatar_url" alt="wechat avatar">
              </figure>
            </div>
            <div class="media-content">
              <nav class="level is-mobile" style="margin-bottom: 0.25rem">
                <div class="level-left">
                  <span class="level-item">
                    <strong>{{message.from.nickname}}</strong>
                  </span>
                  <a class="level-item">
                    <span class="icon is-small" style="padding-bottom: 1rem" @click="showChat(message)"><i class="fa fa-commenting"></i></span>
                  </a>
                </div>
                <div class="level-right">
                  <span class="level-item">
                    <small><timeago :since="message.inserted_at | convertServerDateTime" :auto-update="60"></timeago></small>
                  </span>
                </div>
              </nav>
              <div class="content">
                <p>
                  {{message.content}}
                </p>
              </div>
            </div>
          </article>
        </div>
        <article class="tile is-child is-12">
          <pagination :page-count="total" :current-page="page" :on-page-change="onPageChange"></pagination>
        </article>
      </div>
    </div>
  </div>
</template>
<script>
import {
  openNotification,
  processAjaxError
} from 'admin/miscellaneous'

import {
  showChatDialog
} from 'admin/components/dialog/wcp/chat'

import {
  showMessageBox
} from 'admin/components/dialog/messageBox'

import Pagination from 'admin/components/Pagination'

export default {
  components: {
    Pagination,
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
    this.listWcpMessages(1)
  },

  methods: {
    showChat: function(message) {
      showChatDialog({
        visible: true,
        message: message,
        appId: this.$route.params.appId,
      })
    },
    listWcpMessages: async function(page) {
      this.loading = true
      var data = {
        app_id: this.$route.params.appId,
        keyword: this.keyword,
        page: page,
        records_per_page: this.recordsPerPage,
        sorts: this.sorts
      }

      let result = await this.$acs.listWcpMessages(data)
      if (result.success) {
        this.total = result.total
        this.messages = result.messages
        this.page = page
      }
      this.loading = false
    },

    onPageChange: function(page) {
      this.listWcpMessages(page)
    },

    onSearchBoxSubmit: async function() {
      this.messages = []
      await this.listWcpMessages(1)
    },
  },

}
</script>