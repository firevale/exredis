<template>
  <div class="index-page">
    <header class="header is-flex">
    </header>
    <div class="panel">
      <div class="bg-full bg-title-pmall">
      </div>
      <div class="pmall is-flex">
        <div v-for="goods in goodses" class="column is-6">
          <div class="item-box">
            <div class="item">
              <router-link class="image" :to="{name: 'detail',params:{id: goods.id}}" tag="div"></router-link>
              <div class="item-content is-flex is-column is-center">
                <h1 class="is-size-medium  is-danger is-flex flex-vcentered flex-center">
                      <span class="item-title is-ellipsis">{{goods.name}}</span> <router-link class="button btn-conversion" style="margin-left:1rem" :to="{name: 'detail',params:{id: goods.id}}" tag="a"></router-link></h1>
                <p class="is-marginless is-size-small   has-text-centered">兑换积分:
                  <span class="is-primary">{{goods.price}}</span>
                  <router-link style="margin-left:1rem" :to="{name: 'detail',params:{id: goods.id}}" tag="a">查看礼品详情</router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="this.page != 0 && this.total>this.page" class="load-more">
      <a class="button btn-pmall-more" @click="loadMore" style="margin-bottom:1rem"></a>
    </div>
  </div>
</template>
<script>
import Toast from 'common/components/toast'
export default {
  mounted() {
    this.listGoods()
  },

  data() {
    return {
      page: 0,
      total: 1,
      goodses: [],
    }
  },

  methods: {
    loadMore() {
      this.listGoods()
    },
    async listGoods() {
      let result = await this.$acs.listGoods({
        page: this.page + 1,
        records_per_page: 10
      })
      if (result.success) {
        this.goodses = this.goodses.concat(result.goodses)
        this.total = result.total
        this.page++
      }
    }
  }
}
</script>