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
          onAddImage: function(url, width, height) {
            this.imageUrls.push(filters.imageStaticUrl(url))
            this.images.push({src: filters.imageStaticUrl(url), w: width, h: height})
          },
          onShowSlide: function(showingImageUrl) {
            let url = filters.imageStaticUrl(showingImageUrl)
            let index = this.imageUrls.indexOf(url)

            this.$preview.open(index, this.images, {
              getThumbBoundsFn: i => {
                let images = this.$el.getElementsByClassName('quill-image')
                let rects = []

                Object.keys(images).forEach(key => {
                  let image = images[key]
                  let rect = image.children[0].children[0].getBoundingClientRect()
                  rects.push({x: rect.left, y: rect.top, w: rect.width})
                })

                return rects[i]
              },
            })
          } 
        },
        data: function() {
          return {
            imageUrls: [],
            images: [],
          }
        }
      }],
      emptyView: EmptyView
    }
  },
}
</script>