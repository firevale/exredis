<template>
  <div class="draw-page bg-full bg-draw-page">
    <header></header>
    <div class="rotate-container">
      <img src="~assets/pmall/1245_34_03.png">
      <div class="bg-full bg-turn-needle"></div>
    </div>
    <footer class="is-flex flex-center flex-vcentered ">
      <div class="my-total is-flex flex-center flex-vcentered is-size-medium">
        <span>我的积分总额 <strong class="is-primary"><label v-if="wcp_user">{{wcp_user.points}}</label><label v-else>0</label></strong></span>
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
      'wcp_user'
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
  mounted() {
    // this.player = anime({
    //   targets: '.bg-turn-needle',
    //   rotate: {
    //     duration: 1,
    //     value: this.playerOptions.rotateOffset
    //   },
    //   autoplay: true,
    // });
  },
  methods: {
    play: async function() {
      let index = 1
      if (!this.processing) {
        this.processing = true
        let result = await this.$acs.luckDraw()
        if (result.success) {
          index = result.index
          setTimeout(() => {
            Toast.show(this.$t(result.i18n_message, {
              draw_name: result.draw_name
            }))
          }, 6000)
          setTimeout(() => {
            this.$router.push({
              name: "new_address",
              params: {
                action: "draw",
                order_id: result.order_id
              }
            })
            this.processing = false
          }, 8000)
        } else {
          this.processing = false
          Toast.show('抽奖失败，请稍后再试')
          return
        }

        let maxLen = 8
        let angelStart = 360 / maxLen * (index - 1) + this.playerOptions.gap;
        let angelEnd = 360 / 8 * index - this.playerOptions.gap;
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
            console.info('中奖index:' + index)
          }
        })
      }

    }
  }
}
</script>