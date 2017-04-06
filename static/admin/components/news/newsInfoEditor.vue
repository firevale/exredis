<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent is-vertical">
      <article class="tile is-child is-12">
        <div class="column">
          <router-link class="button is-primary pull-left" :to="{name: 'EditNews', params: {
          news: {
          id: '',
          title: '',
          content: '',
          group: 'news',
          app_id: this.$route.params.appId,
        }}}">
            <span class="icon is-small" style="margin-right: 5px;"><i class="fa fa-plus"></i></span>{{
            $t('admin.news.news.add') }}
          </router-link>
        </div>
      </article>
      <article class="tile is-child is-12">
        <div class="table-responsive">
          <table class="table is-bordered is-striped is-narrow goods-table">
            <thead v-show="newses && newses.length > 0">
              <tr>
                <th>{{ $t('admin.news.id') }}</th>
                <th>{{ $t('admin.news.pic')}}</th>
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
                <td class="is-icon">
                  <figure class="image news-pic" @click="updateNewsPic(news)">
                    <img :src="news.pic ? news.pic: 'https://placehold.it/172x70?text=640X260'" style="width:172px; height:70px;"></img>
                  </figure>
                </td>
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

import {
  openNotification,
  processAjaxError
} from 'admin/miscellaneous'

import Vue from 'admin/vue-i18n'

import {
  showFileUploadDialog
} from '../dialog/fileUpload'

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
    this.getNewsInfo(this.page, this.recordsPerPage)
    this.loading = true
  },

  methods: {
    getNewsInfo: async function(page, recordsPerPage) {
      let result = await this.$acs.getPagedNews(this.$route.params.appId, "news", page,
        recordsPerPage)

      if (result.success) {
        this.total = result.total
        this.newses = result.news
        this.page = page
      }
    },

    onPageChange: function(page) {
      this.getNewsInfo(page, this.recordsPerPage)
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
      let result = await this.$acs.toggleStatus(news.id)
      this.loading = false
      if (result.success) {
        news.active = !news.active
        openNotification({
          title: this.$t('admin.operateSuccess'),
          message: news.active ? this.$t('admin.news.publishOk') : this.$t(
            'admin.news.unPublishOK'),
          type: 'success',
          duration: 4500,
          container: '.notifications',
        })
      }
    },

    updateNewsPic: function(news) {
      showFileUploadDialog({
        postAction: '/admin_actions/update_news_pic',
        accept: 'image/png',
        data: {
          news_id: news.id
        },
        extensions: ['png'],
        title: this.$t('admin.titles.uploadNewsPic'),
        callback: response => news.pic = response.pic,
      })
    },

  },

  components: {
    Pagination,
    Tooltip,
  }

}
</script>