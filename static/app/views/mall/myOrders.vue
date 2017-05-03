<template>
  <div class="my-orders">
    <slider-nav class="flex-fixed-size" :menus="menus" :selectedValue="type" @onSelect="switchMenu" ref="nav"></slider-nav>
    <div class="flex-take-rest" style="position: relative">
      <scroller :on-load-more="loadmore" ref="scroller">
        <order-item v-for="order in orders" :order="order"></order-item>
      </scroller>
    </div>
  </div>
</template>
<script>
import Vue from '../../vue-installed'
import {
  mapGetters,
  mapActions
} from 'vuex'

import * as acs from 'common/js/acs'
import nativeApi from 'common/js/nativeApi'
import * as filter from 'common/js/filters'

import sliderNav from '../../components/sliderNav'
import scroller from 'common/components/scroller'

import orderItem from '../../components/orderItem'

export default {
  components: {
    sliderNav,
    scroller,
    orderItem
  },
  mounted: function() {
    acs.checkIsLogin(_ => {})
  },
  data: function() {
    return {
      menus: [{
          text: this.$t('mall.mine.myOrder.tabs.all'),
          value: 'all'
        }, {
          text: this.$t('mall.mine.myOrder.tabs.waitPay'),
          value: 'waitPay'
        },
        {
          text: this.$t('mall.mine.myOrder.tabs.waitConfirm'),
          value: 'waitConfirm'
        }
      ],
      type: 'all',
      page: 0,
      total: 1,
      records_per_page: 10,
      orders: []
    }
  },
  computed: {
    ...mapGetters([
      'transitionName',
    ]),
  },
  methods: {
    ...mapActions([
      'setTransitionName'
    ]),
    switchMenu: function(item, index) {
      this.resetScroller()
      this.page = 0
      this.type = item.value
      this.orders = []
    },
    resetScroller: function() {
      if (this.$refs.scroller) {
        this.$refs.scroller.$emit('reset')
      }
    },
    loadmore: async function() {
      let result = await this.$acs.fetchMyOrders(this.type, this.page + 1, this.records_per_page)

      if (result.success) {
        this.orders = this.page == 0 ? result.orders : this.orders.concat(result.orders)
        this.total = result.total
        this.page = this.page + 1

        if (this.$refs.scroller && this.page >= this.total) {
          this.$refs.scroller.$emit('all-loaded')
        }
      }
    },
  },
}
</script>