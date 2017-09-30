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
      <goods-list :goodses="goodses" :hasGoList="showPMallList"></goods-list>
    </div>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
import Toast from 'common/components/toast'
import goodsList from '../components/goodsList'
export default {
  components: {
    goodsList
  },
  data() {
    return {
      tasks: window.acsConfig.tasks,
      goodses: window.acsConfig.goodses.slice(0,5),
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
    },
    showPMallList() {
      return window.acsConfig.goodses.length > 5
    }
  },

  methods: {
    ...mapActions([
      'setTransitionName',
    ]),
    doTask(path) {
      if (path == "subscribe") {
        window.location =
          `//jqxs.firevale.com/m?subscribe=true&from=pmall&wcs_user_id=${wcp_user.id}`
      } else if (path == "bind_mobile" && this.wcp_user.user_id > 0) {
        Toast.show("手机已绑定")
      } else {
        this.$router.push({
          name: path
        })
      }
    }
  }
}
</script>