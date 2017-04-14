<template>
  <div class="mall-index" style="position: relative; margin: 1rem;">
    <scroller :on-load-more="loadmore" ref="scroller">
      <div class="content-goods">
        <div class="is-multiline is-marginless has-text-centered goods-list">
          <div v-for="item in goodsList" class="tile goods-item">
            <figure class="image is-40vwx40vw pic" @click.prevent="showGoodsDetail(item.id)">
              <img v-if="item.pic" :src="item.pic">
              <img v-else src="https://placehold.it/300x300?text=400x400">
            </figure>
            <p class="subtitle is-marginless is-5 name">
              {{item.name}}
            </p>
            <p class="subtitle is-marginless is-5 price">
              <label>{{(item.price / 100).toFixed(2)}}</label>
            </p>
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>
<script>
  import Vue from '../../vue-installed'
  import scroller from 'common/components/scroller'

  export default {
    components: {
      scroller
    },
    data: function () {
      return {
        canGoBack: false,
        inApp: window.acsConfig.inApp,
        goodsList: [],
        page: 0,
        total: 1,
        recordsPerPage: 12,
        postRecords: 0
      }
    },
    methods: {
      resetScroller: function () {
        this.page = 0
        this.total = 1
        this.goodsList = []
        if (this.$refs.scroller) {
          this.$refs.scroller.$emit('reset')
        }
      },
      loadmore: async function () {
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
      showGoodsDetail: function (goodsId) {
        this.$router.push({
          name: 'goodsDetail',
          params: {
            goodsId: goodsId
          },
        })
      }
    }
  }
</script>