<template>
  <div ref="container">
    <div v-if="isValidImage">
      <progressive-background :style="imageSize" :src="src | imageStaticUrl" :placeholder="src | imageStaticUrl | imageLowQualityUrl"
        :blur="30" no-ratio/>
    </div>
    <div v-else class="invalid-image">
      <p>{{$t('error.invalidImage')}}</p>
    </div>
  </div>
</template>
<script>
import * as utils from 'common/js/filters.js'

import Vue from 'vue'
import VueProgressiveImage from 'vue-progressive-image'
Vue.use(VueProgressiveImage, {
  blur: 30,
})

export default {
  props: {
    src: String,
    width: String,
    height: String,
  },

  data() {
    return {
      maxWidth: 0,
      onResize: null,
    }
  },

  mounted() {
    this.maxWidth = this.$refs.container.clientWidth
    this.onResize = window.addEventListener('resize', _ => {
      this.$nextTick(_ => {
        this.maxWidth = this.$refs.container.clientWidth
      })
    })
  },

  destroyed() {
    window.removeEventListener('resize', this.onResize)
  },

  computed: {
    isValidImage() {
      return /^(https?:\/\/[^\/\.]+\.firevale.com\/|\/img\/|\/images\/)/.test(this.src)
    },

    isSizeSpecified() {
      return /^\d+/.test(this.width) && /^\d+/.test(this.height)
    },

    imageSize() {
      let width = parseInt(this.width)
      let height = parseInt(this.height)

      if (width < this.maxWidth) {
        return {
          width: this.width + 'px',
          height: this.height + 'px'
        } 
      } else {
        return {
          width: '100%',
          height: 0,
          'padding-bottom': `${(height * 100 / width).toFixed(0)}%`,
        }
      }
    }
  },

  methods: {

  }
}
</script>
<style lang="scss">
.ql-editor {
  .invalid-image {
    width: 20rem;
    height: 10rem;
    background: #979797;
    color: #f2f2f2;
    user-select: none;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    font-style: italic;
    cursor: default;
  }
}
</style>