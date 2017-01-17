<template>
  <div class="is-ancestor is-parent is-vertical">
    <div class="is-child content-item row-menu">
      <div @click="goBack">
        {{ $t('forum.surroundingMall.back') }}
      </div>
      <div style="flex: 1;text-align: center;">
        {{ $t('forum.surroundingMall.title') }}
      </div>
      <div @click="mine">
        {{ $t('forum.surroundingMall.mine') }}
      </div>
    </div>
    <div class="horizontal-seprate" style="height: .7rem;"></div>
    <div class="row-menu">
      <div v-for="item in products" class="product">
        <figure>
          <img class="product-img" :src="item.url" @click="goProductDetail"></img>
        </figure>
        <figcaption class="product-name">{{ item.name }}</figcaption>
        <span class="product-price">
          <i class="fa fa-cny" aria-hidden="true" style="margin-top: .25rem;"></i>
          {{ item.price }}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        products: [{
            url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1561953326,95871027&fm=23&gp=0.jpg',
            name: '经典黑色T恤',
            price: '120.00'
          },
          {
            url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2851737279,1311002239&fm=23&gp=0.jpg',
            name: '经典白色T恤',
            price: '120.00'
          },
          {
            url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1561953326,95871027&fm=23&gp=0.jpg',
            name: '经典黑色T恤',
            price: '120.00'
          },
          {
            url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2851737279,1311002239&fm=23&gp=0.jpg',
            name: '经典白色T恤',
            price: '120.00'
          },
        ],
      }
    },

    methods: {
      goBack() {
        this.$router.go(-1)
      },

      goProductDetail() {

      },

      mine() {

      }
    },

    components: {

    }
  }
</script>
<style lang="scss">
  @import "../scss/color";
  .row-menu {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    position: relative;
    justify-content: space-around;
    font-size: 1.3rem;
    margin: .5rem 1rem;
    .mall-menu {
      cursor: pointer;
      font-size: 1rem;
    }
  }
  
  .horizontal-seprate {
    height: .3rem;
    margin: .2rem 1rem;
    background-color: $text-grey;
  }
  
  .product {
    text-align: center;
    margin-top: .4rem;
    font-size: 1rem;
    cursor: pointer;
    .product-img {
      border: 1px solid $text-grey;
      width: 20rem;
    }
    .product-name {}
    .product-price {
      color: $link;
    }
  }
</style>