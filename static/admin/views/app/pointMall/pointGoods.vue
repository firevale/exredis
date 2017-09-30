<template>
  <div>
    <div class="tile" style="margin-bottom: 1rem">
      <router-link class="button is-primary pull-right" :to="{name: 'EditPointGoods', params: {goodsId: ''}}">
        <span class="icon is-small" style="margin-right: 5px;"><i class="fa fa-plus"></i></span>{{ $t('admin.mall.goods.add')}}
      </router-link>
    </div>
    <div class="box" v-if="goodses.length > 0">
      <div class="columns is-multiline">
        <div v-for="(goods, index) in goodses" :key="goods.id" class="column is-4">
          <div class="columns box" style="margin: 0.25rem">
            <div class="column is-parent is-one-third" style="padding: 0.25rem">
              <figure class="image" style="display: block">
                <img v-if="goods.pic" :src="goods.pic.split('|')[0] ? goods.pic.split('|')[0]: 'https://placehold.it/228x122?text=未上传' | imageStaticUrl"
                  style="width:228px; height:122px;"></img>
                <img v-else src="https://placehold.it/228x122?text=未上传" style="width:228px; height:122px;"></img>
              </figure>
            </div>
            <div class="column is-parent is-vertical" style="padding: 0.25rem">
              <article class="tile is-child" style="line-height:200%;">
                <p>{{ goods.name}}</p>
                <p>{{ $t('admin.point.goods.priceList', {price: getPrice(goods.price)}) }}</p>
                <p>{{ $t('admin.mall.goods.stockList', {stock: goods.stock, sold: goods.sold}) }}</p>
                <p class="field">
                  <span class="tag is-primary" v-if="goods.active==true">{{ $t('admin.mall.goods.up') }} </span>
                  <span class="tag is-dark" v-else>{{ $t('admin.mall.goods.down') }}</span>
                  <a class="button is-small" @click="onEdit(goods.id)">
                    <span class="icon is-small"><i class="fa fa-pencil"></i></span>
                    <span>{{ $t('admin.mall.goods.edit') }}</span>
                  </a>
                  <a class="button is-small" @click="onDelete(goods, index)">
                    <span class="icon is-small"><i class="fa fa-close"></i></span>
                    <span>{{ $t('admin.mall.goods.delete') }}</span>
                  </a>
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="box" v-else>
      <div class="hero-body has-text-centered">
        <div v-if="loading" class="container">
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
            {{ $t('admin.titles.noGoodsToDisplay') }}
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import {
  openNotification,
  processAjaxError
} from 'admin/miscellaneous'

import * as getters from 'admin/store/getters'
import {
  showMessageBox
} from 'admin/components/dialog/messageBox'

export default {
  data: function() {
    return {
      loading: false,
      goodses: [],
      appId: "",
    }
  },

  computed: {
    ...mapGetters([
      'app'
    ]),
  },
  mounted: async function() {
    this.listPMallGoods(this.page, this.recordsPerPage)
  },

  watch: {
    app(newVal) {
      this.appId = newVal.id
      this.listPMallGoods(this.page, this.recordsPerPage)
    }
  },

  methods: {
    getPrice: function(price) {
      return price + "积分"
    },

    onEdit: function(goods_id) {
      this.$router.push({
        name: 'EditPointGoods',
        params: {
          goodsId: goods_id
        }
      })
    },

    onDelete: function(goods, index) {
      if (goods.sold > 0) {
        openNotification({
          title: this.$t('admin.titles.warning'),
          message: this.$t('admin.mall.soldCanNotDelete'),
          type: 'danger',
          duration: 4500,
          container: '.notifications',
        })
      } else {
        showMessageBox({
          visible: true,
          title: this.$t('admin.titles.warning'),
          message: this.$t('admin.messages.confirmDeleteMallGoods'),
          type: 'danger',
          onOK: async _ => {
            let result = await this.$acs.deletePMallGoods({
              app_id: goods.app_id,
              goods_id: goods.id
            }, this.$t('admin.notification.message.mallGoodsDeleted'))
            if (result.success) {
              this.goodses.splice(index, 1)
            }
          },
        })
      }
    },

    listPMallGoods: async function(page, recordsPerPage) {
      this.loading = true
      let result = await this.$acs.listPMallGoods({
        keyword: "",
        page: page,
        records_per_page: recordsPerPage
      })
      if (result.success) {
        this.goodses = result.goodses
      }
      this.loading = false
    },
  },
}
</script>