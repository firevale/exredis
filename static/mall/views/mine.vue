<template>
  <div class="is-ancestor is-parent is-vertical">
    <div class="is-child content-item row-menu">
      <div @click="goBack" class="pointer" style="position: absolute;left: 2rem;">
        {{ $t('forum.surroundingMall.back') }}
      </div>
      <div style="flex: 1;text-align: center;">
        {{ $t('forum.mine.title') }}
      </div>
    </div>
    <div class="horizontal-seprate" style="height: .7rem;"></div>
    <div class="row-menu mine-item" @click="goMyOrder">
      <span style="flex: 1;">{{ $t('forum.mine.myOrder') }}</span>
      <i class="fa fa-angle-right" aria-hidden="true"></i>
    </div>
    <div class="horizontal-seprate"></div>
    <div class="row-menu mine-item" @click="goMyAddress">
      <span style="flex: 1;">{{ $t('forum.mine.myAddress') }}</span>
      <i class="fa fa-angle-right" aria-hidden="true"></i>
    </div>
    <div class="horizontal-seprate"></div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        
      }
    },
    computed: {

    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },

      goMyOrder(){
        
      },

      goMyAddress(){
        
      },

    },

    components: {
    }
  }
</script>
<style lang="scss">
  @import "../scss/mall";
</style>