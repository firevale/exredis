<template>
  <div class="box tile is-ancestor" v-if="orderInfo">
    <div class="tile is-parent is-vertical">
      <div class="tile is-child">
        <h6 class="subtitle is-6">{{$t('admin.mall.order.fields.id')}}:{{orderInfo.id}}</h6>
        <h6 class="subtitle is-6">{{$t('admin.mall.order.fields.status')}}: {{$t('admin.mall.order.status.'+orderInfo.status) }}</h6>
        <h6 class="subtitle is-6">{{$t('admin.mall.order.fields.inserted_at')}}:{{orderInfo.inserted_at |formatServerDateTime}}</h6>
        <h6 class="subtitle is-6">{{$t('admin.mall.order.fields.email')}}:{{orderInfo.user.email}}</h6>
      </div>
      <div class="tile is-child">
        <h6 class="subtitle is-6">{{$t('admin.mall.order.fields.address.name')}}:{{orderInfo.address.name}}</h6>
        <h6 class="subtitle is-6">{{$t('admin.mall.order.fields.address.mobile')}}:{{orderInfo.address.mobile}}</h6>
        <h6 class="subtitle is-6">{{$t('admin.mall.order.fields.address.address')}}:{{orderInfo.address.area}}{{orderInfo.address.address}}</h6>
      </div>
      <div class="title is-child">
        <div class="box columns" style="margin:0;padding:.5rem;">
          <div v-for="detail in orderInfo.details" class="cloumn">
            <div class="media" style="margin-right:1rem;">
              <figure class="media-left">
                <p class="image is-64x64">
                  <img :src="detail.goods_pic" style="width: 64px;height:64px">
                </p>
              </figure>
              <div class="media-content">
                <h6 class="subtitle is-6">{{detail.goods_name}}</h6>
                <h6 class="subtitle is-6" :class="['currency', orderInfo.currency]">{{detail.price | formatPrice}}</h6>
                <h6 class="subtitle is-6"> X{{detail.amount}} </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tile is-child">
        <h6 class="subtitle is-6">{{$t('admin.mall.order.fields.postage')}}:<span :class="['currency', orderInfo.currency]">{{orderInfo.postage | formatPrice}}</span></h6>
        <h6 class="subtitle is-6">{{$t('admin.mall.order.fields.total')}}:<span :class="['currency', orderInfo.currency]">{{orderInfo.price | formatPrice}}</span></h6>
        <span class="subtitle is-6">{{$t('admin.mall.order.fields.paid_type.label')}}:{{$t('admin.mall.order.fields.paid_type.'+orderInfo.paid_type)}}</span>
        <span class="subtitle is-6">{{$t('admin.mall.order.fields.transaction_id')}}:{{orderInfo.transaction_id}}</span>
      </div>
      <div v-if="orderInfo.status==0 || orderInfo.status==-1" class="tile is-child">
        <div class="field is-grouped">
          <h6 style="align-self:center;"> {{$t('admin.mall.order.fields.transaction_id')}}： </h6>
          <p class="control is-expanded">
            <input class="input" type="text" v-model.trim="orderInfo.transaction_id">
          </p>
          <p class="control">
            <button class="button is-info" :disabled="!orderInfo.transaction_id" @click.prevent="updateOrderPayed">{{$t('admin.mall.order.buttons.payed')}}</button>
          </p>
        </div>
      </div>
      <div v-if="orderInfo.status==2" class="tile is-child">
        <div class="field is-grouped">
          <h6 style="align-self:center;"> {{$t('admin.mall.order.fields.refundMoney')}}： </h6>
          <p class="control">
            <input class="input" type="text" style="width:100px" v-model.trim="refundMoney">
          </p>
          <p class="control">
            <button class="button is-info" :disabled="!refundMoney" @click.prevent="refundOrder">{{$t('admin.mall.order.buttons.refund')}}</button>
          </p>
        </div>
      </div>
      <div class="tile is-child">
        <a class="button is-white" @click.prevent="onBack">
          <span class="icon is-small"><i class="fa fa-backward"></i></span>
          <span>{{ $t('common.return') }}</span>
        </a>
      </div>
    </div>
    <div class="tile is-parent is-vertical">
      <h6 class="subtitle is-6">历史记录:</h6>
      <div class="box" v-for="op in orderInfo.op_logs" style="width: 400px">
        <h6 class="subtitle is-6">{{$t('admin.mall.op_logs.inserted_at')}}:{{op.inserted_at | formatServerDateTime  }}</h6>
        <h6 class="subtitle is-6">{{$t('admin.mall.op_logs.op_user')}}:{{getOpUser(orderInfo.user.email, op.admin_user)}}</h6>
        <h6 class="subtitle is-6">{{$t('admin.mall.op_logs.content')}}:
          {{$t('admin.mall.order.status.'+op.status) }}
          {{$t('admin.mall.op_logs.change_to') }}
          {{$t('admin.mall.order.status.'+op.changed_status) }}</h6>
        <h6 v-if="op.content && op.content.transaction_id" class="subtitle is-6">{{$t('admin.mall.op_logs.transaction_id')}}:{{op.content.transaction_id}}</h6>
        <h6 v-if="op.content && op.content.refundMoney" class="subtitle is-6">{{$t('admin.mall.op_logs.refundMoney')}}:{{op.content.refundMoney}}</h6>
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
    let result = await this.$acs.fetchMallOrder({
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
  watch: {

  },

  methods: {
    getOpUser: function(user, adminUser) {
      if (adminUser) {
        return adminUser + '[' + this.$t('admin.mall.op_logs.op_admin') + ']';
      } else {
        return user;
      }
    },
    isNull: function() {
      return orderInfo.transaction_id == ""
    },
    onBack: function() {
      this.$router.go(-1)
    },
    updateOrderPayed: function() {
      showMessageBox({
        visible: true,
        title: this.$t('admin.titles.warning'),
        message: this.$t('admin.mall.order.messages.confirmOrderPayed', {
          orderId: this.orderInfo.id
        }),
        type: 'danger',
        onOK: async _ => {
          let result = await this.$acs.updateOrderPayed({
            order_id: this.orderInfo.id,
            transaction_id: this.orderInfo.transaction_id
          })
          if (result.success) {
            this.orderInfo = result.order
          }
        },
      })
    },

    refundOrder: function() {
      showMessageBox({
        visible: true,
        title: this.$t('admin.titles.warning'),
        message: this.$t('admin.mall.order.messages.confirmRefundOrder', {
          orderId: this.orderInfo.id
        }),
        type: 'danger',
        onOK: async _ => {
          let result = await this.$acs.refundOrder({
            order_id: this.orderInfo.id,
            refund_money: parseFloat(this.refundMoney)
          })
          if (result.success) {
            this.orderInfo = result.order
          }
        },
      })
    }
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