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
          <div :key="task.id" @click="doTask(task.path)" class="task is-flex is-column flex-center flex-vcentered"
            tag="div">
            <img :src="task.pic | imageStaticUrl" />
            <p class="is-marginless">{{task.name}}</p>
            <p class="is-marginless is-size-small  ">
              <span class="is-primary">{{task.point>0 ? `+${task.point}`: task.point}}</span>积分 {{task.sub_name}}</p>
          </div>
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
        <div v-if="goodses.length > 0" class="column is-6">
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
    </div>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
export default {

  data() {
    return {
      tasks: window.acsConfig.tasks,
      goodses: window.acsConfig.goodses,
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
    doTask(path) {
      if (path=="subscribe") {
        window.location = `//jqxs.firevale.com/m?subscribe=true&from=pmall&wcs_user_id=${wcp_user.id}`
      } else {
        this.$router.push({
          name: path
        })
      }
    }
  }
}
</script>