<template>
  <div class="is-vertical">
    <div class="product">
      <figure>
        <img class="product-img" :src="productDetail&&productDetail.url" @click="goProductDetail"></img>
      </figure>
      <figcaption class="product-name">{{ productDetail&&productDetail.name }}</figcaption>
      <figcaption class="product-price">
        <i class="fa fa-cny" aria-hidden="true" style="margin-top: .25rem;"></i> {{ productDetail&&productDetail.price }}
        ({{ $t('forum.surroundingMall.postage') }}: {{ productDetail&&productDetail.postage }})
      </figcaption>
      <figcaption class="product-stock">
        {{ $t('forum.surroundingMall.stock') }}:{{ productDetail&&productDetail.stock }}
      </figcaption>
    </div>
    <div class="horizontal-seprate" style="margin: 1rem auto 1rem auto;"></div>
    <div class="product">
      {{ $t('forum.surroundingMall.productDetail') }}
      <figure>
        <img class="product-img" :src="productDetail&&productDetail.url" @click="goProductDetail"></img>
      </figure>
    </div>
    <div v-if="productDetail.stock" class="rowLine no-padding link border-link" style="font-size: 1rem;margin: .5rem;height: 3rem;">
      <div class="rowLine no-padding" style="border-right: 1px solid;">
        <span class="link border-link button goodsCountBtn pointer" @click="minusCount">{{ $t('forum.surroundingMall.minus') }}</span>
        <input class="link border-link goodsCountBtn txt-center" @blur="checkNumber" v-model.number="goodsCount" type="text" style="height: 2.5rem;"></input>
        <span class="link border-link button goodsCountBtn pointer" @click="plusCount">{{ $t('forum.surroundingMall.plus') }}</span>
      </div>
      <div class="rowLine no-padding no-border button link" style="line-height: 3rem;vertical-align: middle;height: 2.8rem;" @click="buyNow">
        {{ $t('forum.surroundingMall.buyNow') }}
      </div>
    </div>
    <div v-if="!productDetail.stock" class="dark-background txt-center" style="margin: .4rem;height: 2rem;line-height: 2rem;vertical-align: middle;">
      {{ $t('forum.surroundingMall.soldOut') }}
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      productDetail: {
        type: Object,
        required: true,
      }
    },

    data() {
      return {
        goodsCount: 1,
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },

      goProductDetail() {

      },

      goMine() {

      },

      buyNow() {
        this.$http({
          method: 'post',
          url: this.noteLoadUrl,
          params: {
            goodsID: this.productDetail.ID,
            goodsCount: this.goodsCount,
          }
        }).then((response)=>{

        })
      },

      minusCount() {
        if (this.goodsCount - 1 < 1) {
          this.goodsCount = 1
        } else {
          this.goodsCount--
        }
      },

      plusCount() {
        if (this.goodsCount + 1 > this.productDetail.stock) {
          this.goodsCount = this.productDetail.stock
        } else {
          this.goodsCount++
        }
      },

      checkNumber() {
        var value = parseInt(this.goodsCount)
        if (isNaN(value)) {
          this.goodsCount = 1
        } else {
          if (value < 1) {
            this.goodsCount = 1
          } else {
            value > this.productDetail.stock ? this.goodsCount = this.productDetail.stock : ''
          }
        }
      },
    },

    components: {

    }
  }
</script>
<style lang="scss">

</style>