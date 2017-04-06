<template>
  <div v-if="visible" class="fv-toast-wrapper">
    <div class="fv-toast-body">
      {{message}}
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

<style lang="scss">
.fv-toast-wrapper {
  position: absolute;
  z-index: 3;
  background: transparent;
  top: 0;
  left: 0;
  right: 0;
  opacity: 0;
  width: 100%;
  margin-top: 5rem;
  animation: message 2s ease;

  .fv-toast-body {
    width: 50%;
    padding: 1rem;
    margin: 0 auto;
    font-weight: bold;
    color: #fff;
    text-align: center;
    background: #000;
    border-radius: 1rem;
    transition: all 1s ease;
  }
}
@keyframes message {
  0% {
    top: 0;
    opacity: 0;
  }
  50% {
    top: 0;
    opacity: 0.8;
  }
  80% {
    top: 0;
    opacity: 0.8;
  }
  100% {
    top: 0;
    opacity: 0;
  }
}
</style>