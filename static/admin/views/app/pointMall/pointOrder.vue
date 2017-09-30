<template>
  <div>
    <div class="control has-icon has-icon-left">
      <input type="text" class="input" @keyup.enter="onSearchBoxSubmit" :placeholder="$t('admin.titles.searchMallOrders')"
        v-model="keyword">
      <span class="icon is-small">
        <i v-if="searching" class="fa fa-spinner fa-spin"></i>
        <i v-else class="fa fa-search"></i>
      </span>
    </div>
    <div v-if="orders.length > 0">
      <div v-for="item in orders" :key="item.id" class="media" style="align-items: stretch; margin:1rem auto;">
        <div class="media-left" style="width:220px">
          <p> 订单号: {{item.id}}</p>
          <p>{{item.wcs_user.nickname}}</p>
          <p> {{$t('admin.mall.order.status.'+item.status) }}</p>
          <p> {{ item.inserted_at | formatServerDateTime }}</p>
        </div>
        <div class="columns" style="border:1px solid grey;margin:0; padding:0 1rem;">
          <div class="cloumn">
            <div class="media" style="padding-top:1rem;margin-right:1rem;">
              <figure class="media-left">
                <p class="image is-64x64">
                  <img :src="item.details.goods_pic | imageStaticUrl" style="width: 64px;height:64px">
                </p>
              </figure>
              <div class="media-content">
                <p>{{item.details.goods_name}} </p>
                <p :class="['currency', item.currency]">{{item.details.price | formatPoint}}</p>
                <p> X{{item.details.amount}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="media-right level" style="width:220px">
          <div class="level-item">
            <div>
              <p>{{$t('admin.mall.order.fields.total')}}:
                <span :class="['currency', item.currency]">{{item.price | formatPoint}}</span>
              </p>
            </div>
          </div>
          <div class="level-item">
            <!--<a class="button"> {{$t('admin.mall.order.viewDetail')}} </a>-->
            <router-link class="button" :to="{name: 'PMallOrderInfo', params: {orderId: item.id, orderInfo:item }}">{{$t('admin.mall.order.buttons.viewDetail')}}</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="box" v-else>
      <div class="hero-body has-text-centered">
        <div v-if="loading || initing" class="container">
          <span class="icon is-large">
            <i class="fa fa-3x fa-spinner fa-spin"></i>
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
      loading: true,
      initing: false,
      orders: [],
      page: 0,
      total: 1,
      recordsPerPage: 10,
    }
  },

  computed: {
    ...mapGetters([
      'app'
    ])
  },

  mounted: async function() {
    await this.fetchOrders()
  },

  methods: {
    onPageChange: async function(page) {
      this.page = page
      await this.fetchOrders()
    },

    onSearchBoxSubmit: async function() {
      this.page = 0;
      await this.fetchOrders()
    },

    fetchOrders: async function() {
      this.loading = true
      let result = await this.$acs.listPMallOrders({
        app_id: this.$route.params.appId,
        keyword: this.keyword,
        page: this.page + 1,
        records_per_page: this.recordsPerPage
      })

      if (result.success) {
        this.total = result.total
        this.orders = result.orders
        this.page = this.page + 1
      }

      this.loading = false
    },
  },

  components: {
    Pagination,
    Tooltip
  }
}
</script>