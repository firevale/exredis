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
                  <figure class="image is-86x35 news-pic">
                    <img :src="news.pic ? news.pic: 'https://placehold.it/86x35?text=860X350'"></img>
                  </figure>
                </td>
                <td> {{ news.inserted_at | formatServerDateTime }} </td>
                <td class="is-icon">
                  <a @click.prevent="editActivityInfo(news, index)">
                    <i class="fa fa-pencil"></i>
                  </a>
                </td>
                <td class="is-icon">
                  <a @click.prevent="deleteActivity(news, index)">
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

import activityInfoDialog from 'admin/components/dialog/forum/activityInfo'
const activityInfoDialogComponent = Vue.extend(activityInfoDialog)

const openActivityInfoDialog = (propsData = {
  visible: true
}) => {
  return new activityInfoDialogComponent({
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
      loading: true,
    }
  },

  mounted: function() {
    this.getActivityInfo(this.page, this.recordsPerPage)
    this.loading = true
  },

  methods: {
    getActivityInfo: async function(page, recordsPerPage) {
      let app_id = this.$route.params.appId
      let result = await this.$acs.getPagedNews(app_id, "activity", page, recordsPerPage)

      if (result.success) {
        this.total = result.total
        this.newses = result.news
        this.page = page
      }
    },

    onPageChange: function(page) {
      this.getActivityInfo(page, this.recordsPerPage)
    },

    editActivityInfo: function(news, index) {
      openActivityInfoDialog({
        news: news,
        visible: true,
        callback: new_news => {
          this.newses[index] = new_news
        },
      })
    },

    deleteActivity: function(news, index) {

    },

    addNewNews: function() {
      openActivityInfoDialog({
        news: {
          id: '',
          title: '',
          content: '',
          pic: '',
          forum_id: this.forumId,
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