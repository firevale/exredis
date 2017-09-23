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
            <h1 class="day"><strong>{{ new Date().Format('d')}}</strong></h1>
            <p class="date">{{solar}}
              <br/> 农历{{lunar}}
            </p>
            <template v-if="signed != undefined">
              <a v-if="!signed" class="button btn-sign" @click="sign"></a>
              <a v-else class="button btn-signed"></a>
            </template>
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
        <p class="has-text-centered">你已经连续<strong>签到{{sign_times}}天</strong>，连续签到可以领取更多奖励
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
          <span style="font-size:1.5rem">{{sign_total}}</span> 人签到</p>
        <div class="sign-users">
          <div class="avatars is-flex flex-left flex-vcentered">
            <img v-for="user in sign_users" :src="user.avatar_url">
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
import {
  mapGetters,
  mapActions
} from 'vuex'
import 'common/js/date'
import chineseLunar from "chinese-lunar"
import Toast from 'common/components/toast'
export default {
  data() {
    return {
      signed: undefined,
      sign_times: 0,
      sign_total: 0,
      sign_users: []
    }
  },
  computed: {
    ...mapGetters([
      'wcp_user',
    ]),
    solar() {
      let current = new Date()
      var dateString = current.Format('yyyy年MM月')
      var cnStr = '零,一,二,三,四,五,六,七,八,九'.split(",");
      var result = '';
      for (var i = 0; i < dateString.length; i++) {
        var word = dateString.charAt(i)
        var index = parseInt(word)
        result += isNaN(index) ? word : cnStr[index]
      }
      return result;
    },
    lunar() {
      let current = new Date()
      current.setHours(0, 0, 0, 0)
      return chineseLunar.solarToLunar(current, 'Md');
    },
  },
  mounted() {
    this.getSignInfo()
  },
  methods: {
    ...mapActions([
      'setUserPoints'
    ]),
    async getSignInfo() {
      let result = await this.$acs.getSignInfo()
      if (result.success) {
        this.signed = result.signed
        this.sign_times = result.sign_times
        this.sign_total = result.sign_total
        this.sign_users = result.sign_users
      }
    },
    async sign() {
      let result = await this.$acs.sign()
      if (result.success) {
        this.signed = true
        this.sign_times = result.sign_times
        this.sign_total++;
        this.sign_users.splice(0, 0, this.wcp_user)
        this.setUserPoints(result.total_point)
        Toast.show(this.$t('pmall.sign.success', {
          point: result.add_point
        }))
      }
    }
  }
}
</script>