<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent is-vertical">
      <article class="tile is-child is-12">
        <div class="column">
          <a class="button is-primary" style="min-width: 100px" @click="addNewQuestion">
            <i class="fa fa-plus" style="margin-right: 5px"></i> {{ $t('admin.point.question.add') }}
          </a>
        </div>
      </article>
      <article class="tile is-child is-12">
        <div class="table-responsive">
          <div class="columns is-gapless has-text-centered" style="border-bottom: 1px solid #ccc; padding:5px; color:#aaa;">
            <div class="column">
              <p>{{ $t('admin.point.question.id') }}</p>
            </div>
            <div class="column">
              <p>{{ $t('admin.point.question.question') }}</p>
            </div>
            <div class="column">
              <p>{{ $t('admin.point.question.reads')}}</p>
            </div>
            <div class="column">
              <p>{{ $t('admin.point.question.bingo')}}</p>
            </div>
            <div class="column">
              <p>{{ $t('admin.point.question.edit')}}</p>
            </div>
            <div class="column">
              <p>{{ $t('admin.point.question.delete')}}</p>
            </div>
          </div>
          <div v-if="questions">
            <div class="columns has-text-centered" style="border-bottom: 1px solid #ccc;" v-show="questions && questions.length > 0"
              v-for="(question, index) in questions" :key="question.id">
              <div class="column">
                <p>{{ question.id }}</p>
              </div>
              <div class="column">
                <p>{{ question.question }}</p>
              </div>
              <div class="column">
                <p>{{ question.reads }}</p>
              </div>
              <div class="column">
                <p>{{ question.bingo }}</p>
              </div>
              <div class="column">
                <a @click.prevent="editQuestion(question, index)">
                  <i class="fa fa-pencil"></i>
                </a>
              </div>
              <div class="column">
                <a @click.prevent="delQuestion(question.id, index)">
                  <i class="fa fa-trash-o"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
      <article class="tile is-child is-12">
        <pagination :page-count="total" :current-page="page" :on-page-change="onPageChange"></pagination>
      </article>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import {
  i18n
} from 'admin/vue-i18n'

import {
  showMessageBox
} from 'admin/components/dialog/messageBox'

import Pagination from 'admin/components/Pagination'
import Tooltip from 'vue-bulma-tooltip'

import questionDialog from 'admin/components/dialog/point/question'
const questionDialogComponent = Vue.extend(questionDialog)

const openQuestionDialog = (propsData = {
  visible: true
}) => {
  return new questionDialogComponent({
    i18n,
    el: document.createElement('div'),
    propsData
  })
}

export default {
  data() {
    return {
      questions: [],
      page: 1,
      total: 1,
      recordsPerPage: 20,
      processing: false
    }
  },

  created: function() {
    this.getQuestions(this.page, this.recordsPerPage)
  },

  methods: {
    getQuestions: async function(page, recordsPerPage) {
      this.processing = true
      let result = await this.$acs.listPmallQuestions({
        page: page,
        records_per_page: recordsPerPage
      })
      if (result.success) {
        this.total = result.total_page
        this.page = page
        this.questions = result.questions
      }
      this.processing = false
    },

    onPageChange: function(page) {
      this.getQuestions(page, this.recordsPerPage)
    },

    editQuestion: function(question, index) {
      openQuestionDialog({
        question: question,
        visible: true,
        callback: result => {
          this.questions[index] = result
        },
      })
    },

    delQuestion: function(questionId, index) {
      showMessageBox({
        visible: true,
        title: this.$t('admin.titles.warning'),
        message: this.$t('admin.point.question.confirmDelete'),
        type: 'danger',
        onOK: async _ => {
          this.processing = true
          let result = await this.$acs.deletePmallQuestion({
            question_id: questionId,
          }, this.$t('admin.point.question.configDeleted'))
          if (result.success) {
            this.questions.splice(index, 1)
          }
          this.processing = false
        },
      })
    },

    addNewQuestion: function() {
      openQuestionDialog({
        question: {
          id: '0',
          question: '',
          correct: '',
          a1: '',
          a2: '',
          a3: '',
          a4: '',
          a5: '',
          a6: '',
          app_id: this.$route.params.appId
        },
        visible: true,
        callback: result => {
          this.questions.push(result)
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