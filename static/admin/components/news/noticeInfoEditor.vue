<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent is-vertical">
      <article class="tile is-child is-12">
        <div class="column">
          <router-link class="button is-primary pull-left" :to="{name: 'EditNews', params: {
          news: {
          id: '',
          title: '',
          group: 'notice',
          content: '',
          app_id: this.$route.params.appId,
        }}}">
            <span class="icon is-small" style="margin-right: 5px;"><i class="fa fa-plus"></i></span>{{ $t('admin.news.notice.add')
            }}
          </router-link>
        </div>
      </article>
      <article class="tile is-child is-12">
        <div class="table-responsive">
          <table class="table is-bordered is-striped is-narrow goods-table">
            <thead v-show="newses && newses.length > 0">
              <tr>
                <th>{{ $t('admin.news.id') }}</th>
                <th>{{ $t('admin.news.title') }}</th>
                <th>{{ $t('admin.news.created_at')}}</th>
                <th>{{ $t('admin.news.active')}}</th>
                <th>{{ $t('admin.news.edit')}}</th>
                <th>{{ $t('admin.news.operate')}}</th>
              </tr>
            </thead>
            <tbody v-show="newses && newses.length > 0">
              <tr v-for="(news, index) in newses">
                <td> {{ news.id }} </td>
                <td> {{ news.title }} </td>
                <td> {{ news.inserted_at | formatServerDateTime }} </td>
                <td> {{ news.active ? $t('admin.news.publishEd') : $t('admin.news.unPublish') }} </td>
                <td class="is-icon">
                  <a @click.prevent="editNewsInfo(news, index)">
                    <i class="fa fa-pencil"></i>
                  </a>
                </td>
                <td class="is-icon">
                  <a @click.prevent="toggleStatus(news)">
                    <i class="fa" :class="news.active ? 'fa-trash-o' : 'fa-check'"></i>
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

import Vue from 'admin/vue-i18n'

import {
  showMessageBox
} from '../dialog/messageBox'

import Pagination from 'admin/components/Pagination'
import Tooltip from 'vue-bulma-tooltip'

export default {
  data() {
    return {
      newses: [],
      page: 1,
      total: 1,
      recordsPerPage: 5,
      loading: true
    }
  },

  mounted: function() {
    this.getNoticeInfo(this.page, this.recordsPerPage)
    this.loading = true
  },

  methods: {
    getNoticeInfo: async function(page, recordsPerPage) {
      let result = await this.$acs.getPagedNews(this.$route.params.appId, "notice", page,
        recordsPerPage)

      if (result.success) {
        this.total = result.total
        this.newses = result.news
        this.page = page
      }
    },

    onPageChange: function(page) {
      this.getNoticeInfo(page, this.recordsPerPage)
    },

    editNewsInfo: function(news, index) {
      this.$router.push({
        name: 'EditNews',
        params: {
          news: news,
          index: index
        },
      })
    },

    toggleStatus: function(news) {
      showMessageBox({
        visible: true,
        title: this.$t('admin.titles.warning'),
        message: news.active ? this.$t('admin.messages.confirmUnPublishNews') : this.$t(
          'admin.messages.confirmPublishNews'),
        type: 'danger',
        onOK: _ => {
          this._toggleStatus(news)
        },
      })
    },

    _toggleStatus: async function(news) {
      this.loading = true
      let result = await this.$acs.toggleStatus({
          news_id: news.id
        },
        news.active ? this.$t('admin.news.publishOk') : this.$t('admin.news.unPublishOK'))
      if (result.success) {
        news.active = !news.active
      }
      this.loading = false
    },
  },

  components: {
    Pagination,
    Tooltip,
  }

}
</script>