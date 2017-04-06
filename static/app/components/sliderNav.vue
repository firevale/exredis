<template>
  <div class="slider-nav">
    <div class="nav">
      <div class="nav-center">
        <a class="nav-item is-tab has-right-line" v-for="(item, index) in menus" :class="{'is-active': index == selectedIndex}"
          @click.prevent="switchMenu(item,index)">{{item.text}}</a>
        <div class="slider-bar" :style="{'background-position':sliderPosition}"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    menus: {
      type: Array,
      default: () => {
        []
      }
    },
    onSelect: Function
  },

  data() {
    return {
      selectedIndex: 0
    }
  },
  computed: {
    sliderPosition() {
      let itemWidth = 15.58
      let barOffset = 0.2
      return this.selectedIndex * itemWidth + itemWidth * barOffset + "em bottom"
    },
  },
  methods: {
    switchMenu: function(item, index) {
      if (this.selectedIndex == index) {
        return
      }

      this.selectedIndex = index
      if (this.onSelect) {
        this.onSelect(item, index)
      }
    }
  }
}
</script>
<style lang="scss">
@import "~bulma/sass/utilities/variables.sass";
@import "../scss/variables";
.slider-nav {
  .nav {
    margin-bottom: .5em;
    border-bottom: .5em solid $bottom-line-light;
    height: 4.8em;
    .nav-center {
      position: relative;
      .slider-bar {
        position: absolute;
        bottom: -.8em;
        content: "";
        width: 100%;
        height: 1em;
        left: 0;
        background-image: url("~assets/nav-narrow@3x.png");
        background-repeat: no-repeat;
        background-size: 9em 0.8em;
        transition: background-position 0.3s;
        transition-timing-function: ease;
      }
      .nav-item {
        color: $black;
        padding: 1em 2em;
        margin: auto 2em;
        font-size: 1.3rem;
        &.is-tab {
          border-bottom-width: 0;
          &:hover {
            color: $primary;
          }
          &.is-active {
            color: $primary;
          }
          &.has-right-line {
            position: relative;
            &:after {
              display: block;
              position: absolute;
              width: 0;
              height: 1.5em;
              top: 1em;
              right: -2em;
              content: "";
              border-right: 0.12em solid $bottom-line-light;
            }
          }
        }
      }
    }
  }
}
</style>