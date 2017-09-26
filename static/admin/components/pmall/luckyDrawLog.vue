<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent is-vertical">
      <div class="field">
        <div class="control">
          <label class="checkbox">
            <input type="checkbox" v-model.trim="showOnlyWin"> 只看中奖记录
          </label>
        </div>
      </div>
      <article class="tile is-child is-12">
        <div class="table-responsive">
          <div class="columns is-gapless has-text-centered" style="border-bottom: 1px solid #ccc; padding:5px; color:#aaa;">
            <div class="column">
              <p>{{ $t('admin.point.drawLog.id') }}</p>
            </div>
            <div class="column">
              <p>{{ $t('admin.point.drawLog.name') }}</p>
            </div>
            <div class="column">
              <p>{{ $t('admin.point.drawLog.user') }}</p>
            </div>
            <div class="column">
              <p>{{ $t('admin.point.drawLog.status')}}</p>
            </div>
            <div class="column">
              <p>{{ $t('admin.point.drawLog.paidAt')}}</p>
            </div>
            <div class="column">
              <p>{{ $t('admin.point.drawLog.operate')}}</p>
            </div>
          </div>
          <div v-if="orders">
            <div class="columns has-text-centered" style="border-bottom: 1px solid #ccc;" v-show="orders && orders.length > 0"
              v-for="(order, index) in orders" :key="order.id">
              <div class="column">
                <p>{{ order.id }}</p>
              </div>
              <div class="column">
                <p>{{ order.name }}</p>
              </div>
              <div class="column">
                <p>{{ order.wcp_user.nickname }}</p>
              </div>
              <div class="column">
                <p>{{ getStatus(order.status) }}</p>
              </div>
              <div class="column">
                <p>{{ order.paid_at | formatServerDateTime }}</p>
              </div>
              <div class="column">
                <a @click.prevent="editOrder(order, index)">
                  <i class="fa fa-pencil"></i>
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
  openNotification,
  processAjaxError
} from 'admin/miscellaneous'

import {
  showMessageBox
} from 'admin/components/dialog/messageBox'

import Pagination from 'admin/components/Pagination'
import orderDialog from 'admin/components/dialog/point/drawOrder'
const orderDialogComponent = Vue.extend(orderDialog)

const openDrawOrderDialog = (propsData = {
  visible: true
}) => {
  return new orderDialogComponent({
    i18n,
    el: document.createElement('div'),
    propsData
  })
}

export default {
  data() {
    return {
      orders: [],
      page: 1,
      total: 1,
      recordsPerPage: 20,
      loading: false,
      showOnlyWin: true
    }
  },

  created: async function() {
    this.getOrders(this.page, this.recordsPerPage)
  },

  methods: {
    getStatus(status) {
      switch (status) {
        case -1:
          return '已关闭'
        case 0:
          return '待支付'
        case 1:
          return '已支付'
        case 2:
          return '待收货'
        case 4:
          return '已完成'
      }
    },

    getOrders: async function(page, recordsPerPage) {
      this.loading = true
      let result = await this.$acs.listPMallLuckyDrawOrders({
        page: page,
        records_per_page: recordsPerPage
      })
      this.loading = false
      if (result.success) {
        this.total = result.total_page
        this.orders = result.orders
        this.page = page
      }
    },

    editOrder: function(order, index) {
      console.log(order)
      openDrawOrderDialog({
        order: order,
        visible: true,
        // callback: result => {
        //   this.orders[index] = result
        // },
      })
    },

    onPageChange: function(page) {
      this.getorders(page, this.recordsPerPage)
    },
  },

  components: {
    Pagination,
  }

}
</script>