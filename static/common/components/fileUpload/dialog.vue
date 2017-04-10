<template>
  <modal :visible="visible">
    <div class="tile box is-ancestor is-vertical file-upload-modal has-text-centered" style="padding: 10px; margin: 0">
      <div class="tile is-parent is-full is-vertical">
        <article class="tile is-child file-upload-container">
          <file-upload class="file-upload" :class="file ? 'file-selected' : ''" ref="upload" :name="name" :title="title"
            :drop="true" :accept="accept" :multiple="false" :headers="headers" :data="data" :size="maxFileSize" :timeout="60000"
            :postAction="postAction" :extensions="extensions" :events="uploadEvents">
          </file-upload>
        </article>
      </div>
      <div v-if="file" class="columns is-full is-gapless is-multiline is-mobile" style="margin-bottom: 0.5rem">
        <div class="column has-text-right is-2" style="margin-right: 0.5rem">
          <label class="label">{{ $t('upload.filename' )}}:</label>
        </div>
        <div class="column has-text-left is-9">
          <label class="field-label is-small">{{ file.name }}</label>
        </div>
        <div class="column has-text-right is-2" style="margin-right: 0.5rem">
          <label class="label">{{ $t('upload.filesize' )}}:</label>
        </div>
        <div class="column has-text-left is-9">
          <label class="field-label is-small">{{ file.size | humanReadableSize }}</label>
        </div>
        <template v-if="file.active">
          <div class="column has-text-right is-2" style="margin-right: 0.5rem">
            <label class="label">{{ $t('upload.progress' )}}:</label>
          </div>
          <div class="column has-text-left is-9">
            <div class="control" style="padding-top: 0.375em">
              <progress class="progress is-small is-info" style="margin-top: 0.375em" :value="file.progress" max="100"> {{ file.progress }}%
              </progress>
            </div>
          </div>
        </template>
        <template v-if="file.active">
          <div class="column has-text-right is-2" style="margin-right: 0.5rem">
            <label class="label">{{ $t('upload.speed' )}}:</label>
          </div>
          <div class="column has-text-left is-9">
            <label class="field-label is-small">{{ file.speed | humanReadableSize }}</label>
          </div>
        </template>
      </div>
      <p class="is-danger">{{this.errorMessage}}</p>
      <div class="tile is-child is-full has-text-centered">
        <a class="button is-info" :class="{'is-disabled': !file || file.success || file.active, 
                              'is-loading': upload && upload.active}" @click="upload.active = true">
          <span class="icon image-icon icon-upload"></span>
          <span>{{ $t('upload.title') }}</span>
        </a>
      </div>
    </div>
  </modal>
</template>
<script>
import Vue from 'vue'

import {
  Modal
} from 'vue-bulma-modal'

import FileUpload from 'vue-upload-component'

import {
  humanReadableSize
} from 'common/js/filters'

export default {
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    callback: {
      type: Function,
      default: undefined,
    },
    name: {
      type: String,
      default: 'file',
    },
    title: {
      type: String,
      default: '',
    },
    extensions: {
      default: () => [],
    },
    postAction: {
      type: String,
    },
    accept: {
      type: String,
    },
    headers: {
      type: Object,
      default: () => {},
    },
    data: {
      type: Object,
      default: () => {},
    },
    maxFileSize: {
      type: Number,
      default: 512 * 1024,
    },
    imageValidator: {
      type: Object,
      default: null,
    }
  },

  data: function() {
    return {
      file: undefined,
      upload: undefined,
      active: false,
      errorMessage: '',
      uploadEvents: {
        add: file => {
          if (file.size > this.maxFileSize) {
            this.errorMessage = this.$t('upload.fileIsTooLarge', {
              maxFileSize: humanReadableSize('' +
                this.maxFileSize)
            })
            this.upload.clear()
          } else {
            this.errorMessage = ''
            this.file = file
            if (/^image\/(.*)/.test(file.file.type)) {
              let reader = new FileReader()
              reader.onloadend = _ => {
                this.upload.$el.style.backgroundImage = `url(${reader.result})`
                if (this.imageValidator) {
                  let img = new Image()
                  img.onload = _ => {
                    if (this.imageValidator.square) {
                      if (img.width != img.height) {
                        this.errorMessage = this.$t('upload.imgShouldBeSquare')
                        this.upload.clear()
                        return
                      }
                    }
                    if (this.imageValidator.minWidth) {
                      if (img.width < this.imageValidator.minWidth) {
                        this.errorMessage = this.$t('upload.imgWidthShouldGreaterThan', {minWidth: this.imageValidator.minWidth})
                        this.upload.clear()
                        return
                      }
                    }
                  }
                  img.src = reader.result
                }
              }
              reader.readAsDataURL(file.file)
            }
          }
        },
        before: _ => {
          this.active = true
        },
        after: (file, component) => {
          this.active = false
          this.file = undefined
          this.visible = false

          this.$nextTick(_ => {
            if (typeof this.callback == 'function') {
              if (file.xhr.status == 200) {
                this.callback(file.response)
              } else {
                this.callback({
                  success: false,
                  i18n_message: 'forum.error.networkError'
                })
              }
            }
          })
        }
      }
    }
  },

  mounted: function() {
    this.upload = this.$refs.upload
    if (!this.title) {
      this.title = this.$t('upload.hint')
    }
  },

  components: {
    FileUpload,
    Modal
  }
}
</script>
<style lang="scss">
label.file-upload {
  width: 100%;
  min-height: 8rem;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.03);
  color: #666;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: 1px dashed rgba(0, 0, 0, 0.08);
  span {
    font-size: 1.5rem;
    font-weight: 400;
  }
  &:before {
    content: url('~assets/tag-picture@2x.png');
    margin-bottom: 1rem;
  }
  &.file-selected {
    background-color: #fff;
    span {
      display: none;
    }
    &:before {
      content: '';
    }
  }
}

@media only screen and (max-width: 768px) {
  label.file-upload {
    min-width: 60vw;
    min-height: 30vw;
  }
}

@media only screen and (min-width: 769px) {
  label.file-upload {
    min-height: 300px;
  }
}

.file-upload-modal {
  p.is-danger {
    margin-bottom: 1rem;
    font-size: 1rem;
    color: #e8021e;
  }
  .button {
    font-size: 1.2rem;
    font-weight: 400;
    .icon {
      width: 1.25rem;
      height: 1.25rem;
      margin-right: 0.5rem !important;
    }
    &.is-loading {
      .icon {
        display: none;
      }
    }
  }
}
</style>