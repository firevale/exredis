<template>
  <div class="index-page">
    <header class="header is-flex">
      <div class="header-left is-flex flex-left flex-vcentered">
        <img :src="wcpUser.avatar_url">
        <p class="has-text-centered">
          我的积分
          <br/>
          <span class="is-primary">{{points}}</span>
        </p>
      </div>
      <div class="header-right is-flex is-column flex-center">
        <router-link class="button btn-point" :to="{name: 'my_point'}" style="margin-bottom:1rem"></router-link>
        <router-link class="button btn-my-exchange" :to="{name: 'my_exchange'}"></router-link>
      </div>
    </header>
    <div class="panel">
      <div class="bg-full bg-title-task">
      </div>
      <div class="tasks">
        <template v-for="task in tasks">
          <router-link :to="{name: task.path}" class="task is-flex is-column flex-center flex-vcentered" tag="div">
            <img :src="task.pic | imageStaticUrl" />
            <p class="is-marginless">{{task.name}}</p>
            <p class="is-marginless is-size-small  ">
              <span class="is-primary">{{task.point>0 ? `+${task.point}`: task.point}}</span>积分 {{task.sub_name}}</p>
          </router-link>
        </template>
      </div>
    </div>
    <div class="banner bg-full is-flex flex-fixed-size flex-right flex-vcentered">
      <router-link class="button btn-draw" :to="{name: 'draw'}"></router-link>
    </div>
    <div class="panel">
      <div class="bg-full bg-title-pmall-index">
      </div>
      <div class="pmall is-flex">
        <div v-for="goods in goodses" class="column is-6">
          <div class="item-box">
            <div class="item">
              <router-link class="image" :to="{name: 'detail', params:{ id: goods.id}}" tag="div"></router-link>
              <div class="item-content is-flex is-column is-center">
                <h1 class="is-size-medium  is-danger is-flex flex-vcentered flex-center">
                  <span class="item-title is-ellipsis">{{goods.name}}</span> 
                  <router-link class="button btn-conversion" style="margin-left:1rem" :to="{name: 'detail', params:{ id: goods.id}}" tag="a"></router-link></h1>
                <p class="is-marginless is-size-small   has-text-centered">兑换积分:
                  <span class="is-primary">{{goods.price}}</span>
                  <router-link style="margin-left:1rem" :to="{name: 'detail', params:{ id: goods.id}}"
                    tag="a">查看礼品详情</router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-6">
          <div class="item-box">
            <router-link class="button btn-more-goods" :to="{name: 'pmall'}" tag="div"></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
export default {
  mounted() {
    this.loadData()
  },

  data() {
    return {
      tasks: [],
      goodses: []
    }
  },
  computed: {
    ...mapGetters([
      'wcp_user',
      'points',
    ]),
    wcpUser() {
      if (this.wcp_user) {
        return this.wcp_user
      } else {
        return {
          avatar_url: 'https://placehold.it/64x64?text=64x64'
        }
      }
    }
  },

  methods: {
    ...mapActions([
      'setTransitionName',
    ]),
    async loadData() {
      let result = await this.$acs.listIndex()
      if (result.success) {
        this.tasks = result.tasks
        this.goodses = result.goodses
      }
    }
  }
}
</script>