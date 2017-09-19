<template>
  <div class="draw-page bg-full bg-draw-page is-flex flex-center flex-vcentered">
    <div class="rotate-container bg-full bg-draw-item"></div>
    <div class="rotate-container">
      <div class="bg-full bg-turn-needle"></div>
    </div>
    <footer class="is-flex">
      <div class="my-total is-flex flex-center flex-vcentered is-size-medium">
        <span>我的积分总额 <strong class="is-primary">90</strong></span>
      </div>
      <div class="button btn-click-draw" @click="play"></div>
    </footer>
  </div>
</template>
<script>
import anime from 'animejs';
export default {
  data() {
    return {
      player: undefined,
      playerOptions: {
        rotateOffset: -18,
        duration: 5000,
        gap: 10,
        turns: 3,
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
    play() {
      let maxLen = 8
      let index = Math.floor(Math.random() * (maxLen - 1)) + 1
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
</script>