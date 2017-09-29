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
              <router-link class="thumb is-flex flex-center flex-vcentered" :to="{name: 'detail',params:{id: goods.id}}"
                tag="div">
                <img :src="goods.pic | imageStaticUrl">
              </router-link>
              <div class="item-content is-flex is-column is-center">
                <h1 class="is-size-medium  is-danger is-flex flex-vcentered flex-center">
                      <span class="item-title is-ellipsis">{{goods.name}}</span> <router-link class="button btn-conversion" style="margin-left:1rem" :to="{name: 'detail',params:{id: goods.id}}" tag="a"></router-link></h1>
                <p class="is-marginless is-size-small   has-text-centered">兑换积分:
                  <span class="is-primary">{{goods.price}}</span>
                  <router-link style="margin-left:1rem" :to="{name: 'detail',params:{id: goods.id}}" tag="a">查看详情</router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Toast from 'common/components/toast'
export default {
  mounted() {},
  computed: {
    goodses() {
      return window.acsConfig.goodses
    }
  },

  data() {
    return {
      page: 0,
      total: 1,
    }
  },

  methods: {}
}
</script>