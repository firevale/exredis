<template>
  <div class="slider-nav">
    <div class="nav">
      <div class="nav-center">
        <a class="nav-item is-tab has-right-line is-mobile" v-for="(item, index) in menus" :class="{'is-active': item.value == currentValue}"
          @click.prevent="switchMenu(item,index,$event)" ref="navItem">{{item.text}}</a>
        <div class="slider-bar" :style="{'left':sliderPosition,'width':barWidth,'background-size':sliderBackgroundSize}"
          ref="sliderBar" style="display: flex;"></div>
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

      let element = this.$refs.navItem[this.selectedIndex]
      let bar = this.$refs.sliderBar

      let offsetLeft = element.offsetLeft;
      let offsetWidth = element.offsetWidth;

      if (offsetWidth < bar.offsetWidth) {
        this.barWidth = offsetWidth + "px"
      } else {
        this.barWidth = "100px"
      }

      let left = element.offsetLeft + ((offsetWidth - 100) / 2)
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
@import "~bulma/sass/utilities/variables.sass";
@import "../scss/variables";
.slider-nav {
  .nav {
    $item-width: 13.2rem;
    $item-min-width: 8rem;
    margin-bottom: .5rem;
    border-bottom: .5rem solid $bottom-line-light;
    height: 4.8rem;
    .nav-center {
      position: relative;
      margin: 0;
      flex-grow: 1;
      .slider-bar {
        position: absolute;
        bottom: -.8rem;
        content: "";
        height: 1rem;
        left: 0;
        background-image: url("~assets/nav-narrow@3x.png");
        background-repeat: no-repeat;
        background-size: 100px 0.8rem;
        background-position: 0 bottom;
        transition: left 0.3s;
        transition-timing-function: ease;
      }
      .nav-item {
        color: $black;
        justify-content: center;
        /*padding: 1rem 2rem;*/
        /*margin: auto 2rem;*/
        font-size: 1.3rem;
        max-width: $item-width;
        flex-grow: 1;
        flex-shrink: 1;
        &.is-tab {
          padding: 0;
          border-bottom-width: 0;
          &:hover {
            color: $primary;
          }
          &.is-active {
            color: $primary;
          }
          &:not(:nth-last-child(2)).has-right-line {
            position: relative;
            &:after {
              display: block;
              position: absolute;
              width: 0;
              height: 1.5rem;
              top: 1rem;
              right: 0rem;
              content: "";
              border-right: 0.12rem solid $bottom-line-light;
            }
          }
        }
      }
    }
  }
}
</style>