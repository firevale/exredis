<template>
	<modal :visible="visible">
    <div class="tile box is-ancestor is-vertical" style="padding: 10px; margin: 0">
      <div class="has-text-centered" style="width: 100%; margin: 10px 0 20px 0">
        <h4 class="title">{{ title }}</h4>
      </div>
      <div class="tile is-parent border-horizontal" style="padding: 0 0 10px 0">
        <div class="tile is-child is-3">
          <file-upload class="file-upload" 
                       ref="upload"
                       :name="name" 
                       :title="$t('admin.titles.upload')"
                       :drop="true" 
                       :accept="accept"
                       :multiple="false" 
                       :headers="headers"
                       :data="data"
                       :size="20971520"
                       :timeout="60000"
                       :postAction="postAction"
                       :extensions="extensions"
                       :events="uploadEvents">
          </file-upload>
        </div>
        <div v-if="file" class="tile is-child is-9 is-vertical">
          <div class="columns" style="margin-bottom: 0">
            <div class="column is-3">
              <label class="label pull-right">{{ $t('admin.upload.filename' )}}:</label>
            </div>
            <div class="column is-9">
              <label class="label">{{ file.name }}</label>
            </div>
          </div>

          <div class="columns" v-if="file && file.active" style="margin-bottom: 0">
            <div class="column is-3">
              <label class="label pull-right">{{ $t('admin.upload.progress') }}:</label>
            </div>
            <div class="column is-9">
              <progress class="progress is-small is-primary" style="margin-top: 5px" :value="file.progress" max="100"> {{ file.progress }}%</progress>
            </div>
          </div>

          <div class="columns" v-if="file && file.active" style="margin-bottom: 0">
            <div class="column is-3">
              <label class="label pull-right">{{ $t('admin.upload.speed') }}:</label>
            </div>
            <div class="column is-9">
              <label class="label">{{ file.speed | humanReadableDownloadSpeed }}</label>
            </div>
          </div>						
        </div>
      </div>

      <div class="container" style="margin-top: 5px">
        <a class="button is-primary" 
          :class="{'is-disabled': file ? file.success || file.active : true, 'is-loading': upload ? upload.active : false}" @click="upload.active = true">
          <span class="icon"><i class="fa fa-upload" aria-hidden="true"> </i></span>
          <span>{{ $t('admin.upload.title') }}</span>
        </a>
      </div>
    </div>
	</modal>
</template>

<script>
  import {
    Modal
  } from 'vue-bulma-modal'

  import {
    openNotification
  } from 'admin/common/notification'

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
      title: {
        type: String,
        default: '',
      },
      name: {
        type: String,
        default: 'file',
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
    },

    data: function() {
      return {
        file: undefined,
        upload: undefined,
        active: false,
        uploadEvents: {
          add: file => this.file = file,
          before: _ => {
            this.active = true
          },
          after: (file, component) => {
            this.active = false
            this.file = undefined
            this.visible = false

            this.$nextTick(_ => {
              if (typeof this.callback == 'function') {
                if (file.xhr.status == 200 && file.response.success) {
                  this.callback(file.response)
                  openNotification({
                    title: this.$t('admin.titles.uploadSuccess'),
                    message: this.$t('admin.messages.uploadSuccess', {fileName: file.name}),
                    type: 'success',
                    duration: 4500,
                  })
                }
                else if (typeof file.response == 'object' && typeof file.response.message == 'string') {
                  openNotification({
                    title: this.$t('admin.titles.uploadFailed'),
                    message: this.$t(file.response.message, file.response.message_object),
                    type: 'danger',
                    duration: 6000,
                  })
                }
                else {
                  openNotification({
                    title: this.$t('admin.titles.uploadFailed'),
                    message: file.error, // not tested yet
                    type: 'danger',
                    duration: 6000,
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
    },

    components: {
      fileUpload: require('./FileUpload'),
      Modal
    }
  }
</script>