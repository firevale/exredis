<template>
  <modal ref="modal" :visible="visible">
    <div class="tile box is-ancestor is-vertical" style="padding: 10px; margin: 0">
      <div class="tile is-parent border-horizontal" style="padding: 0 0 10px 0">
        <div class="tile is-child is-3">
          <file-upload class="file-upload" ref="upload" name="file" :drop="true" :multiple="false" :title="title" :extensions="extensions"
            :postAction="postAction" :accept="accept" :headers="headers"></file-upload>
        </div>
        <div v-if="file" class="tile is-child is-9 is-vertical">
          <div class="columns" style="margin-bottom: 0">
            <div class="column is-3">
              <label class="label pull-right">{{$t('admin.upload.filename')}}:</label>
            </div>
            <div class="column is-9">
              <label class="label">{{ file.name }}</label>
            </div>
          </div>
          <div class="columns" v-if="file && file.active" style="margin-bottom: 0">
            <div class="column is-3">
              <label class="label pull-right">{{$t('admin.upload.progress')}}:</label>
            </div>
            <div class="column is-9">
              <progress class="progress is-small is-primary" style="margin-top: 5px" :value="file.progress" max="100"> {{ file.progress }}%</progress>
            </div>
          </div>
          <div class="columns" v-if="file && file.active" style="margin-bottom: 0">
            <div class="column is-3">
              <label class="label pull-right">{{$t('admin.upload.speed')}}:</label>
            </div>
            <div class="column is-9">
              <label class="label">{{ file.speed | downLoadSpeedStr }}</label>
            </div>
          </div>
        </div>
      </div>
      <div class="container menu-panel" style="margin-top: 10px">
        <a class="button is-primary is-small is-outlined" :class="{'is-disabled': file ? file.success || file.active : true, 'is-loading': upload ? upload.active : false}"
          @click="upload.active = true">
          <span class="icon is-small"><i class="fa fa-upload" aria-hidden="true"> </i></span>
          <span>{{ $t('admin.upload.title') }}</span>
        </a>
      </div>
    </div>
  </modal>
</template>
<script>
  import fileUpload from './FileUpload.vue'
  import {
    Modal
  } from 'vue-bulma-modal'

  export default {
    props: {
      title: {
        type: String,
        default: 'Upload file',
      },
      
      extensions: {
        default:  () => [],
      },
      postAction: {
        type: String,
      },
      headers: {
        type: String,
      },
      accept: {
        type:String,
      },
      
  },
    data: function() {
      return {
        file: undefined,
        upload: undefined,
        modal: undefined,
        callback: undefined,
        visible: false,
      }
    },

    mounted: function() {
      this.upload = this.$refs.upload
      this.modal = this.$refs.modal
    },

    events: {
      addFileUpload: function(file) {
        this.file = file
      },

      afterFileUpload(file, component) {
        let response = this.file.data
        let errno = this.file.errno

        this.upload.files = []
        this.file = undefined

        if (typeof(this.callback) == 'function') {
          if (!errno) {
            this.callback(response)
          } else {
            this.callback(response)
          }
        }

        this.modal.close()
      },
    },

    components: {
      fileUpload,
      Modal
    }
  }
</script>
<style lang="scss">
  .file-upload {
    display: block;
  }
  
  .file-upload span {
    display: block;
    font-size: 18px;
    padding: 1em;
    font-weight: bold;
    border: 1px solid #888;
  }
  
  .drop-active {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    position: absolute;
    opacity: .4;
    background: #000;
  }
</style>