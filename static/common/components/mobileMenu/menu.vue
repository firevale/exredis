<template>
  <div>
    <v-touch class="-mobile-menu-mask" @tap="onMaskTouched"> </v-touch>
    <transition name="bounceUp">
      <div class="-mobile-menu-wrapper" v-if="visible">
        <div class="-mobile-menu">
          <v-touch class="-mobile-menu-item" v-for="item in items" @tap="onItemSelected(item)">
            {{ item.title }}
          </v-touch>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    visible: Boolean,
    items: {
      type: Array,
      required: true,
    },
    onMenuItemSeleted: {
      type: Function,
      default: null
    }
  },

  methods: {
    onPickImage: function(sourceType) {
      nativeApi.pickImageFrom(sourceType, this.callback)
    },

    onMaskTouched: function(e) {
      this.visible = false
    },
  }
}
</script>
<style lang="scss">
.-mobile-menu {
  &-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    opacity: 0;
    z-index: 10;
  }
  &-wrapper {
    min-height: 10vh;
    position: fixed;
    left: 0; 
    right: 0;
    bottom: 1rem;
    z-index: 11;
    &:before {
      width: 90%;
      height: 100%;
      opacity: 0.85;
      background-color: #000;
      -webkit-backdrop-filter: blur(20px);
      position: absolute;
      @include border-radius(10);
      margin-left: 5%;
      top: 0;
      z-index: -1;
      content: '';
    }
  }

  color: #fff;
  width: 90%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-flow: column nowrap;
  text-align: center;
  &-item {
    color: #fff;
    width: 100%;
    display: block;
    margin: 0 auto;
  }
}
</style>