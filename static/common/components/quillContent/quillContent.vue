<template>
  <dynamic :comps="comps" :emptyView="emptyView" />
</template>
<script>
import EmptyView from './quillEmpty'
import quillImage from './quillImage'
import VueDynamic from '../vue-dynamic'
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
    },
  },
  data() {
    return {
      comps: [{
        template: `<div class="ql-editor">${this.content.replace(/<img ([^>]*)\/?>(<\/img>)?/, '<quill-image $1></quill-image>')}</div>`,
      }],
      emptyView: EmptyView
    }
  },
}
</script>