<template>
  <div class="draw-page bg-full bg-draw-page">
    <header></header>
    <div class="rotate-container">
      <img src="~assets/pmall/1245_34_03.png">
      <div class="bg-full bg-turn-needle"></div>
    </div>
    <footer class="is-flex flex-center flex-vcentered ">
      <div class="my-total is-flex flex-center flex-vcentered is-size-medium">
        <span>我的积分总额 <strong class="is-primary"><label>{{points}}</label></strong></span>
      </div>
      <div>
        <a class="button btn-click-draw" @click="play"></a>
      </div>
    </footer>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
import anime from 'animejs';
import Toast from 'common/components/toast'
export default {
  computed: {
    ...mapGetters([
      'points'
    ])
  },
  data() {
    return {
      player: undefined,
      playerOptions: {
        rotateOffset: -18,
        duration: 5000,
        gap: 10,
        turns: 15,
      }
    }
  },
  mounted() {},
  methods: {
    ...mapActions([
      'setUserPoints'
    ]),
    play: async function() {
      let index = 1
      if (this.processing) {
        return
      }

      this.processing = true
      let result = await this.$acs.luckDraw()
      if (result.success) {
        this.setUserPoints(result.total_point)
        this.playAnimation(result, this.drawCallBack)
      } else {
        this.processing = false
        Toast.show(this.$t(i18n_message))
      }
    },
    drawCallBack(result) {
      this.processing = false
      this.setUserPoints(result.total_point)

      if (result.order_id) {
        Toast.show(this.$t(result.i18n_message, {
          draw_name: result.draw_name,
          point: result.add_point,
        }))
        editAddress(result.order_id)
      } else {
        Toast.show(this.$t(result.i18n_message, {
          point: result.add_point,
        }))
      }
    },
    editAddress(order_id) {
      this.$router.push({
        name: "new_address",
        params: {
          action: "draw",
          order_id: order_id
        }
      })
    },
    playAnimation(result, callback) {
      let index = result.index
      let maxLen = 8
      let angelStart = 360 / maxLen * (index - 1) + this.playerOptions.gap;
      let angelEnd = 360 / maxLen * index - this.playerOptions.gap;
      let angel = Math.floor(Math.random() * (angelEnd - angelStart)) + angelStart
      angel += this.playerOptions.rotateOffset
      angel += this.playerOptions.turns * 360
      this.player = anime({
        targets: '.bg-turn-needle',
        rotate: {
          duration: this.playerOptions.duration,
          easing: 'easeOutCubic',
          value: [this.playerOptions.rotateOffset, angel]
        },
        complete: function(anim) {
          if (typeof(callback) === "function" && callback != undefined) {
            callback(result)
          }
        }
      })
    }
  }
}
</script>