<template>
  <div class="g-doc">
    <div class="g-con">
      <icon name="times" scale="1.3" class="icon-close show-in-app" fill-color="#aaa"></icon>
      <div class="g-mask">
        <transition name="slide">
          <router-view> </router-view>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
  import Icon from '../components/fvIcon/Icon.vue'
  import '../components/fvIcon/icons/times'
  export default {
    components: {
      'icon': Icon,
    }
  }
</script>
<style lang="scss">
  @import '../scss/login';
</style>