<template>
  <div class="is-ancestor is-parent is-vertical ">
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
          <img class="product-img" :src="item.url"></img>
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
        products: [
          {
            url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1561953326,95871027&fm=23&gp=0.jpg',
            name: '经典黑色T恤',
            price: '120'
          },
          {
            url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2851737279,1311002239&fm=23&gp=0.jpg',
            name: '经典白色T恤',
            price: '120'
          },
          {
            url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1561953326,95871027&fm=23&gp=0.jpg',
            name: '经典黑色T恤',
            price: '120'
          },
          {
            url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2851737279,1311002239&fm=23&gp=0.jpg',
            name: '经典白色T恤',
            price: '120'
          },
          
        ],
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      mine(){

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
    font-size: 1rem;
    margin: .5rem 1rem;
    .mall-menu{
      cursor: pointer;
      font-size: 1rem;
    }
  }
  
  .horizontal-seprate {
    height: .3rem;
    margin: .2rem 1rem;
    background-color: $text-grey;
  }

  .product{
    border: 1px solid $text-grey;
    text-align: center;
    width: 0 auto;
    margin-top: .2rem;
    .product-img{
      width: 20rem;
    }
    .product-name{
      font-size: 1.2rem;
    }
    .product-price{
      color: $olive;
    }
  }
</style>