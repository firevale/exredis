<template>
  <div class="sign-page">
    <div class="container  is-flex is-column">
      <div class="calender">
        <header class="head-image">
          <img class="head-image" src="~assets/pmall/1242-2_02.png">
        </header>
        <div class="body is-flex">
          <div class="column is-3 has-text-centered">
            <h2 class="yi-ji is-size-1">宜</h2>
            <p class="terms is-flex flex-center">
              <span class="term">穿格子衣服</span>
              <span class="term">相亲</span>
            </p>
          </div>
          <div class="column is-6 has-text-centered is-relative">
            <h1 class="date is-size-1"><strong>09</strong></h1>
            <h3 class="is-grey">二零一七年九月
                <br/>
                农历{{lunar}}
            </h3>
            <!-- <a class="button btn-sign"></a> -->
            <a class="button btn-signed"></a>
          </div>
          <div class="column is-3 has-text-centered">
            <h2 class="yi-ji is-size-1">忌</h2>
            <p class="terms is-flex flex-center">
              <span class="term">穿格子衣服</span>
              <span class="term">相亲</span>
            </p>
          </div>
        </div>
      </div>
      <div class="sign-logs">
        <p class="has-text-centered">你已经连续<strong>签到3天</strong>，连续签到可以领取更多奖励
          <span class="icon"></span>
          </span>
        </p>
        <div class="logs is-flex">
          <div v-for="index in [1,2,3,4,5,6]" class="log-box column is-2">
            <div class="log">
            </div>
          </div>
        </div>
      </div>
      <div class="sign-others">
        <p class="has-text-centered">共
          <span style="font-size:1.5rem">8907</span> 人签到</p>
        <div class="sign-users">
          <div class="sign-user is-flex flex-left flex-vcentered">
            <img src="~assets/pmall/1249_05.png">
            <img src="~assets/pmall/1249_05.png">
            <img src="~assets/pmall/1249_05.png">
            <img src="~assets/pmall/1249_05.png">
            <img src="~assets/pmall/1249_05.png">
            <img src="~assets/pmall/1249_05.png">
            <img src="~assets/pmall/1249_05.png">
            <!-- <img src="~assets/pmall/1249_05.png">
            <img src="~assets/pmall/1249_05.png">
            <img src="~assets/pmall/1249_05.png">
            <img src="~assets/pmall/1249_05.png">
            <img src="~assets/pmall/1249_05.png">
            <img src="~assets/pmall/1249_05.png">
            <img src="~assets/pmall/1249_05.png"> -->
          </div>
          <div class="load-more is-flex flex-center flex-vcentered">
            查看更多
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import chineseLunar from "chinese-lunar"
export default {
  data() {
    return {

    }
  },
  computed: {
    solar() {

    },
    lunar() {
      let current = new Date()
      var lu = chineseLunar.solarToLunar(current)
      var sola = chineseLunar.lunarToSolar(lu)
      console.info(sola)
      return chineseLunar.solarToLunar(current, 'Md');

    },
    test() {
      return 'xxx'
    }
  },
  mounted() {},
}
</script>