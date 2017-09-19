<template>
  <div class="index-page">
    <header class="header is-flex">
      <div class="header-left is-flex flex-left flex-vcentered">
        <img src="~assets/pmall/1242-2234-1_13.png">
        <p>
          我的积分
          <br/> 100
        </p>
      </div>
      <div class="header-right is-flex is-column flex-center">
        <router-link class="button btn-point" :to="{name: 'my_point'}" style="margin-bottom:1rem"></router-link>
        <router-link class="button btn-my-conversion" :to="{name: 'my_conversion'}"></router-link>
      </div>
    </header>
    <div class="panel">
      <div class="bg-full bg-title-task">
      </div>
      <div class="tasks">
        <router-link :to="{name: 'bind_mobile'}" class="task is-flex is-column flex-center flex-vcentered" tag="div">
          <img src="~assets/pmall/1242-2234-1_11.png" />
          <p class="is-marginless">绑定手机</p>
          <p class="is-marginless is-size-small  ">
            <span class="is-primary">+99</span>积分 限1次</p>
        </router-link>
        <div class="task is-flex is-column flex-center flex-vcentered">
          <img src="~assets/pmall/1242-2234-1_13.png" />
          <p class="is-marginless">官网预约</p>
          <p class="is-marginless is-size-small  ">
            <span class="is-primary">+5</span>积分/日</p>
        </div>
        <router-link :to="{name:'sign'}" class="task is-flex is-column flex-center flex-vcentered" tag="div">
          <img src="~assets/pmall/1242-2234-1_15.png" />
          <p class="is-marginless">每日签到</p>
          <p class="is-marginless  is-size-small  ">
            <span class="is-primary">+5</span>积分/日</p>
        </router-link>
        <router-link :to="{name: 'knowledge'}" class="task is-flex is-column flex-center flex-vcentered" tag="div">
          <img src="~assets/pmall/1242-2234-1_21.png" />
          <p class="is-marginless ">每日问答</p>
          <p class="is-marginless is-size-small  ">
            <span class="is-primary">+5</span>积分/日</p>
        </router-link>
      </div>
    </div>
    <div class="banner bg-full is-flex flex-fixed-size flex-right flex-vcentered">
      <router-link class="button btn-draw" :to="{name: 'draw'}"></router-link>
    </div>
    <div class="panel">
      <div class="bg-full bg-title-pmall-index">
      </div>
      <div class="pmall is-flex">
        <div class="column is-6">
          <div class="item-box">
            <div class="item">
              <router-link class="image" :to="{name: 'detail'}" tag="div"></router-link>
              <div class="item-content is-flex is-column is-center">
                <h1 class="is-size-medium  is-danger is-flex flex-vcentered flex-center">
                  <span class="item-title is-ellipsis">惊奇避孕套</span> <a class="button btn-conversion" style="margin-left:1rem"></a></h1>
                <p class="is-marginless is-size-small   has-text-centered">兑换积分:
                  <span class="is-primary">98</span> <a href="#" style="margin-left:1rem">查看礼品详情</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-6">
          <div class="item-box">
            <div class="item">
              <router-link class="image" :to="{name: 'detail'}" tag="div"></router-link>
              <div class="item-content is-flex is-column is-center">
                <h1 class="is-size-medium  is-danger is-flex flex-vcentered flex-center">
                      <span class="item-title is-ellipsis">惊奇雨伞</span> <a class="button btn-conversion" style="margin-left:1rem"></a></h1>
                <p class="is-marginless is-size-small   has-text-centered">兑换积分:
                  <span class="is-primary">98</span> <a href="#" style="margin-left:1rem">查看礼品详情</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-6">
          <div class="item-box">
            <div class="item">
              <router-link class="image" :to="{name: 'detail'}" tag="div"></router-link>
              <div class="item-content is-flex is-column is-center">
                <h1 class="is-size-medium   is-danger is-flex flex-vcentered flex-center">
                      <span class="item-title is-ellipsis">惊奇抱枕</span> <a class="button btn-conversion" style="margin-left:1rem"></a></h1>
                <p class="is-marginless is-size-small   has-text-centered">兑换积分:
                  <span class="is-primary">98</span> <a href="#" style="margin-left:1rem">查看礼品详情</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-6">
          <div class="item-box">
            <div class="item is-flex flex-center flex-vcentered">
              <router-link class="button btn-more-goods" :to="{name: 'pmall'}"></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {},

  data() {
    return {}
  },

  methods: {}
}
</script>