<template>
  <div class="is-ancestor is-parent is-vertical">
    <div class="is-child content-item row-menu">
      <div @click="goBack" class="pointer">
        {{ $t('forum.surroundingMall.back') }}
      </div>
      <div style="flex: 1;text-align: center;">
        {{ detailItem? $t('forum.surroundingMall.productDetail'): $t('forum.surroundingMall.title') }}
      </div>
      <div @click="goMine" class="pointer">
        {{ $t('forum.surroundingMall.mine') }}
      </div>
    </div>
    <div class="horizontal-seprate" style="height: .7rem;"></div>
    <div v-show="!detailItem" class="row-menu">
      <div v-for="item in products" class="product">
        <figure>
          <img class="product-img" :src="item.url" @click="goProductDetail(item)"></img>
        </figure>
        <figcaption class="product-name">{{ item.name }}</figcaption>
        <span class="product-price">
          <i class="fa fa-cny" aria-hidden="true" style="margin-top: .25rem;"></i>
          {{ item.price }}
        </span>
      </div>
    </div>
    <div class="column is-full" v-show="goodsPageCount > 1">
      <pagination ref="pag" :page-count="goodsPageCount" :current-page="goodsCurrentPage"></pagination>
    </div>
    <product-detail v-show="detailItem" :product-detail="detailItem? detailItem: {}"></product-detail>
  </div>
</template>
<script>
  import productDetail from '../components/productDetail'

  export default {
    data() {
      return {
        goodsPageCount: 5,
        goodsCurrentPage: 1,
        detailItem: null,
        products: [{
            ID: 'TX001',
            url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1561953326,95871027&fm=23&gp=0.jpg',
            name: '经典黑色T恤',
            price: '120.00',
            postage: 10,
            stock: 0,
          },
          {
            ID: 'TX002',
            url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2851737279,1311002239&fm=23&gp=0.jpg',
            name: '经典白色T恤',
            price: '120.00',
            postage: 30,
            stock: 122,
          },
          {
            ID: 'TX003',
            url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1561953326,95871027&fm=23&gp=0.jpg',
            name: '经典黑色T恤',
            price: '120.00',
            postage: 20,
            stock: 1190,
          },
          {
            ID: 'TX004',
            url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2851737279,1311002239&fm=23&gp=0.jpg',
            name: '经典白色T恤',
            price: '120.00',
            postage: 10.5,
            stock: 1280,
          },
        ],
      }
    },
    computed: {

    },
    methods: {
      goBack() {
        if (this.detailItem) {
          this.detailItem = null
        } else {
          this.$router.go(-1)
        }
      },

      goProductDetail(item) {
        this.detailItem = item
      },

      goMine() {
        this.$router.push({name: 'mine'})
      }
    },

    components: {
      productDetail,
    }
  }
</script>
<style lang="scss">
  @import "../scss/mall";
</style>