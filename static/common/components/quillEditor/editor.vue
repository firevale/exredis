<template>
  <div>
    <div id="toolbar">
      <button class="ql-bold"></button>
      <button class="ql-italic"></button>
      <template v-if="fullFeatured">
        <button class="ql-underline"></button>
        <button class="ql-strike"></button>
        <button class="ql-indent" value="+1"></button>
        <button class="ql-indent" value="-1"></button>
      </template>
      <template v-if="fullFeatured">
        <select class="ql-size">
          <option value="small"></option>
          <option selected></option>
          <option value="large"></option>
          <option value="huge"></option>
        </select>
        <select class="ql-header">
          <option value="1"></option>
          <option value="2"></option>
          <option value="3"></option>
          <option value="4"></option>
          <option value="5"></option>
          <option value="6"></option>
          <option selected></option>
        </select>
        <select class="ql-color">
          <option selected="selected"></option>
          <option value="#e60000"></option>
          <option value="#ff9900"></option>
          <option value="#ffff00"></option>
          <option value="#008a00"></option>
          <option value="#0066cc"></option>
          <option value="#9933ff"></option>
          <option value="#ffffff"></option>
          <option value="#facccc"></option>
          <option value="#ffebcc"></option>
          <option value="#ffffcc"></option>
          <option value="#cce8cc"></option>
          <option value="#cce0f5"></option>
          <option value="#ebd6ff"></option>
          <option value="#bbbbbb"></option>
          <option value="#f06666"></option>
          <option value="#ffc266"></option>
          <option value="#ffff66"></option>
          <option value="#66b966"></option>
          <option value="#66a3e0"></option>
          <option value="#c285ff"></option>
          <option value="#888888"></option>
          <option value="#a10000"></option>
          <option value="#b26b00"></option>
          <option value="#b2b200"></option>
          <option value="#006100"></option>
          <option value="#0047b2"></option>
          <option value="#6b24b2"></option>
          <option value="#444444"></option>
          <option value="#5c0000"></option>
          <option value="#663d00"></option>
          <option value="#666600"></option>
          <option value="#003700"></option>
          <option value="#002966"></option>
          <option value="#3d1466"></option>
        </select>
        <button class="ql-list" value="ordered"></button>
        <button class="ql-list" value="bullet"></button>
        <button class="ql-script" value="sub"></button>
        <button class="ql-script" value="super"></button>
      </template>
      <button class="fv-ql-image" @click.prevent="$emit('image', quillEditor)">
        <svg viewBox="0 0 18 18">
          <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect>
          <circle class="ql-fill" cx="6" cy="7" r="1"></circle>
          <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline>
        </svg>
      </button>
    </div>
    <div ref="quill" class="quill-editor"></div>
  </div>
</template>
<script>
import Quill from 'quill'

require('quill/assets/snow.styl')
require('quill/assets/core.styl')

if (!window.Quill) {
  window.Quill = Quill
}
export default {
  name: 'quill-editor',
  data() {
    return {
      _content: '',
      defaultModules: {
        toolbar: '#toolbar',
        history: {
          delay: 2000,
          maxStack: 100,
          userOnly: true
        }
      }
    }
  },
  props: {
    content: String,
    value: String,
    fullFeatured: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    config: {
      type: Object,
      required: false,
      default () {
        return {}
      }
    }
  },
  mounted() {
    this.initialize()
  },
  beforeDestroy() {
    // 作者说了，等垃圾回收，不必显式清理
    this.quillEditor = null
  },
  methods: {
    initialize() {
      if (this.$refs.quill) {
        let self = this
        self.quillEditor = new Quill(self.$refs.quill, Object.assign({
          modules: self.defaultModules,
          placeholder: this.placeholder,
          readOnly: false,
          theme: 'snow',
          strict: false,
        }, self.config || {}))

        // set editor content
        if (self.value || self.content) {
          self.quillEditor.pasteHTML(self.value || self.content)
        }

        // mark model as touched if editor lost focus
        self.quillEditor.on('selection-change', (range) => {
          if (!range) {
            self.$emit('blur', self.quillEditor)
          } else {
            self.$emit('focus', self.quillEditor)
          }
        })

        // update model if text changes
        self.quillEditor.on('text-change', (delta, oldDelta, source) => {
          let html = self.$refs.quill.children[0].innerHTML
          const text = self.quillEditor.getText()
          if (html === '<p><br></p>') html = ''
          self._content = html
          self.$emit('input', self._content)
          self.$emit('change', {
            editor: self.quillEditor,
            html: html,
            text: text
          })
        })

        // 广播事件
        self.$emit('ready', self.quillEditor)
      }
    }
  },
  watch: {
    'content' (newVal, oldVal) {
      if (this.quillEditor) {
        if (!!newVal && newVal !== this._content) {
          this._content = newVal
          this.quillEditor.pasteHTML(newVal)
        } else if (!newVal) {
          this.quillEditor.setText('')
        }
      }
    },
    'value' (newVal, oldVal) {
      if (this.quillEditor) {
        if (newVal !== this._content) {
          this._content = newVal
          this.quillEditor.pasteHTML(newVal)
        } else if (!newVal) {
          this.quillEditor.setText('')
        }
      }
    }
  }
}
</script>