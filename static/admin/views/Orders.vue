<template>
  <div>
    <div class="control has-icon has-icon-left">
      <input type="text"
             class="input"
             @keyup.enter="onSearchBoxSubmit"
             :placeholder="$t('admin.titles.searchOrders')"
             v-model="keyword">
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
                    <td rowspan="2"> 
                      <span class="icon" style="color: #c0c0c0; width: 1.2rem; height: 1rem; line-height: 1rem; vertical-align: middle; font-size: 18px">
                        <i :class="`fa fa-${order.transaction_currency.toLowerCase()}`"></i>
                      </span>{{ (order.fee / 100).toFixed(0) }} 
                    </td>
                    <td style="border-bottom: none"> 
                      {{ $t('admin.label.createdAt') + ': ' }} {{ order.created_at | formatServerDateTime }} 
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
  } from 'admin/common/utils'

  import { mapGetters, mapActions } from 'vuex'
  import * as getters from 'admin/store/getters'
  import Pagination from 'admin/components/Pagination'
  import Tooltip from 'vue-bulma-tooltip'

  export default {
    data: function() {
      return {
        keyword: "",
        searching: false,
        loading: true,
        initing: false,
        orders: [],
        page: 1,
        total: 1,
        recordsPerPage: 10,
      }
    },
  
    computed: {
      ...mapGetters([
        'appHash', 'goods'
      ]),
    },

    mounted : function() {
      if (Object.keys(this.appHash).length > 0) {
        this.fetchOrders(this.page, this.recordsPerPage) 
        this.loading = true
      }
      else {
        this.initing = true
      }
    },

    watch: {
      appHash: function() {
        this.initing = false
        this.loading = true
        this.fetchOrders(this.page, this.recordsPerPage) 
      }
    },

    methods: {
      getAppIcon: function(order) {
        let app = this.appHash[order.app_id]
        if (app && app.icon) {
          return app.icon
        }
        else {
          return 'https://placehold.it/32x32?text=' + app.name 
        }
      },

      getAppName: function(order) {
        let app = this.appHash[order.app_id]
        return app.name
      },

      getGoodsIcon: function(order) {
        let goodsInfo = this.goods[`${order.app_id}-${order.goods_id}`]
        if (goodsInfo && goodsInfo.icon) {
          return goodsInfo.icon 
        }
        else {
          return 'https://placehold.it/32x32?text=未上传' 
        }
      },

      getGoodsName: function(order) {
        let goodsInfo = this.goods[`${order.app_id}-${order.goods_id}`]
        if (goodsInfo && goodsInfo.name) {
          return goodsInfo.name 
        }
        else {
          return order.goods_name
        }
      },      

      getAppCurrency: function(order) {
        let app = this.appHash[order.app_id]
        if (app && app.currency) {
          return app.currency
        }
        else {
          return ''
        }
      },

      getOrderTransactionId: function(order) {
        if (order.transaction_id.startsWith('empty.')) {
          return ''
        }
        else {
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
        this.fetchOrders(page, this.recordsPerPage)
      },

      onSearchBoxSubmit: function() {
        if (this.keyword) {
          this.searchOrders(1) 
        } 
        else {
          this.fetchOrders(1, this.recordsPerPage)
        }
      },

      fetchOrders: function(page, recordsPerPage) {
        this.$http.post('/admin_actions/fetch_orders', {
          page, 
          records_per_page: recordsPerPage
        }).then(res => res.json())
          .then(result => {
            this.loading = false
            if (result.success) {
              this.total = result.total
              this.orders = result.orders
              this.page = page
            } else {
              return Promise.reject(result)
            }
          }).catch(e => {
            this.loading = false
            processAjaxError(e)
          })
      },

      searchOrders: function(page) {
        this.searching = true
        this.$http.post('/admin_actions/search_orders', {
          keyword: this.keyword,
          page: page, 
          records_per_page: this.recordsPerPage
        }).then(res => res.json())
          .then(result => {
            this.searching = false
            if (result.success) {
              this.total = result.total
              this.orders = result.orders
              this.page = page
            } else {
              return Promise.reject(result)
            }
          }).catch(e => {
            this.searching = false
            processAjaxError(e)
          })           
      },
    },

    components: {
      Pagination,
      Tooltip
    }
  }
</script>