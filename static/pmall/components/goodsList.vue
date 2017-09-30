<template>
  <div class="pmall is-flex">
    <div v-for="goods in goodses" :key="goods.id" class="column is-6">
      <div class="item-box">
        <div class="item">
          <router-link class="thumb is-flex flex-center flex-vcentered" :to="{name: 'detail', params:{ id: goods.id}}"
            tag="div">
            <img :src="goods.pic | imageStaticUrl">
          </router-link>
          <div class="item-content is-flex is-column is-center">
            <h1 class="is-size-medium  is-danger is-flex flex-vcentered flex-center">
                                <span class="item-title is-ellipsis">{{goods.name}}</span> 
                                <router-link class="button btn-conversion" style="margin-left:1rem" :to="{name: 'detail', params:{ id: goods.id}}" tag="a"></router-link></h1>
            <p class="is-marginless is-size-small   has-text-centered">兑换积分:
              <span class="is-primary">{{goods.price}}</span>
              <router-link style="margin-left:1rem" :to="{name: 'detail', params:{ id: goods.id}}" tag="a">查看详情</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="hasGoList" class="column is-6">
      <div class="item-box">
        <router-link class="item is-flex flex-vcentered flex-center" :to="{name: 'pmall'}" tag="div">
          <p class="is-size-normal is-danger">
            更多商品
            <span class="is-size-small">>></span>
          </p>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    goodses: {
      type: Array,
      default: [],
    },
    hasGoList: false
  }
}
</script>