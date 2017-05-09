<template>
  <div class="mall-index">
    <scroller :on-load-more="loadmore" ref="scroller">
      <div class="columns is-multiline is-mobile goods-content">
        <v-touch class="column is-half has-text-centered goods-item is-paddingless" v-for="item in goodsList" tag="div" @tap="showGoodsDetail(item)">
          <div class="tile is-vertical is-parent">
            <div class="tile">
              <figure class="has-hairline-border">
                <img v-if="item.pic" :src="item.pic.split('|')[0]">
                <img v-else src="https://placehold.it/400x400?text=400x400">
              </figure>
            </div>
            <div class="tile ">
              <article class="tile is-child">
                <p class="subtitle is-marginless is-paddingless is-5 is-normal name">
                  {{item.name}}
                </p>
                <p class="subtitle is-marginless is-paddingless is-5 is-normal is-primary price">
                  <label class="currency" :class="item.currency">{{item.price | formatPrice}}</label>
                </p>
              </article>
            </div>
          </div>
        </v-touch>
      </div>
    </scroller>
  </div>
</template>
<script>
import Vue from '../../vue-installed'
import scroller from 'common/components/scroller'
import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  components: {
    scroller
  },
  data: function() {
    return {
      canGoBack: false,
      inApp: window.acsConfig.inApp,
      goodsList: [],
      page: 0,
      total: 1,
      recordsPerPage: 8,
      postRecords: 0
    }
  },
  methods: {
    ...mapActions([
      'updateSelectedGoods'
    ]),
    resetScroller: function() {
      this.page = 0
      this.total = 1
      this.goodsList = []
      if (this.$refs.scroller) {
        this.$refs.scroller.$emit('reset')
      }
    },
    loadmore: async function() {
      // cancel last get paged post if we're requesting 
      this.$acs.cancelGetActiveGoodsPaged()

      let appId = this.$router.currentRoute.params.appId
      let result = await this.$acs.getActiveGoodsPaged(appId, this.page + 1, this.recordsPerPage)

      if (result.success) {
        this.goodsList = this.page == 0 ? result.goodses : this.goodsList.concat(result.goodses)
        this.total = result.total
        this.page = this.page + 1

        if (this.$refs.scroller && this.page >= this.total) {
          this.$refs.scroller.$emit('all-loaded')
        }
      }
    },
    showGoodsDetail: function(goods) {
      this.updateSelectedGoods(goods)
      this.$router.push({
        name: 'goodsDetail',
        params: {
          goodsId: goods.id
        },
      })
    }
  }
}
</script>