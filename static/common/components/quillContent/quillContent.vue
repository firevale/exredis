<template>
  <dynamic :comps="comps" :emptyView="emptyView" />
</template>
<script>
import EmptyView from './quillEmpty'
import quillImage from './quillImage'
import VueDynamic from '../vue-dynamic'
import * as filters from 'common/js/filters'
import nativeApi from 'common/js/nativeApi'

import Vue from 'vue'

Vue.use(VueDynamic, {
  name: 'dynamic'
})

Vue.component('quill-image', quillImage)

export default {
  name: 'quillContentComponent',
  props: {
    content: {
      type: String,
      require: true,
      default: '',
    },
  },

  data() {
    return {
      comps: [{
        template: `<div><div class="ql-editor">${this.content.replace(/<img ([^>]*)\/?>(<\/img>)?/g, (_, $1) => `<quill-image @tap="onShowSlide" @add="onAddImage" ${$1}></quill-image>`)}</div></div>`,
        methods: {
          onAddImage: function(url) {
            this.imageUrls.push(filters.imageStaticUrl(url))
          },
          onShowSlide: function(showingImageUrl) {
            nativeApi.slideShowPhotos(this.imageUrls, filters.imageStaticUrl(showingImageUrl))
          }
        },
        data: function() {
          return {
            imageUrls: []
          }
        }
      }],
      emptyView: EmptyView
    }
  },
}
</script>