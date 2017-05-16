<template>
  <div>
    <div class="control has-icon has-icon-left">
      <input type="text" class="input" @keyup.enter="onSearchBoxSubmit" :placeholder="$t('admin.titles.searchOrders')" v-model="keyword">
      <span class="icon is-small">
        <i v-if="searching" class="fa fa-spinner fa-spin"></i>
        <i v-else class="fa fa-search"></i>
      </span>
    </div>
    <div class="tile is-ancestor" v-if="!initing && orders.length > 0">
      <div class="tile is-parent is-vertical">
        <article class="tile is-child is-12">
          <div class="table-responsive">
            <table class="table is-narrow goods-table">
              <tbody>
                <template v-for="order in orders">
                  <tr>
                    <td class="is-icon" rowspan="2">
                      <i :class="getOrderPlatformIcon(order)" style="font-size: 21px"></i>
                    </td>
                    <td class="is-icon" rowspan="2">
                      <tooltip :label="getAppName(order)" placement="top">
                        <figure class="image is-32x32" style="display: block">
                          <img :src="getAppIcon(order)"></img>
                        </figure>
                      </tooltip>
                    </td>
                    <td class="is-icon" rowspan="2">
                      <tooltip :label="getGoodsName(order)" placement="top">
                        <figure class="image is-32x32" style="display: block">
                          <img :src="getGoodsIcon(order)"></img>
                        </figure>
                      </tooltip>
                    </td>
                    <td style="border-bottom: none"> {{ order.user_id }} </td>
                    <td rowspan="2" style="min-width: 60px; color: firebrick">
                      <span class="icon" style="width: 1.2rem; height: 1rem; line-height: 1rem; vertical-align: middle; font-size: 18px">
                        <i :class="`fa fa-${order.transaction_currency.toLowerCase()}`"></i>
                      </span>{{ (order.fee / 100).toFixed(0) }}
                    </td>
                    <td style="border-bottom: none">
                      {{ $t('admin.label.createdAt') + ': ' }} {{ order.inserted_at | formatServerDateTime }}
                    </td>
                    <td style="border-bottom: none">
                      {{ $t('admin.label.paidAt') + ': ' }} {{ order.paid_at | formatServerDateTime }}
                    </td>
                    <td style="border-bottom: none">
                      {{ $t('admin.label.deliveredAt') + ': ' }} {{ order.deliver_at | formatServerDateTime }}
                    </td>
                  </tr>
                  <tr>
                    <td> {{ order.zone_id }}区 </td>
                    <td> {{ $t('admin.label.transactionId') + ': ' }} {{ getOrderTransactionId(order) }} </td>
                    <td colspan="2"> {{ $t('admin.label.cpOrderId') + ': ' }} {{ order.cp_order_id }} </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </article>
        <article class="tile is-child is-12">
          <pagination :page-count="total" :current-page="page" :on-page-change="onPageChange"></pagination>
        </article>
      </div>
    </div>
    <div class="box" v-else>
      <div class="hero-body has-text-centered">
        <div v-if="loading || initing" class="container">
          <span class="icon is-large">
            <i class="fa fa-spinner fa-spin"></i>
          </span>
          <h2 class="subtitle" style="margin-top: 20px">
            {{ $t('admin.titles.loading') }}
          </h2>
        </div>
        <div v-else class="container">
          <h1 class="title">
            {{ $t('admin.titles.oops') }}
          </h1>
          <h2 class="subtitle">
            {{ $t('admin.titles.noOrderToDisplay') }}
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  processAjaxError
} from 'admin/miscellaneous'

import {
  mapGetters,
  mapActions
} from 'vuex'

import * as getters from 'admin/store/getters'
import Pagination from 'admin/components/Pagination'
import Tooltip from 'vue-bulma-tooltip'

export default {
  data: function() {
    return {
      keyword: "",
      searching: false,
      loading: false,
      initing: false,
      orders: [],
      page: 1,
      total: 1,
      recordsPerPage: 10,
    }
  },

  computed: {
    ...mapGetters([
      'goods', 'app'
    ]),
  },

  mounted: function() {
    if (this.app) {
      this.fetchOrders(this.app.id, this.page, this.recordsPerPage)
    }
  },

  watch: {
    app: function(newVal) {
      if (typeof newVal === 'object' && typeof newVal.id === 'string') {
        this.page = 1
        this.total = 1
        this.fetchOrders(newVal.id, this.page, this.recordsPerPage)
      }
    }
  },

  methods: {
    getAppIcon: function(order) {
      if (this.app && this.app.icon) {
        return this.app.icon
      } else {
        return 'https://placehold.it/32x32?text=' + this.app.name
      }
    },

    getAppName: function(order) {
      return this.app.name
    },

    getGoodsIcon: function(order) {
      let goodsInfo = this.goods[`${order.app_id}-${order.goods_id}`]
      if (goodsInfo && goodsInfo.icon) {
        return goodsInfo.icon
      } else {
        return 'https://placehold.it/32x32?text=未上传'
      }
    },

    getGoodsName: function(order) {
      let goodsInfo = this.goods[`${order.app_id}-${order.goods_id}`]
      if (goodsInfo && goodsInfo.name) {
        return goodsInfo.name
      } else {
        return order.goods_name
      }
    },

    getAppCurrency: function(order) {
      if (this.app && this.app.currency) {
        return this.app.currency
      } else {
        return ''
      }
    },

    getOrderTransactionId: function(order) {
      if (order.transaction_id.startsWith('empty.')) {
        return ''
      } else {
        return order.transaction_id
      }
    },

    getOrderPlatformIcon: function(order) {
      let result = 'fa fa-'
      switch (order.platform) {
        case 'android':
          result = result + 'android'
          break
        case 'ios':
          result = result + 'apple '
          break
        case 'wp8':
          result = result + 'windows '
          break
        default:
          result = result + 'apple '
          break
      }

      switch (order.status) {
        case 0:
          result = result + ' is-primary'
          break;
        case 1:
          result = result + ' is-info'
          break;
        case 2:
          result = result + ' is-success'
          break;
        case 3:
          result = result + ' is-danger'
          break;
      }

      return result
    },

    onPageChange: function(page) {
      this.fetchOrders(this.app.id, page, this.recordsPerPage)
    },

    onSearchBoxSubmit: function() {
      if (this.keyword) {
        this.searchOrders(1)
      } else {
        this.fetchOrders(1, this.recordsPerPage)
      }
    },

    fetchOrders: async function(app_id, page, recordsPerPage) {
      this.loading = true
      let result = await this.$acs.fetchOrders({
        app_id,
        page,
        records_per_page: recordsPerPage
      })

      if (result.success) {
        this.total = result.total
        this.orders = result.orders
        this.page = page
      }

      this.loading = false
    },

    searchOrders: async function(page) {
      this.searching = true
      let result = await this.$acs.searchOrders({
        app_id: this.app.id,
        keyword: this.keyword,
        page: page,
        records_per_page: this.recordsPerPage
      })
      if (result.success) {
        this.total = result.total
        this.orders = result.orders
        this.page = page

      }
      this.searching = false
    },
  },

  components: {
    Pagination,
    Tooltip
  }
}
</script>