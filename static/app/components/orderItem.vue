<template>
  <v-touch class="card" @tap="viewOrderDetail(order)">
    <header class="card-header">
      <p class="card-header-title">
        {{$t('mall.order.fields.id') }}:{{order.id}}
      </p>
      <p class="card-header-icon">
        {{$t('mall.order.status.'+order.status) }}
      </p>
    </header>
    <div class="card-content">
      <div class="columns is-mobile is-multiline" style="margin:0;padding:.5rem;">
        <div v-for="detail in order.details" class="column is-narrow">
          <div class="media is-mobile" style="margin-right:1rem;">
            <figure class="media-left">
              <p class="image is-64x64">
                <img :src="detail.goods_pic.split('|')[0]">
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
    <footer class="card-footer">
      <p class="card-footer-item has-text-right is-primary"> {{$t('mall.order.fields.total') }}:
        <span :class="['currency', order.currency]">{{order.price | formatPrice}}</span>
        ({{$t('mall.order.fields.with_postage')}}
        <span :class="['currency', order.currency]">{{order.postage | formatPrice}}</span>
        )
      </p>
    </footer>
  </v-touch>
</template>
<script>
import * as filter from 'common/js/filters'
import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  props: {
    order: {
      type: Object,
      default: null,
    },
  },
  methods: {
    ...mapActions([
      'updateSelectedOrder'
    ]),
    viewOrderDetail: function(order) {
      let orderItem = {}
      orderItem.id = order.id
      orderItem.snapshots=order.snapshots
      orderItem.price = order.price
      orderItem.final_price = order.final_price
      orderItem.currency = order.currency
      orderItem.status = order.status
      orderItem.postage = order.postage
      orderItem.inserted_at = order.inserted_at
      orderItem.address = order.address
      orderItem.details = order.details

      this.updateSelectedOrder(orderItem)
      this.$router.push({
        name: 'myOrderDetail',
        params: {
          orderId: order.id
        }
      })
    }
  }

}
</script>