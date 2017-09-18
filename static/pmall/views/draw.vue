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
      <div class="button btn-click-draw"></div>
    </footer>
  </div>
</template>
<script>
import anime from 'animejs'
export default {

  mounted() {
    anime({
      targets: '.bg-turn-needle',
      rotate: {
        value: 720,
        duration: 3000,
        easing: 'easeInOutSine'
      },
      duration: 2000,
      loop: true
    });
  }

}
</script>