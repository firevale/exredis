<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent is-vertical">
      <article class="tile is-child is-12">
        <div class="columns">
          <div class="column">
            <a class="button is-primary" style="min-width: 100px" @click="changeType">
            <i class="fa fa-refresh" style="margin-right: 5px"></i> {{ $t('admin.point.cdkey.refresh') }}
          </a>
            <a class="button is-primary" style="min-width: 100px" @click="importCodes">
            <i class="fa fa-plus" style="margin-right: 5px"></i> {{ $t('admin.point.cdkey.add') }}
          </a>
          </div>
          <div class="column" style="text-align:right">
            <div class="select">
              <select v-model.trim="codeType" @change="changeType">
                <option value="">所有类型</option>
                <option v-for="tp in codeTypes" :value="tp.value">{{ tp.name }}</option>
              </select>
            </div>
          </div>
        </div>
      </article>
      <article class="tile is-child is-12">
        <div class="table-responsive">
          <div class="columns is-gapless has-text-centered" style="border-bottom: 1px solid #ccc; padding:5px; color:#aaa;">
            <div class="column">
              <p>{{ $t('admin.point.cdkey.id') }}</p>
            </div>
            <div class="column">
              <p>{{ $t('admin.point.cdkey.code') }}</p>
            </div>
            <div class="column">
              <p>{{ $t('admin.point.cdkey.code_type')}}</p>
            </div>
            <div class="column">
              <p>{{ $t('admin.point.cdkey.owner')}}</p>
            </div>
            <div class="column">
              <p>{{ $t('admin.point.cdkey.assigned_at')}}</p>
            </div>
          </div>
          <div v-if="codes">
            <div class="columns has-text-centered" style="border-bottom: 1px solid #ccc;" v-show="codes && codes.length > 0"
              v-for="(code, index) in codes" :key="code.id">
              <div class="column">
                <p>{{ code.id }}</p>
              </div>
              <div class="column">
                <p>{{ code.code }}</p>
              </div>
              <div class="column">
                <p>{{ code.code_type }}</p>
              </div>
              <div class="column">
                <p>{{ code.owner }}</p>
              </div>
              <div class="column">
                <p>{{ code.assigned_at | formatServerDateTime }}</p>
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

import codeDialog from 'admin/components/dialog/point/cdkey'
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
      codeTypes: [],
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
      let result = await this.$acs.listPMallCdkeys({
        code_type: this.codeType,
        page: page,
        records_per_page: recordsPerPage
      })
      if (result.success) {
        this.total = result.total
        this.page = page
        this.codes = result.codes
        this.codeTypes = result.code_types
      }
      this.processing = false
    },

    changeType: function() {
      this.getCodes(this.page, this.recordsPerPage)
    },

    onPageChange: function(page) {
      this.getCodes(page, this.recordsPerPage)
    },

    importCodes: function() {
      openCodeDialog({
        codeTypes: this.codeTypes,
        visible: true,
        callback: result => {
          if (result.success) {
            this.page = 1
            this.getCodes(this.page, this.recordsPerPage)
          }
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