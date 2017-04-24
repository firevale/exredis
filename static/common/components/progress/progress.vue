<template>
  <div class="-progress-box-container">
    <div class="-progress-box-mask"></div>
    <div class="-progress-box">
      <progress-bar type="circle" ref="circle" :options="options">
      </progress-bar>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    visible: Boolean,
  },

  data() {
    return {
      show: this.visible,
      options: {
        color: '#aaa',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 4,
        trailWidth: 1,
        easing: 'easeInOut',
        duration: 400,
        text: {
          autoStyleContainer: false
        },
        from: {
          color: '#FFEA82',
          width: 1
        },
        to: {
          color: '#ED6A5A',
          width: 4
        },
        // Set default step function for all animate calls
        step: function(state, circle) {
          circle.path.setAttribute('stroke', state.color)
          circle.path.setAttribute('stroke-width', state.width)
          var value = Math.round(circle.value() * 100)
          if (value === 0) {
            circle.setText('')
          } else {
            circle.setText(value)
          }
        }
      }
    }
  },

  mounted() {
    document.body.appendChild(this.$el)
  },

  methods: {
    setProgress(progress) {
      this.$refs.circle.animate(progress)
    },

    close() {
      document.body.removeChild(this.$el)
    }
  },
}
</script>
<style lang="scss">
.-progress-box-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  background: transparent;

  .-progress-box-mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #000;
    opacity: 0.8;
    z-index: -1;
  }

  .-progress-box {
    width: 10rem;
    height: 10rem;
    padding: 0.5rem;
    background-color: #fff;
    border-radius: 5px;
    opacity: 1;
  }
}
</style>