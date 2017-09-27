<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent is-vertical">
      <article class="tile is-child is-12">
        <div class="column">
          <a class="button is-primary" style="min-width: 100px" @click="importCodes">
            <i class="fa fa-plus" style="margin-right: 5px"></i> {{ $t('admin.point.question.add') }}
          </a>
        </div>
      </article>
      <article class="tile is-child is-12">
        <div class="table-responsive">
          <div class="columns is-gapless has-text-centered" style="border-bottom: 1px solid #ccc; padding:5px; color:#aaa;">
            <div class="column is-6">
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
          <div v-if="codes">
            <div class="columns has-text-centered" style="border-bottom: 1px solid #ccc;" v-show="codes && codes.length > 0"
              v-for="(question, index) in codes" :key="question.id">
              <div class="column is-6">
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

import codeDialog from 'admin/components/dialog/point/redeemCode'
const codeDialogComponent = Vue.extend(codeDialog)

const openCodeDialog = (propsData = {
  visible: true
}) => {
  return new codeDialogComponent({
    i18n,
    el: document.createElement('div'),
    propsData
  })
}

export default {
  data() {
    return {
      codes: [],
      codeType: '',
      page: 1,
      total: 1,
      recordsPerPage: 20,
      processing: false
    }
  },

  created: function() {
    this.getCodes(this.page, this.recordsPerPage)
  },

  methods: {
    getCodes: async function(page, recordsPerPage) {
      this.processing = true
      let result = await this.$acs.listPMallRedeemCodes({
        code_type: this.codeType,
        page: page,
        records_per_page: recordsPerPage
      })
      if (result.success) {
        this.total = result.total
        this.page = page
        this.codes = result.codes
      }
      this.processing = false
    },

    onPageChange: function(page) {
      this.getCodes(page, this.recordsPerPage)
    },

    importCodes: function() {
      openCodeDialog({
        codeType: '',
        visible: true,
        callback: result => {
          this.codes.unshift(result.codes)
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