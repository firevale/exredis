<template>
  <div class="tip-message">
    <div class="body-message">
      {{message}}
    </div>
  </div>
</template>
<script>
  export default {
    props:{
      message:{
        type: String,
        default: '',
      }
    }
  }
</script>
<style lang="scss">
  @import '../../scss/login';
  .tip-message {
    position: absolute;
    z-index: 3;
    background: transparent;
    top: 0%;
    left: 0;
    opacity: 0;
    width: 100%;
    animation: message 2s ease;
    .body-message {
      width: 50%;
      padding: 1rem;
      margin: 0 auto;
      color: $white;
      text-align: center;
      background: $black;
      border-radius: 1rem;
      transition: all 1s ease;
    }
  }
</style>