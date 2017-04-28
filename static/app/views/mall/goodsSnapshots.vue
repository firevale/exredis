<template>
  <div v-if="goods" class="goods-detail is-marginless is-paddingless">
    <div class="flex-take-rest goods-content">
      <scroller ref="scroller">
        <div class="columns is-multiline is-mobile has-text-centered has-bottom-line is-marginless is-paddingless">
          <div class="column is-12">
            <article class="message is-primary is-fullwidth">
              <div class="message-header">
                {{$t('mall.order.snapshotsPlaceholder') }}
              </div>
            </article>
          </div>
          <div class="column is-12">
            <div class="card-image">
              <figure class="image is-400x400">
                <img v-if="goods.pic" :src="goods.pic.split('|')[0]">
                <img v-else src="https://placehold.it/300x300?text=400x400">
              </figure>
            </div>
          </div>
          <div style="margin-top:0.2rem;" class="column is-12">
            <p class="title is-5 is-normal">
              {{goods.name}}
            </p>
          </div>
          <div class="column is-12">
            <p class="title is-5 is-primary is-normal">
              <label class="currency" :class="goods.currency">{{(goods.price / 100).toFixed(2)}}</label>
              <label>（{{$t('mall.goods.postage')}}：</label>
              <label class="currency" :class="goods.currency">{{(goods.postage / 100).toFixed(2)}}</label>）
            </p>
          </div>
        </div>
        <div class="columns is-multiline is-mobile is-marginless is-paddingless">
          <div style="margin-top:0.7rem;" class="column is-12">
            <p class="title is-5 is-normal has-text-centered">
              {{$t('mall.goods.description') }}
            </p>
          </div>
          <div class="column is-12">
            <div class="ql-editor" v-html="goods.description">
            </div>
          </div>
        </div>
      </scroller>
    </div>
  </div>
</template>
<script>
import Vue from '../../vue-installed'
import * as acs from 'common/js/acs'
import nativeApi from 'common/js/nativeApi'
import scroller from 'common/components/scroller'

export default {
  components: {
    scroller
  },
  mounted: async function() {
    await this.getGoodsDetail()
  },
  data: function() {
    return {
      canGoBack: false,
      inApp: window.acsConfig.inApp,
      goods: undefined
    }
  },
  methods: {
    onBtnBackClicked: function() {
      if (this.canGoBack) {
        this.$router.back()
      } else if (this.inApp) {
        nativeApi.closeWebviewWithResult({
          success: false
        })
      }
    },
    getGoodsDetail: async function() {
      this.goods = this.$router.currentRoute.params.goods
    }
  },
  watch: {
    '$route' (to, from) {
      this.canGoBack = (history.state != null)
    }
  }
}
</script>