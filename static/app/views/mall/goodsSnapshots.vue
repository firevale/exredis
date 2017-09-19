<template>
  <div v-if="goods" class="goods-detail">
    <div class="flex-take-rest goods-content">
      <scroller ref="scroller">
        <div class="columns is-multiline is-mobile has-text-centered has-bottom-line">
          <div class="column is-12">
            <article class="message is-primary is-fullwidth">
              <div class="message-header">
                {{$t('mall.order.snapshotsPlaceholder') }}
              </div>
            </article>
          </div>
          <div class="column is-12">
            <div class="card-image has-text-centered">
              <img style="width:400px" v-if="goods.pic" :src="goods.pic.split('|')[0] | imageStaticUrl">
              <img style="width:400px" v-else src="https://placehold.it/400x400?text=400x400">
            </div>
          </div>
          <div style="margin-top:-.8rem;" class="column is-12">
            <p class="title is-5 is-normal">
              {{goods.name}}
            </p>
          </div>
          <div class="column is-12">
            <p style="margin-bottom:0.5rem;" class="title is-5 is-primary is-normal">
              <label class="currency" :class="goods.currency">{{goods.price | formatPrice}}</label>
              <label>（{{$t('mall.goods.postage')}}：</label>
              <label class="currency" :class="goods.currency">{{goods.postage | formatPrice}}</label>）
            </p>
          </div>
        </div>
        <div class="columns is-multiline is-mobile">
          <div style="margin-top:0.7rem;" class="column is-12">
            <p class="title is-5 is-normal has-text-centered">
              {{$t('mall.goods.description') }}
            </p>
          </div>
          <div class="column is-12">
            <quill-content :content="goods.description"></quill-content>
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

export default {
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