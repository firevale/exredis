<template>
  <div class="g-doc">
    <div ref="gCon" class="g-con">
      <span v-show="app.history-1" class="icon-back" @click="backToLogin">
        <icon name="chevron-left" :fill-color="colors.dark"></icon>
      </span>
      <span class="icon-close show-in-app" @click="onClose">
        <icon name="times" scale="1.3" :fill-color="colors.dark"></icon>
      </span>
      <div class="g-mask">
        <transition :name="transitionName">
          <router-view> </router-view>
        </transition>
      </div>
      <div ref="msg">
      </div>
    </div>
  </div>
</template>
<script>
  import Icon from '../components/fvIcon/Icon.vue'
  import '../components/fvIcon/icons/times'
  import '../components/fvIcon/icons/chevron-left'
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  export default {
    data:function(){
      return {
        transitionName: 'slide-right',
      }
    },
    
    computed: {
      ...mapGetters([
        'app','colors','getMessage'
      ]),

      
    },

    components: {
      'icon': Icon,
    },

    watch: {
      '$route' (to, from) {
        this.transitionName = to.name == 'login'? 'slide-right' : 'slide-left'
      }
    },

    methods: {
      backToLogin: function() {  
       this.$router.back()
      },

      onClose: function(){

      }
    }
  }
</script>
<style lang="scss">
  @import '../scss/login';
</style>