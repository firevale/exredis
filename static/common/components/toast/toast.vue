<template>
  <div v-if="visible" class="fv-toast-wrapper">
    <div class="fv-toast-body">
      <span>{{message}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: String,
      default: '',
    },
    visible: {
      type: Boolean,
      default: false,
    }
  },
  mounted() {
    document.body.appendChild(this.$el)
  },
}
</script>
<style lang="scss" scoped>
.fv-toast-wrapper {
  position: absolute;
  z-index: 999;
  background: transparent;
  top: 0;
  left: 0;
  right: 0;
  opacity: 0;
  width: 100%;
  animation: message 2s ease;

  .fv-toast-body {
    margin: 0 auto;
    text-align: center;
    background: transparent;
    transition: all 1s ease;

    span {
      padding: 0.5rem 1rem;
      background: #000;
      font-weight: 400;
      font-size: 1.25rem;
      color: #fff;
      border-radius: 2px;
    }
  }
}

@keyframes message {
  0% {
    top: 30%;
    opacity: 0;
  }
  20% {
    top: 50%;
    opacity: 0.6;
  }
  50% {
    top: 50%;
    opacity: 0.8;
  }
  80% {
    top: 50%;
    opacity: 0.8;
  }
  100% {
    top: 70%;
    opacity: 0;
  }
}
</style>