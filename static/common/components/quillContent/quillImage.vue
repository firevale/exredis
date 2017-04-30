<template>
  <div>
    <div v-if="isValidImage">
      <progressive-img :src="src | imageStaticUrl" :placeholder="src | imageStaticUrl | imageLowQualityUrl" blur="30"/>
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
Vue.use(VueProgressiveImage)

export default {
  props: {
    src: String,
    width: String,
    height: String,
  },

  computed: {
    isValidImage() {
      return /^(https?:\/\/[^\/\.]+\.firevale.com\/|\/img\/|\/images\/)/.test(this.src)
    },

    isSizeSpecified() {
      return /^\d+/.test(this.width) && /^\d+/.test(this.height)
    },
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
