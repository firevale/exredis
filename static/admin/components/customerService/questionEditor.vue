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
                  <a @click.prevent="replyQuestion(item, index)">
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

import replyQuestion from 'admin/components/dialog/customerService/replyQuestion'
const replyQuestionDialog = Vue.extend(replyQuestion)

const openDialog = (propsData = {
  visible: true
}) => {
  return new replyQuestionDialog({
    el: document.createElement('div'),
    propsData
  })
}

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
    replyQuestion: function(question, index) {
      openDialog({
        question: question,
        visible: true,
        callback: question => {
          this.questions[index] = question
        },
      })
    },

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