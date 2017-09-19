<template>
  <div ref="container" class="quill-image">
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
    alt: String,
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
      this.maxWidth = this.$el.clientWidth
    })

    if (this.isValidImage) {
      this.$emit('add', this.src, parseInt(this.width), parseInt(this.height) )
      this.$el.addEventListener('tap', _ => {
        let rect = this.$el.getBoundingClientRect()
        this.$emit('tap', this.src)
      }, false)
    }
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
    width: 15rem;
    height: 10rem;
    margin: 0.5rem auto;
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
  .quill-image {
    margin-top: 1rem;
    margin-bottom: 1rem;
    cursor: pointer;
  }
}
</style>