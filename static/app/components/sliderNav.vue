<template>
  <div class="slider-nav">
    <div class="nav">
      <div class="nav-center">
        <a class="nav-item is-tab has-right-line" v-for="(item, index) in menus" :class="{'is-active': item.value == currentValue}"
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
    selectedValue: undefined
  },

  data() {
    return {
      menuHash: [],
      currentValue: undefined,
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

    this.$on('select', value => {
      this.currentValue = value
    })
  },
  computed: {
    selectedIndex() {
      return this.menuHash[this.currentValue]
    },
    sliderPosition() {
      let itemWidth = 13.2
      let barOffset = 0.175
      return this.selectedIndex * itemWidth + itemWidth * barOffset + "rem bottom"
    },
  },
  methods: {
    switchMenu: function(item, index) {
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
    margin-bottom: .5rem;
    border-bottom: .5rem solid $bottom-line-light;
    height: 4.8rem;
    .nav-center {
      position: relative;
      .slider-bar {
        position: absolute;
        bottom: -.8rem;
        content: "";
        width: 100%;
        height: 1rem;
        left: 0;
        background-image: url("~assets/nav-narrow@3x.png");
        background-repeat: no-repeat;
        background-size: 9rem 0.8rem;
        transition: background-position 0.3s;
        transition-timing-function: ease;
      }
      .nav-item {
        color: $black;
        padding: 1rem 2rem;
        margin: auto 2rem;
        font-size: 1.3rem;
        &.is-tab {
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
              right: -2rem;
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