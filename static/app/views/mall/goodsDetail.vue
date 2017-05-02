<template>
  <div class="goods-detail is-marginless is-paddingless">
    <div class="flex-take-rest goods-content">
      <scroller v-if="this.selectedGoods" ref="scroller">
        <div class="columns is-multiline is-mobile has-text-centered has-bottom-line is-marginless is-paddingless">
          <div class="column is-12">
            <div class="card-image">
              <swiper :options="swiperOption" ref="goodsSwiper" v-if="this.selectedGoods.pic">
                <swiper-slide v-for="item in this.selectedGoods.pic.split('|')">
                  <img v-if="item" :src="item" style="margin:0px auto" class="image is-400x400">
                  <img v-else src="https://placehold.it/400x400?text=400x400">
                </swiper-slide>
              </swiper>
            </div>
          </div>
          <div class="column is-12 goods-item">
            <p class="title is-5 is-normal">
              {{this.selectedGoods.name}}
            </p>
            <p class="title is-5 is-primary is-normal">
              <label class="currency" :class="this.selectedGoods.currency">{{(this.selectedGoods.price / 100).toFixed(2)}}</label>
              <label>（{{$t('mall.goods.postage')}}：</label>
              <label class="currency" :class="this.selectedGoods.currency">{{(this.selectedGoods.postage / 100).toFixed(2)}}</label>）
            </p>
            <p class="title is-5 is-normal">
              {{$t('mall.goods.stock') }}：{{this.selectedGoods.stock}}
            </p>
          </div>
        </div>
        <div class="columns is-multiline is-mobile is-marginless is-paddingless">
          <div class="column is-12 goods-description">
            <p class="title is-5 is-normal has-text-centered">
              {{$t('mall.goods.description') }}
            </p>
          </div>
          <div class="column is-12">
            <div class="ql-editor" v-html="this.selectedGoods.description">
            </div>
          </div>
        </div>
      </scroller>
    </div>
    <div v-if="this.selectedGoods.stock>0" class="flex-fixed-size goods-bottom">
      <div class="columns is-multiline is-mobile">
        <div class="column is-6 bottom-left">
          <div class="left-content">
            <a class="button is-large content-item" @click.prevent="quantityPlus">-</a>
            <input v-model.trim="quantity" class="input is-large has-text-centered content-item" style="width:3.9rem;"
              @blur.prevent="quantityChange" type="number" :value="quantity">
            <a class="button is-large content-item" @click.prevent="quantityReduce">+</a>
          </div>
        </div>
        <div class="column is-6">
          <a class="button is-info is-large is-fullwidth goods-buyNow" @click.prevent="buyNow">{{$t('mall.goods.buyNow')}}</a>
        </div>
      </div>
    </div>
    <div v-else class="flex-fixed-size goods-bottom">
      <div class="goods-sellOut">
        <div class="title is-5 has-text-centered">{{$t('mall.goods.soldOut')}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from '../../vue-installed'
import * as acs from 'common/js/acs'
import nativeApi from 'common/js/nativeApi'
import scroller from 'common/components/scroller'
import {
  swiper,
  swiperSlide
} from 'vue-awesome-swiper'
import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  components: {
    scroller,
    swiper,
    swiperSlide
  },
  computed: {
    ...mapGetters([
      'selectedGoods'
    ]),
    swiper() {
      return this.$refs.goodsSwiper.swiper;
    }
  },
  mounted: async function() {
    if (this.selectedGoods.id == 0) {
      await this.getGoodsDetail()
    }
  },
  data: function() {
    return {
      canGoBack: false,
      inApp: window.acsConfig.inApp,
      quantity: 1,
      swiperOption: {
        autoplay: 5000,
        notNextTick: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        paginationClickable: true,
        spaceBetween: 30
      }
    }
  },
  methods: {
    ...mapActions([
      'updateSelectedGoods'
    ]),
    getGoodsDetail: async function() {
      let goodsId = this.$router.currentRoute.params.goodsId
      let result = await this.$acs.getGoodsDetail(goodsId)
      if (result.success) {
        this.updateSelectedGoods(result.goods)
      }
    },
    onBtnBackClicked: function() {
      if (this.canGoBack) {
        this.$router.back()
      } else if (this.inApp) {
        nativeApi.closeWebviewWithResult({
          success: false
        })
      }
    },
    quantityPlus: function() {
      if (this.quantity <= 1)
        this.quantity = 1
      else
        this.quantity = this.quantity - 1
    },
    quantityReduce: function() {
      if (this.selectedGoods.stock <= this.quantity)
        this.quantity = this.selectedGoods.stock
      else if (this.quantity >= 99)
        this.quantity = 99
      else
        this.quantity = parseInt(this.quantity) + 1
    },
    quantityChange: function() {
      if (this.quantity >= 99)
        this.quantity = 99
      else if (this.quantity <= 0)
        this.quantity = 1
      else if (this.selectedGoods.stock <= this.quantity)
        this.quantity = this.selectedGoods.stock
    },
    buyNow: function() {
      acs.checkIsLogin(_ => {
        this.$router.push({
          name: 'mallOrder',
          params: {
            goodsId: this.selectedGoods.id,
            quantity: this.quantity
          },
        })
      })
    }
  },
  watch: {
    '$route' (to, from) {
      this.canGoBack = (history.state != null)
    }
  }
}
</script>