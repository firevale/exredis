<template>
  <div class="-mobile-menu-container">
    <v-touch v-if="show" class="-mobile-menu-mask" @tap="deactive"> </v-touch>
    <transition appear enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown" @beforeEnter="beforeEnter"
      @afterLeave="afterLeave">
      <div class="-mobile-menu-wrapper" v-if="show">
        <div class="-mobile-menu">
          <v-touch class="-mobile-menu-item" v-for="item in items" @tap="onItemSelected(item)">
            <span>{{ item.title }}</span>
          </v-touch>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
require('animate.css/source/bouncing_entrances/bounceInUp.css')
require('animate.css/source/bouncing_exits/bounceOutDown.css')

export default {
  props: {
    visible: Boolean,

    items: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      show: this.visible
    }
  },

  mounted() {
    document.body.appendChild(this.$el)
  },

  methods: {
    beforeEnter() {
      this.$emit('open')
    },

    afterLeave() {
      this.$emit('close')
      this.$nextTick(_ => {
        document.body.removeChild(this.$el)
      })
    },

    active() {
      this.show = true
    },

    deactive() {
      this.show = false
    },

    onItemSelected(item) {
      this.$emit('item-selected', item)
      this.show = false
    }
  },

  watch: {
    visible(val) {
      this.show = val
    }
  }
}
</script>

<style lang="scss">
.-mobile-menu-container {
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
  justify-content: flex-end;
}

.-mobile-menu-mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  z-index: 999;
}

.-mobile-menu-wrapper {
  position: relative;
  top: -1rem;
  overflow: hidden;
  z-index: 1000;

  &::before {
    opacity: 0.85;
    border-radius: 5px;
    background-color: #000;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    content: '';
  }

  &.animated {
    animation-duration: 0.4s;
  }
}

.-mobile-menu {
  color: #fff;
  min-width: 20rem;
  position: relative;
  display: block;
  overflow: hidden;

  &-item {
    position: relative;
    width: 100%;
    flex: 1;
    color: #fff;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    padding: 1rem;
    font-size: 1.25rem;
  }

  &-item:not(:last-child)::after {
    display: block;
    position: absolute;
    height: 0;
    bottom: 0;
    width: 100%;
    left: 0;
    right: 0;
    content: "";
    border-bottom: 1px solid #f2f2f2;
  }
}

@media only screen and (max-width: 320px) {
  .-mobile-menu {
    width: 90vw;
  }

  .-mobile-menu-item {
    span {
      max-width: 95%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

@media only screen and (-o-min-device-pixel-ratio: 5/4),
only screen and (-webkit-min-device-pixel-ratio: 1.25),
only screen and (min--moz-device-pixel-ratio: 1.25),
only screen and (min-device-pixel-ratio: 1.25),
only screen and (min-resolution: 1.25dppx) {
  body:not(.ios) {
    .-mobile-menu-item:not(:last-child)::after {
      transform: translateZ(0) scaleY(.3);
      transform-origin: 0 0;
    }
  }
  body.ios {
    .-mobile-menu-item:not(:last-child)::after {
      border-width: 0.5px;
    }
  }
}

</style>