<template>
  <div class="slider-nav">
    <div class="nav">
      <div class="nav-center">
        <v-touch tag="a" class="nav-item is-tab has-right-line is-mobile" v-for="(item, index) in menus" key="item.value"
          :class="{'is-active': item.value == currentValue}" @tap="switchMenu(item, index,$event)" ref="navItem">{{item.text}}</v-touch>
        <div class="slider-bar" :style="{'left': sliderPosition, 'width': barWidth, 'background-size': sliderBackgroundSize}"
          ref="sliderBar" style="display: flex;">
        </div>
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
    selectedValue: undefined
  },

  data() {
    return {
      menuHash: [],
      currentValue: undefined,
      barWidth: '100px',
      resize: false
    }
  },

  mounted: function() {
    for (let i = 0; i < this.menus.length; i++) {
      this.menuHash[this.menus[i].value] = i
    }

    this.currentValue = this.selectedValue
    if (!this.currentValue && this.menus) {
      this.currentValue = this.menus[0].value
    }

    window.addEventListener('resize', e => {
      this.resize = true
    })

    this.$on('select', value => {
      this.currentValue = value
    })
  },
  computed: {
    selectedIndex() {
      return this.menuHash[this.currentValue]
    },

    sliderBackgroundSize() {
      return this.barWidth + ' 0.8rem'
    },

    sliderPosition() {
      if (this.resize)
        this.resize = false

      if (this.selectedIndex == undefined) {
        return "0"
      }

      let element = this.$refs.navItem[this.selectedIndex].$el
      let bar = this.$refs.sliderBar

      let offsetLeft = element.offsetLeft;
      let offsetWidth = element.offsetWidth;
      let _barWidth = parseInt(bar.offsetWidth)

      if (_barWidth > offsetWidth) {
        _barWidth = offsetWidth;
      } else if (offsetWidth > 100) {
        _barWidth = 100
      }

      this.barWidth = _barWidth + "px"
      let left = element.offsetLeft + ((offsetWidth - _barWidth) / 2)
      return left + "px"
    },
  },
  methods: {
    switchMenu: function(item, index, event) {
      this.currentValue = item.value
      this.$emit('onSelect',
        item,
        index
      )
    }
  }
}
</script>
<style lang="scss">
@import "forum/scss/jqxs_mobile";
.slider-nav {
  .nav {
    // $item-width: 13.2rem;
    height: virtual-m-rem(148);
    .nav-center {
      position: relative;
      margin: 0;
      flex-grow: 1;
      flex-shrink: 1;
      justify-content: space-around;
      .is-left {
        flex-grow: 0;
        flex-shrink: 0;
        justify-content: flex-start;
      }
      .slider-bar {
        position: absolute;
        bottom: 0;
        content: "";
        height: 1rem;
        left: 0;
        border-bottom: virtual-m-rem(5) solid $primary;
        transition: left 0.3s;
        transition-timing-function: ease;
      }
      .nav-item {
        color: $black;
        max-width: 13.2rem;
        &.is-tab {
          font-size: 1.167rem !important;
          padding: 0;
          border-bottom-width: 0;
          &:hover {
            color: $primary;
          }
          &.is-active {
            color: $primary;
          }
        }
      }

      @media all and (max-width: 425px) {
        .nav-item {
          max-width: 8rem;
        }
      }
    }
  }
}
</style>