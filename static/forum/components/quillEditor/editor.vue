<template>
  <div>
    <div id="toolbar">
      <button class="ql-bold"></button>
      <button class="ql-italic"></button>
      <button class="fv-ql-image" @click.prevent="$emit('image', quillEditor)">
        <svg viewBox="0 0 18 18">
          <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect>
          <circle class="ql-fill" cx="6" cy="7" r="1"></circle>
          <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline>
        </svg>
      </button>
    </div>
    <div ref="quillEditor" class="quill-editor">
    </div>
  </div>
</template>

<script>
  import Quill from 'quill'

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
      config: {
        type: Object,
        required: false,
        default () {
          return {}
        }
      }
    },
    mounted() {
      this.$nextTick(_ => {
        this.initialize()
      })
    },
    beforeDestroy() {
      // 作者说了，等垃圾回收，不必显式清理
      this.quillEditor = null
    },
    methods: {
      initialize() {
        if (this.$refs.quillEditor) {
          let self = this
          self.quillEditor = new Quill(self.$refs.quillEditor, Object.assign({
            modules: self.defaultModules,
            placeholder: this.$t('forum.newPost.textAreaPlaceHolder'),
            readOnly: false,
            theme: 'snow',
            boundary: document.body
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
            let html = self.$el.children[0].innerHTML
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