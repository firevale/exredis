<template>
  <div class="box tile is-ancestor" v-if="orderInfo">
    <div class="tile is-parent is-vertical">
      <div class="tile is-child">
        <h6 class="subtitle is-6">{{$t('admin.mall.order.fields.id')}}: {{orderInfo.id}}</h6>
        <h6 class="subtitle is-6">{{$t('admin.mall.order.fields.status')}}: {{$t('admin.mall.order.status.'+orderInfo.status) }}</h6>
        <h6 class="subtitle is-6">{{$t('admin.mall.order.fields.inserted_at')}}: {{orderInfo.inserted_at | formatServerDateTime}}</h6>
        <h6 class="subtitle is-6">{{$t('admin.point.goods.nickname')}}: {{orderInfo.wcs_user.nickname}}</h6>
      </div>
      <div class="tile is-child">
        <h6 class="subtitle is-6">{{$t('admin.mall.order.fields.address.name')}}: {{orderInfo.address.name}}</h6>
        <h6 class="subtitle is-6">{{$t('admin.mall.order.fields.address.mobile')}}: {{orderInfo.address.mobile}}</h6>
        <h6 class="subtitle is-6">{{$t('admin.mall.order.fields.address.address')}}: {{orderInfo.address.area}}{{orderInfo.address.address}}</h6>
      </div>
      <div class="title is-child">
        <div class="box columns" style="margin:0;padding:.5rem;">
          <div class="cloumn">
            <div class="media" style="margin-right:1rem;">
              <figure class="media-left">
                <p class="image is-64x64">
                  <img :src="orderInfo.details.goods_pic  | imageStaticUrl" style="width: 64px;height:64px">
                </p>
              </figure>
              <div class="media-content">
                <h6 class="subtitle is-6">{{orderInfo.details.goods_name}}</h6>
                <h6 class="subtitle is-6" :class="['currency', orderInfo.currency]">{{orderInfo.details.price | formatPoint}}</h6>
                <h6 class="subtitle is-6"> X{{orderInfo.details.amount}} </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tile is-child">
        <h6 class="subtitle is-6">{{$t('admin.mall.order.fields.total')}}: <span :class="['currency', orderInfo.currency]">{{orderInfo.price | formatPoint}}</span></h6>
      </div>
      <div class="tile is-child">
        <a class="button is-white" @click.prevent="onBack">
          <span class="icon is-small"><i class="fa fa-backward"></i></span>
          <span>{{ $t('common.return') }}</span>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import {
  required,
  minLength,
  maxLength
} from 'vuelidate/lib/validators'

import {
  openNotification,
  processAjaxError
} from 'admin/miscellaneous'

import {
  showMessageBox
} from 'admin/components/dialog/messageBox'

const touchMap = new WeakMap()

export default {
  components: {},

  mounted: async function() {
    let result = await this.$acs.getPMallOrder({
      order_id: this.$route.params.orderId
    })

    if (result.success) {
      this.orderInfo = result.order
    }
  },

  data() {
    return {
      orderInfo: undefined,
      refundMoney: '',
    }
  },

  methods: {
    isNull: function() {
      return orderInfo.transaction_id == ""
    },
    onBack: function() {
      this.$router.go(-1)
    },
  }
}
</script>
<style lang="scss" scoped>
.tile .subtitle:not(:last-child) {
  margin-bottom: .8rem;
}

.media-content>.subtitle:not(:last-child) {
  margin-bottom: .5rem;
}

.box {
  border-radius: 0;
}
</style>