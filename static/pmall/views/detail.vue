<template>
  <div class="detail-page">
    <div class="box">
      <div class="container">
        <div class="thumb is-flex flex-center flex-vcentered">
          <img :src="goods.pic | imageStaticUrl">
        </div>
        <h1 class="is-size-large is-primary">{{goods.name}}</h1>
        <p class="cost is-flex flex-vcentered">
          <span class="is-size-3">{{goods.price}}</span>
          <span style="margin: 0 .5rem;">积分</span>
          <span class="is-grey" style="text-decoration:line-through;">{{goods.original_price}}</span>
        </p>
        <p class="expired bg-full bg-expired is-grey is-size-small">
          <span class="">有效期：&nbsp;&nbsp;</span>{{goods.begin_time | formatServerDate }}至{{goods.end_time |formatServerDate
          }}
        </p>
      </div>
    </div>
    <div class="content">
      <h1 class="is-size-medium">详细规则：</h1> {{goods.description}}
    </div>
    <div v-show="goods.id>0" class="operate">
      <a v-if="!goods.active || goods.stock<=0" class="button btn-goods-down"></a>
      <a v-else-if="exchanged" class="button btn-conversion-limit"></a>
      <a v-else-if="points < goods.price" class="button btn-point-less"></a>
      <a v-else class="button btn-point-exchange" @click="exchange"></a>
    </div>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
import Toast from 'common/components/toast'

export default {
  data() {
    return {
      exchanged: false,
      goods: {
        id: 0,
        name: '',
        price: 0,
        original_price: 0,
        begin_time: '2099-01-01 00:00:00',
        end_time: '2099-12-01 00:00:00',
        description: '',
        active: false,
      }
    }
  },
  computed: {
    ...mapGetters([
      'wcp_user',
      'points',
    ]),
    goodsId() {
      return this.$route.params.id
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    ...mapActions([
      'setUserPoints'
    ]),
    async loadData() {
      let result = await this.$acs.getGoods({
        goods_id: this.goodsId
      })

      if (result.success) {
        this.exchanged = result.exchanged
        this.goods = result.goods
      }
    },
    async exchange() {
      let result = await this.$acs.exchange({
        goods_id: this.goodsId
      })

      if (result.success) {
        this.exchanged = true
        this.setUserPoints(result.total_point)
        Toast.show(this.$t(result.i18n_message, {
          point: result.add_point
        }))
        this.$router.push({
          name: "new_address",
          params: {
            action: "exchange",
            order_id: result.order_id
          }
        })
      }
    }
  }

}
</script>