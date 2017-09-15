<template>
  <div>
    <div class="control has-icon has-icon-left">
      <input type="text" class="input" @keyup.enter="onSearchBoxSubmit" :placeholder="$t('admin.titles.searchGoods')"
        v-model="keyword">
      <span class="icon is-small">
        <i v-if="searching" class="fa fa-spinner fa-spin"></i>
        <i v-else class="fa fa-search"></i>
      </span>
    </div>
    <router-link class="button is-primary pull-right" :to="{name: 'EditGoods', params: {goodsId: '', currency: currency}}">
      <span class="icon is-small" style="margin-right: 5px;"><i class="fa fa-plus"></i></span>{{ $t('admin.mall.goods.add')}}
    </router-link>
    <div class="tile is-parent is-vertical" v-if="goodses.length > 0">
      <div class="columns is-multiline">
        <div v-for="(goods, index) in goodses" class="column is-half">
          <div class="columns">
            <div class="column is-parent is-one-third">
              <figure class="image" style="display: block">
                <img v-if="goods.pic" :src="goods.pic.split('|')[0] ? goods.pic.split('|')[0]: 'https://placehold.it/256x256?text=未上传'"
                  style="width:120px; height:120px;"></img>
                <img v-else src="https://placehold.it/256x256?text=未上传" style="width:120px; height:120px;"></img>
              </figure>
            </div>
            <div class="column is-parent is-vertical">
              <article class="tile is-child">
                <p class="subtitle is-6">{{ goods.name}}</p>
                <p class="subtitle is-6">{{ $t('admin.mall.goods.priceList', {price: getPrice(goods.price), postage: getPrice(goods.postage)})
                  }}
                </p>
                <p class="subtitle is-6">{{ $t('admin.mall.goods.stockList', {stock: goods.stock, sold: goods.sold}) }}</p>
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
      <article class="tile is-child is-12">
        <pagination :page-count="total" :current-page="page" :on-page-change="onPageChange"></pagination>
      </article>
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
import Pagination from 'admin/components/Pagination'
import Tooltip from 'vue-bulma-tooltip'
import {
  showMessageBox
} from 'admin/components/dialog/messageBox'

export default {
  data: function() {
    return {
      keyword: "",
      searching: false,
      loading: true,
      goodses: [],
      page: 1,
      total: 1,
      recordsPerPage: 8,
      appId: "",
      currency: "",
    }
  },

  computed: {
    ...mapGetters([
      'app'
    ]),
  },
  mounted: async function() {
    this.fetchGoods(this.page, this.recordsPerPage)
  },

  watch: {
    app(newVal) {
      this.appId = newVal.id
      this.currency = newVal.currency
      this.fetchGoods(this.page, this.recordsPerPage)
    }
  },

  methods: {
    getPrice: function(price) {
      return "¥" + parseFloat(price / 100).toFixed(2)
    },

    onPageChange: function(page) {
      this.fetchGoods(page, this.recordsPerPage)
    },

    onSearchBoxSubmit: function() {
      if (this.keyword) {
        this.searchGoods(1)
      } else {
        this.fetchGoods(1, this.recordsPerPage)
      }
    },

    onEdit: function(goods_id) {
      this.$router.push({
        name: 'EditGoods',
        params: {
          goodsId: goods_id,
          currency: this.currency
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
            let result = await this.$acs.deleteMallGoods({
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

    fetchGoods: async function(page, recordsPerPage) {
      this.loading = true
      let result = await this.$acs.fetchGoods({
        keyword: "",
        page: page,
        records_per_page: recordsPerPage
      })

      if (result.success) {
        this.total = result.total
        this.goodses = result.goodses
        this.page = page
      }

      this.loading = false
    },

    searchGoods: async function(page) {
      this.searching = true
      let result = await this.$acs.fetchGoods({
        keyword: this.keyword,
        page: page,
        records_per_page: this.recordsPerPage
      })
      if (result.success) {
        this.total = result.total
        this.goodses = result.goodses
        this.page = page
      }
      this.searching = false
    },
  },

  components: {
    Pagination,
    Tooltip
  }
}
</script>