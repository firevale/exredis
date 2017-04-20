<template>
  <div class="my-orders">
    <div class="card">
      <header class="card-header has-bottom-line">
        <div class="card-header-title is-vertical">
          <p class="is-thickness"> {{$t('mall.order.fields.address.name') }}：{{order.address.name}} </p>
          <p class="is-thickness"> {{$t('mall.order.fields.address.mobile') }}：{{order.address.mobile}} </p>
          <p class="is-thickness"> {{$t('mall.order.fields.address.address') }}：{{order.address.area}}{{order.address.address}} </p>
        </div>
        <p class="card-header-icon">
          >
        </p>
      </header>
      <div class="card-content has-bottom-line">
        <div class="columns is-mobile is-multiline" style="margin:0;">
          <div v-for="detail in order.details" class="column is-narrow">
            <div class="media" style="margin-right:1rem;">
              <figure class="media-left">
                <p class="image is-64x64">
                  <img :src="detail.goods_pic">
                </p>
              </figure>
              <div class="media-content">
                <p>{{detail.goods_name}}</p>
                <p class="is-primary" :class="['currency', order.currency]">{{detail.price | formatPrice}}</p>
                <p>X{{detail.amount}} </p>
              </div>
            </div>
          </div>
          <p class="column is-12 has-text-right is-primary">
            {{$t('mall.order.fields.total') }}:
            <span :class="['currency', order.currency]">{{order.price | formatPrice}}</span>
            ({{$t('mall.order.fields.with_postage')}}
            <span :class="['currency', order.currency]">{{order.postage | formatPrice}}</span>
            )
          </p>
        </div>
      </div>
      <footer class="card-footer has-bottom-line">
        <div class="card-footer-item is-vertical">
          <p class="is-thickness">{{$t('mall.order.fields.id') }}：{{order.id}} </p>
          <p class="is-thickness">{{$t('mall.order.fields.status') }}：{{$t('mall.order.status.'+order.status) }} </p>
          <p class="is-thickness">{{$t('mall.order.fields.inserted_at') }}：{{order.inserted_at | formatServerDateTime}} </p>
        </div>
      </footer>
    </div>
    <div>
      <button v-if="order.status==0" class="button is-fullwidth is-info is-medium">
        {{$t('mall.order.wechatPay') }}
      </button>
      <button v-if="order.status==2" class="button is-fullwidth is-info is-medium">
        {{$t('mall.order.reciept') }}
      </button>
      <button v-if="order.status==1 || order.status==4" class="button is-fullwidth is-info is-medium">
        {{$t('mall.order.reOrder') }}
      </button>
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