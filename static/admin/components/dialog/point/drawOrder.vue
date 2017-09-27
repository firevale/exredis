<template>
  <modal :visible="visible">
    <div class="box">
      <div class="has-text-centered" style="width: 100%; margin-bottom: 10px">
        <h5 class="title is-5">{{ $t('admin.titles.editDrawOrder') }}</h5>
      </div>
      <form name="section" @submit.prevent="handleSubmit">
        <div class="columns">
          <div class="column">
            <label class="label"> {{ $t('admin.point.drawLog.name') }}: {{ order.name }}</label>
            <label class="label"> {{ $t('admin.point.drawLog.user') }}: {{ order.wcp_user.nickname }}</label>
            <label class="label"> {{ $t('admin.point.drawLog.status') }}: {{ getStatus(order.status) }}</label>
            <label class="label"> {{ $t('admin.point.drawLog.paidAt') }}: {{ order.paid_at | formatServerDateTime }}</label>
            <label class="label"> {{ $t('admin.point.drawLog.deliverAt') }}: {{ order.deliver_at | formatServerDateTime}}</label>
            <label class="label"> {{ $t('admin.point.drawLog.closeAt') }}: {{ order.close_at | formatServerDateTime}}</label>
            <label class="label"> {{ $t('admin.point.drawLog.address') }}: </label>
          </div>
          <div class="column">
            <label class="label"> {{ $t('admin.point.draw.goodsId') }}: {{ goods.name }}</label>
            <div>
              <figure class="image" style="display: block">
                <img v-if="goods.pic" :src="goods.pic.split('|')[0] ? goods.pic.split('|')[0]: 'https://placehold.it/228x122?text=未上传' | imageStaticUrl"
                  style="width:228px; height:122px;"></img>
                <img v-else src="https://placehold.it/228x122?text=未上传" style="width:228px; height:122px;"></img>
              </figure>
            </div>
          </div>
        </div>
        <p class="control">
          <textarea class="textarea" style="height:120px" :value="JSON.stringify(order.address)" @input="updateMessage"></textarea>
        </p>
        <div class="has-text-centered" style="margin-top: 15px">
          <a class="button is-primary" v-if="order.status<2" @click.prevent="updateOrder(order)">{{ $t('admin.point.drawLog.save') }}</a>
          <a class="button is-primary" v-if="order.status==1" @click.prevent="updateOrderStatus(order, 2)">{{ $t('admin.point.drawLog.delivered') }}</a>
          <a class="button is-primary" @click.prevent="updateOrderStatus(order, -1)">{{ $t('admin.point.drawLog.close') }}</a>
        </div>
      </form>
    </div>
  </modal>
</template>
<script>
import {
  Modal
} from 'vue-bulma-modal'

import {
  showMessageBox
} from 'admin/components/dialog/messageBox'

import {
  openNotification,
  processAjaxError
} from 'admin/miscellaneous'

export default {
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    order: Object,
    callback: Function,
  },

  data() {
    return {
      processing: false,
      address: '',
      goods: '',
      groups: ['basicInfo']
    }
  },

  created: function() {
    this.getGoods(this.order.lucky_draw.goods_id)
  },

  methods: {
    getStatus(status) {
      switch (status) {
        case -1:
          return '已关闭'
        case 0:
          return '待支付'
        case 1:
          return '已支付'
        case 2:
          return '待收货'
        case 4:
          return '已完成'
      }
    },

    updateMessage(e) {
      this.address = e.target.value
    },

    getGoods: async function(goods_id) {
      this.processing = true
      let result = await this.$acs.getPointGoodsDetail({
        goods_id: goods_id
      })
      if (result.success) {
        this.goods = result.goods
      }
      this.processing = false
    },

    updateOrder: function(order) {
      showMessageBox({
        visible: true,
        title: this.$t('admin.titles.warning'),
        message: this.$t('admin.point.drawLog.confirmUpdateAddress'),
        type: 'danger',
        onOK: _ => {
          if (this.address.length > 0) order.address = JSON.parse(this.address)
          this._updateOrder(order)
        },
      })
    },

    updateOrderStatus: function(order, status) {
      showMessageBox({
        visible: true,
        title: this.$t('admin.titles.warning'),
        message: this.$t('admin.point.drawLog.confirmUpdate', {
          status: this.getStatus(status)
        }),
        type: 'danger',
        onOK: _ => {
          order.status = status
          if (status == 2) order.deliver_at = new Date()
          this._updateOrder(order)
        },
      })
    },

    _updateOrder: async function(order) {
      this.processing = true
      alert(JSON.stringify(order.address))
      let result = await this.$acs.updatePmallDrawOrder({
        order_id: order.id,
        status: order.status,
        address: order.address,
        deliver_at: order.deliver_at,
        close_at: order.close_at
      }, this.$t('admin.point.drawLog.updateSuccess'))
      if (result.success) {
        if (this.callback) {
          this.callback(result.order)
        }
        this.visible = false
      }
      this.processing = false
    },
  },

  components: {
    Modal,
  },
}
</script>