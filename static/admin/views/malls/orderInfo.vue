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
                  <img :src="detail.goods_pic">
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

import imgUpload from "vue-image-crop-upload/upload-2.vue"

import {
  showFileUploadDialog
} from 'common/components/fileUpload'

const touchMap = new WeakMap()

export default {
  components: {
    imgUpload,
  },

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
    getPrice: function(price) {
      if (price)
        return parseFloat(price / 100).toFixed(2)
      else
        return 0
    },

    onDelete: function() {
      // 点击删除按钮，需判断该商品是否已有销量，销量不为0的商品不可删除，需文字提示：该商品已销售不可删除；
      // 商品销量为0，则可删除，仍需有二次文字信息提示：请确认是否删除该商品？
      // 选择确认，则成功在前后端删除，返回商品管理页；
      // 选择取消，则不删除，返回商品详情页；
    },

    onPublish: function() {
      // 点击发布按钮，判断必填项是否为空或都按规则填写； // 全部正确填写，则成功发布，发布按钮变为取消按钮，可在前端显示并搜索到该商品； // 为空或未按规则填写，则需分别报错提示： // 请上传正确的商品图片；
      // 请正确填写商品名称/单价／邮费/库存/商品详情； // 点击取消按钮，取消按钮变为发布按钮，不可在前端显示并搜索到该商品；
    },

    onSave: function() {
      if (this.goods.name.length == 0 || this.goods.description.length == 0 || this.goods.price.length ==
        0 ||
        this.goods.stock.length == 0 || this.goods.postage.length == 0 || this.goods.id.length ==
        0) {
        openNotification({
          title: this.$t('admin.titles.warning'),
          message: this.$t('admin.mall.goods.pleaseFill'),
          type: 'danger',
          duration: 4500,
          container: '.notifications',
        })
        return;
      }

      this.handleSubmit()
    },

    handleSubmit: async function() {
      this.saving = true
      let result = await this.$acs.updateGoods({
        id: this.goods.id,
        app_id: this.goods.app_id,
        name: this.goods.name,
        pic: this.goods.pic,
        description: this.goods.description,
        price: this.goods.price,
        postage: this.goods.postage,
        stock: this.goods.stock,
        currency: this.goods.currency,
        is_new: this.isNew
      })
      if (result.success) {
        this.$router.go(-1)
      }
      this.saving = false
    },
  }
}
</script>
<style lang="scss" scoped>
.tile .subtitle:not(:last-child) {
  margin-bottom: .8rem;
}

.media-content > .subtitle:not(:last-child) {
  margin-bottom: .5rem;
}

.box {
  border-radius: 0;
}
</style>