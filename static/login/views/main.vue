<template>
  <div class="g-doc">
    <div class="g-con">
      <span class="icon-close show-in-app">
        <icon name="times" scale="1.3" :fill-color="colors.dark"></icon>
      </span>
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
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'colors'
      ]),
    },

    components: {
      'icon': Icon,
    }
  }
</script>
<style lang="scss">
  @import '../scss/login';
</style>