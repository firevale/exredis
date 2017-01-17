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

    methods: {
      goBack() {
        this.$router.go(-1)
      },

      goProductDetail() {

      },

      goMine() {

      }
    },

    components: {

    }
  }
</script>
<style lang="scss">
  @import "../scss/forum";
</style>