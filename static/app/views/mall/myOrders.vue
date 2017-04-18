<template>
  <div>
    <slider-nav :menus="menus" :selectedValue="type" @onSelect="switchMenu" ref="nav"></slider-nav>
    <div>
      <!--<order-item v-for="order in orders" :order="order"></order-item>-->
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
  mounted: async function() {
    let result = await this.$acs.fetchMyOrders('all', this.page + 1, this.records_per_page)
    if (result.success) {
      this.orders = result.orders

      this.total = result.total
      this.page = this.page + 1
    }
  },
  data: function() {
    return {
      menus: [{
          text: this.$t('mall.mine.myOrder.tabs.all'),
          value: 'all'
        }, {
          text: this.$t('mall.mine.myOrder.tabs.unPay'),
          value: 'unPay'
        },
        {
          text: this.$t('mall.mine.myOrder.tabs.unReceived'),
          value: 'unReceived'
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
      this.$router.push({
        name: item.value
      })
    }
  }
}
</script>