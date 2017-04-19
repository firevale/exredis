<template>
  <div class="my-orders">
    <div class="card">
      <header class="card-header has-bottom-line">
        <div class="card-header-title is-vertical">
          <p> {{$t('mall.order.fields.user_address.name') }}:{{order.id}} </p>
          <p> {{$t('mall.order.fields.user_address.mobile') }}:{{order.id}} </p>
          <p> {{$t('mall.order.fields.user_address.address') }}:{{order.id}} </p>
        </div>
        <p class="card-header-icon">
          >
        </p>
      </header>
      <div class="card-content has-bottom-line">
        <div class="columns" style="margin:0;padding:.5rem;">
          <div v-for="detail in order.details" class="cloumn">
            <div class="media" style="margin-right:1rem;">
              <figure class="media-left">
                <p class="image is-64x64">
                  <img :src="detail.goods_pic">
                </p>
              </figure>
              <div class="media-content">
                <p>{{detail.goods_name}}</p>
                <p class="is-primary" :class="['currency', order.currency]">{{detail.price | formatPrice}}</p>
                <p> X{{detail.amount}} </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="card-footer has-bottom-line">
        <div class="card-footer-item is-vertical">
          <p> {{$t('mall.order.fields.user_address.name') }}:{{order.id}} </p>
          <p> {{$t('mall.order.fields.user_address.mobile') }}:{{order.id}} </p>
          <p> {{$t('mall.order.fields.user_address.address') }}:{{order.id}} </p>
        </div>
      </footer>
    </div>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import * as utils from 'common/js/utils'

export default {
  components: {},
  data() {
    return {
      order: undefined
    }
  },
  mounted: async function() {
    let result = await this.$acs.fetchMallOrder({
      order_id: this.$route.params.orderId
    })

    if (result.success) {
      this.order = result.order
    }
  },

  computed: {},
  methods: {

  }
}
</script>