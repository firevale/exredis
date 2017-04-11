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
        <router-link class="button is-primary pull-right" :to="{name: 'EditGoods', params: {
          news: {
          id: '',
          title: '',
          content: '',
          group: 'activity',
          app_id: this.$route.params.appId,
        }}}">
      <span class="icon is-small" style="margin-right: 5px;"><i class="fa fa-plus"></i></span>{{ $t('admin.mall.goods.add')
      }}
    </router-link>
    <div class="tile is-ancestor" v-if="goodses.length > 0">
      <div class="tile is-parent is-vertical">
        <article class="tile is-child is-12">
          <div class="table-responsive">
            <template v-for="goods in goodses">
              <figure class="image is-128x128" style="display: block">
                <img :src="getGoodsIcon(goods)"></img>
              </figure>
            </template>
          </div>
        </article>
        <article class="tile is-child is-12">
          <pagination :page-count="total" :current-page="page" :on-page-change="onPageChange"></pagination>
        </article>
      </div>
    </div>
    <div class="box" v-else>
      <div class="hero-body has-text-centered">
        <div v-if="loading" class="container">
          <span class="icon is-large">
            <i class="fa fa-spinner fa-spin"></i>
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
  processAjaxError
} from 'admin/miscellaneous'

import {
  mapGetters,
  mapActions
} from 'vuex'

import * as getters from 'admin/store/getters'
import Pagination from 'admin/components/Pagination'
import Tooltip from 'vue-bulma-tooltip'

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
    }
  },

  mounted: function() {
    this.appId = this.$route.params.appId
    this.fetchGoods(this.page, this.recordsPerPage)
  },

  methods: {
    getGoodsIcon: function(goods) {
      let goodsInfo = this.mallGoods[`${goods.app_id}-${goods.id}`]
      if (goodsInfo && goodsInfo.pic) {
        return goodsInfo.pic
      } else {
        return 'https://placehold.it/128x128?text=未上传'
      }
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

    fetchGoods: async function(page, recordsPerPage) {
      this.loading = true
      let result = await this.$acs.fetchGoods({
        keyword: "",
        app_id: this.appId,
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
        app_id: this.app_id,
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