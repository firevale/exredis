<template>
  <div class="draw-page bg-full bg-draw-page is-flex flex-center flex-vcentered">
    <div class="bg-full bg-draw-item"></div>
    <div class="rotate-container">
      <div class="bg-full bg-turn-needle"></div>
    </div>
    <footer class="is-flex">
      <div class="my-total is-flex flex-center flex-vcentered">
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
      player: undefined
    }
  },
  mounted() {
    this.player = anime({
      targets: '.bg-turn-needle',
      rotate: {
        value: 1630,
        duration: 5000,
        easing: 'easeOutCubic'
      },
      autoplay: false,
      loop:false,
      complete: function(anim) {
        this.pause()
      }
    });
  },
  methods: {
    play() {
      this.player.restart()
    }

  }

}
</script>