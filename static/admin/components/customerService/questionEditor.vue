<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent is-vertical">
      <article class="tile is-child is-12">
        <div class="table-responsive">
          <table class="table is-bordered is-striped is-narrow goods-table">
            <thead v-show="questions && questions.length > 0">
              <tr>
                <th>{{ $t('admin.customerService.questionField.id') }}</th>
                <th>{{ $t('admin.customerService.questionField.title') }}</th>
                <th>{{ $t('admin.customerService.questionField.answer')}}</th>
                <th>{{ $t('admin.customerService.questionField.isHot')}}</th>
                <th>{{ $t('admin.customerService.questionField.active')}}</th>
                <th>{{ $t('admin.customerService.questionField.insertedAt')}}</th>
                <th></th>
              </tr>
            </thead>
            <tbody v-show="questions && questions.length > 0">
              <tr v-for="(item, index) in questions">
                <td> {{ item.id }} </td>
                <td> {{ item.title }} </td>
                <td> {{ item.answer }} </td>
                <td> {{ item.isHot ? $t('admin.news.publishEd') : $t('admin.news.unPublish') }} </td>
                <td> {{ item.active ? $t('admin.news.publishEd') : $t('admin.news.unPublish') }} </td>
                <td> {{ item.inserted_at | formatServerDateTime }} </td>
                <td class="is-icon">
                  <a @click.prevent="edititemInfo(item, index)">
                    <i class="fa fa-pencil"></i>
                  </a>
                  <a @click.prevent="toggleStatus(item)">
                    <i class="fa" :class="item.active ? 'fa-trash-o' : 'fa-check'"></i>
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
      questions: [],
      page: 1,
      total: 1,
      recordsPerPage: 5,
      loading: true
    }
  },

  mounted: function() {
    this.getPagedQuestions(this.page, this.recordsPerPage)
    this.loading = true
  },

  methods: {
    getPagedQuestions: async function(page, recordsPerPage) {
      let result = await this.$acs.getPagedQuestions(0, page, recordsPerPage)

      if (result.success) {
        this.total = result.total
        this.questions = result.questions
        this.page = page
      }
    },

    onPageChange: function(page) {
      this.getQuestions(page, this.recordsPerPage)
    },

    edititemInfo: function(item, index) {
      this.$router.push({
        name: 'Edititem',
        params: {
          item: item,
          index: index
        },
      })
    },

    toggleStatus: function(item) {
      showMessageBox({
        visible: true,
        title: this.$t('admin.titles.warning'),
        message: item.active ? this.$t('admin.messages.confirmUnPublishitem') : this.$t(
          'admin.messages.confirmPublishitem'),
        type: 'danger',
        onOK: _ => {
          this._toggleStatus(item)
        },
      })
    },

    _toggleStatus: async function(item) {
      this.loading = true
      let result = await this.$acs.toggleStatus(item.id)
      this.loading = false
      if (result.success) {
        item.active = !item.active
        openNotification({
          title: this.$t('admin.operateSuccess'),
          message: item.active ? this.$t('admin.item.publishOk') : this.$t(
            'admin.item.unPublishOK'),
          type: 'success',
          duration: 4500,
          container: '.notifications',
        })
      }
    },

    updateitemPic: function(item) {
      showFileUploadDialog({
        postAction: '/admin_actions/update_item_pic',
        accept: 'image/png',
        data: {
          item_id: item.id
        },
        extensions: ['png'],
        title: this.$t('admin.titles.uploaditemPic'),
        callback: response => item.pic = response.pic,
      })
    },

  },

  components: {
    Pagination,
    Tooltip,
  }

}
</script>