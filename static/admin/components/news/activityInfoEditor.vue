<template>
  <div class="tile is-ancestor">  
    <div class="tile is-parent">
      <article class="tile is-child">
        <div class="column">
          <a class="button is-primary" style="min-width: 100px" @click="addNewNews">
            <i class="fa fa-plus" style="margin-right: 5px"></i> {{ $t('admin.news.activity.add') }}
          </a>
        </div>
        <div class="table-responsive">
          <table class="table is-bordered is-striped is-narrow goods-table">
            <thead v-show="newses && newses.length > 0">
              <tr>
                <th>{{ $t('admin.forum.id') }}</th>
                <th>{{ $t('admin.forum.title') }}</th>
                <th>{{ $t('admin.forum.pic')}}</th>
                <th>{{ $t('admin.forum.created_at')}}</th>
                <th>{{ $t('admin.forum.edit')}}</th>
                <th>{{ $t('admin.forum.delete')}}</th>
              </tr>
            </thead>
            <tbody v-show="newses && newses.length > 0">
              <tr v-for="(news, index) in newses">
                <td> {{ news.id }} </td>
                <td> {{ news.title }} </td>
                <td class="is-icon">
                  <figure class="image is-86x35 news-pic" @click="updateNewsPic(news)">
                    <img :src="news.pic ? news.pic: 'https://placehold.it/86x35?text=860X350'"></img>
                  </figure>
                </td>
                <td> {{ news.inserted_at | formatServerDateTime }} </td>
                <td class="is-icon">
                  <a @click.prevent="editNewsInfo(news, index)">
                    <i class="fa fa-pencil"></i>
                  </a>
                </td>
                <td class="is-icon">
                  <a @click.prevent="deleteNews(news, index)">
                    <i class="fa fa-trash-o"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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

import newsInfoDialog from 'admin/components/dialog/news/activityInfo'
const newsInfoDialogComponent = Vue.extend(newsInfoDialog)

const openNewsInfoDialog = (propsData = {
  visible: true
}) => {
  return new newsInfoDialogComponent({
    el: document.createElement('div'),
    propsData
  })
}
import Pagination from 'admin/components/Pagination'
import Tooltip from 'vue-bulma-tooltip'

export default {
  data() {
    return {
      newses: [],
      page: 1,
      total: 1,
      recordsPerPage: 10,
      loading: true
    }
  },

  mounted: function() {
    this.getNewsInfo(this.page, this.recordsPerPage)
    this.loading = true
  },

  methods: {
    getNewsInfo: async function(page, recordsPerPage) {
      let result = await this.$acs.getPagedNews(this.$route.params.appId, "activity", page,
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
      openNewsInfoDialog({
        news: news,
        visible: true,
        callback: new_news => {
          this.newses[index] = new_news
        },
      })
    },

    deleteNews: function(news, index) {
      showMessageBox({
        visible: true,
        title: this.$t('admin.titles.warning'),
        message: this.$t('admin.messages.confirmDeleteNews'),
        type: 'danger',
        onOK: _ => {
          this.loading = true
          let result = this.$acs.deleteNews(news.id)
          this.loading = false
          if (result.success) {
            this.newses.splice(index, 1)
            openNotification({
              title: this.$t('admin.titles.deleteSuccess'),
              message: this.$t('admin.news.deleteOk'),
              type: 'success',
              duration: 4500,
              container: '.notifications',
            })
          }
        },
      })

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

    addNewNews: function() {
      openNewsInfoDialog({
        news: {
          id: '',
          title: '',
          content: '',
          pic: '',
          app_id: this.$route.params.appId,
        },
        visible: true,
        callback: news => {
          this.newses.push(news)
        },
      })
    },

  },

  components: {
    Pagination,
    Tooltip,
  }

}
</script>